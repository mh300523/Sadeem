<script setup>
import { computed } from "vue";

const props = defineProps({
  bubbles: {
    type: Array,
    required: true,
  },
  height: {
    type: [Number, String],
    default: 320,
  },
});

const bubbleStyles = computed(() =>
  props.bubbles.map((b) => ({
    width: `${b.size}px`,
    height: `${b.size}px`,
    insetInlineStart: `${b.x}%`,
    insetBlockStart: `${b.y}%`,
    background: b.color || "#34d3ff",
  })),
);
</script>

<template>
  <div
    class="bubble-cluster relative w-full overflow-hidden"
    :style="{ height: typeof height === 'number' ? height + 'px' : height }"
  >
    <div
      v-for="(bubble, i) in bubbles"
      :key="i"
      class="bubble p-2 absolute rounded-full flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden"
      :style="bubbleStyles[i]"
      :title="`${bubble.name} - ${bubble.value}`"
    >
      <span class="bubble-name text-white text-nowrap text-[10px]">{{
        bubble.name
      }}</span>
      <span class="bubble-value text-white font-medium">{{
        bubble.value
      }}</span>
    </div>
  </div>
</template>

<style scoped></style>
