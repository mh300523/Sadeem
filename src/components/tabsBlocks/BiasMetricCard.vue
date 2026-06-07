<template>
  <div
    class="p-3.5 rounded-xl bg-[#161F30] border border-white/5 text-right flex flex-col gap-1 select-none"
  >
    <span class="text-white/40 text-[9px] block">{{ label }}</span>
    <p class="text-white text-xs font-bold leading-normal">
      {{ value }}
    </p>
  </div>
</template>

<script setup>
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
