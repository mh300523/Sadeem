<script setup>
defineProps({
  warningText: {
    type: String,
    required: true,
  },
  summaryItems: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-5 mb-6">
    <div
      class="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs md:text-sm leading-relaxed"
    >
      {{ warningText }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="item in summaryItems"
        :key="item.label"
        class="p-4 rounded-xl bg-[#161F30] border border-white/5 flex flex-col gap-1.5"
      >
        <span class="text-white/40 text-[10px] font-bold uppercase tracking-wide">
          {{ item.label }}
        </span>
        <p class="text-white/80 text-xs md:text-sm leading-relaxed">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>
