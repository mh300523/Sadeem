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
});

const resolveOptions = (options, key) => {
  return options[key] || [];
};
</script>

<template>
  <div class="mb-6">
    <!-- Group Title -->
    <h4
      v-if="label"
      class="text-theme-text text-xs font-medium tracking-wide mb-3"
    >
      {{ label }}
    </h4>

    <!-- Fields Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseSelect
        v-for="field in fields"
        :key="field.id"
        v-model="modelValue[field.id]"
        :label="field.label || ''"
        :options="resolveOptions(dropdownOptions, field.optionsKey)"
        :placeholder="field.placeholder || field.label"
        classes="flex flex-col gap-2.5"
        buttonClass="bg-theme-input border border-theme-input-border text-theme-input-text px-4 py-2.5 rounded-[18px]"
      />
    </div>
  </div>
</template>
