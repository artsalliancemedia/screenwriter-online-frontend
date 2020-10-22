<template>
  <v-snackbar
    :value="true"
    right
    :timeout="-1"
    top
    color="transparent"
    content-class="pa-0 transparent snackbarContent"
    elevation="0"
    class="color"
    light
    app
    transition="slide-x-transition"
  >
    <v-snackbar
      :value="true"
      right
      :timeout="item.timeout || 5000"
      color="transparent"
      content-class="pa-0 transparent"
      elevation="0"
      light
      v-for="(item, i) in snackbars"
      :key="i + Date.now()"
      absolute
      :class="{
        enter: item.enter,
        active: item.active,
        leave: item.leave,
      }"
      @input="() => closeAlert(i)"
    >
      <v-alert
        dense
        width="100%"
        height="100%"
        max-width="500"
        elevation="2"
        :type="item.type"
        colored-border
        border="left"
        dismissible
        close-icon="adi-cancel-s"
        @input="() => closeAlert(i)"
        class="ma-0"
      >
        <span :style="{ wordBreak: 'break-all' }">{{ item.text }}</span>
      </v-alert>
    </v-snackbar>
  </v-snackbar>
</template>
<script>
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Debounce } from 'lodash-decorators';

@Component
export default class SnackbarAlert extends Vue {
  get snackbars() {
    return this.$store.getters['base/snackbars'];
  }

  @Watch('snackbars', { immediate: true, deep: true })
  handler(val, old) {
    if (old && val.length > old.length) {
      val.map((item, i) => {
        if (val.length - 1 > i) {
          item.active = true;
        } else {
          this.active(val.length - 1);
        }
        return true;
      });
    }
  }

  @Debounce(300)
  active(i) {
    this.snackbars[i].active = true;
  }

  closeAlert(index) {
    this.snackbars[index].active = false;
    this.snackbars[index].enter = false;
    this.snackbars[index].leave = true;
    this.removeAlert(index);
  }

  @Debounce(300)
  removeAlert(index) {
    this.snackbars.splice(index, 1);
  }
}
</script>
<style scoped lang="scss">
.snackbarContent {
  .v-snack {
    height: auto !important;
    position: relative !important;
    &.enter {
      animation: slide-x-enter 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    &.leave {
      animation: slide-x-leave 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    &.active {
      animation: none !important;
    }
  }
}

@keyframes slide-x-enter {
  0% {
    opacity: 0;
    transform: translateX(-15px);
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide-x-leave {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-15px);
  }
}
</style>
