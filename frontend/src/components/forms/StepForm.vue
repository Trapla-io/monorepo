<template>
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
      v-model="form.image"
    />
  </div>
</template>

<script>
import { QEditor } from 'quasar';

export default {
  name: 'StepForm',
  components: { QEditor },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
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
  },
}
</script>
