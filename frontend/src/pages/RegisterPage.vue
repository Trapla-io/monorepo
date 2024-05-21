<template>
  <QLayout class="bg-grey-1">
    <QPageContainer>
      <QPage class="row full-width justify-center items-center">
        <div class="column col-4 bg-white rounded-borders q-pa-xl">
          <QImg
            class="self-center rounded-borders"
            width="30%"
            src="~assets/logo.svg"
          />
          <h5 class="text-bold text-center q-my-md">Créer un compte</h5>

          <p class="text-subtitle1 q-ma-none text-grey-6">Email</p>
          <BInput
            class="q-mb-sm"
            v-model="email"
            type="email"
            placeholder="email@exemple.com"
            @keyup.enter="register"
          />
          <p class="text-subtitle1 q-ma-none text-grey-6">Mot de passe</p>
          <BInput
            class="q-mb-lg"
            v-model="password"
            type="password"
            placeholder="*******"
            @keyup.enter="register"
          />
          <BButton
            label="Créer un compte"
            @click="register"
            :disabled="!canSubmit"
            :loading="loading"
          />
            <p
              v-if="error"
              class="text-caption text-center text-red-6"
            >
              Email invalide.
            </p>
            <p class="text-center q-pt-md">
               Déjà un compte ?
              <RouterLink :to="{ name: 'Login' }">Se connecter</RouterLink>.
            </p>
        </div>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
<script>
import { QLayout, QPageContainer } from 'quasar'
import { useAppStore } from 'src/stores/app.store';
import { mapStores } from 'pinia';
import { RouterLink } from 'vue-router';

export default {
  name: 'LoginPage',
  components: { QLayout, QPageContainer },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: false,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    canSubmit() {
      return this.email.length > 0 && this.password.length > 0;
    },
  },
  methods: {
    async register() {
      if (!this.canSubmit) return;

      this.loading = true;
      try {
        const response = await this.$api.post('/auth/register', {
          email: this.email,
          password: this.password,
        });
        this.appStore.login(response.data.access_token);
        this.$router.push({ name: 'Home' });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = true;
      }
    },
  },
}
</script>
