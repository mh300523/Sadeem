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
          'rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30',
    ]"
  >
    <slot></slot>
  </div>
</template>
