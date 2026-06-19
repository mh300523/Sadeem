<script setup>
import BaseFilter from "@/components/ui/BaseFilter.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  activeScreen: {
    type: String,
    required: true,
  },
  analyticsFilters: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:filters"]);
</script>

<template>
  <div class="analytics-toolbar mb-6">
    <div
      class="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-5 mb-2"
    >
      <h1 class="text-lg lg:text-xl font-bold primary-text-gradient">
        {{ $t(`analytics.screens.${activeScreen}`) }}
      </h1>

      <!-- Filters bar configuration-driven selection - ordered right-to-left under RTL -->
      <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
        <BaseFilter
          :filters="analyticsFilters"
          @update:filters="emit('update:filters', $event)"
          buttonClass="rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#018AAF]/10 to-[#7F4FFF]/10 px-4 py-2 rounded-full"
        />

        <!-- Export button (leftmost in RTL) -->
        <BaseButton
          class="gradient-purple py-2! text-theme-text w-full md:w-auto"
        >
          {{ $t("analytics.actions.export_pdf") }}
        </BaseButton>
      </div>
    </div>
    <p class="text-xs text-theme-text/70 leading-relaxed">
      {{ $t(`analytics.screens.${activeScreen}_desc`) }}
    </p>
  </div>
</template>
