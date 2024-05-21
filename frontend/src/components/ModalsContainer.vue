<template>
  <div>
    <Component
      v-for="modalName in activeModals"
      v-bind="modalsStore.modals[modalName].props"
      :is="modalName"
      :key="modalName"
      v-on="modalsStore.modals[modalName].events"
    />
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import modals from 'src/modals/';
import { useModalsStore } from 'src/stores/modals.store';

export default {
  name: 'ModalsContainer',
  components: {
    ...modals,
  },
  computed: {
    ...mapStores(useModalsStore),
    activeModals() {
      const modalsName = Object.keys(this.modalsStore.modals);

      return modalsName.filter(v => this.modalsStore.modals[v].active);
    },
  },
};
</script>