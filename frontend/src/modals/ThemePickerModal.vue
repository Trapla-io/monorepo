<template>
  <BModal
    title="Choisir un thème"
    hide-close
  >
    <div>
      <template
        v-for="(color, key) in form"
        :key="key"
      >
        <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">{{ COLOR_KEY_TO_LABEL[key] }}</p>
        <div
          class="color cursor-pointer"
          :style="{ backgroundColor: color }"
        >
          <QPopupProxy
            cover
            transition-show="scale"
            transition-hide="scale"
            >
            <QColor
              v-model="form[key]"
            />
          </QPopupProxy>
        </div>

      </template>
    </div>
    <QCardActions
        align="right"
        class="q-mt-xl q-pr-none"
    >
      <BButton
        label="Appliquer"
        @click="submit"
      />
    </QCardActions>
  </BModal>  
</template>

<script>
import BModal from 'src/components/base/BModal.vue';
import { QColor, QPopupProxy } from 'quasar';

export default {
  name: 'ThemePickerModal',
  components: { BModal, QColor },
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {...this.theme},
      COLOR_KEY_TO_LABEL: {
        primary: 'Couleur principale',
        secondary: 'Couleur secondaire',
        text_dark: 'Texte sombre',
        text_light: 'Texte claire',
      }
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.form);
      this.$modals.close('ThemePickerModal');
    },
  },
}
</script>

<style lang="sass" scoped>
.color
  width: 50px
  height: 50px
  border-radius: 10px
  border: 1px solid black
</style>