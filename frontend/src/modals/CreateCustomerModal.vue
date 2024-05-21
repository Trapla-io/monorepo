<template>
  <BModal
    :title="title"
    hide-close
  >
    <div>
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Prénom</p>
      <BInput
        v-model="form.first_name"
        :rules="[val => !!val || 'Ce champ est requis']"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Nom</p>
      <BInput
        v-model="form.last_name"
        :rules="[val => !!val || 'Ce champ est requis']"
      />
      <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Email</p>
      <BInput
        v-model="form.email"
        email
        :rules="[
          val => !!val || 'Ce champ est requis',
          'email' || 'Veuillez entrer une adresse email valide',
        ]"
      />
    </div>
    <QCardActions
      align="right"
      class="q-mt-xl q-pr-none"
    >
    <BButton
      :label="actionLabel"
      @click="submit"
      :loading="loading"
      :disabled="!canSubmit"
    />
    </QCardActions>
  </BModal>
</template>

<script>
import BModal from 'src/components/base/BModal.vue';
export default {
  name: 'CreateCustomerModal',
  components: { BModal },
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
    action: {
      type: String,
      default: 'create',
    },
  },
  data() {
    return {
      loading: false,
      form: {
        last_name: '',
        first_name: '',
        email: '',
      },
    }
  },
  computed: {
    actionLabel() {
      return this.action === 'create' ? 'Créer' : 'Modifier';
    },
    title() {
      return `${this.actionLabel} un client`;
    },
    canSubmit() {
      return Boolean(this.form.last_name && this.form.first_name && this.form.email);
    },
  },
  mounted() {
    this.form = { ...this.customer };
  },
  methods: {
    async submit() {
      this.loading = true;
      const method = this.action === 'create' ? 'post' : 'patch';

      try {
        await this.$api[method](`/customers/${this.action == 'create' ? '' : this.customer.id}`, this.form);
        this.$emit('submitted');
        this.$modals.close('CreateCustomerModal');
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Une erreur est survenue. Veuillez réessayer.',
        });
      }

      this.loading = false;
    },
  },
};
</script>