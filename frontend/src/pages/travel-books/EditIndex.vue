<template>
  <QPage>
    <div class="row justify-between items-start">
      <div class="row items-center q-mb-lg">
        <BBackButton size="lg" />
        <h4>{{ travelBooksStore.currentTravelBook.title }}</h4>
      </div>
      <div>
        <BButton
          class="q-mr-md"
          label="Aperçu"
          type="secondary"
          @click="openPreviewModal"
        />
        <BButton
          label="enregistrer et quitter"
          :disabled="!hasTravelBookChanged"
          @click="saveAndQuit"
        />
      </div>
    </div>

    <div class="row justify-between">
      <QTabs
        class="text-primary text-dark"
        align="left"
        indicator-color="primary"
        v-model="activeTab"
      >
        <QTab
          key="general"
          name="general"
          label="Général"

        />
        <QTab
          key="conception"
          name="conception"
          label="Conception"
        />
      </QTabs>
    </div>
    <div class="q-mt-lg">
      <TravelBookEditSettings v-if="activeTab === 'general'" />
      <TravelBookEditConception v-if="activeTab === 'conception'" />
    </div>
  </QPage>
</template>
<script>
import { QPage, QTab, QTabs } from 'quasar';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import TravelBookEditSettings from 'src/components/TravelBookEditSettings.vue';
import TravelBookEditConception from 'src/components/TravelBookEditConception.vue';
import BBackButton from 'src/components/base/BBackButton.vue';
export default {
  name: 'TravelBooksEdit',
  components: { QPage, QTabs, QTab, TravelBookEditSettings, TravelBookEditConception, BBackButton },
  data() {
    return {
      activeTab: 'general',
      loading: false,
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    hasTravelBookChanged() {
      const oldTravelBook = this.travelBooksStore.travelBooks.find(
        (travelBook) => travelBook.id === this.travelBooksStore.currentTravelBook.id
      );
      return JSON.stringify(this.travelBooksStore.currentTravelBook) !== JSON.stringify(oldTravelBook);
    }
  },
  beforeMount() {
    this.travelBooksStore.setCurrentTravelBook(this.$route.params.id);
  },
  methods: {
    openPreviewModal() {
      this.$modals.open('TravelBookPreviewModal');
    },
    async saveAndQuit() {
      this.loading = true;

      const travelBook = await this.travelBooksStore.updateOne(this.travelBooksStore.currentTravelBook);

      if (travelBook) {
        this.$router.push({ name: 'TravelBooksIndex' });
      }

      this.loading = false;
    },
  },
}
</script>

<style lang="scss">
.border-bottom {
  border-bottom: 1px solid $grey-4;
}
</style>
