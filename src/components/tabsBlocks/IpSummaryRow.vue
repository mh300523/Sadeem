<script setup>
defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 gap-3 text-right"
  >
    <!-- Right side (in RTL): Row Label -->
    <h4 class="text-white text-xs md:text-sm font-medium leading-none">
      {{ row.label }}
    </h4>

    <!-- Left side (in RTL): Row Value Badge/Slider -->
    <div class="flex items-center justify-end">
      <!-- 1. BADGE MODE -->
      <div
        v-if="row.type === 'badge'"
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs md:text-sm font-semibold"
      >
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="row.dotColor || 'bg-yellow-400'"
        ></span>
        <span>{{ row.value }}</span>
      </div>

      <!-- 2. TEXT CYAN MODE -->
      <span
        v-else-if="row.type === 'text-cyan'"
        class="text-[#009DFE] font-bold text-xs md:text-sm"
      >
        {{ row.value }}
      </span>

      <!-- 3. BLUE PILL MODE -->
      <div
        v-else-if="row.type === 'blue-pill'"
        class="px-4 py-1.5 rounded-full bg-[#018AAF]/20 border border-[#018AAF]/50 text-white text-xs md:text-sm font-bold shadow-[0_0_12px_rgba(1,138,175,0.25)]"
      >
        {{ row.value }}
      </div>

      <!-- 4. SLIDER MODE -->
      <div
        v-else-if="row.type === 'slider'"
        class="flex flex-col items-end gap-1.5 w-full max-w-[200px]"
      >
        <!-- The Custom Striped Slider -->
        <div
          class="relative w-44 h-3 bg-white/5 border border-white/10 rounded-full overflow-visible"
        >
          <!-- Striped Progress Fill -->
          <div
            class="absolute top-0 bottom-0 right-0 rounded-full striped-track"
            :style="{ width: `${row.sliderVal || 78}%` }"
          ></div>
          <!-- Thumb -->
          <div
            class="absolute w-4 h-4 bg-white rounded-full border-2 border-[#FF6B35] top-1/2 right-[78%] -translate-y-1/2 translate-x-1/2 shadow-[0_0_8px_rgba(255,107,53,0.6)] cursor-pointer"
          ></div>
        </div>

        <!-- Slider Status Label (e.g. عالي with Red Dot) -->
        <div
          class="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-white"
        >
          <span>{{ row.value }}</span>
          <span
            class="w-2 h-2 rounded-full"
            :class="row.dotColor || 'bg-red-500'"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.striped-track {
  background-image: repeating-linear-gradient(
    -45deg,
    #018aaf 0,
    #018aaf 4px,
    #7f4fff 4px,
    #7f4fff 8px
  );
  box-shadow: 0 0 10px rgba(1, 138, 175, 0.4);
}
</style>
