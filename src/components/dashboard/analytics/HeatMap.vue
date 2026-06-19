<script setup>
const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
  cellSize: {
    type: Number,
    default: 60,
  },
  classes: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="heatmap-container overflow-x-auto w-full flex justify-center py-4"
  >
    <!-- Grid wrapper with a gap of 8px (gap-2) and custom columns layout -->
    <div
      class="grid gap-2 items-center"
      :style="{
        gridTemplateColumns: `auto repeat(${categories.length}, ${cellSize}px)`,
      }"
    >
      <!-- X-axis headers (categories) -->
      <!-- Empty cell for the top-right corner to match alignment -->
      <div></div>
      <div
        v-for="cat in categories"
        :key="cat"
        class="text-xs font-normal text-theme-text/70 text-center pb-1"
      >
        {{ cat }}
      </div>

      <!-- Y-axis rows (series) -->
      <template v-for="row in series" :key="row.name">
        <!-- Row header (category name) -->
        <div class="text-[12px] text-theme-text/70 pe-2">
          {{ row.name }}
        </div>
        <!-- Data cells -->
        <div
          v-for="(cell, idx) in row.data"
          :key="idx"
          class="rounded-xl flex items-center justify-center font-medium text-theme-text transition-all duration-200 hover:brightness-120"
          :class="classes"
          :style="{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: cell.color,
          }"
          :title="`${row.name} - ${categories[idx]}: ${cell.value}`"
        >
          {{ cell.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.heatmap-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
