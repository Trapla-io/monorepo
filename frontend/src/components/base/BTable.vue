<template>
  <QTable
    :title="title"
    :rows="rows"
    :columns="columns"
    flat
    bordered
  >
    <template
      v-if="addButton"
      #top-right
      >
      <BButton
      @click="$emit('add-btn-clicked')"
      size="sm"
      icon="add"
      label=""
      />
    </template>
    <slot />
  </QTable>
</template>
<script>
import { QTable } from 'quasar';
import BButton from './BButton.vue';

export default {
    components: { QTable, BButton },
    props: {
      title: {
        type: String,
        default: null,
      },
      addButton: {
        type: Boolean,
        default: true,
      },
      rows: {
        type: Array,
        default: () => [],
      },
      columns: {
        type: Array,
        default: () => [],
      },
    }
}
</script>
