<template>
  <QPage>
    <h4 class="q-mb-xl">Carnets de voyages</h4>

    <div class="row q-mb-md">
      <QSelect
        class="col-4"
        v-model="filters.customer_id"
        :options="customersStore.customers"
        option-value="id"
        :option-label="getCustomerLabel"
        emit-value
        dense
        bg-color="white"
        label="Client"
        stack-label
        use-chips
        outlined
      />
    </div>

    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="travelBook in filteredTravelBooks"
        :key="travelBook.id"
      >
        <QCard
          class="cursor-pointer"
          @click="openEditTravelBook(travelBook)"
        >
          <QCardSection>
            <p class="text-subtitle2">{{ travelBook.title }}</p>
            <p class="text-caption">{{ travelBook.destination }}</p>
            <p class="text-caption">{{ datesString(travelBook) }}</p>
          </QCardSection>

          <QCardActions align="right">
            <BButton
              label="exporter"
              @click.stop="exportTravelBook(travelBook)"
            />
          </QCardActions>
        </QCard>
      </div>
    </div>

    <div class="row justify-center q-mt-xl">
      <QBtn
        color="primary"
        text-color="white"
        unelevated
        label="Créer un carnet de voyage"
        @click="startCreateTravelBook"
      />
    </div>
  </QPage>
</template>
<script>
import { QBtn, QPage, date } from 'quasar';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';
import { useCustomersStore } from 'src/stores/customers.store';

export default {
  name: 'TravelBooksIndex',
  data() {
    return {
      filters: {
        customer_id: null,
      },
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore, useCustomersStore),
    filteredTravelBooks() {
      if (!this.filters.customer_id) {
        return this.travelBooksStore.travelBooks;
      }
      return this.travelBooksStore.travelBooks.filter(travelBook => travelBook.customer_id == this.filters.customer_id);
    },
  },
  watch: {
    filters: {
      handler() {
        this.$router.push({ name: this.$route.name, query: { customer_id: this.filters.customer_id } });
      },
      deep: true,
    },
  },
  mounted() {
    this.filters.customer_id = this.$route.query.customer_id || null;
  },
  methods: {
    getCustomerLabel(item) {
      console.log(item);
      let customer = item.id ? item : this.customersStore.customers.find(c => c.id == item);
      return `${customer.first_name} ${customer.last_name} - ${customer.email}`;
    },
    startCreateTravelBook() {
      this.$modals.open('StartCreateTravelBookModal')
    },
    datesString(travelBook) {
      if (!travelBook.start_date || !travelBook.end_date) {
        return '';
      }
      return `${date.formatDate(travelBook.start_date, "DD/MM/YYYY")} - ${date.formatDate(travelBook.end_date, "DD/MM/YYYY")}`;
    },
    openEditTravelBook(travelBook) {
      this.$router.push({ name: 'TravelBooksEdit', params: { id: travelBook.id } });
    },
    async exportTravelBook(travelBook) {
      try {
        const closeNotify = this.$q.notify({
          spinner: true,
          message: 'Export en cours...',
          color: 'positive',
          position: 'top-right',
          icon: 'cloud_download',
          timeout: 10000,
        })
        const response = await this.$api.post(`travel-books/${travelBook.id}/export`, {}, { responseType: 'arraybuffer' });

        const objectUrl = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = objectUrl;
        link.setAttribute('download', travelBook.title + '.pdf');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        closeNotify();
      } catch (error) {
        this.$q.notify({
          message: 'Erreur lors de l\'export',
          color: 'negative',
        });
        closeNotify();
      }
    },
  },
  components: { QBtn, QPage }
}
</script>

<style lang="sass">
.travel-book-card
  max-width: 300px
</style>
