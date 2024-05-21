<template>
  <BModal
    title="Créer un carnet de voyage"
    hideCloseIcon
    hideClose
  >
    <QInput
      v-model="title"
      label="Nom du carnet de voyage"
      filled
      :rules="[(v) => !!v || 'Le nom du carnet de voyage est requis']"
      autofocus
    />
    <QList class="row q-gutter-sm q-mt-xl">
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
    <p class="text-caption">Sélectionnez au moins une section à ajouter dans votre carnet de voyage. Vous pourrez toujours en ajouter plus tard.</p>
    <QCardActions align="right">
      <QBtn
        label="Créer"
        color="primary"
        text-color="white"
        unelevated
        :disable="isDisabled"
        @click="submit"
      />
    </QCardActions>
  </BModal>
</template>
<script>
import BModal from 'components/base/BModal.vue';
import { QBtn, QCardActions, QIcon, QInput, QItem, QItemLabel, QItemSection, QList } from 'quasar';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { SECTIONS_TEMPLATES } from 'src/helpers/travelBookSections';

export default {
    name: 'StartCreateTravelBookModal',
    data() {
        return {
          loading: false,
          title: '',
            sections: SECTIONS_TEMPLATES.map(section => ({
              ...section,
              selected: false,
            })),
        };
    },
    computed: {
      ...mapStores(useTravelBooksStore),
      isDisabled() {
        return this.sections.filter(s => s.selected).length === 0 || !this.title;
      }
    },
    methods: {
      async submit() {
        this.loading = true;

        const sections = this.sections.filter(s => s.selected).map(s => s.tag);

        const newTravelBook =  await this.travelBooksStore.create(sections, this.title);

        if (!newTravelBook) {
          this.loading = false;
          return;
        }
        this.$emit('travel-book-created');
        this.$modals.close('StartCreateTravelBookModal');
        this.$router.push({ name: 'TravelBooksEdit', params: { id: newTravelBook.id } });
        this.loading = false;
      },
      toggleSection(section) {
        this.sections = this.sections.map(s => ({
          ...s,
          selected: section.tag === s.tag ? !s.selected : s.selected,
        }));
      },
      sectionColor(section) {
        if (section.selected) {
          return 'primary';
        }
        return 'grey-5';
      }
    },
    components: { BModal, QList, QItem, QItemSection, QIcon, QItemLabel, QCardActions, QBtn, QInput }
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
