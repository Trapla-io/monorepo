<template>
  <BModal
    :title="title"
    hideClose
  >
    <CheckListItemForm
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
import CheckListItemForm from 'src/components/forms/CheckListItemForm.vue';

export default {
  name: 'EditCheckListItemModal',
  components: { BModal, CheckListItemForm },
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
