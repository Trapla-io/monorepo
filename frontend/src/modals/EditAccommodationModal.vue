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
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Description</p>
      <QEditor
        v-model="form.description"
        label="Description"
        filled
        dense
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Prix</p>
      <BInput
        v-model="form.price"
      />
      <div class="row items-center q-mt-md">
        <div>
          <p class="text-subtitle1 q-ma-none text-grey-6">Date d'arrivée</p>
          <BDatePicker
            v-model="form.arrival_date"
          />
        </div>
        <div class="q-ml-md">
          <p class="text-subtitle1 q-ma-none text-grey-6">Date de départ</p>
          <BDatePicker
            v-model="form.departure_date"
          />
        </div>
      </div>
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
  name: 'EditAccommodationModal',
  components: { BModal, BInput, QEditor },
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
