<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";

defineProps({
  title: {
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
  <div class="mb-6">
    <h4 v-if="title" class="text-white text-xs md:text-sm font-medium mb-3.5">
      {{ title }}
    </h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseBox
        v-for="item in summaryItems"
        :key="item.label"
        class="p-4 rounded-xl border-2 border-[#06B6D4]/32 flex flex-col gap-1.5"
      >
        <h3 class="text-white font-medium">
          {{ item.label }}
        </h3>
        <p class="text-white/70 leading-relaxed">
          {{ item.text }}
        </p>
      </BaseBox>
    </div>
  </div>
</template>
