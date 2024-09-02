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

      </div>
      <p  v-else>Sélectionnez un type de module.</p>
    </div>
  </BModal>
</template>

<script>
import SelectModuleTags from 'src/components/SelectModuleTags.vue';
import SelectModuleType from 'src/components/SelectModuleType.vue';

export default {
  name: 'CreateModuleModal',
  components: { SelectModuleType, SelectModuleTags },
  data() {
    return {
      form: {
        type: null,
      }
    }
  },
  computed: {
    title() {
      return 'Ajouter un module';
    }
  }
}
</script>