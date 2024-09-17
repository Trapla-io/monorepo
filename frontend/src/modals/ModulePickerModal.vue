<template>
  <BModal
    title="Sélectionner un module"
    hide-close
    size="fit-screen"
  >
    <div
      v-if="!databaseModules || !databaseModules.length"
      class="q-pa-xl text-center"
    >
      <h6>Aucun module <i>{{ moduleLabelFromType }}</i> disponible</h6>
      <p>
        Rendez vous sur la page <strong>Base de donnée</strong> afin de créer un module <i>{{ moduleLabelFromType }}</i>.
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
      <div class="row justify-between q-mt-md ">
        <QList
          class="col-6"
          bordered
          separator
          style="max-height: 400px;"
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
          style="max-height: 400px; overflow: scroll; box-shadow: inset 0 -12px 8px -8px grey;"
        >
          <component
            ref="modulePreview"
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
import SelectModuleType from 'src/components/SelectModuleType.vue';
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'ModulePickerModal',
  components: { BModal, SelectModuleTags, SelectModuleType },
  emits: ['submit'],
  props: {
    type: {
      type: String,
      required: true,
    },
  },
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
    moduleLabelFromType() {
      return DATABASE_MODULES_INFORMATION.find(databaseModule => databaseModule.name === this.type)?.label;
    },
  },
  async mounted() {
    const modules = await this.modulesStore.getOrLoad;
    this.databaseModules = modules.filter(m => m.type === this.type);
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