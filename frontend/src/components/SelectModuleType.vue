<template>
  <QSelect
    v-model="selectedType"
    :options="types"
    label="Type de module"
    outlined
    dense
    bg-color="white"
    rounded
    :clearable="nullOption"
  />
</template>

<script>
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';

export default {
  name: 'SelectModuleType',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    nullOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      types: DATABASE_MODULES_INFORMATION.map(databaseModule => {
        return {
          label: databaseModule.label,
          value: databaseModule.name,
        }
      }),
    }
  },
  computed: {
    computedTypes() {
      return this.nullOption ? [null, ...this.types] : this.types;
    },
    selectedType: {
      get() {
        return DATABASE_MODULES_INFORMATION.find(databaseModule => databaseModule.name === this.modelValue)?.label;
      },
      set(value) {
        this.$emit('update:modelValue', value?.value);
      }
    }
  },
}
</script>