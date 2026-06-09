<script setup>
import { reactive, watch } from "vue";
import BaseSelect from "./BaseSelect.vue";

const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
  buttonClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:filters"]);

const selectedValues = reactive({});

// Initialize default values and watch for parent updates
watch(
  () => props.filters,
  (newFilters) => {
    if (newFilters) {
      let hasChanges = false;
      newFilters.forEach((filter) => {
        const fallback = filter.default ?? filter.options?.[0]?.value ?? "all";
        if (selectedValues[filter.id] !== fallback) {
          selectedValues[filter.id] = fallback;
          hasChanges = true;
        }
      });
      if (hasChanges) {
        emit("update:filters", { ...selectedValues });
      }
    }
  },
  { immediate: true, deep: true },
);

function onFilterChange(filterId, value) {
  selectedValues[filterId] = value;
  emit("update:filters", { ...selectedValues });
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <BaseSelect
      v-for="filter in filters"
      :key="filter.id"
      :modelValue="selectedValues[filter.id]"
      @update:modelValue="onFilterChange(filter.id, $event)"
      :options="filter.options"
      :label="filter.label"
      optionLabel="label"
      optionValue="value"
      :buttonClass="buttonClass"
    />
  </div>
</template>
