<template>
  <QInput
    v-model="date"
    mask="##/##/####"
    :label="label"
    outlined
    dense
  >
    <template v-slot:append>
      <QIcon class="cursor-pointer" name="eva-calendar-outline">
        <QPopupProxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          cover
        >
          <QDate
            v-model="date"
            color="primary"
            mask="DD/MM/YYYY"
            minimal
            @update:model-value="onDateInput"
          >
            <div class="row items-center justify-end">
              <QBtn
                flat
                v-close-popup
                round
                dense
                color="primary"
                label="Fermer"
              />
            </div>
          </QDate>
        </QPopupProxy>
      </QIcon>
    </template>
  </QInput>
</template>
<script>
import { QBtn, QDate, QIcon, QInput, QPopupProxy, date } from 'quasar';

export default {
  name: 'BDatePicker',
  props: {
    modelValue: {
      type: [String, Date],
      default: undefined,
    },
    label: {
      type: String,
      default: 'Date',
    },
  },
  computed: {
    date: {
      get() {
        if (!this.modelValue) return undefined;
        return date.formatDate(new Date(this.modelValue), 'DD/MM/YYYY');
      },
      set(value) {
        const [day, month, year] = value.split('/').map(Number);

        this.$emit('update:modelValue', new Date(year, month - 1, day));
      },
    },
  },
  methods: {
    onDateInput() {
      this.$refs.qDateProxy.hide();
    },
  },
  components: { QInput, QIcon, QDate, QBtn, QPopupProxy }
}
</script>
