<template>
  <SectionEditLayout
    :title="section.label"
    :tag="section.tag"
  >
    <div class="col-6">
      <p class="text-subtitle1 q-ma-none text-grey-6">Titre principal</p>
      <BInput
        v-model="computedTitle"
      />

      <div class="flex items-center q-mt-md">
        <p class="text-subtitle1 q-ma-none text-grey-6">Afficher le sommaire :</p>
        <QCheckbox v-model="computedShowSummary" />
      </div>

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image de couverture</p>
      <BImagePicker
        v-model="computedImage"
      />
    </div>
  </SectionEditLayout>
</template>
<script>
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';
import { QCheckbox } from 'quasar';

export default {
  name: 'SectionCoverEdit',
  components: { SectionEditLayout, QCheckbox },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.section.title,
      image: this.section.cover_image,
      showSummary: this.section.items.show_summary,
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    computedTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.title = value;
        this.updateSection();
      },
    },
    computedImage: {
      get() {
        return this.image;
      },
      set(value) {
        this.image = value;
        this.updateSection();
      },
    },
    computedShowSummary: {
      get() {
        return this.showSummary;
      },
      set(value) {
        this.showSummary = value;
        this.updateSection();
      },
    },
  },
  methods: {
    async updateSection() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          show_summary: this.showSummary,
        },
        title: this.title,
        cover_image: this.image,
      });
    },
  },
}
</script>
