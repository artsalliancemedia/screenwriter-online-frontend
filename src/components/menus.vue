<template>
  <v-list class="menus pt-8" flat>
    <v-list-item
      v-for="(item, i) in menus"
      :key="i"
      :to="item.path"
      class="ma-4 rounded side-one"
      active-class="side-active"
    >
      <v-list-item-title>
        <v-icon class="mr-4">{{ item.icon }}</v-icon>
        <strong class="text-capitalize">{{ item.name }}</strong>
      </v-list-item-title>
    </v-list-item>
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
}
</script>
<style scoped lang="scss">
.menus {
  .side-one {
    border-left: 4px solid transparent;
    left: -4px;
    transition: 0.2s ease;
  }
  .side-active,
  .side-one:hover {
    position: relative;
    color: $primary;
    box-shadow: $elevation-2;
    border-left: 4px solid $primary;
    left: -4px;
  }
}
</style>
