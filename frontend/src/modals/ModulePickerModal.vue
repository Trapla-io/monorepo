<template>
  <BModal
    title="Sélectionner un module"
    hide-close
    size="fit-screen"
  >
    <div
      v-if="!databaseModules"
      class="q-pa-xl text-center"
    >
      <h6>Aucun module disponible</h6>
      <p>
        Pour pouvoir utiliser cette fonctionnalité il vous faut créer des modules. <br>
        Rendez vous sur la page <strong>Base de donnée</strong> afin de créer un module.
      </p>
      <BButton
        :to="{ name: 'DatabaseIndex' }"
        label="Se rendre sur la page base de donnée"
      />
    </div>

    <template v-else>
      <div class="row items-center justify-between">
        <SelectModuleTags
          class="col-4"
          v-model="filters.tags"
        />
        <BButton
          label="Sélectionner"
          @click="submit"
          :disabled="!selectedModule"
        />
      </div>
      <div class="row justify-between">
        <QList
          class="q-mt-md col-6"
          bordered
          separator
        >
          <QItem
            v-for="databaseModule in databaseModules"
            :key="databaseModule.id"
            :class="{ 'bg-secondary-1': selectedModule?.id === databaseModule.id }"
            clickable
            @click="selectedModule = databaseModule"
          >
            <QItemSection>
              <QItemLabel>
                {{ databaseModule.title }}
              </QItemLabel>
              <div class="row">
                <QChip
                  v-for="tag in databaseModule.tags"
                  :key="tag.id"
                  :label="tag.name"
                  dense
                  size="sm"
                />
              </div>
            </QItemSection>
          </QItem>
        </QList>

        <div
          v-if="selectedModule"
          class="col-5"
        >
          <component
            class="module-preview"
            :is="componentFromType"
            v-model="selectedModule.content"
          />
        </div>
      </div>
    </template>
  </BModal>
</template>

<script>
import { mapStores } from 'pinia';
import BModal from 'src/components/base/BModal.vue';
import SelectModuleTags from 'src/components/SelectModuleTags.vue';
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'ModulePickerModal',
  components: { BModal, SelectModuleTags },
  emits: ['submit'],
  data() {
    return {
      databaseModules: null,
      selectedModule: null,
      filters: {
        tags: null,
      }
    };
  },
  computed: {
    ...mapStores(useModulesStore),
    componentFromType() {
      return DATABASE_MODULES_INFORMATION.find(databaseModule => databaseModule.name === this.selectedModule.type)?.formComponent;
    },
  },
  async mounted() {
    this.databaseModules = await this.modulesStore.getOrLoad;
  },
  methods: {
    submit() {
      this.$emit('submit', this.selectedModule);
      this.$modals.close('ModulePickerModal');
    },
  },
}
</script>

<style lang="scss" scoped>
.module-preview {
  transform: scale(0.8);
  transform-origin: 0 0;
}
</style>