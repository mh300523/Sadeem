<script setup>
import BaseRadioGroup from "@/components/ui/BaseRadioGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  idea: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["duplicate-status-change", "view-idea"]);

const toggleOptions = [
  {
    value: "duplicate",
    label: "actions.is_duplicate",
    activeClass: "bg-[#10B981] border-[#10B981]",
  },
  {
    value: "not_duplicate",
    label: "actions.is_not_duplicate",
    activeClass: "bg-[#EF4444] border-[#EF4444]",
  },
];
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#A9A9A9]/10 py-4 last:border-b-0"
  >
    <!-- Info Area -->
    <div class="">
      <div class="flex items-center gap-2">
        <h3 class="text-theme-text text-sm md:text-base font-bold">
          {{ idea.id }}
        </h3>
        <span
          class="px-2 py-0.5 rounded-full bg-[#FF6B35] text-theme-text font-medium"
        >
          %{{ idea.similarity }}
        </span>
      </div>
      <h4
        class="primary-text-gradient text-sm md:text-base font-bold leading-normal my-2"
      >
        {{ idea.title }}
      </h4>

      <p class="text-theme-text text-xs">
        {{ idea.submitter }} .
        {{ idea.date }}
      </p>
    </div>

    <!-- Left side (in RTL): Checkbox Toggles & View Button -->
    <div class="flex flex-col items-end gap-3">
      <!-- View Idea Button -->
      <BaseButton
        class="gradient-purple flex items-center gap-2 text-theme-text w-fit"
        @click="emit('view-idea', idea)"
      >
        {{ $t("actions.view_idea") }}
        <svg
          class="w-4 h-4 rtl:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </BaseButton>

      <BaseRadioGroup
        :model-value="status"
        @update:model-value="
          emit('duplicate-status-change', { idea, status: $event })
        "
        :options="toggleOptions"
      >
        <template #label="{ option }">
          {{ $t(option.label) }}
        </template>
      </BaseRadioGroup>
    </div>
  </div>
</template>

<style scoped></style>
