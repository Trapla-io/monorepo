<template>
  <QInput
    class="search-bar"
    outlined
    dense
    v-model="computedValue"
    @keypress.enter="$emit('search', computedValue)"
  >
    <template #append>
      <QBtn flat dense icon="search" @click="$emit('search', computedValue)" />
    </template>
  </QInput>
</template>
<script>
export default {
  name: 'BSearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.localValue;
      },
      set(value) {
        this.localValue = value;
        this.$emit('update:modelValue', value);
      },
    },
  },
  emits: ['update:modelValue', 'search'],
}
</script>
