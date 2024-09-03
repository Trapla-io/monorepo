<template>
  <BModal
    :title="title"
    hide-close
  >
    <AccommodationForm
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
import AccommodationForm from 'src/components/forms/AccommodationForm.vue';

export default {
  name: 'EditAccommodationModal',
  components: { BModal, AccommodationForm },
  props: {
    title: {
      type: String,
      default: `Modifier l'hébergement`,
    },
    accommodation: {
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
    this.form = {...this.accommodation};
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditAccommodationModal');
    },
  },
}
</script>
