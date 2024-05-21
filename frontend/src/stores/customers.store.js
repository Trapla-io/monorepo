import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCustomersStore = defineStore('customers', {
  state: () => ({
    customers: [],
  }),
  actions: {
    async getAll() {
      const response = await api.get('/customers');
      this.customers = response.data;
    },
  },
});