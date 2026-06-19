<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseBox
    class="gradient-border mb-[14px] last:mb-0 flex flex-col sm:flex-row sm:items-center justify-between px-9 py-8 rounded-[20px]"
  >
    <!-- Right side (in RTL): Row Label -->
    <h4
      class="text-theme-text text-xs md:text-sm font-medium leading-none flex-1"
    >
      {{ row.label }}
    </h4>

    <!-- Left side (in RTL): Row Value Badge/Slider -->
    <div class="flex-1 flex justify-end">
      <!-- 1. level MODE -->
      <div
        v-if="row.type === 'level'"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#F1E10A]/10 text-[#7F8C8D] text-xs md:text-sm"
      >
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="row.dotColor || 'bg-[#F1E10A]'"
        ></span>
        <span>{{ row.value }}</span>
      </div>

      <!-- 2. security type -->
      <span
        v-else-if="row.type === 'security'"
        class="text-[#018AAF] bg-[#018AAF]/10 rounded-full px-3 py-2 text-xs md:text-sm"
      >
        {{ row.value }}
      </span>

      <!-- 3. degree MODE -->
      <div v-else-if="row.type === 'degree'" class="badge-percentage">
        {{ row.value }}
      </div>

      <!-- 4. SLIDER MODE -->
      <div v-else-if="row.type === 'slider'" class="w-full max-w-[360x] pb-10">
        <!-- The Custom Striped Slider -->
        <div class="relative h-7.5 bg-white/5 gradient-border p-2 rounded-full">
          <!-- Striped Progress Fill -->
          <div
            class="relative w-full h-full rounded-full bg-gradient-to-l from-[#273448] to-[#132135]"
          >
            <span
              class="absolute inset-y-0 striped-track inline-block h-full rounded-full"
              :style="{ width: `${row.sliderVal}%` }"
            >
              <!-- Thumb -->
              <span
                class="absolute w-3 h-3 bg-white rounded-full end-0 top-1/2 -translate-y-1/2 shadow-md cursor-pointer"
              ></span>
            </span>
          </div>

          <!-- Slider Status Label (e.g. عالي with Red Dot) -->
          <div
            class="absolute top-[calc(100%+4px)] ltr:-translate-x-1/2 rtl:translate-x-1/2 flex flex-col items-center"
            :style="{ insetInlineStart: `calc(${row.sliderVal}% - 10px)` }"
          >
            <SvgIcon name="caret" />
            <span
              class="flex items-center gap-1.5 bg-[#FB3748]/10 px-2 py-1 rounded-full text-theme-text mt-1"
            >
              <span>{{ row.value }}</span>
              <span
                class="w-2 h-2 inline-block rounded-full"
                :class="row.dotColor || 'bg-red-500'"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseBox>
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
