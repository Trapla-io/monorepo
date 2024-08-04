<template>
  <QLayout
    view="hHh lpR fFf"
    class="bg-grey-1"
  >

    <QDrawer
      :width="200"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <QImg
        class="q-ml-md q-mt-sm"
        src="~assets/logo-long.png"
        width="50%"
      />

      <QList class="q-mt-xl">
        <QItem
          :to="{ name: 'TravelBooksIndex' }"
          exact
          clickable
          active-class="active"
        >
          <QItemSection avatar class="col-3">
            <QIcon
              color="grey-6"
              name="eva-map-outline"
            />
          </QItemSection>
          <QItemSection class="text-weight-medium col-9 ">
            <QItemLabel class="text-grey-6">Carnets</QItemLabel>
          </QItemSection>
        </QItem>

        <QItem
          :to="{ name: 'CustomersIndex' }"
          exact
          clickable
          active-class="active"
        >
          <QItemSection avatar class="col-3">
            <QIcon
              color="grey-6"
              name="eva-people-outline"
            />
          </QItemSection>
          <QItemSection class="text-weight-medium col-9 ">
            <QItemLabel class="text-grey-6">Clients</QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <QPageContainer class="q-pt-xl base-layout-page-container">
      <RouterView :key="$route.path"/>
    </QPageContainer>

  </QLayout>
</template>

<script>
import { QDrawer, QItemSection, QLayout, QPageContainer } from 'quasar'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  components: { QDrawer, QLayout, QPageContainer }
}
</script>

<style lang="scss" scoped>
.base-layout-page-container {
  width: 90%;
  margin: auto;
}
a:hover {
  text-decoration: none;
}
.active {
  background-color: #F7F5FA;

  .q-item__label, i {
    color: #240046 !important;
  }
}
</style>
