<template>
  <div class="row">
    <div class="col-2 bg-white rounded-borders q-mr-lg q-pa-md">
      <QList v-if="travelBooksStore">
        <QItem
          v-for="section in travelBooksStore.currentTravelBook.sections"
          :class="`column ${itemStyle(section)}`"
          :key="section.tag"
          clickable
          @click="activeSection = section"
        >
          <QItemSection>
            {{ section.label }}
          </QItemSection>
        </QItem>
      </QList>
      <BButton
        class="q-mt-lg full-width"
        label="Ajouter"
        size="md"
        icon="add"
        @click="openAddTravelBookSectionModal"
      />
    </div>
    <div class="col bg-white rounded-borders q-pa-md">
      <component
        :is="activeSectionAsComponent"
        :key="computedActiveSection?.tag"
        :section="computedActiveSection"
        @delete-section="deleteSection"
      />
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import SectionCheckListEdit from 'src/components/sections/CheckListEdit.vue';
import SectionItineraryEdit from 'src/components/sections/ItineraryEdit.vue';
import SectionUsefulInformationsEdit from 'src/components/sections/UsefulInformationsEdit.vue';
import SectionCoverEdit from 'src/components/sections/CoverEdit.vue';
import SectionAccommodationsEdit from 'src/components/sections/AccommodationsEdit.vue';
import MapEdit from 'src/components/sections/MapEdit.vue';
import TransportsEdit from 'src/components/sections/TransportsEdit.vue';
import ContactEdit from 'src/components/sections/ContactEdit.vue';

export default {
  name: 'TravelBooksEditConception',
  data() {
    return {
      activeSection: undefined,
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    computedActiveSection() {
      return this.travelBooksStore.currentTravelBook.sections.find(section => section.tag === this.activeSection?.tag);
    },
    activeSectionAsComponent() {
      const SECTIONS_COMPONENTS = {
        'cover': SectionCoverEdit,
        'useful-informations': SectionUsefulInformationsEdit,
        'check-list': SectionCheckListEdit,
        'itinerary': SectionItineraryEdit,
        'accommodations': SectionAccommodationsEdit,
        'map': MapEdit,
        'transports': TransportsEdit,
        'contact': ContactEdit,
      };
      return SECTIONS_COMPONENTS[this.activeSection?.tag];
    },
  },
  mounted() {
    this.activeSection = this.travelBooksStore.currentTravelBook.sections[0];
  },
  methods: {
    itemStyle(section) {
      return this.activeSection?.tag === section.tag ? 'bg-secondary-1 text-secondary rounded-borders' : '';
    },
    openAddTravelBookSectionModal() {
      this.$modals.open('AddTravelBookSectionModal')
    },
    deleteSection() {
      this.travelBooksStore.removeCurrentTravelBookSection(this.activeSection.tag);
      this.activeSection = this.travelBooksStore.currentTravelBook.sections[0];
      this.$q.notify({
        message: 'La section a bien été supprimée',
        color: 'positive',
      });
    },
  },
}
</script>
