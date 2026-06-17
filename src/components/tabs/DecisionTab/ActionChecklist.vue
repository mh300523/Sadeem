<script setup>
import BaseCheckableCard from "@/components/ui/BaseCheckableCard.vue";

const modelValue = defineModel({
  type: Object,
  required: true,
});

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="mb-6">
    <h4 class="text-white text-xs md:text-sm font-medium mb-3.5">
      {{ title }}
    </h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCheckableCard
        v-for="item in items"
        :key="item.id"
        v-model="modelValue[item.id]"
        :title="item.label"
        :subtitle="item.desc"
      />
    </div>
  </div>
</template>
