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
  name: 'EditCheckListItemModal',
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
  mounted() {
    this.form = {...this.information};
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditCheckListItemModal');
    },
  },
}
</script>
