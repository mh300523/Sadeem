<script setup>
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <h1
    :class="classes"
    class="main-title text-lg md:text-2xl font-bold text-gradient-primary mb-2"
  >
    {{ name }}
  </h1>
</template>
