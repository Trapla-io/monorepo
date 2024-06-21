<template>
  <BModal
    title="Ajouter une section"
    hideCloseIcon
    hideClose
  >
  <p class="">Sélectionnez une section à ajouter au carnet de voyage.</p>
    <QList class="row q-gutter-md">
      <QItem
        v-for="section in sections"
        :key="section.tag"
        clickable

        :class="`column justify-center items-center bordered ${sectionColor(section)}`"
        @click="toggleSection(section)"
      >
        <QItemSection>
          <QIcon
            :name="section.icon"
            size="lg"
            :color="sectionColor(section)"
          />
        </QItemSection>
        <QItemSection>
          <QItemLabel :class="`text-center ${sectionColor(section)}`">{{ section.label }}</QItemLabel>
        </QItemSection>
      </QItem>
    </QList>
    <QCardActions align="right">
      <BButton
        label="Ajouter"
        :disable="isDisabled"
        @click="addSection"
      />
    </QCardActions>
  </BModal>
</template>
<script>
import BModal from 'components/base/BModal.vue';
import { QCardActions, QIcon, QItem, QItemLabel, QItemSection, QList } from 'quasar';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { SECTIONS_TEMPLATES } from 'src/helpers/travelBookSections';

export default {
  name: 'AddTravelBookSectionModal',
  data() {
    return {
      loading: false,
      title: '',
      sections: SECTIONS_TEMPLATES
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    isDisabled() {
      return this.sections.filter(s => s.selected).length === 0;
    }
  },
  methods: {
    async addSection() {
      this.loading = true;

      const section = this.sections.find(s => s.selected);
      await this.travelBooksStore.addCurrentTravelBookSection(section.tag);

      this.$modals.close('AddTravelBookSectionModal');
      this.loading = false;
    },
    toggleSection(section) {

      this.sections = this.sections.map(s => ({
        ...s,
        selected: section.tag === s.tag ? true : false,
      }));
    },
    sectionColor(section) {
      if (section.selected) {
        return 'primary';
      }
      return 'grey-5';
    }
  },
  components: { BModal, QCardActions, QItem, QList, QItemSection, QIcon, QItemLabel }
}
</script>

<style lang="scss" scoped>
  .bordered {
    border: 1px solid;
    border-radius: 5px;
    width: 150px;
  }

  .primary {
    color: $primary;
    border-color: $primary;
  }

  .grey-5 {
    color: $grey-5;
    border-color: $grey-5;
  }
</style>
