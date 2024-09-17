<template>
  <BModal
    :title="title"
    hide-close
  >
    <StepForm
      v-model="form"
    />
    <QCardActions
        align="right"
        class="q-mt-xl q-pr-none"
    >
      <QBtn
        label="Sauvegarder comme module"
        icon-right="eva-save-outline"
        color="purple-8"
        outline
        @click="openCreateModuleModal"
      />
      <BButton
        label="Appliquer"
        @click="submit"
      />
    </QCardActions>
  </BModal>
</template>
<script>
import { mapStores } from 'pinia';
import { Notify } from 'quasar';
import BModal from 'src/components/base/BModal.vue';
import StepForm from 'src/components/forms/StepForm.vue';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'EditStepModal',
  components: { BModal, StepForm },
  props: {
    title: {
      type: String,
      default: `Modifier l'élement`,
    },
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapStores(useModulesStore)
  },
  mounted() {
    this.form = {...this.step};
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditStepModal');
    },
    openCreateModuleModal() {
      this.$modals.open('EditModuleModal', {
        props: {
          databaseModule: {
            content: this.form,
            type: 'itinerary-step',
          },
          saveFromExisting: true,
        },
        events: {
          submit: (newModule) => {
            this.modulesStore.create({
              ...newModule,
              title: newModule.content.title,
              tag_ids: newModule.tags?.map(tag => tag.id),
            });
            Notify.create({
              message: 'Module créé avec succès',
              color: 'positive',
            });
          },
        }
      });
    },
  },
}
</script>
