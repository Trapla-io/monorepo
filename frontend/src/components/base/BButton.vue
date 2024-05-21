<template>
  <QBtn
    :label="label"
    :color="buttonColor"
    :text-color="textColor"
    unelevated
  />
</template>
<script>
import { QBtn } from 'quasar';


export default {
    components: { QBtn },
    props: {
      type: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'flat', 'confirm'].includes(value),
      },
      label: {
        type: String,
        default: null,
      },
    },
    computed: {
      buttonColor() {
        if (this.type === 'confirm') {
          return 'grey-4';
        }
        return this.type === 'primary' ? 'primary' : 'white';
      },
      textColor() {
        return this.type === 'primary' ? 'white' : 'primary';
      },
    },
}
</script>
