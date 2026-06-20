<script setup>
import BaseRadioGroup from "@/components/ui/BaseRadioGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "confirmed",
  },
});

const emit = defineEmits(["link-project", "execution-plan-change"]);

const executionPlanOptions = [
  {
    value: "confirmed",
    label: "actions.confirm_in_project_plan",
    activeClass: "bg-[#10B981] border-[#10B981]",
  },
  {
    value: "not_confirmed",
    label: "actions.not_in_project_plan",
    activeClass: "bg-[#EF4444] border-[#EF4444]",
  },
];
</script>

<template>
  <div
    class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
  >
    <!-- Project Info & Status (Right side in RTL) -->
    <div class="">
      <div class="flex items-center gap-3 mb-3">
        <h4 class="primary-text-gradient font-bold md:text-base">
          {{ project.title }}
        </h4>
        <span
          class="px-3.5 py-1.5 rounded-full border border-[#009DFE] text-theme-text bg-[#009DFE]/10 shrink-0"
        >
          {{ project.status }}
        </span>
      </div>
      <p class="text-theme-text text-xs">
        {{ project.submitter }}
      </p>
    </div>

    <!-- Action & Checkboxes (Left side in RTL) -->
    <div class="flex flex-col items-end gap-3">
      <!-- Link Project Button -->
      <BaseButton
        class="py-2 px-5 gradient-purple flex items-center gap-2 text-theme-text w-fit"
        @click="emit('link-project', project)"
      >
        {{ $t("actions.link_idea_to_project") }}
      </BaseButton>

      <BaseRadioGroup
        :model-value="status"
        @update:model-value="emit('execution-plan-change', $event)"
        :options="executionPlanOptions"
      >
        <template #label="{ option }">
          {{ $t(option.label) }}
        </template>
      </BaseRadioGroup>
    </div>
  </div>
</template>

<style scoped></style>
