<template>
  <BModal
    :title="title"
    hideClose
  >
    <InformationForm
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
import InformationForm from 'src/components/forms/InformationForm.vue';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'EditInformationModal',
  components: { BModal, InformationForm },
  props: {
    title: {
      type: String,
      default: `Modifier l'élement`,
    },
    information: {
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
    this.form = {...this.information};
  },
  methods: {
    setImageInUploader() {
      if (!this.form.image) return;

      this.$refs.modalUploader.addFiles([this.form.image]);
    },
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditInformationModal');
    },
    openCreateModuleModal() {
      this.$modals.open('EditModuleModal', {
        props: {
          databaseModule: {
            content: this.form,
            type: 'information',
          },
          saveFromExisting: true,
        },
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
          },
        }
      });
    },
  },
}
</script>
