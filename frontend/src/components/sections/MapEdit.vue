<template>
  <SectionEditLayout
    :title="section.title"
    :tag="section.tag"
  >
    <div class="col-8">
      <p class="text-subtitle1 q-ma-none text-grey-6">Titre principal</p>
      <BInput
        v-model="computedTitle"
      />

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image de couverture</p>
      <BImagePicker
        v-model="computedImage"
      />

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Description</p>
      <BInput
        type="textarea"
        v-model="computedDescription"
      />

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Lien de la carte</p>
      <BInput
        v-model="computedLink"
      />

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image de la carte</p>
      <BImagePicker
        v-model="computedMapImage"
      />
    </div>
  </SectionEditLayout>
</template>

<script>
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';

export default {
  name: 'MapEdit',
  components: { SectionEditLayout },
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
      link: this.section.items.link,
      description: this.section.items.description,
      mapImage: this.section.items.image,
    }
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    computedTitle: {
      get() {
        return this.section.title;
      },
      set(value) {
        this.title = value;
        this.updateSection();
      },
    },
    computedImage: {
      get() {
        return this.section.cover_image;
      },
      set(value) {
        this.image = value;
        this.updateSection();
      },
    },
    computedLink: {
      get() {
        return this.section.items.link;
      },
      set(value) {
        this.link = value;
        this.updateSection();
      },
    },
    computedDescription: {
      get() {
        return this.section.items.description;
      },
      set(value) {
        this.description = value;
        this.updateSection();
      },
    },
    computedMapImage: {
      get() {
        return this.section.items.image;
      },
      set(value) {
        this.mapImage = value;
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
          link: this.link,
          description: this.description,
          image: this.mapImage,
        },
        title: this.title,
        cover_image: this.image,
      })
    },
  },
};
</script>