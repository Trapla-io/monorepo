<template>
  <QTable
    flat
    bordered
  >
  <template #top-right>
    <div>
      <QBtn
        class="q-mr-md"
        @click="$emit('pick-module')"
        icon="eva-layers-outline"
        flat
        text-color="purple-8"
      />
      <BButton
        @click="$emit('add')"
        size="sm"
        icon="add"
      />
    </div>
  </template>

  <template v-for="(_, name) in $slots" #[name]="scope">
    <slot :name="name" v-bind="scope" />
  </template>
  </QTable>
</template>

<script> 
export default {
  name: 'SectionItemsTable',
  emits: ['add', 'pick-module'],
}
</script>