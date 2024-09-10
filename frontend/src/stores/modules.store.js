import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [],
  }),
  getters: {
    async getOrLoad() {
      if (this.modules.length === 0) {
        await this.getAll();
      }

      return this.modules;
    }
  },
  actions: {
    async getAll() {
      const { data } = await api.get('/database-modules');
      this.modules = data;
    },
    async create(newModule) {
      const response = await api.post('/database-modules', newModule);

      this.modules.push(response.data);
    },
    async update(updatedModule) {
      const response = await api.put(`/database-modules/${updatedModule.id}`, updatedModule);

      const index = this.modules.findIndex(m => m.id === updatedModule.id);
      this.modules[index] = response.data;
    },
    async delete(id) {
      await api.delete(`/database-modules/${id}`);

      this.modules = this.modules.filter(m => m.id !== id);
    }
  },
});
