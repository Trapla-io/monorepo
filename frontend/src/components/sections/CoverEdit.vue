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

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image de couverture</p>
      <BImagePicker
        v-model="computedImage"
      />
      <!-- <QUploader
        class="full-width"
        :ref="'uploader'"
        label="Importez une image"
        text-color="white"
        accept=".jpg, image/*"
        @added="computedImage = $event"
        @removed="computedImage = [null]"
        hide-upload-btn
        bordered
        flat
      /> -->
    </div>
  </SectionEditLayout>
</template>
<script>
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';

export default {
  name: 'SectionCoverEdit',
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
  },
  mounted() {
    // this.setImageInUploader();
  },
  methods: {
    setImageInUploader() {
      if (!this.image) return;

      this.$refs.uploader.addFiles([this.image]);
    },
    async updateSection() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
        },
        title: this.title,
        cover_image: this.image,
      });
    },
  },
}
</script>
