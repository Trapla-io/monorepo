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

    </QTable>
  </QPage>
</template>

<script>
import { mapStores } from 'pinia';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'DatabaseIndex',
  data() {
    return {
      loading: false,
      query: '',
      columns: [
        { name: 'title', label: 'Titre', align: 'left', field: 'title' },
        { name: 'type', label: 'Type', align: 'left', field: 'type' },
        { name: 'updated_at', label: 'Dernière modification', align: 'center', field: 'updated_at' },
        { name: 'actions', label: 'Actions', align: 'center' }
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
      this.$modals.open('CreateModuleModal');
    }
  }
}
</script>