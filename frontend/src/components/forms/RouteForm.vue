<template>
  <div>
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Titre</p>
    <BInput
      v-model="form.title"
    />
    <div class="row items-center q-mt-md">
      <div class="col">
        <p class="text-subtitle1 q-ma-none text-grey-6">Compagnie</p>
        <BInput
          v-model="form.company"
        />
      </div>
      <div class="col-4 q-ml-md">
        <p class="text-subtitle1 q-ma-none text-grey-6">Prix</p>
        <BInput
          type="number"
          placeholder="000"
          v-model="form.price"
        />
      </div>
    </div>
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Description</p>
    <BInput
      type="textarea"
      v-model="form.description"
    />
    <div class="q-mt-md">
      <h6>Départ</h6>
      <div class="row items-center">
        <div class="col">
          <p class="text-subtitle1 q-ma-none text-grey-6">Lieu</p>
          <BInput
            v-model="form.departure_location"
          />
        </div>
        <div class="col-3 q-ml-md">
          <p class="text-subtitle1 q-ma-none text-grey-6">Date</p>
          <BDatePicker
            v-model="form.departure_date"
          />
        </div>
        <div class="q-ml-md col-2">
          <p class="text-subtitle1 q-ma-none text-grey-6">Heure</p>
          <BInput
            mask="##h##"
            v-model="form.departure_hour"
            placeholder="00h00"
          />
        </div>
      </div>
    </div>
    <div class="q-mt-md">
      <h6>Arrivée</h6>
      <div class="row items-center">
        <div class="col">
          <p class="text-subtitle1 q-ma-none text-grey-6">Lieu</p>
          <BInput
            v-model="form.arrival_location"
          />
        </div>
        <div class="col-3 q-ml-md">
          <p class="text-subtitle1 q-ma-none text-grey-6">Date</p>
          <BDatePicker
            v-model="form.arrival_date"
          />
        </div>
        <div class="q-ml-md col-2">
          <p class="text-subtitle1 q-ma-none text-grey-6">Heure</p>
          <BInput
            mask="##h##"
            v-model="form.arrival_hour"
            placeholder="00h00"
          />
        </div>
      </div>
    </div>
    <p class="text-subtitle1 q-ma-none text-grey-6 q-mt-md">Lien</p>
    <BInput
      placeholder="https://"
      v-model="form.link"
    />
  </div>
</template>

<script>
export default {
  name: 'RouteForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}
</script>
