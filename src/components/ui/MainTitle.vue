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
    class="main-title text-2xl font-bold text-transparent bg-clip-text rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] mb-2"
  >
    {{ name }}
  </h1>
</template>
