<template>
  <div class="d-flex align-center justify-center flex-column pa-4">
    <div v-for="(item, index) in menus" :key="index">
      <v-menu offset-x open-on-hover v-if="item.children">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                v-on="{ ...tooltip, ...menu }"
                v-bind="attrs"
                width="48px"
                height="48px"
                class="mb-8"
                depressed
                fab
                :color="expandGroup(item) ? 'primary' : 'white'"
                style="border-radius: 8px;"
              >
                <v-icon color="#717a80">{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>
        </template>
        <v-list v-if="item.children">
          <v-list-item v-for="(t, i) in item.children" :key="i" :to="t.path" color="primary">
            <v-list-item-title>{{ t.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-tooltip top v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            width="48px"
            height="48px"
            class="mb-8"
            depressed
            fab
            :color="item.id === $route.name ? 'primary' : ''"
            style="border-radius: 8px;"
            @click="$router.push(item.path)"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.name }}</span>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ExpandMenu extends Vue {
  get menus() {
    return this.$store.getters['base/menu'];
  }

  created() {
    this.$store.dispatch('base/getMenus');
  }

  expandGroup(row) {
    return row.children.filter(item => item.id === this.$route.name).length > 0;
  }
}
</script>
<style scoped lang="scss"></style>
