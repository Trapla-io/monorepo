<template>
  <QPage>
    <div class="row justify-between items-start">
      <h4 class="q-mb-xl">Base de donnée</h4>
      <BButton
        label="Ajouter un module"
        @click="openCreateModuleModal"
      />
    </div>

    <QTable
      :rows="fileteredModules"
      :columns="columns"
      :loading="loading"
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
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'DatabaseIndex',
  data() {
    return {
      loading: false,
      query: '',
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
          style: 'width: 7%'
        },
        {
          name: 'updated_at',
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
      return this.modulesStore.modules;
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
      console.log(databaseModule);
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