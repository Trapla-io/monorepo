import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [],
  }),
  actions: {
    async getAll() {
      const { data } = await api.get('/database-modules');
      this.modules = data;
    },
  },
});
