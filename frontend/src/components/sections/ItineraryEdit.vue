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
        title="Étapes"
        :rows="section.items.steps"
        :columns="columns"
        flat
        bordered
        no-data-label="Cliquez sur le bouton + pour ajouter une étape"
      >
        <template #top-right>
          <BButton
          @click="openAddStepModal"
          size="sm"
          icon="add"
          />
        </template>

        <template #body-cell-subtitle="props">
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
              @click="openEditStepModal(props.rowIndex)"
              icon="edit"
              flat
              round
              dense
            />
            <QBtn
              @click="deleteStep(props.rowIndex)"
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

export default {
  name: 'SectionItineraryEdit',
  components: { SectionEditLayout },
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
          style: 'width: 50%',
        },
        {
          name: 'subtitle',
          label: 'Sous-titre',
          align: 'center',
          field: 'subtitle',
          style: 'width: 10%',
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
    async openAddStepModal() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          steps: [
            ...this.section.items.steps,
            {
              title: '',
              content: '',
              image: null,
            },
          ],
        },
      });
      this.openEditStepModal(this.section.items.steps.length - 1);
    },
    openEditStepModal(rowIndex) {
      this.$modals.open('EditStepModal', {
        props: {
          title: 'Modifier une étape',
          step: this.section.items.steps[rowIndex],
        },
        events: {
          submit: (data) => this.updateStep(rowIndex, data),
        },
      });
    },
    updateStep(rowIndex, data) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          steps: this.section.items.steps.map((step, index) => {
            if (index === rowIndex) {
              return data;
            }
            return step;
          }),
        },
      });
    },
    deleteStep(rowIndex) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          steps: this.section.items.steps.filter((_, index) => index !== rowIndex),
        },
      });
    },
  },
};
</script>
