<template>
  <BModal
    :title="title"
    hide-close
  >
    <div>
      <h6 class="q-mb-sm">Général</h6>
      <div class="row justify-between">
        <SelectModuleType
          class="col-5"
          v-model="form.type"
        />
        <SelectModuleTags
          class="col-6"
          v-model="form.tags"
        />
      </div>
    </div>

    <div class="q-mt-lg">
      <h6 class="q-mb-sm">Contenu</h6>

      <div v-if="form.type">
        <component
          :is="componentFromType"
          v-model="form.content"
        />
      </div>
      <p  v-else>Sélectionnez un type de module.</p>

      <QCardActions
        align="right"
        class="q-mt-xl q-pr-none"
      >
        <QBtn
          v-if="this.isEdit && !this.saveFromExisting"
          label="Synchroniser"
          icon-right="eva-sync-outline"
          color="purple-8"
          outline
          @click="openSyncModuleDialog"
        />
        <BButton
          :label="buttonLabel"
          @click="submit"
          :disabled="disabled"
        />
      </QCardActions>
    </div>
  </BModal>
</template>

<script>
import { mapStores } from 'pinia';
import { Notify } from 'quasar';
import SelectModuleTags from 'src/components/SelectModuleTags.vue';
import SelectModuleType from 'src/components/SelectModuleType.vue';
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';
import { useTravelBooksStore } from 'src/stores/travel-books.store';

export default {
  name: 'EditModuleModal',
  components: { SelectModuleType, SelectModuleTags },
  props: {
    databaseModule: {
      type: Object,
      default: null,
    },
    saveFromExisting: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      form: {
        type: null,
        content: {},
        tags: [],
      },
    }
  },
  computed: {
    ...mapStores(useTravelBooksStore),
    isEdit() {
      return this.databaseModule;
    },
    title() {
      return (this.isEdit && !this.saveFromExisting) ? 'Modifier le module' : 'Créer un module';
    },
    buttonLabel() {
      return (this.isEdit && !this.saveFromExisting) ? 'Modifier' : 'Créer';
    },
    componentFromType() {
      return DATABASE_MODULES_INFORMATION.find(databaseModule => databaseModule.name === this.form.type)?.formComponent;
    },
    disabled() {
      return !this.form.type;
    },
  },
  mounted() {
    if (this.isEdit) {
      this.form = { ...this.databaseModule };
      this.form.module_id = null;
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditModuleModal');
    },
    openSyncModuleDialog() {
      this.$q.dialog({
        title: 'Synchroniser le module',
        message: 'Vous êtes sur le point de mettre à jour ce module dans TOUS vos carnets. Êtes-vous sûr de vouloir continuer ?',
        persistent: true,
        cancel: true,
      }).onOk(async () => {
        await this.$api.post('database-modules/sync', {
          id: this.databaseModule.id,
          content: this.form.content,
        })
        await this.travelBooksStore.getAll();
        Notify.create({
          message: 'Module synchronisé avec succès.',
          color: 'positive',
        });
      });
    },
  },
}
</script>