<template>
  <v-list class="menus pt-8" flat>
    <div v-for="(item, index) in menus" :key="index">
      <v-list-group
        v-if="item.children"
        class="ma-4 side-group"
        active-class="side-active"
        :value="expandGroup(item)"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-4">{{ item.icon }}</v-icon>
              <strong class="text-capitalize">{{ item.name }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(t, i) in item.children" :key="i" :to="t.path">
          <v-list-item-title>
            <span class="text-capitalize">{{ t.name }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-item v-else :to="item.path" class="ma-4 rounded side-one" active-class="side-active">
        <v-list-item-title>
          <v-icon class="mr-4">{{ item.icon }}</v-icon>
          <strong class="text-capitalize">{{ item.name }}</strong>
        </v-list-item-title>
      </v-list-item>
    </div>
    <!--    <v-list-item-->
    <!--      v-for="(item, index) in menus"-->
    <!--      :key="index"-->
    <!--      :to="item.path"-->
    <!--      class="ma-4 rounded side-one"-->
    <!--      active-class="side-active"-->
    <!--    >-->
    <!--      <v-list-group v-if="item.children">-->
    <!--        <template v-slot:activator>-->
    <!--          <v-list-item-content>-->
    <!--            <v-list-item-title>{{ item.name }}</v-list-item-title>-->
    <!--          </v-list-item-content>-->
    <!--        </template>-->
    <!--        <v-list-item v-for="(t, i) in item.children" :key="i">-->
    <!--          <v-list-item-title>-->
    <!--            <v-icon class="mr-4">{{ t.icon }}</v-icon>-->
    <!--            <strong class="text-capitalize">{{ t.name }}</strong>-->
    <!--          </v-list-item-title>-->
    <!--        </v-list-item>-->
    <!--      </v-list-group>-->
    <!--      <v-list-item-title else>-->
    <!--        <v-icon class="mr-4">{{ item.icon }}</v-icon>-->
    <!--        <strong class="text-capitalize">{{ item.name }}</strong>-->
    <!--      </v-list-item-title>-->
    <!--    </v-list-item>-->
  </v-list>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Menus extends Vue {
  get menus() {
    return this.$store.getters['base/menu'];
  }

  created() {
    this.$store.dispatch('base/getMenus');
  }

  expandGroup(row) {
    return row.children.filter(item => item.id.match(this.$route.name)).length > 0;
  }
}
</script>
<style scoped lang="scss">
.menus {
  .side-one {
    position: relative;
    border-left: 4px solid transparent;
    left: -4px;
    /*transition: 0.2s ease;*/
  }
  .side-active,
  .side-one:hover {
    /*position: relative;*/
    color: $primary;
    box-shadow: $elevation-2;
    border-color: $primary;
    /*border-left: 4px solid $primary;*/
    /*left: -4px;*/
  }
  .side-group {
    ::v-deep .v-list-group__header {
      position: relative;
      border-left: 4px solid transparent;
      left: -4px;
      &.side-active {
        border-radius: 4px;
        color: $primary;
        box-shadow: $elevation-2;
        border-color: $primary;
      }
    }
    ::v-deep {
      .v-list-group__items {
        background-color: #f7f9f9;
        .v-list-item {
          :before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 4px;
            background-color: $grey-4;
          }
          &.v-list-item--active {
            .v-list-item__title {
              font-weight: bold;
            }
          }
          &.v-list-item--active,
          &:hover {
            .v-list-item__title {
              color: $primary;
            }
            :before {
              background-color: $primary;
            }
          }
        }
      }
    }
  }
}
</style>
