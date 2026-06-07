<template>
  <div
    class="p-4 rounded-xl bg-[#161F30]/50 border border-white/5 flex justify-between items-center select-none"
  >
    <span class="text-white/50 text-xs font-semibold">{{ label }}</span>
    <span class="text-white text-base md:text-lg font-bold">{{ value }}</span>
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
