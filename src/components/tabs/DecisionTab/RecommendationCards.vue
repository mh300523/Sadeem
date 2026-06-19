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
      class="p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 hover:border-[#46E1E6]/42 hover:bg-[#46E1E6]/10"
      :class="
        modelValue === option.key
          ? 'bg-[#46E1E6]/10 border-[#46E1E6]/42'
          : 'border-[#06B6D4]/42'
      "
    >
      <h3
        class="text-base md:text-lg font-bold transition-colors duration-300 mb-4"
        :class="
          modelValue === option.key ? 'text-[#46E1E6]' : 'text-theme-text'
        "
      >
        {{ option.label }}
      </h3>
      <p class="text-theme-text/70 leading-normal text-xs md:text-sm">
        {{ option.description }}
      </p>
    </BaseBox>
  </div>
</template>
