<template>
  <div>
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Titre</p>
    <BInput
      v-model="form.title"
    />
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Description</p>
    <QEditor
      v-model="computedDescription"
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
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Lien</p>
    <BInput
      v-model="form.link"
    />
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image</p>
    <BImagePicker
      v-model="form.image"
    />
  </div>
</template>

<script>
import { QEditor } from 'quasar';

export default {
  name: 'AccommodationForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        description: '',
      }),
    },
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    computedDescription: {
      get() {
        return this.form.description || '';
      },
      set(value) {
        this.form.description = value;
      },
    },
  },
}
</script>