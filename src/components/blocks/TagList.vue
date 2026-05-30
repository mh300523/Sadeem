<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  theme: {
    type: String,
    default: "blue" // orange, blue, purple, teal
  }
});

const themeClasses = computed(() => {
  switch (props.theme) {
    case "orange":
      return {
        pill: "bg-orange-500/5 border-orange-500/25 text-orange-400",
        iconBorder: "border-orange-500/35"
      };
    case "purple":
      return {
        pill: "bg-[#895AF7]/5 border-[#895AF7]/25 text-[#895AF7]",
        iconBorder: "border-[#895AF7]/35"
      };
    case "teal":
      return {
        pill: "bg-teal-500/5 border-teal-500/25 text-teal-400",
        iconBorder: "border-teal-500/35"
      };
    case "blue":
    default:
      return {
        pill: "bg-blue-500/5 border-blue-500/25 text-blue-400",
        iconBorder: "border-blue-500/35"
      };
  }
});
</script>

<template>
  <div class="flex flex-col gap-3 mb-4">
    <span class="text-slate-400 text-xs font-semibold tracking-wide uppercase">
      {{ label }}
    </span>
    <div class="flex flex-wrap gap-2.5">
      <span 
        v-for="(item, idx) in items" 
        :key="idx"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
        :class="themeClasses.pill"
      >
        <span 
          class="w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0"
          :class="themeClasses.iconBorder"
        >
          <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span>{{ item }}</span>
      </span>
    </div>
  </div>
</template>
