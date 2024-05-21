<template>
  <SectionEditLayout
    :title="section.label"
    :tag="section.tag"
  >
    <div class="col-8">
      <p class="text-subtitle1 q-ma-none text-grey-6">Titre</p>
      <BInput
        v-model="computedTitle"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Email</p>
      <BInput
        v-model="computedEmail"
        type="email"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Téléphone</p>
      <BInput
        v-model="computedPhone"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Site internet</p>
      <BInput
        v-model="computedWebsite"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Photo de profile</p>
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

export default {
  name: 'SectionContactEdit',
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
      email: this.section.items.email,
      phone: this.section.items.phone,
      website: this.section.items.website,
      image: this.section.items.image,
    };
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
    computedEmail: {
      get() {
        return this.section.items.email;
      },
      set(value) {
        this.email = value;
        this.updateSection();
      },
    },
    computedPhone: {
      get() {
        return this.section.items.phone;
      },
      set(value) {
        this.phone = value;
        this.updateSection();
      },
    },
    computedWebsite: {
      get() {
        return this.section.items.website;
      },
      set(value) {
        this.website = value;
        this.updateSection();
      },
    },
    computedImage: {
      get() {
        return this.section.items.image;
      },
      set(value) {
        this.image = value;
        this.updateSection();
      },
    },
  },
  methods: {
    async updateSection() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          phone: this.phone,
          email: this.email,
          website: this.website,
          image: this.image,
        },
        title: this.title,
        cover_image: this.image,
      });
    },
  },
}
</script>
