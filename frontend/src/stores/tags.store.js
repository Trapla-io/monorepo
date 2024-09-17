import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [],
  }),
  actions: {
    async getAll() {
      try {
        const response = await api.get('/tags');
        this.tags = response.data;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la récupération des tags',
        });
      }
    },
    async create(name) {
      try {
        const response = await api.post('/tags', { name });
        this.tags.push(response.data);
        return response.data;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la création du tag',
        });
      }
    },
    async update(tagId, tag) {
      try {
        const response = await api.patch(`/tags/${tagId}`, tag);
        const index = this.tags.findIndex(t => t.id === tagId);
        this.tags[index] = response.data;
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la mise à jour du tag',
        });
      }
    },
    async delete(tagId) {
      try {
        await api.delete(`/tags/${tagId}`);
        this.tags = this.tags.filter(tag => tag.id !== tagId);
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erreur lors de la suppression du tag',
        });
      }
    },
  }
});
