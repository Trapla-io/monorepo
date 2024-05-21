<template>
  <BModal
    title="Aperçu du carnet de voyage"
    hideClose
    size="fit-screen"
  >
    <div class="bordered">
      <div
        v-if="previewHtml"
        v-html="previewHtml"
      />
    </div>
  </BModal>
</template>

<script>
import BModal from 'src/components/base/BModal.vue';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';

export default {
  name: 'TravelBookPreviewModal',
  data() {
    return {
      loading: false,
      previewHtml: undefined,
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),

  },
  mounted() {
    this.getPreview();
  },
  methods: {
    async getPreview() {
      const response = await this.$api.post(`/travel-books/${this.travelBooksStore.currentTravelBook.id}/preview`, {
        data: {
          ...this.travelBooksStore.currentTravelBook,
        }
      })
      this.previewHtml = response.data;
    },
  }
}
</script>

<style lang="scss" scoped>
.bordered {
  border: 1px solid black;
  padding: 20px;
  margin: auto;
  max-width: 930px;
  overflow: scroll;
}
</style>
