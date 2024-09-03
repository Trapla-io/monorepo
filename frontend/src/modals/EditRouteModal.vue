<template>
  <BModal
    :title="title"
    hide-close
  >
    <RouteForm
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
import RouteForm from 'src/components/forms/RouteForm.vue';
export default {
  name: 'EditRouteModal',
  components: { BModal, RouteForm },
  props: {
    title: {
      type: String,
      default: `Modifier le trajet`,
    },
    route: {
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
    this.form = { ...this.route };
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditRouteModal');
    },
  },
}
</script>