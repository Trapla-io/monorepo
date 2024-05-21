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

      <QTable
        class="q-mt-md"
        title="Trajets"
        :rows="section.items.routes"
        :columns="columns"
        flat
        bordered
        no-data-label="Cliquez sur le bouton + pour ajouter un trajet."
      >
      <template #top-right>
          <BButton
          @click="openAddRouteModal"
          size="sm"
          icon="add"
          />
        </template>

        <template #body-cell-content="props">
          <QTd
            :props="props"
          >
            <span>
              {{ `${Math.round(getProgressValue(props.rowIndex) * 100)}%` }}
            </span>
            <QLinearProgress
              stripe
              color="positive"
              rounded
              :value="getProgressValue(props.rowIndex)"
              size="lg"
            />
          </QTd>
        </template>

        <template #body-cell-actions="props">
          <QTd
            :props="props"
          >
            <QBtn
              @click="openEditRouteModal(props.rowIndex)"
              icon="edit"
              flat
              round
              dense
            />
            <QBtn
              @click="deleteRoute(props.rowIndex)"
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
import { QLinearProgress } from 'quasar';
import SectionEditLayout from 'src/layouts/SectionEditLayout.vue';
import { mapStores } from 'pinia';
import { useTravelBooksStore } from 'src/stores/travel-books.store';

export default {
  name: 'TransportsEdit',
  components: { SectionEditLayout, QLinearProgress },
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
          style: 'width: 40%',
        },
        {
          name: 'content',
          label: 'Contenu',
          align: 'center',
          field: 'content',
          style: 'width: 40%',
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
  methods: {
    getProgressValue(routeIndex) {
      const route = this.section.items.routes[routeIndex];
      return Object.values(route).filter(e => e).length / Object.keys(route).length;
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
    async openAddRouteModal() {
      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          routes: [
            ...this.section.items.routes,
            {
              title: null,
              company: null,
              description: null,
              price: null,
              link: null,
              departure_location: null,
              departure_hour: null,
              departure_date: null,
              arrival_location: null,
              arrival_hour: null,
              arrival_date: null,
            },
          ],
        },
      });
      this.openEditRouteModal(this.section.items.routes.length - 1);
    },
    openEditRouteModal(routeIndex) {
      this.$modals.open('EditRouteModal', {
        props: {
          route: this.section.items.routes[routeIndex],
        },
        events: {
          submit: (data) => this.updateRoute(routeIndex, data),
        },
      });
    },
    async updateRoute(routeIndex, data) {
      const routes = [...this.section.items.routes];
      routes[routeIndex] = data;

      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          routes,
        },
      });
    },
    async deleteRoute(routeIndex) {
      const routes = [...this.section.items.routes];
      routes.splice(routeIndex, 1);

      await this.travelBooksStore.updateCurrentTravelBookSection({
        ...this.section,
        items: {
          ...this.section.items,
          routes,
        },
      });
    },
  },
};
</script>