<template>
  <QBtn
    v-if="!localValue"
    :label="computedLabel"
    color="grey-6"
    outline
    icon-right="image"
    @click="openImagePickerModal"
  />
  <QImg
    v-else
    :src="localValue.src"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :ratio="16/9"
  >
    <div
      v-if="hover"
      class="absolute-full text-subtitle2 flex flex-center cursor-pointer"
      @click="openImagePickerModal"
    >
      <QBtn
        class="absolute-top-right"
        icon="delete"
        flat
        @click.stop="deleteImage"
      />
      <QBtn
        icon="edit"
        flat
        label="Modifier"
        @click="openImagePickerModal"
      />
    </div>
  </QImg>
</template>
<script>
export default {
  name: 'BImagePicker',
  props: {
    modelValue: {
      type: Object,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
      hover: false,
    };
  },
  computed: {
    computedLabel() {
      return this.multiple ? 'Ajouter des images' : 'Ajouter une image';
    },
  },
  methods: {
    deleteImage() {
      this.localValue = undefined;
      this.$emit('update:modelValue', undefined);
    },
    openImagePickerModal() {
      this.$modals.open('ImagePickerModal', {
        props: {
          title: this.computedLabel,
        },
        events: {
          picked: (image) => {
            this.localValue = image;
            this.$emit('update:modelValue', image);
          },
        }
      })
    },
  },
}
</script>
