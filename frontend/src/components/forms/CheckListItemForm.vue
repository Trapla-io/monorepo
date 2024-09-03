<template>
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
</template>

<script>
export default {
  name: 'CheckListItemForm',
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