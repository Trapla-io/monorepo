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
import SelectModuleTags from 'src/components/SelectModuleTags.vue';
import SelectModuleType from 'src/components/SelectModuleType.vue';
import { DATABASE_MODULES_INFORMATION } from 'src/helpers/databaseModules';

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
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditModuleModal');
    },
  },
}
</script>