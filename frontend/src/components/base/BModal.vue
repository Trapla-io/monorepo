<template>
  <QDialog
    v-model="show"
    :square="$q.screen.lt.sm"
    :persistent="persistent"
    @hide="closeOnHide"
  >
    <QCard
      :class="`q-pa-${padding} relative-position modal ${size}`"
    >
      <QBtn
        v-if="!hideCloseIcon"
        v-close-popup
        icon="close"
        class="absolute-top-right q-ma-md z-top"
        flat
        round
        dense
        @click="close"
      />

      <QCardSection v-if="title">
        <h4 class="q-my-none">
          {{ title }}
        </h4>
      </QCardSection>

      <QCardSection>
        <slot />
      </QCardSection>

      <QCardActions
        v-if="!hideClose"
        align="right"
      >
        <QBtn
          label="Fermer"
          class="text-weight-regular"
          flat
          @click="close"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script>
import { QBtn, QCard, QCardActions, QCardSection, QDialog } from 'quasar';
import { mapStores } from 'pinia';
import { useModalsStore } from 'src/stores/modals.store';

export default {
    name: 'BModal',
    data() {
      return {
        modalName: '',
        // this is managed at the store level
        show: true,
      };
    },
    props: {
        title: {
            type: String,
            default: undefined,
        },
        size: {
            type: String,
            default: null,
        },
        hideClose: {
            type: Boolean,
            default: false,
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        hideCloseIcon: {
            type: Boolean,
            default: false,
        },
        padding: {
            type: String,
            default: 'md',
        },
    },
    emits: ['hide', 'close'],
    computed: {
      ...mapStores(useModalsStore),
    },
    mounted() {
      if (this.$parent && this.$parent.$options.name && this.$parent.$options.name !== 'ModalsContainer') {
        this.modalName = this.$parent.$options.name;
      } else {
        /* eslint-disable-next-line */
        this.modalName = this.$options.name || this.$options._componentTag;
      }
    },
    methods: {
      closeOnHide() {
          this.close();
          this.$emit('hide', this.$event);
      },
      close() {
        this.$emit('close');
        this.modalsStore.closeModal(this.modalName);
      },
    },
    components: { QDialog, QCard, QBtn, QCardSection, QCardActions }
};
</script>