<template>
  <QBtn
    v-if="!localValue"
    :label="computedLabel"
    color="grey-6"
    outline
    icon-right="eva-image-2"
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
        icon="eva-trash-2-outline"
        flat
        @click.stop="deleteImage"
      />
      <QBtn
        icon="eva-edit-outline"
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
      hover: false,
    };
  },
  computed: {
    computedLabel() {
      return this.multiple ? 'Ajouter des images' : 'Ajouter une image';
    },
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    deleteImage() {
      this.localValue = undefined;
    },
    openImagePickerModal() {
      this.$modals.open('ImagePickerModal', {
        props: {
          title: this.computedLabel,
        },
        events: {
          picked: (image) => {
            this.localValue = image;
          },
        }
      })
    },
  },
}
</script>
