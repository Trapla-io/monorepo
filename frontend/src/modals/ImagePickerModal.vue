<template>
  <BModal
    :title="title"
    hideCloseIcon
    hideClose
    size="fit-screen"
  >
    <div class="row justify-between items-center">
      <QTabs
        v-model="tab"
        class="text-primary text-dark"
        align="left"
        inline-label
        indicator-color="primary"
      >
        <QTab
          icon="img:https://play-lh.googleusercontent.com/KtFwMsqVzBBpTFc8vR5SZRCNBvqknlWurnzTRl4J-2kdZhoM04LjklX9Vh8pl-fYfpU"
          name="pexels"
          label="Pexels"
        />
        <QTab
          icon="eva-image"
          name="upload"
          label="Vos images"
        />
      </QTabs>
      <BButton
        label="Ajouter"
        type="primary"
        :disable="!pickedImage"
        @click="submit"
      />
    </div>

    <div
      class="q-mt-md"
      v-if="tab == 'pexels'"
    >
      <div class="row">
        <BSearchBar
          class="search-bar col-6"
          v-model="query"
          @search="searchImages"
          placeholder="Rechercher une image et appuyer sur Entrée"
        />
      </div>
  
      <QList
        class="images-list row q-mt-md"
      >
        <QItem
          v-for="image in pexelsImages"
          :class="`col-3 ${selectedImageClass(image)}`"
          :key="image.id"
          clickable
          @click="pickedImage = image"
        >
          <QItemSection>
            <QImg
              :src="image.src.large"
              fit
            />
          </QItemSection>
        </QItem>
      </QList>
    </div>

    <div
      class="q-mt-md"
      v-if="tab == 'upload'"
    >
      <div class="row">
        <div class="column">
          <QUploader
            ref="uploader"
            label="Importez une image"
            text-color="white"
            accept=".jpg, image/*"
            @added="imageToUpload = $event[0]"
            bordered
            hide-upload-btn
            flat
          />
          <BButton
            v-if="imageToUpload"
            class="q-mt-xs"
            label="Importer"
            type="primary"
            @click="uploadImage"
            :loading="uploadLoading"
          />
        </div>
        <QList
          class="col row"
        >
          <QItem
            v-for="image in uploadedImages"
            :class="`col-4 ${selectedImageClass(image)}`"
            :key="image.id"
            clickable
            @click="pickedImage = image"
          >
            <QItemSection>
              <QImg
                :src="image.url"
                fit
              />
            </QItemSection>
          </QItem>
        </QList>
      </div>
    </div>
  </BModal>
</template>
<script>
import BModal from 'components/base/BModal.vue';
import { QTab, QTabs, QUploader } from 'quasar';
import BButton from 'src/components/base/BButton.vue';


export default {
 name: 'ImagePickerModal',
 components: { BModal, QTabs, QTab, QUploader },
 props: {
   title: {
      type: String,
      default: 'Choisir une image',
    },
 },
 data() {
   return {
    tab: 'pexels',
     loading: false,
     uploadLoading: false,
     pickedImage: null,
     imageToUpload: null,
     pexelsImages: [],
     uploadedImages: [],
     query: '',
   };
 },
 mounted() {
   this.getUploadedImages();
 },
 methods: {
  selectedImageClass(image) {
    return this.pickedImage?.id === image.id ? 'bg-primary' : '';
  },
  async searchImages() {
    this.loading = true;
    const response = await this.$axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: this.query,
        per_page: 50,
        locale: 'fr-FR'
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      }
    });
    this.pexelsImages = response.data.photos;
    this.loading = false;

  },
   submit() {
      const imageUrl = this.tab === 'pexels' ? this.pickedImage.src.large2x : this.pickedImage.url;
      this.$emit('picked', {
        id: this.pickedImage.id,
        src: imageUrl,
      });
      this.closeModal();
   },
    closeModal() {
      this.$modals.close('ImagePickerModal');
    },
    async uploadImage() {
      this.uploadLoading = true;

      const formData = new FormData();
      formData.append('image', this.imageToUpload);
      await this.$api.post('images', formData);

      this.$q.notify({
        message: 'Image importée avec succès',
        color: 'positive',
      });
      this.imageToUpload = null;
      this.$refs.uploader.reset();
      this.getUploadedImages();
      this.uploadLoading = false;
    },
    async getUploadedImages() {
      const response = await this.$api.get('images');
      this.uploadedImages = response.data;
    },
 },
}
</script>

<style lang="scss" scoped>
.images-list {
  min-height: 400px;
  max-height: 500px;
  overflow: scroll;
}
</style>
