<template>
  <button
    :class="classes"
    class="py-2 px-7 rounded-full text-sm cursor-pointer"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  classes: String,
  default: "",
});
</script>
