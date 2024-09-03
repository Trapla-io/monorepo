<template>
  <BModal
    :title="title"
    hide-close
  >
    <StepForm
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
import StepForm from 'src/components/forms/StepForm.vue';

export default {
  name: 'EditStepModal',
  components: { BModal, StepForm },
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
