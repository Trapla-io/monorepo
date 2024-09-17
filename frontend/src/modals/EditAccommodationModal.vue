<template>
  <BModal
    :title="title"
    hide-close
  >
    <AccommodationForm
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
import AccommodationForm from 'src/components/forms/AccommodationForm.vue';
import { useModulesStore } from 'src/stores/modules.store';

export default {
  name: 'EditAccommodationModal',
  components: { BModal, AccommodationForm },
  props: {
    title: {
      type: String,
      default: `Modifier l'hébergement`,
    },
    accommodation: {
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
    this.form = {...this.accommodation};
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('EditAccommodationModal');
    },
    openCreateModuleModal() {
      this.$modals.open('EditModuleModal', {
        props: {
          databaseModule: {
            content: this.form,
            type: 'accommodation',
          },
          saveFromExisting: true,
        },
        events: {
          submit: async (newModule) => {
            const createdModule = await this.modulesStore.create({
              ...newModule,
              title: newModule.content.title,
              tag_ids: newModule.tags?.map(tag => tag.id),
            });
            Notify.create({
              message: 'Module créé avec succès',
              color: 'positive',
            });
            this.form.module_id = createdModule.id;
            this.$emit('submit', this.form);
          },
        }
      });
    },
  },
}
</script>
