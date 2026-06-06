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
      <h3 class="text-white text-sm md:text-base font-bold">
        {{ idea.id }}
      </h3>
      <span
        class="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white font-medium"
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
      <span class="text-white text-xs">
        {{ idea.department }}
      </span>
    </div>

    <!-- Bottom Buttons Row -->
    <div class="flex items-center justify-center gap-2 pt-2">
      <!-- View Idea Button -->
      <BaseButton
        class="gradient-purple flex items-center gap-2 text-white !text-xs"
        @click="emit('view-idea', idea)"
      >
        {{ $t("actions.view_idea") }}
        <SvgIcon name="solar_arrow-left-linear" />
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
