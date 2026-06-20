<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";

const modelValue = defineModel({
  type: String,
  required: true,
});

defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-7">
    <BaseBox
      v-for="option in options"
      :key="option.key"
      @click="modelValue = option.key"
      class="p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col hover:border-theme-accent-primary/42 hover:bg-theme-accent-primary-bg"
      :class="
        modelValue === option.key
          ? 'bg-theme-accent-primary-bg border-theme-accent-primary/42'
          : 'border-theme-inactive-border'
      "
    >
      <h2
        class="text-base md:text-lg font-bold transition-colors duration-300 mb-4"
        :class="
          modelValue === option.key ? 'text-theme-accent-primary' : 'text-theme-text'
        "
      >
        {{ option.label }}
      </h2>
      <p class="text-theme-text/70 leading-normal text-xs md:text-sm">
        {{ option.description }}
      </p>
    </BaseBox>
  </div>
</template>
