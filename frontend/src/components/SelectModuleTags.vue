<template>
  <QSelect
    ref="select"
    v-model="selectedTags"
    :options="options"
    label="Tags"
    option-value="id"
    option-label="name"
    multiple
    use-input
    use-chips
    outlined
    dense
    input-debounce="0"
    bg-color="white"
    rounded
    @new-value="createValue"
    @input-value="input = $event"
  >
    <template #option="props">
      <QItem
        v-bind="props.itemProps"
        class="option-item"
        clickable
      >
        <QItemSection>
          <div>
            <QChip
              :label="props.opt.name"
              dense
            />
          </div>
        </QItemSection>
        <QItemSection side>
          <QBtn
            @click.stop
            class="option-icon"
            icon="eva-more-horizontal-outline"
            size="sm"
            flat
            :ripple="false"
          >
            <QMenu
              anchor="top right"
              self="top left"
            >
              <QItem>
                <QItemSection>
                  <QInput
                    :model-value="props.opt.name"
                    @update:model-value="updateTagName($event, props.opt)"
                    dense
                    outlined
                    debounce="500"
                    bg-color="white"
                  />
                </QItemSection>
              </QItem>
              <QList>
                <QItem
                  clickable
                  v-close-popup
                  @click="deleteTag(props.opt)"
                >
                  <QItemSection side>
                    <QIcon
                      name="eva-trash-2-outline"
                      size="xs"
                      color="dark"
                    />
                  </QItemSection>
                  <QItemSection>
                    Supprimer
                  </QItemSection>
                </QItem>
              </QList>
            </QMenu>
          </QBtn>
        </QItemSection>
      </QItem>
    </template>

    <template
      v-if="displayAddTagOption"
      #after-options
    >
      <QItem
        clickable
        @click="addNewTag"
      >
        <QItemSection v-if="displayAddTagOption">
          <div class="row justify-start items-center">
            <p class="q-ma-none">Créer</p>
            <QChip
              :label="input"
              dense
            />
          </div>
        </QItemSection>
        <QItemSection v-else>
          Écrire pour créer un tag
        </QItemSection>
        <QItemSection side>
          <QIcon
            name="eva-plus-outline"
            size="xs"
          />
        </QItemSection>
      </QItem>
    </template>

    <template #no-option>
      <QItem
        clickable
        @click="addNewTag"
      >
        <QItemSection v-if="displayAddTagOption">
          <div class="row justify-start items-center">
            <p class="q-ma-none">Créer</p>
            <QChip
              :label="input"
              dense
            />
          </div>
        </QItemSection>
        <QItemSection v-else>
          Écrire pour créer un tag
        </QItemSection>
        <QItemSection side>
          <QIcon
            name="eva-plus-outline"
            size="xs"
          />
        </QItemSection>
      </QItem>
    </template>
  </QSelect>
</template>

<script>
import { mapStores } from 'pinia';
import { Notify } from 'quasar';
import { useTagsStore } from 'src/stores/tags.store';

export default {
  name: 'SelectModuleTags',
  props: {
    modelValue: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      input: '',
    }
  },
  computed: {
    ...mapStores(useTagsStore),
    tags() {
      return this.tagsStore.tags;
    },
    options() {
      if (this.input === '') {
        return this.tags;
      } else {
        return this.tags.filter(tag => tag.name.includes(this.input));
      }
    },
    displayAddTagOption() {
      return !!(this.input && !this.tags.find(tag => tag.name === this.input));
    },
    selectedTags: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    async createValue(value, done) {
      if (this.tags.find(tag => tag.name === value)) {
        done(false);
      } else {
        const tag = await this.tagsStore.create(value);
        done(tag, 'add');
      }
    },
   async addNewTag() {
      if (this.input === '') return;
      const tag = await this.tagsStore.create(this.input);

      this.$refs.select.add(tag)
      this.$refs.select.updateInputValue('')
    },
    updateTagName(newName, tag) {
      if (newName === tag.name || newName === '') return;
      this.tagsStore.update(tag.id, { name: newName });
      Notify.create({
        message: 'Tag mis à jour',
        color: 'positive',
      });
    },
    deleteTag(tag) {
      this.tagsStore.delete(tag.id);
      Notify.create({
        message: 'Tag supprimé',
        color: 'positive',
      });
    }
  }
}
</script>

<style scoped lang="sass">
.option-item .option-icon
  visibility: hidden

.option-item:hover .option-icon
  visibility: visible
</style>