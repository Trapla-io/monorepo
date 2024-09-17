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
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';

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
      types: DATABASE_MODULES_INFORMATION.map(databaseModule => {
        return {
          label: databaseModule.label,
          value: databaseModule.name,
        }
      }),
    }
  },
  computed: {
    selectedType: {
      get() {
        return DATABASE_MODULES_INFORMATION.find(databaseModule => databaseModule.name === this.modelValue)?.label;
      },
      set(value) {
        this.$emit('update:modelValue', value.value);
      }
    }
  },
}
</script>