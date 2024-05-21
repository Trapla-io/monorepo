<template>
  <BModal
    title="Modifier la section"
    hideClose
    size="big"
  >
    <h6>1. Général</h6>
    <div class="row justify-between">
      <QInput
        class="col-5"
        v-model="section.title"
        label="Titre de la section"
        filled
        dense
      />
      <QUploader
        ref="uploader"
        class="col-6"
        label="Importez deux images"
        text-color="white"
        multiple
        hide-upload-button
        accept=".jpg, image/*"
        @added="section.cover_images = $event"
      />
    </div>

    <div
      v-if="section.items"
      class="q-mt-lg"
    >
      <h6>2. Contenu</h6>
      <UsefulInformationsEdit
        v-if="sectionTag === 'useful-informations'"
        v-model="section.items"
      />
      <CheckListEdit
        v-if="sectionTag === 'check-list'"
        v-model="section.items"
      />
      <ItineraryEdit
        v-if="sectionTag === 'itinerary'"
        v-model="section.items"
      />
    </div>
    <QCardActions
      align="right"
      class="q-mt-xl q-pr-none"
    >
      <QBtn
        label="Appliquer"
        color="primary"
        text-color="white"
        unelevated
        @click="submit"
      />
    </QCardActions>
  </BModal>
</template>
<script>
import BModal from 'src/components/base/BModal.vue';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { QBtn, QCardActions, QInput, QUploader } from 'quasar';
import UsefulInformationsEdit from '../components/sections/UsefulInformationsEdit.vue';
import CheckListEdit from '../components/sections/CheckListEdit.vue';
import ItineraryEdit from '../components/sections/ItineraryEdit.vue';

export default {
  name: 'EditTravelBookSectionModal',
  props: {
    sectionTag: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      section: {},
    }
  },
  computed: {
    ...mapStores(useTravelBooksStore),
  },
  mounted() {
    this.section = {
      ...this.travelBooksStore.getCurrentTravelBookSection(this.sectionTag)
    }

    this.$nextTick(() => {
      if (this.section.cover_images?.length) {
        this.$refs.uploader.files = this.section.cover_images;
      }
    });
  },
  methods: {
    submit() {
      this.travelBooksStore.updateCurrentTravelBookSection(this.section);
      this.$modals.close('EditTravelBookSectionModal');
    },
  },
  components: { BModal, QInput, QUploader, QCardActions, QBtn, UsefulInformationsEdit, CheckListEdit, ItineraryEdit }
}
</script>
