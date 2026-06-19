<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  idea: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["merge-request", "view-idea"]);
</script>

<template>
  <div class="p-6 !rounded-[20px] gradient-border">
    <!-- Top Row: Score & ID -->
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

    <!-- Center content -->
    <div class="flex-1 flex flex-col gap-1 py-1">
      <h4
        class="primary-text-gradient text-sm md:text-base font-bold leading-relaxed line-clamp-2"
      >
        {{ idea.title }}
      </h4>
      <span class="text-theme-text text-xs">
        {{ idea.department }}
      </span>
    </div>

    <!-- Bottom Buttons Row -->
    <div class="flex items-center justify-center gap-2 pt-2">
      <!-- View Idea Button -->
      <BaseButton
        class="gradient-purple flex items-center gap-2 text-theme-text !text-xs"
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
      <!-- Merge Button -->
      <BaseButton
        @click="emit('merge-request', idea)"
        class="bg-[#32BEA6]/10 text-[#32BEA6] !text-xs"
      >
        {{ $t("actions.merge_with_this_idea") }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped></style>
