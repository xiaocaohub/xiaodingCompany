<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <i class="move-icon" :class="[font === true ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      font: true
    }
  },

  methods: {
    toggleClick() {
      this.$emit('toggleClick')
      this.font = !this.font
    }
  }
}
</script>

<style scoped>
.move-icon {
  font-size: 23px;
  color: #fff;
}

.hamburger.is-active {
  transform: rotate(180deg);
}

i {
  opacity: 0.8;
}
</style>
