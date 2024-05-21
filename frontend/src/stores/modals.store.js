import { defineStore } from "pinia";

export const useModalsStore = defineStore('modals', {
  state: () => ({
    modals: {},
  }),
  actions: {
    openModal({modalName, props, events }) {
      this.modals[modalName] = {
        active: true,
        props: props || {},
        events: events || {},
      };
    },
    closeModal(modalName) {
      this.modals[modalName] = {
        active: false,
        props: {},
        events: {},
      };
    }
  },
});
