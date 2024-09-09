<template>
  <QTable
    flat
    bordered
  >
  <template #top-right>
    <BButton
      @click="$emit('add')"
      size="sm"
      icon="add"
    />
  </template>

  <template v-for="(_, name) in $slots" #[name]="scope">
    <slot :name="name" v-bind="scope" />
  </template>
  </QTable>
</template>

<script> 
export default {
  name: 'SectionItemsTable',
  emits: ['add'],
}
</script>