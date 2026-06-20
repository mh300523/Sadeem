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

<template>
  <button
    :class="classes"
    class="flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm cursor-pointer hover:brightness-12 shrink-0"
  >
    <slot />
  </button>
</template>
