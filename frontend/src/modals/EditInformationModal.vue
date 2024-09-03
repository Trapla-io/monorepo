<template>
  <BModal
    :title="title"
    hideClose
  >
    <InformationForm
      v-model="form"
    />
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
import BModal from 'src/components/base/BModal.vue';
import InformationForm from 'src/components/forms/InformationForm.vue';

export default {
  name: 'EditInformationModal',
  components: { BModal, InformationForm },
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
  mounted() {
    this.form = {...this.information};
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
