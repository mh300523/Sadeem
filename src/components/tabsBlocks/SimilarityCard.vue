<script setup>
import { ref } from "vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  mode: {
    type: String, // 'row' or 'card'
    required: true,
    default: "row",
  },
  idea: {
    type: Object,
    required: true,
  },
});

const isDuplicate = ref(false);
const isNotDuplicate = ref(false);

function toggleDuplicate() {
  isDuplicate.value = !isDuplicate.value;
  if (isDuplicate.value) isNotDuplicate.value = false;
}

function toggleNotDuplicate() {
  isNotDuplicate.value = !isNotDuplicate.value;
  if (isNotDuplicate.value) isDuplicate.value = false;
}
</script>

<template>
  <!-- ROW MODE (Duplicate checking list) -->
  <div
    v-if="mode === 'row'"
    class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 gap-4 text-right"
  >
    <!-- Right side (in RTL): Circle meter & Info -->
    <div class="flex items-center gap-4 w-full md:w-auto">
      <!-- Premium SVG Circular Score Meter -->
      <div class="relative w-12 h-12 shrink-0">
        <svg class="w-full h-full transform -rotate-90">
          <defs>
            <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF6B35" />
              <stop offset="100%" stop-color="#7F4FFF" />
            </linearGradient>
          </defs>
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(255, 255, 255, 0.08)"
            stroke-width="3"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#score-grad)"
            stroke-width="3.5"
            fill="transparent"
            :stroke-dasharray="2 * Math.PI * 20"
            :stroke-dashoffset="
              2 * Math.PI * 20 * (1 - (idea.similarity || 78) / 100)
            "
            stroke-linecap="round"
          />
        </svg>
        <span
          class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white leading-none"
        >
          {{ idea.similarity }}%
        </span>
      </div>

      <!-- Info Area -->
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            class="px-2 py-0.5 rounded bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold"
          >
            {{ idea.id }}
          </span>
          <h4 class="text-white text-xs md:text-sm font-bold leading-normal">
            {{ idea.title }}
          </h4>
        </div>
        <p class="text-white/50 text-xs font-normal">
          {{ idea.submitter }} .
          <span class="text-white/30">{{ idea.date }}</span>
        </p>
      </div>
    </div>

    <!-- Left side (in RTL): Checkbox Toggles & View Button -->
    <div
      class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end md:justify-start"
    >
      <!-- Toggle: Confirm Duplicate -->
      <button
        @click="toggleDuplicate"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer focus:outline-none"
        :class="
          isDuplicate
            ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.1)]'
            : 'border-white/10 bg-white/2 text-white/70 hover:border-white/20'
        "
      >
        <span
          class="w-4 h-4 rounded-full flex items-center justify-center border border-current text-[10px]"
        >
          {{ isDuplicate ? "✓" : "" }}
        </span>
        <span>تأكيد أنها مكررة</span>
      </button>

      <!-- Toggle: Not Duplicate -->
      <button
        @click="toggleNotDuplicate"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer focus:outline-none"
        :class="
          isNotDuplicate
            ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.1)]'
            : 'border-white/10 bg-white/2 text-white/70 hover:border-white/20'
        "
      >
        <span
          class="w-4 h-4 rounded-full flex items-center justify-center border border-current text-[10px]"
        >
          {{ isNotDuplicate ? "✓" : "" }}
        </span>
        <span>ليست مكررة</span>
      </button>

      <!-- View Idea Button -->
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-l from-[#018AAF]/20 to-[#7F4FFF]/20 border border-white/5 text-white hover:border-white/20 hover:from-[#018AAF]/30 hover:to-[#7F4FFF]/30 transition-all duration-300 text-xs font-medium cursor-pointer"
      >
        <span>عرض الفكرة</span>
        <span class="transform rtl:rotate-180 text-[10px]">➔</span>
      </button>
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
