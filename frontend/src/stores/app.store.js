import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useTravelBooksStore } from "./travel-books.store";
import { useCustomersStore } from "./customers.store";

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isAppLoaded: false,
  }),
  actions: {
    login(accessToken) {
      localStorage.setItem('access-token', accessToken);
      this.accessToken = accessToken;
      this.isLoggedIn = true;
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    },
    async load() {
      const accessToken = localStorage.getItem('access-token');

      if (!accessToken) {
        this.isAppLoaded = true;
        return;
      }

      this.login(accessToken);
      await this.fetchAll();

      this.isAppLoaded = true;
    },
    async fetchAll() {
      const travelBooksStore = useTravelBooksStore();
      const customerStore = useCustomersStore();
  
      await travelBooksStore.getAll();
      await customerStore.getAll();
    }
  },
});
