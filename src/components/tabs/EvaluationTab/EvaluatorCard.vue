<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  evaluator: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>
<template>
  <BaseBox type="glass" class="p-4 rounded-xl mb-4 last:mb-0">
    <!-- Top Row: Name and Bias Rating Badge -->

    <div
      class="flex justify-between items-center gap-2 mb-3 pb-4 border-bottom-gradient relative rtl:after:bg-linear-to-l ltr:after:bg-linear-to-r after:from-[#434343] after:to-[#A9A9A900]"
    >
      <h4 class="text-white text-xl font-bold">
        {{ evaluator.name }}
      </h4>
      <div class="flex items-center gap-2">
        <span class="text-white/70">{{ $t("evaluation.bias") }}</span>
        <span class="text-white text-xl font-bold">{{ evaluator.bias }}</span>
      </div>
    </div>

    <!-- Rating data stats -->
    <ul class="text-[10px] text-white/50">
      <li class="flex items-center gap-2">
        <span class="text-white-70">{{
          $t("evaluation.evaluator_average_rating")
        }}</span>
        <span class="text-white font-bold text-xl">{{
          evaluator.averageRating
        }}</span>
      </li>
      <li class="flex items-center gap-2">
        <span class="text-white-70">{{ $t("evaluation.team_average") }}</span>
        <span class="text-white font-bold text-xl">{{
          evaluator.teamAverage
        }}</span>
      </li>
    </ul>

    <span
      class="inline-block px-4.5 py-2.5 rounded-xl md:text-base font-medium border mt-5 mb-2"
      :class="evaluator.badgeClass"
    >
      {{ evaluator.classification }}
    </span>

    <!-- Mini progress bar -->
    <span
      class="inline-flex items-center w-full h-4 p-1 bg-[#1A2B40] rounded-full overflow-hidden mt-1 shadow-[0_6px_6px_rgba(0,0,0,0.2)]"
    >
      <span
        class="inline-block h-full rounded-full"
        :class="
          evaluator.classification === 'Strict'
            ? 'bg-[#EF4444]'
            : evaluator.classification === 'Generous'
              ? 'bg-[#6C8CFF]'
              : 'bg-[#10B981]'
        "
        :style="{
          width: `${(evaluator.averageRating / 100) * 100}%`,
        }"
      ></span>
    </span>

    <!-- Link -->
    <BaseButton
      @click="$emit('click')"
      class="text-white/20 text-[10px] mt-1 px-0! transition-colors duration-300"
    >
      {{ $t("evaluation.click_to_compare") }}
    </BaseButton>
  </BaseBox>
</template>
