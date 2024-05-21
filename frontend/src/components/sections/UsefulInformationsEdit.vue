<template>
  <SectionEditLayout
    :title="section.label"
    :tag="section.tag"
  >
  <div class="col-8">
      <p class="text-subtitle1 q-ma-none text-grey-6">Titre principal</p>
      <BInput
        v-model="computedTitle"
      />

      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Image de couverture</p>
      <BImagePicker
        v-model="computedImage"
      />
      <!-- <QUploader
        class="full-width"
        :ref="'uploader'"
        label="Importez une image"
        text-color="white"
        accept=".jpg, image/*"
        @added="computedImage = $event"
        @removed="computedImage = [null]"
        hide-upload-btn
        bordered
        flat
      /> -->

      <QTable
        class="q-mt-md"
        title="Informations"
        :rows="section.items.informations"
        :columns="columns"
        flat
        bordered
        no-data-label="Cliquez sur le bouton + pour ajouter une information"
      >
        <template #top-right>
          <BButton
          @click="openAddInformationModal"
          size="sm"
          icon="add"
          />
        </template>

        <template #body-cell-content="props">
          <QTd
            :props="props"
          >
            <QBadge
              v-if="props.value?.length"
              color="green"
            >
              <QIcon name="check" />
            </QBadge>
            <QBadge
              v-else
              color="red"
            >
              <QIcon name="close" />
            </QBadge>
          </QTd>
        </template>

        <template #body-cell-image="props">
          <QTd
            :props="props"
          >
            <QBadge
              v-if="props.value"
              color="green"
            >
              <QIcon name="check" />
            </QBadge>
            <QBadge
              v-else
              color="red"
            >
              <QIcon name="close" />
            </QBadge>
          </QTd>
        </template>

        <template #body-cell-actions="props">
          <QTd
            :props="props"
          >
            <QBtn
              @click="openEditInformationModal(props.rowIndex)"
              icon="edit"
              flat
              round
              dense
            />
            <QBtn
              @click="deleteInformation(props.rowIndex)"
              icon="delete"
              flat
              round
              dense
            />
          </QTd>
        </template>
      </QTable>
    </div>
  </SectionEditLayout>
</template>
<script>
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';
import { QTable } from 'quasar';

export default {
  components: { SectionEditLayout, QTable },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.section.title,
      image: this.section.cover_image,
      columns: [
        {
          name: 'title',
          label: 'Titre',
          align: 'left',
          field: 'title',
          style: 'width: 60%',
        },
        {
          name: 'content',
          label: 'Contenu',
          align: 'center',
          field: 'content',
          style: 'width: 10%',
        },
        {
          name: 'image',
          label: 'Image',
          align: 'center',
          field: 'image',
          style: 'width: 10%',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          field: 'actions',
          style: 'width: 20%',
        }
      ],
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    computedTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.title = value;
        this.updateSection();
      },
    },
    computedImage: {
      get() {
        return this.image;
      },
      set(value) {
        this.image = value;
        this.updateSection();
      },
    },
  },
  mounted() {
    // this.setImageInUploader();
  },
  methods: {
    setImageInUploader() {
      if (!this.image) return;

      this.$refs.uploader.addFiles([this.image]);
    },
    async updateSection() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
        },
        title: this.title,
        cover_image: this.image,
      });
    },
    async openAddInformationModal() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          informations: [
            ...this.section.items.informations,
            {
              title: '',
              content: '',
              image: null,
            },
          ],
        },
      });
      this.openEditInformationModal(this.section.items.informations.length - 1);
    },
    openEditInformationModal(rowIndex) {
      this.$modals.open('EditInformationModal', {
        props: {
          title: 'Modifier une information',
          information: this.section.items.informations[rowIndex],
        },
        events: {
          submit: (data) => this.updateInformation(rowIndex, data),
        },
      });
    },
    updateInformation(rowIndex, data) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          informations: this.section.items.informations.map((information, index) => {
            if (index === rowIndex) {
              return data;
            }
            return information;
          }),
        },
      });
    },
    deleteInformation(rowIndex) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          informations: this.section.items.informations.filter((_, index) => index !== rowIndex),
        },
      });
    },
  },
}
</script>
