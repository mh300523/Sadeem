<template>
  <button
    :class="classes"
    class="flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm cursor-pointer hover:opacity-95 transition-opacity"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
  },
});
</script>
