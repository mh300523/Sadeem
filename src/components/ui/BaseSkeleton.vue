<script setup>
defineProps({
  // Layout shapes: 'grid' | 'table' | 'header' | 'box'
  type: {
    type: String,
    default: "box",
  },
  // Number of items or table rows to repeat
  count: {
    type: Number,
    default: 1,
  },
  // Number of columns for grid/table structures
  cols: {
    type: Number,
    default: 4,
  },
  // Height class override (e.g. 'h-10' or 'h-[80px]')
  height: {
    type: String,
    default: "",
  },
  // Custom css classes to pass down
  customClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="animate-pulse w-full">
    <!-- 1. Stats Grid Skeleton -->
    <div
      v-if="type === 'grid'"
      class="grid gap-4"
      :class="[
        cols === 8 ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8' : '',
        cols === 4 ? 'grid-cols-2 md:grid-cols-4' : '',
        cols === 3 ? 'grid-cols-1 md:grid-cols-3' : '',
        cols === 12 ? 'grid-cols-12' : '',
      ]"
    >
      <div
        v-for="i in count"
        :key="i"
        class="bg-[#1E293B]/40 rounded-2xl border border-white/5"
        :class="[height || 'h-[80px]', customClass]"
      ></div>
    </div>

    <!-- 2. Table Layout Skeleton -->
    <div
      v-else-if="type === 'table'"
      class="bg-[#060e1d]/50 p-6 rounded-3xl border border-[#1e293b]/30 backdrop-blur-xl space-y-4"
      :class="customClass"
    >
      <!-- Columns header simulation -->
      <div class="flex gap-4 border-b border-white/10 pb-4">
        <div
          v-for="j in cols"
          :key="j"
          class="h-4 bg-[#1E293B]/60 rounded flex-1"
        ></div>
      </div>
      <!-- Rows simulation -->
      <div
        v-for="i in count"
        :key="i"
        class="flex gap-4 h-12 items-center bg-[#1E293B]/20 rounded-2xl px-4"
      >
        <div
          v-for="j in cols"
          :key="j"
          class="h-4 bg-[#1E293B]/40 rounded flex-1"
        ></div>
      </div>
    </div>

    <!-- 3. Details Page Header Skeleton -->
    <div
      v-else-if="type === 'header'"
      class="border-b border-white/20 pb-4 mb-8 space-y-4"
      :class="customClass"
    >
      <div class="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div class="space-y-4 w-full">
          <div class="flex items-center gap-3">
            <div class="h-8 w-24 bg-[#1E293B]/40 rounded"></div>
            <div class="h-6 w-32 bg-[#1E293B]/40 rounded-full"></div>
          </div>
          <div class="h-10 w-2/3 bg-[#1E293B]/40 rounded"></div>
          <div class="flex flex-wrap items-center gap-4 h-6">
            <div class="h-4 w-32 bg-[#1E293B]/40 rounded"></div>
            <div class="h-4 w-32 bg-[#1E293B]/40 rounded"></div>
            <div class="h-4 w-32 bg-[#1E293B]/40 rounded"></div>
          </div>
        </div>
        <div class="flex gap-3 w-full lg:w-auto self-stretch lg:self-center lg:justify-end">
          <div class="h-10 w-32 bg-[#1E293B]/40 rounded-lg"></div>
          <div class="h-10 w-32 bg-[#1E293B]/40 rounded-lg"></div>
          <div class="h-10 w-32 bg-[#1E293B]/40 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- 4. Default Generic Box shape -->
    <div
      v-else
      class="bg-[#1E293B]/30 rounded-2xl"
      :class="[height || 'h-[100px]', customClass]"
    ></div>
  </div>
</template>
