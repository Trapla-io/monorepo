<template>
  <div
    v-if="modelValue"
    class="row"
  >
    <div class="row theme">
      <div
        class="theme-color col"
        v-for="(color, index) in modelValue"
        :key="index"
        :style="{ backgroundColor: color }"
      />
    </div>
    <BButton
      flat
      icon="edit"
      text-color="dark"
      @click="openThemePickerModal"
    />
  </div>
  <div v-else>
    <BButton
      label="Choisir un thème"
      @click="openThemePickerModal"
    />
  </div>
</template>

<script>
const BLANK_COLORS = {
  primary: '#fff',
  secondary: '#fff',
  text_dark: '#fff',
  text_light: '#fff',
};
export default {
  name : 'ThemePicker',
  props: {
    modelValue: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    openThemePickerModal() {
      this.$modals.open('ThemePickerModal', {
        props: {
          theme: this.modelValue || BLANK_COLORS,
        },
        events: {
          submit: newTheme => {
            this.$emit('update:modelValue', newTheme);
          },
        },
      });
    },
  },
}
</script>

<style lang="sass" scoped>
.theme-color
  height: 75px

.theme
  width: 150px
  border: 1px solid black
</style>