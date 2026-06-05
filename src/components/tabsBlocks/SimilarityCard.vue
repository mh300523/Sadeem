<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
const { t } = useI18n();

const props = defineProps({
  mode: {
    type: String,
    default: "",
  },
  idea: {
    type: Object,
    default: () => ({}),
  },
});

const duplicateStatus = ref(
  props.idea?.isDuplicate
    ? "duplicate"
    : props.idea?.isNotDuplicate
      ? "not_duplicate"
      : null,
);

const toggleOptions = [
  {
    value: "duplicate",
    label: "details.is_duplicate",
    activeClass: "bg-[#10B981] border-[#10B981]",
  },
  {
    value: "not_duplicate",
    label: "details.is_not_duplicate",
    activeClass: "bg-[#EF4444] border-[#EF4444]",
  },
];
</script>

<template>
  <!-- ROW MODE (Duplicate checking list) -->
  <div
    v-if="mode === 'row'"
    class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 gap-4 text-right"
  >
    <!-- Info Area -->
    <div class="">
      <div class="flex items-center gap-2">
        <h3 class="text-white text-sm md:text-base font-bold">
          {{ idea.id }}
        </h3>
        <span
          class="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white font-medium"
          >%{{ idea.similarity }}</span
        >
      </div>
      <h4
        class="primary-text-gradient text-sm md:text-base font-bold leading-normal my-2"
      >
        {{ idea.title }}
      </h4>

      <p class="text-white text-xs">
        {{ idea.submitter }} .
        {{ idea.date }}
      </p>
    </div>

    <!-- Left side (in RTL): Checkbox Toggles & View Button -->
    <div class="flex flex-col items-end gap-3">
      <!-- View Idea Button -->
      <BaseButton
        class="gradient-purple flex items-center gap-2 text-white w-fit"
      >
        {{ $t("details.view_idea") }} <SvgIcon name="solar_arrow-left-linear"
      /></BaseButton>
      <!-- Radio group for confirming duplicate status -->
      <RadioGroup v-model="duplicateStatus" class="flex items-center gap-4">
        <RadioGroupOption
          v-for="opt in toggleOptions"
          :key="opt.value"
          :value="opt.value"
          v-slot="{ checked }"
          as="template"
        >
          <div
            class="flex items-center gap-2.5 text-xs text-white cursor-pointer focus:outline-none"
          >
            <span
              class="w-5 h-5 rounded-sm flex items-center justify-center transition-all duration-300 border border-transparent"
              :class="
                checked
                  ? `${opt.activeClass} text-white`
                  : 'bg-[#D9D9D9]/16 text-transparent border-white/10 hover:border-white/20'
              "
            >
              <svg
                class="w-4 h-4 stroke-[3px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{{ $t(opt.label) }}</span>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </div>
  </div>

  <!-- CARD MODE (Merge suggestions card list) -->
  <div
    v-else-if="mode === 'card'"
    class="flex flex-col justify-between p-4 rounded-xl border border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 gap-4 text-right min-w-[240px] flex-1 max-w-sm"
  >
    <!-- Top Row: Score & ID -->
    <div class="flex items-center justify-between">
      <!-- Circular meter in small card form -->
      <div class="relative w-10 h-10 shrink-0">
        <svg class="w-full h-full transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="rgba(255, 255, 255, 0.08)"
            stroke-width="2.5"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="url(#score-grad)"
            stroke-width="3"
            fill="transparent"
            :stroke-dasharray="2 * Math.PI * 16"
            :stroke-dashoffset="
              2 * Math.PI * 16 * (1 - (idea.similarity || 78) / 100)
            "
            stroke-linecap="round"
          />
        </svg>
        <span
          class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white leading-none"
        >
          {{ idea.similarity }}%
        </span>
      </div>

      <span
        class="px-2 py-0.5 rounded bg-[#FF6B35]/25 text-[#FF6B35] text-xs font-bold"
      >
        {{ idea.id }}
      </span>
    </div>

    <!-- Center content -->
    <div class="flex-1 flex flex-col gap-1 py-1">
      <h4
        class="text-white text-xs md:text-sm font-bold leading-relaxed line-clamp-2"
      >
        {{ idea.title }}
      </h4>
      <p class="text-white/50 text-[11px] font-normal">
        {{ idea.department }}
      </p>
    </div>

    <!-- Bottom Buttons Row -->
    <div
      class="flex items-center justify-between gap-2 pt-2 border-t border-white/5"
    >
      <!-- Merge Button -->
      <button
        class="px-3 py-1.5 rounded-full border border-[#10B981]/50 text-[#10B981] hover:bg-[#10B981]/10 transition-all duration-300 text-xs font-medium cursor-pointer"
      >
        دمج مع هذه الفكرة
      </button>

      <!-- View Idea Button -->
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7F4FFF]/10 hover:bg-[#7F4FFF]/25 border border-white/5 text-white transition-all duration-300 text-xs font-medium cursor-pointer"
      >
        <span>عرض الفكرة</span>
        <span class="transform rtl:rotate-180 text-[10px]">➔</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Responsive layout tweaks for card views */
</style>
