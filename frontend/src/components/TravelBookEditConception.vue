<template>
  <div class="row">
    <div class="col-3 bg-white rounded-borders q-mr-lg q-pa-md">
      <QList v-if="travelBooksStore">
        <draggableComponent
          v-model="draggableSections"
          item-key="tag"
          @start="isDragging = true"
          @end="isDragging = false"
          ghost-class="bg-blue-1"
          direction="vertical"
        >
          <template #item="{element}">
            <QItem
              :class="`${itemStyle(element)}`"
              :key="element.id"
              clickable
              @click="activeSection = element"
              @mouseover="hoveredSection = element.id"
              @mouseleave="hoveredSection = undefined"
            >
              <QItemSection>
                <div class="row items-center justify-between">
                  <div class="row items-center">
                    <QIcon
                      :color="displayActions(element.id) ? 'primary' : 'transparent'"
                      name="drag_indicator"
                    />
                    <p class="q-mb-none">{{ element.label }}</p>
                  </div>

                  <QBtn
                    v-if="displayActions(element.id)"
                    icon="eva-trash-2-outline"
                    text-color="dark"
                    unelevated
                    size="sm"
                    round
                    @click.stop="openDeleteTravelBookSectionModal(element.id)"
                  />
                </div>
              </QItemSection>
            </QItem>
          </template>
        </draggableComponent>
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
        :key="computedActiveSection?.id"
        :section="computedActiveSection"
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
import draggableComponent from 'vuedraggable';

export default {
  name: 'TravelBooksEditConception',
  components: {
    draggableComponent,
  },
  data() {
    return {
      activeSection: undefined,
      hoveredSection: undefined,
      isDragging: false,
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    draggableSections: {
      get() {
        return this.sortSections(this.travelBooksStore.currentTravelBook.sections);
      },
      set(value) {
        value = this.reorderSections(value);
        this.travelBooksStore.currentTravelBook.sections = value;
      },
    },
    computedActiveSection() {
      return this.travelBooksStore.currentTravelBook.sections.find(section => section.id === this.activeSection?.id);
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
    reorderSections(sections) {
      return sections.map((section, index) => {
        section.position = index;
        return section;
      });
    },
    sortSections(sections) {
      return sections.sort((a, b) => a.position - b.position);
    },
    displayActions(sectionId) {
      if (this.isDragging) return false;
      return this.hoveredSection === sectionId;
    },
    itemStyle(section) {
      return this.activeSection?.id === section.id ? 'bg-secondary-1 text-secondary rounded-borders' : '';
    },
    openAddTravelBookSectionModal() {
      this.$modals.open('AddTravelBookSectionModal')
    },
    async deleteSection(id) {
      this.activeSection = this.travelBooksStore.currentTravelBook.sections.find(section => section.id !== id);
      await this.travelBooksStore.removeCurrentTravelBookSection(id);
      this.$q.notify({
        message: 'La section a bien été supprimée',
        color: 'positive',
      });
    },
    openDeleteTravelBookSectionModal(id) {
      this.$q.dialog({
        title: 'Supprimer la section',
        message: 'Êtes-vous sûr de vouloir supprimer cette section ?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.deleteSection(id);
      });
    },
  },
}
</script>
