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
  description: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="mt-6">
    <div class="mb-4">
      <h2 class="primary-text-gradient text-lg md:text-xl font-medium mb-2">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-theme-text/70 text-xs md:text-sm leading-relaxed"
      >
        {{ description }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <template v-for="item in items" :key="item.id">
        <BaseCheckableCard
          v-model="modelValue[item.id]"
          :title="item.label"
          :subtitle="item.desc"
          :badge-text="item.badge"
          :badge-type="item.badgeType"
        />
      </template>
    </div>
  </div>
</template>
