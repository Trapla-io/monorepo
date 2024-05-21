<template>
  <div class="row justify-between q-mb-lg border-bottom">
    <h5>{{ title }}</h5>
    <div>
      <QBtn
        icon="delete"
        text-color="dark"
        unelevated
        round
        @click="openDeleteTravelBookSectionModal"
      />
    </div>
  </div>

  <div class="row q-mb-lg">
    <slot></slot>
  </div>

</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['delete-section'],
  methods: {
    openDeleteTravelBookSectionModal() {
      this.$q.dialog({
        title: 'Supprimer la section',
        message: 'Êtes-vous sûr de vouloir supprimer cette section ?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.$emit('delete-section');
      });
    },
  },
}
</script>
