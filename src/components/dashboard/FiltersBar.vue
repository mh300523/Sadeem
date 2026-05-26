<script setup>
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import BaseSelect from "../ui/BaseSelect.vue";

const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:filters"]);

const { locale } = useI18n();

const selectedValues = reactive({});

// Initialize default values
watch(
  () => props.filters,
  (newFilters) => {
    if (newFilters) {
      newFilters.forEach((filter) => {
        if (!(filter.id in selectedValues)) {
          selectedValues[filter.id] =
            filter.default ?? filter.options?.[0]?.value ?? "all";
        }
      });
      emit("update:filters", { ...selectedValues });
    }
  },
  { immediate: true }
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
      :label="filter.label[locale]"
      optionLabel="label"
      optionValue="value"
    />
  </div>
</template>
