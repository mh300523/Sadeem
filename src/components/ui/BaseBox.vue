<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="base-box rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl"
    :class="classes"
  >
    <slot></slot>
  </div>
</template>
