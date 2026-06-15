import { ref, computed, watch, isRef } from "vue";

/**
 * Reusable filtering composable.
 *
 * @param {Object} [initialValues={}] - Initial active filter values
 * @param {Array|import('vue').Ref<Array>} [filterConfig=[]] - Configuration of filters mapping IDs to data fields
 */
export function useFilters(initialValues = {}, filterConfig = []) {
  // Resolve config reactively (supports Ref, Computed, or static Array)
  const resolvedConfig = computed(() => {
    const raw = isRef(filterConfig) ? filterConfig.value : filterConfig;
    return Array.isArray(raw) ? raw : [];
  });

  const activeFilters = ref({
    ...initialValues,
  });

  // Dynamically populate default values when config loads or changes
  watch(
    resolvedConfig,
    (configArr) => {
      configArr.forEach((f) => {
        if (activeFilters.value[f.id] === undefined) {
          activeFilters.value[f.id] = f.default ?? f.options?.[0]?.value ?? "all";
        }
      });
    },
    { immediate: true, deep: true }
  );

  function updateFilter(filterId, value) {
    activeFilters.value[filterId] = value;
  }

  function handleFiltersChange(newValues) {
    activeFilters.value = { ...activeFilters.value, ...newValues };
  }

  // Pre-calculate field mappings from the filter configuration: filterId -> field
  const fieldMap = computed(() => {
    const map = {};
    resolvedConfig.value.forEach((f) => {
      if (f.field) {
        map[f.id] = f.field;
      }
    });
    return map;
  });

  /**
   * Returns a computed array filtering the given items.
   *
   * @param {import('vue').Ref<Array> | Array} items - Array of items to filter
   * @param {Object} [customFieldMap] - Optional mapping overrides
   */
  function filterItems(items, customFieldMap = {}) {
    return computed(() => {
      const list = isRef(items) ? items.value : (items || []);
      const currentFieldMap = { ...fieldMap.value, ...customFieldMap };

      return list.filter((item) => {
        return Object.entries(activeFilters.value).every(
          ([filterId, filterValue]) => {
            // Skip checking if value is empty or "all"
            if (!filterValue || filterValue === "all") return true;

            const field = currentFieldMap[filterId] || filterId;
            // Only apply filters that have mapped fields or exist on the item
            if (!(field in item)) return true;

            return item[field] === filterValue;
          }
        );
      });
    });
  }

  return {
    activeFilters,
    updateFilter,
    handleFiltersChange,
    filterItems,
  };
}


