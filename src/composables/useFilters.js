import { ref, computed } from "vue";

export function useFilters(initialValues = {}) {
  const activeFilters = ref({ ...initialValues });

  function updateFilter(filterId, value) {
    activeFilters.value[filterId] = value;
  }

  function handleFiltersChange(newValues) {
    activeFilters.value = { ...activeFilters.value, ...newValues };
  }

  // Generic list filter helper
  function filterItems(items, fieldMap = {}) {
    return computed(() => {
      const list = items.value || items || [];
      return list.filter((item) => {
        return Object.entries(activeFilters.value).every(
          ([filterId, filterValue]) => {
            if (!filterValue || filterValue === "all") return true;

            const field = fieldMap[filterId] || filterId;
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
