<template>
  <QPage>
    <div class="row justify-between items-start q-mb-xl">
      <h4>Base de donnée</h4>
      <BButton
        label="Ajouter un module"
        @click="openCreateModuleModal"
      />
    </div>

    <div class="row q-mb-md q-gutter-md">
      <SelectModuleType
        class="col-2"
        v-model="filters.type"
        null-option
      />
      <SelectModuleTags
        class="col-3"
        v-model="filters.tags"
      />
    </div>

    <QTable
      :rows="fileteredModules"
      :columns="columns"
      :loading="loading"
      :pagination="{ rowsPerPage: 25 }"
      row-key="id"
      no-data-label="Aucun module. Ajoutez-en un avec le bouton ci-dessus."
      flat
    >
      <template #body-cell-actions="props">
        <QTd class="row justify-center">
          <QBtn
            flat
            round
            dense
            icon="eva-edit-outline"
            @click="openEditModuleModal(props.row)"
          />
          <QBtn
            flat
            round
            dense
            icon="eva-trash-2-outline"
            @click="startDeleteModule(props.row)"
          />
        </QTd>
      </template>
    </QTable>
  </QPage>
</template>

<script>
import { mapStores } from 'pinia';
import { date, Notify } from 'quasar';
import SelectModuleTags from 'src/components/SelectModuleTags.vue';
import SelectModuleType from 'src/components/SelectModuleType.vue';
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'DatabaseIndex',
  components: {
    SelectModuleTags,
    SelectModuleType
  },
  data() {
    return {
      filters: {
        type: null,
        tags: [],
      },
      loading: false,
      columns: [
        {
          name: 'title',
          label: 'Titre',
          align: 'left',
          field: 'title',
          style: 'width: 25%'
        },
        {
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type',
          style: 'width: 7%',
          format: (val) => DATABASE_MODULES_INFORMATION.find(e => e.name === val)?.label
        },
        {
          name: 'updated_at',
          sortable: true,
          label: 'Dernière modification',
          align: 'center',
          field: 'updated_at',
          format: (val) => date.formatDate(val, 'DD/MM/YYYY')
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapStores(useModulesStore),
    fileteredModules() {
      return this.modulesStore.modules.filter(databaseModule => {
        const matchesType = this.filters.type ? databaseModule.type === this.filters.type : true;
        const matchesTags = this.filters.tags.length ? this.filters.tags.every(tag => databaseModule.tags.find(t => t.id === tag.id)) : true;
        return matchesType && matchesTags;
      });
    }
  },
  mounted() {
    this.fetchModules();
  },
  methods: {
    async fetchModules() {
      this.loading = true;
      await this.modulesStore.getAll();
      this.loading = false;
    },
    openCreateModuleModal() {
      this.$modals.open('EditModuleModal', {
        events: {
          submit: (newModule) => {
            this.modulesStore.create({
              ...newModule,
              title: newModule.content.title,
              tag_ids: newModule.tags.map(tag => tag.id),
            });
            Notify.create({
              message: 'Module créé avec succès',
              color: 'positive',
            });
          }
        }
      });
    },
    openEditModuleModal(databaseModule) {
      this.$modals.open('EditModuleModal', {
        props: {
          databaseModule: databaseModule,
        },
        events: {
          submit: (updatedModule) => {
            this.modulesStore.update({
              ...updatedModule,
              title: updatedModule.content.title,
              tag_ids: updatedModule.tags.map(tag => tag.id),
            });
            Notify.create({
              message: 'Module modifié avec succès',
              color: 'positive',
            });
          }
        }
      });
    },
    startDeleteModule(databaseModule) {
      this.$q.dialog({
        title: 'Supprimer le module',
        message: 'Êtes-vous sûr de vouloir supprimer ce module ?',
        persistent: true,
        cancel: true,
      }).onOk(() => {
        this.modulesStore.delete(databaseModule.id);
        Notify.create({
          message: 'Module supprimé avec succès',
          color: 'positive',
        });
      });
    }
  }
}
</script>