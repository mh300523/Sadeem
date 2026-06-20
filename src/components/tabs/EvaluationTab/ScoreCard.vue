<template>
  <div
    class="px-6 py-9 rounded-xl rtl:bg-linear-to-r ltr:bg-linear-to-l from-transparent to-theme-row-end border border-theme-accent-primary/42 flex flex-col gap-4 mb-3"
  >
    <span class="text-theme-text text-lg md:text-2xl font-bold">{{
      value
    }}</span>
    <h4 class="text-theme-text">{{ label }}</h4>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>
