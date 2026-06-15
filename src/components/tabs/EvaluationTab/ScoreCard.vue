<template>
  <div
    class="px-6 py-9 rounded-xl rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#1E293B00] to-[#1E293B99] border border-[#06B6D46B] flex flex-col gap-4 mb-3"
  >
    <span class="text-white text-lg md:text-2xl font-bold">{{ value }}</span>
    <h4 class="text-white">{{ label }}</h4>
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
