<template>
  <SectionEditLayout
    :title="section.title"
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
        title="Hébergements"
        :rows="section.items.list"
        :columns="columns"
        no-data-label="Cliquez sur le bouton + pour ajouter un hébergement"
        @add="openAddAccommodationModal"
        @pick-module="openModulePickerModal"
      >
        <template #body-cell-description="props">
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

        <template #body-cell-price="props">
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

        <template #body-cell-link="props">
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
              @click="openEditAccommodationModal(props.rowIndex)"
              icon="eva-edit-outline"
              flat
              round
              dense
            />
            <QBtn
              @click="deleteAccommodation(props.rowIndex)"
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
  name: 'SectionAccommodationsEdit',
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
          style: 'width: 50%',
        },
        {
          name: 'description',
          label: 'Description',
          align: 'left',
          field: 'description',
        },
        {
          name: 'image',
          label: 'Image',
          align: 'center',
          field: 'image',
        },
        {
          name: 'price',
          label: 'Prix',
          align: 'left',
          field: 'price',
        },
        {
          name: 'link',
          label: 'Lien',
          align: 'left',
          field: 'link',
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
  methods: {
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
    async openAddAccommodationModal() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          list: [
            ...this.section.items.list,
            {
              title: '',
              description: '',
              image: null,
              price: '',
              arrival_date: '',
              departure_date: '',
            },
          ],
        },
      });
      this.openEditAccommodationModal(this.section.items.list.length - 1);
    },
    openEditAccommodationModal(rowIndex) {
      this.$modals.open('EditAccommodationModal', {
        props: {
          title: 'Modifier un hébergement',
          accommodation: this.section.items.list[rowIndex],
        },
        events: {
          submit: (data) => this.updateAccommodation(rowIndex, data),
        },
      });
    },
    updateAccommodation(rowIndex, data) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          list: this.section.items.list.map((accommodation, index) => {
            if (index === rowIndex) {
              return data;
            }
            return accommodation;
          }),
        },
      });
    },
    deleteAccommodation(rowIndex) {
      this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          list: this.section.items.list.filter((_, index) => index !== rowIndex),
        },
      });
    },
    openModulePickerModal() {
      this.$modals.open('ModulePickerModal', {
        props: {
          type: 'accommodation',
        },
        events: {
          submit: (data) => {
            this.travelBooksStore.updateCurrentTravelBookSection({
              ...this.section,
              items: {
                ...this.section.items,
                list: [
                  ...this.section.items.list,
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
  },
}
</script>
