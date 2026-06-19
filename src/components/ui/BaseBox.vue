<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
  gradientbg: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="base-box backdrop-blur-xl"
    :class="[
      classes,
      type === 'glass'
        ? 'gradient-border gradient-sky-blue'
        : gradientbg ||
          'rtl:bg-linear-to-l ltr:bg-linear-to-r from-theme-row-start to-theme-row-end',
    ]"
  >
    <slot></slot>
  </div>
</template>
