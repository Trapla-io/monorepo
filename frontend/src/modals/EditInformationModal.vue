<template>
  <BModal
    :title="title"
    hideClose
  >
    <div>
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Titre</p>
      <BInput
        v-model="form.title"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Contenu</p>
      <BInput
        v-model="form.content"
        type="textarea"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image</p>
      <BImagePicker
        v-model="computedImage"
      />
      <!-- <QUploader
        class="full-width"
        ref="modalUploader"
        label="Importez une image"
        text-color="white"
        accept=".jpg, image/*"
        @added="computedImage = $event"
        hide-upload-btn
        bordered
        flat
      /> -->
    </div>
    <QCardActions
        align="right"
        class="q-mt-xl q-pr-none"
    >
      <BButton
        label="Appliquer"
        @click="submit"
      />
    </QCardActions>
  </BModal>
</template>
<script>
import BInput from 'src/components/base/BInput.vue';
import BModal from 'src/components/base/BModal.vue';

export default {
  name: 'EditInformationModal',
  components: { BModal, BInput },
  props: {
    title: {
      type: String,
      default: `Modifier l'élement`,
    },
    information: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    computedImage: {
      get() {
        return this.form.image;
      },
      set(value) {
        this.form.image = value;
      },
    },
  },
  mounted() {
    this.form = {...this.information};

    this.$nextTick(() => {
      // this.setImageInUploader();
    });
  },
  methods: {
    setImageInUploader() {
      if (!this.form.image) return;

      this.$refs.modalUploader.addFiles([this.form.image]);
    },
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditInformationModal');
    },
  },
}
</script>
