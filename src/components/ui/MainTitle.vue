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
    class="main-title text-2xl font-bold text-transparent bg-clip-text bg-[linear-gradient(90deg,_#06B6D4_0%,_#3B82F6_53%,_#8B5CF6_100%)] mb-2"
  >
    {{ name }}
  </h1>
</template>
