<template>
  <QPage>
    <div class="row justify-between items-start">
      <h4 class="q-mb-xl">Clients</h4>
      <BInput
        class="col-6"
        placeholder="Rechercher un nom, prénom ou email..."
        v-model="query"
        icon="search"
      />
      <BButton
        label="Ajouter un client"
        @click="openCreateCustomerModal"
      />
    </div>

    <QTable
      :rows="fileteredCustomers"
      :columns="columns"
      :loading="loading"
      row-key="id"
      no-data-label="Aucun client. Ajoutez-en un avec le bouton ci-dessus."
      flat
    >
      <template #body-cell-actions="props">
        <QTd class="row justify-center">
          <QBtn
            flat
            dense
            icon="edit"
            @click="openEditCustomerModal(props.row)"
          />
        </QTd>
      </template>

      <template #body-cell-travel_books="props">
        <QTd>
          <RouterLink
            :to="{ name: 'TravelBooksIndex', query: { customer_id: props.row.id } }"
          >
            <p class="text-center">
              Voir {{ props.row.travel_books.length }}
            </p>
          </RouterLink>
        </QTd>
      </template>
    </QTable>
  </QPage>
</template>
<script>
import { mapStores } from 'pinia';
import { useCustomersStore } from 'src/stores/customers.store';
import { RouterLink } from 'vue-router';

export default {
  name: 'CustomersIndex',
  data() {
    return {
      loading: false,
      query: '',
      columns: [
        {
          name: 'last_name',
          label: 'Nom',
          align: 'left',
          field: 'last_name'
        },
        {
          name: 'first_name',
          label: 'Prénom',
          align: 'left',
          field: 'first_name'
        },
        {
          name: 'email',
          label: 'Email',
          align: 'left',
          field: 'email'
        },
        {
          name: 'travel_books',
          label: 'Carnets de voyage',
          align: 'center',
          field: 'travel_books',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center',
          field: 'actions',
          style: 'width: 5%',
        }
      ],
    }
  },
  computed: {
    ...mapStores(useCustomersStore),
    fileteredCustomers() {
      return this.customersStore.customers.filter(customer => {
        return customer.last_name.toLowerCase().includes(this.query.toLowerCase())
          || customer.first_name.toLowerCase().includes(this.query.toLowerCase())
          || customer.email.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  },
  mounted() {
    this.fetchCustomers()
  },
  methods: {
    async fetchCustomers() {
      this.loading = true;

      await this.customersStore.getAll();

      this.loading = false;
    },
    openEditCustomerModal(customer) {
      this.$modals.open('CreateCustomerModal', {
        props: {
          customer,
          action: 'edit',
        },
        events: {
          'submitted': () => {
            this.fetchCustomers();
            this.$q.notify({
              message: 'Client mis à jour avec succès',
              color: 'positive',
            });
          },
        },
      })
    },
    openCreateCustomerModal() {
      this.$modals.open('CreateCustomerModal', {
        events: {
          'submitted': () => {
            this.fetchCustomers();
            this.$q.notify({
              message: 'Client créé avec succès',
              color: 'positive',
            });
          },
        },
      })
    },
  },
}
</script>

<style lang="sass" scoped>
a p
  text-decoration: underline
  color: $blue-6
</style>