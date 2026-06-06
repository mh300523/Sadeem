<script setup>
import { computed } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // each tab: { id: string, label: string }
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectTab = (id) => {
  emit("update:modelValue", id);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="selectTab(tab.id)"
      class="w-full px-4 py-2.5 rounded-xl text-right text-xs md:text-sm font-bold transition-colors cursor-pointer border border-transparent"
      :class="
        modelValue === tab.id
          ? 'bg-[#161F30] border-white/10 text-white'
          : 'bg-transparent text-white/50 hover:bg-white/5'
      "
    >
      {{ tab.label }}
    </button>
  </div>
</template>
