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
    class="base-box rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B] to-[#1E293B] backdrop-blur-xl"
    :class="classes"
  >
    <slot></slot>
  </div>
</template>
