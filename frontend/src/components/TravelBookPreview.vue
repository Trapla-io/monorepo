<template>
  <div class="main-container">
    <div class="row">
      <div class="col-6">
        <h4>{{ travelBook.title }}</h4>
        <div class="bg-green-3 row justify-around">
          <div>
            <QIcon
              name="place"
              size="2em"
              color="dark"
            />
            {{ travelBook.destination }}
          </div>
          <div>
            <QIcon
              name="date_range"
              size="2em"
              color="dark"
            />
            {{ travelBook.start_date }} - {{ travelBook.end_date }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <QImg
          v-if="cover.cover_images[0]"
          :src="cover.cover_images[0]"
          :ratio="12/10"
          width="50%"
          class="q-ma-md bordered-image-white shadow-3"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { QIcon, QImg } from 'quasar';

export default {
    name: 'TravelBookPreview',
    props: {
        travelBook: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        cover() {
            const cover = this.travelBook.sections.find(section => section.tag === 'cover');

            return cover
        },
    },
    components: { QIcon, QImg }
}
</script>


<style lang="scss">
.bordered-image-white {
  border: 15px solid #fff;
  border-radius: 10px;
}

.bordered-image-black {
  border: 15px solid #000;
  border-radius: 10px;
}

.main-container {
  background-color: #F1E8DA;
}
</style>
