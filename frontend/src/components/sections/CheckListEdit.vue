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

      <SectionItemsTable
        class="q-mt-md"
        title="Check-list"
        :rows="section.items.check_list"
        :columns="columns"
        no-data-label="Cliquez sur le bouton + pour ajouter un élément à la liste"
        @add="openAddCheckListItemModal"
        @pick-module="openModulePickerModal"
      >
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

        <template #body-cell-actions="props">
          <QTd
            :props="props"
          >
            <QBtn
              @click="openEditCheckListItemModal(props.rowIndex)"
              icon="eva-edit-outline"
              flat
              round
              dense
            />
            <QBtn
              @click="deleteCheckListItem(props.rowIndex)"
              icon="eva-trash-2-outline"
              flat
              round
              dense
            />
          </QTd>
        </template>
      </SectionItemsTable>
    </div>
  </SectionEditLayout>
</template>

<script>
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { useTravelBooksStore } from 'src/stores/travel-books.store';
import { mapStores } from 'pinia';
import SectionItemsTable from '../SectionItemsTable.vue';

export default {
  name: 'SectionCheckListEdit',
  components: { SectionEditLayout, SectionItemsTable },
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
          style: 'width: 20%',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          style: 'width: 20%',
        },
      ],
    };
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    computedTitle: {
      get() {
        return this.section.title;
      },
      set(value) {
        this.title = value;
        this.updateSection();
      },
    },
    computedImage: {
      get() {
        return this.section.cover_image;
      },
      set(value) {
        this.image = value;
        this.updateSection();
      },
    },
  },
  mounted() {
    // this.setImageInUploader()
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
    async openAddCheckListItemModal() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          check_list: [
            ...this.section.items.check_list,
            {
              title: '',
              content: '',
            },
          ],
        },
      });
      this.openEditCheckListItemModal(this.section.items.check_list.length - 1);
    },
    openEditCheckListItemModal(rowIndex) {
      this.$modals.open('EditCheckListItemModal', {
        props: {
          title: 'Modifier un element de la liste',
          information: this.section.items.check_list[rowIndex],
        },
        events: {
          submit: (data) => this.updateCheckListItem(rowIndex, data),
        },
      });
    },
    updateCheckListItem(rowIndex, data) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          check_list: this.section.items.check_list.map((item, index) => {
            if (index === rowIndex) {
              return data;
            }
            return item;
          }),
        },
      });
    },
    deleteCheckListItem(rowIndex) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          check_list: this.section.items.check_list.filter((_, index) => index !== rowIndex),
        },
      });
    },
    openModulePickerModal() {
      this.$modals.open('ModulePickerModal', {
        props: {
          type: 'check-list-items',
        },
        events: {
          submit: (data) => {
            this.travelBooksStore.updateCurrentTravelBookSection({
              ...this.section,
              items: {
                ...this.section.items,
                check_list: [
                  ...this.section.items.check_list,
                  {
                    ...data.content,
                    module_id: data.id,
                  },
                ],
              },
            });
          },
        },
      });
    },
  }
}
</script>
