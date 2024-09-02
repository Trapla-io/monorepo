<template>
  <QSelect
    v-model="selectedType"
    :options="types"
    label="Type de module"
    outlined
    dense
    bg-color="white"
    rounded
  />
</template>

<script>
import { SECTIONS_TEMPLATES } from 'src/helpers/travelBookSections';

export default {
  name: 'SelectModuleType',
  props: {
    modelValue: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      types: SECTIONS_TEMPLATES.map(section => {
        return {
          label: section.label,
          value: section.tag,
        }
      }),
    }
  },
  computed: {
    selectedType: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
}
</script>