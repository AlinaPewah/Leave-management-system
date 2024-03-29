<template>
  <div @click="tryClose"
       data-notify="container"
       class="alert"
       :class="[{'alert-with-icon': icon || showClose}, verticalAlign, horizontalAlign, alertType]"
       role="alert"
       :style="customPosition"
       color="primary"
       data-notify-position="top-center">

  <v-alert  dense
  elevation="3"
  border="bottom"
  :color="color"
      colored-border
      :type="type"
      dismissible>
    <!-- <button
      v-if="showClose"
      type="button"
      aria-hidden="true"
      class="close"
      data-notify="dismiss"
      @click="close">
      <i class="nc-icon nc-simple-remove"></i>
    </button> -->
     <span v-if="icon" data-notify="icon" :class="['alert-icon', icon]"></span>
    <span data-notify="message">
      <div v-if="title" class="title"><b>{{title}}<br/></b></div>
      <div v-if="message" v-html="message"></div>
      <!-- <v-progress-circular indeterminate size="64"></v-progress-circular> -->
      <content-render v-if="!message && component" :component="component"></content-render>
    </span>
    </v-alert>

  </div>
</template>
<script>
export default {
  name: 'notification',
  components: {
    contentRender: {
      props: ['component'],
      render(h) {
        return h(this.component);
      },
    },
  },
  props: {
    message: String,
    title: String,
    icon: String,
    color: String,
    verticalAlign: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        const acceptedValues = ['top', 'bottom'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    horizontalAlign: {
      type: String,
      default: 'center',
      validator: (value) => {
        const acceptedValues = ['left', 'center', 'right'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) => {
        const acceptedValues = [
          'info',
          'primary',
          'error',
          'warning',
          'success',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: (value) => value >= 0,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
    component: {
      type: [Object, Function],
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    clickHandler: Function,
  },
  data() {
    return {
      elmHeight: 0,
    };
  },
  computed: {
    hasIcon() {
      return this.icon && this.icon.length > 0;
    },
    alertType() {
      return `alert-${this.type}`;
    },
    customPosition() {
      const initialMargin = 20;
      const alertHeight = this.elmHeight + 10;
      let sameAlertsCount = this.$notifications.state.filter((alert) => (
        alert.horizontalAlign === this.horizontalAlign
          && alert.verticalAlign === this.verticalAlign
          && alert.timestamp <= this.timestamp
      )).length + 1;
      if (this.$notifications.settings.overlap) {
        sameAlertsCount = 1;
      }
      const pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
      const styles = {};
      if (this.verticalAlign === 'top') {
        styles.top = `${pixels}px`;
      } else {
        styles.bottom = `${pixels}px`;
      }
      return styles;
    },
  },
  methods: {
    close() {
      this.$emit('close', this.timestamp);
    },
    tryClose(evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this);
      }
      if (this.closeOnClick) {
        this.close();
      }
    },
  },
  mounted() {
    this.elmHeight = this.$el.clientHeight;
    if (this.timeout) {
      setTimeout(this.close, this.timeout);
    }
  },
};
</script>
<style lang="scss">
.notifications .alert {
  position: fixed;
  z-index: 10000;
  &[data-notify='container'] {
    width: 480px;
    cursor: pointer;
  }
  &.center {
    left: 0px;
    right: 0px;
    margin: 0 auto;
  }
  &.left {
    left: 20px;
  }
  &.right {
    right: 20px;
  }
}
</style>
