<template>
  <BModal
    :title="title"
    hide-close
  >
    <div>
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Titre</p>
      <BInput
        v-model="form.title"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Sous-titre</p>
      <BInput
        v-model="form.subtitle"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Contenu</p>
      <QEditor
        v-model="form.content"
        label="Contenu"
        filled
        dense
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image</p>
      <BImagePicker
        v-model="computedImage"
      />
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
import { QEditor } from 'quasar';
import BInput from 'src/components/base/BInput.vue';
import BModal from 'src/components/base/BModal.vue';

export default {
  name: 'EditStepModal',
  components: { BModal, BInput, QEditor },
  props: {
    title: {
      type: String,
      default: `Modifier l'élement`,
    },
    step: {
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
    this.form = {...this.step};
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditStepModal');
    },
  },
}
</script>
