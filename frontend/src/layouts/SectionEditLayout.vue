<template>
  <div class="row justify-between q-mb-lg border-bottom">
    <h6 class="q-mb-sm">{{ title }}</h6>
  </div>

  <div class="row q-mb-lg">
    <slot></slot>
  </div>

</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
