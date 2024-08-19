import { FullStory } from "@fullstory/browser";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async get() {
      const response = await api.get('/users/me');
      this.user = response;

      FullStory('setIdentity', {
        uid: this.user.id,
        properties: { ...this.user },
      })
    },
  },
});