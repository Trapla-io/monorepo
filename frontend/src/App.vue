<template>
  <router-view v-if="appStore.isAppLoaded" />

  <div
    class="spinner-wrapper row content-end"
    v-else
  >
    <h4>Chargement</h4>
    <QSpinnerDots size="lg" />
  </div>
  <ModalsContainer />
</template>

<script>
import { defineComponent } from 'vue'
import ModalsContainer from './components/ModalsContainer.vue';
import { useAppStore } from './stores/app.store';
import { mapStores } from 'pinia';
import { QSpinnerDots } from 'quasar';

export default defineComponent({
  name: 'App',
  components: { ModalsContainer, QSpinnerDots },
  computed: {
      ...mapStores(useAppStore),
  },
  beforeMount() {
    this.appStore.load();
  },
})
</script>

<style scoped>
.spinner-wrapper {
  width:fit-content;
  margin: auto;
  margin-top: 40vh;
}
</style>
