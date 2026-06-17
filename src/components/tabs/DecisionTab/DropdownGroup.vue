<script setup>
import BaseSelect from "@/components/ui/BaseSelect.vue";

const modelValue = defineModel({
  type: Object,
  required: true,
});

defineProps({
  label: {
    type: String,
    default: "",
  },
  fields: {
    type: Array,
    required: true,
  },
  dropdownOptions: {
    type: Object,
    required: true,
  },
  cols: {
    type: Number,
    default: 2,
  },
  isConditional: {
    type: Boolean,
    default: false,
  },
});

const resolveOptions = (options, key) => {
  return options[key] || [];
};
</script>

<template>
  <div :class="isConditional ? 'flex flex-col gap-3' : 'mb-6'">
    <!-- Group Title -->
    <h4
      v-if="label"
      class="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-3"
    >
      {{ label }}
    </h4>

    <!-- Fields Grid -->
    <div
      class="grid grid-cols-1 gap-6"
      :class="[
        cols === 1 ? 'grid-cols-1' : 'md:grid-cols-2',
        isConditional ? 'border border-white/5 p-4 rounded-xl bg-[#161F30]/30' : ''
      ]"
    >
      <BaseSelect
        v-for="field in fields"
        :key="field.id"
        v-model="modelValue[field.id]"
        :label="field.label || ''"
        :options="resolveOptions(dropdownOptions, field.optionsKey)"
        :placeholder="field.placeholder || field.label"
        classes="flex flex-col gap-2.5"
        buttonClass="bg-[#051E2E]/40 border-[#ffffff]/10 px-4 py-2.5 rounded-[18px]"
      />
    </div>
  </div>
</template>
