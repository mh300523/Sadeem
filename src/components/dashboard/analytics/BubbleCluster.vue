<template>
  <div
    class="relative w-full rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden transition-all duration-300"
    :style="{ height: `${height}px` }"
  >
    <div
      v-for="(bubble, idx) in positionedBubbles"
      :key="idx"
      class="absolute rounded-full flex flex-col items-center justify-center text-center font-bold text-[#04131d] shadow-[0_12px_24px_rgba(0,0,0,0.3)] select-none hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
      :style="getBubbleStyle(bubble)"
    >
      <span class="text-xs tracking-wide uppercase leading-tight">{{ bubble.name }}</span>
      <span class="text-lg font-black mt-0.5 leading-none">{{ bubble.value }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  bubbles: {
    type: Array,
    required: true,
  },
  height: {
    type: Number,
    default: 320,
  },
});

const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

// Predefined positions from the figma/HTML views to guarantee layout fidelity
const layouts = {
  6: [
    { top: 28, start: 28 },
    { top: 76, start: 158 },
    { top: 180, start: 88 },
    { top: 150, start: 232 },
    { top: 36, start: 226 },
    { top: 196, start: 20 }
  ],
  4: [
    { top: 34, start: 34 },
    { top: 116, start: 154 },
    { top: 36, start: 232 },
    { top: 194, start: 96 }
  ]
};

const positionedBubbles = computed(() => {
  const count = props.bubbles.length;
  // Fallback if layout not predefined
  const layout = layouts[count] || Array(count).fill(0).map((_, i) => ({ top: 40 + i * 40, start: 40 + i * 30 }));

  return props.bubbles.map((b, idx) => {
    return {
      ...b,
      top: layout[idx].top,
      start: layout[idx].start
    };
  });
});

function getBubbleStyle(bubble) {
  const style = {
    width: `${bubble.size}px`,
    height: `${bubble.size}px`,
    top: `${bubble.top}px`,
    background: bubble.color || "linear-gradient(135deg,#34d3ff,#7c3aed)",
  };

  if (isRtl.value) {
    style.right = `${bubble.start}px`;
  } else {
    style.left = `${bubble.start}px`;
  }

  return style;
}
</script>

<style scoped>
/* Bubble animations and hover scales are styled using Tailwind CSS classes */
</style>
