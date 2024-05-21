<template>
  <div class="row q-pa-md bg-white rounded-borders">
    <div class="col-6">
      <p class="text-subtitle1 q-ma-none text-grey-6">Titre du carnet de voyage</p>
      <BInput
        v-model="travelBooksStore.currentTravelBook.title"
      />

      <div class="row items-center q-mt-md">
        <div class="col">
          <p class="text-subtitle1 q-ma-none text-grey-6">Date de début</p>
          <BDatePicker
            v-model="travelBooksStore.currentTravelBook.start_date"
          />
        </div>
        <div class="q-ml-md col">
          <p class="text-subtitle1 q-ma-none text-grey-6">Date de fin</p>
          <BDatePicker
            v-model="travelBooksStore.currentTravelBook.end_date"
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Client</p>
          <QSelect
            v-model="travelBooksStore.currentTravelBook.customer_id"
            :options="customersStore.customers"
            option-value="id"
            :option-label="getCustomerLabel"
            emit-value
            dense
            stack-label
            use-chips
            outlined
          />
        </div>
        <div class="q-ml-md col">
          <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Destination</p>
          <BInput
            v-model="travelBooksStore.currentTravelBook.destination"
          />
        </div>
      </div>

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Thème</p>
      <ThemePicker v-model="travelBooksStore.currentTravelBook.theme" />
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import BDatePicker from 'src/components/base/BDatePicker.vue';
import ThemePicker from 'src/components/ThemePicker.vue';
import { useCustomersStore } from 'src/stores/customers.store';

export default {
  name: 'TravelBooksEditSettings',
  components: { BDatePicker, ThemePicker },
  data() {
    return {
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore, useCustomersStore),
  },
  mounted() {
    // this.setImageInUploader();
  },
  methods: {
    getCustomerLabel(item) {
      let customer = item.id ? item : this.customersStore.customers.find(c => c.id === item);
      return `${customer.first_name} ${customer.last_name} - ${customer.email}`;
    },
    setImageInUploader() {
      if (!this.travelBooksStore.currentTravelBook.company_logo) return;

      this.$refs.uploader.addFiles([this.travelBooksStore.currentTravelBook.company_logo]);
    },
  },
}
</script>
