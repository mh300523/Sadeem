<script setup>
import { computed, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
    default: "icons",
  },
  classes: {
    type: String,
    required: false,
  },
});

const icon = computed(() => {
  if (!props.name) return null;
  return defineAsyncComponent(() => {
    return import(`../../assets/images/icons/${props.name}.svg`);
  });
});
</script>

<template>
  <component
    v-if="icon"
    :is="icon"
    fill="currentColor"
    :class="classes"
    class="shrink-0"
  />
</template>

<style scoped></style>
