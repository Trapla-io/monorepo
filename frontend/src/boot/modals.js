import { boot } from 'quasar/wrappers'
import { useModalsStore } from "src/stores/modals.store";

const modalsStore = useModalsStore();

const modals = {
  open(modalName, options) {
    modalsStore.openModal({ modalName, ...options });
  },
  close(modal) {
    modalsStore.closeModal(modal);
  },
};
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.config.globalProperties.$modals = modals;
})

export { modals }
