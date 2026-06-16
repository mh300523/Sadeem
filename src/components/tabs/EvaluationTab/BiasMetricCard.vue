<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BaseBox class="py-5 px-4 rounded-[20px] border border-[#06B6D4]/42">
    <h4 class="text-white/70 mb-3.5">{{ label }}</h4>
    <p class="text-white text-lg md:text-2xl font-bold leading-normal">
      {{ value }}
    </p>
  </BaseBox>
</template>
