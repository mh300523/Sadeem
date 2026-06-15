<template>
  <div
    @click="$emit('click')"
    class="p-3.5 rounded-xl border transition-all cursor-pointer text-right flex flex-col gap-2 select-none"
    :class="
      isActive
        ? 'bg-[#161F30] border-[#018AAF]'
        : 'bg-[#161F30]/50 border-white/5 hover:border-white/15'
    "
  >
    <!-- Top Row: Name and Bias Rating Badge -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold text-white/40">{{ $t("evaluation.bias") }}</span>
        <span class="text-xs font-bold text-[#33BCE1]">{{ evaluator.bias }}</span>
        <span
          class="px-2 py-0.5 rounded-md text-[9px] font-bold border"
          :class="evaluator.badgeClass"
        >
          {{ evaluator.classificationText }}
        </span>
      </div>
      <h4 class="text-white text-xs font-bold">
        {{ evaluator.name }}
      </h4>
    </div>

    <!-- Rating data stats -->
    <div class="flex items-center gap-4 text-[10px] text-white/50">
      <span
        >{{ $t("evaluation.evaluator_average_rating") }}
        <strong class="text-white">{{ evaluator.averageRating }}</strong></span
      >
      <span>
        {{ $t("evaluation.team_average") }}:
        <strong class="text-white">{{ evaluator.teamAverage }}</strong>
      </span>
    </div>

    <!-- Mini progress bar -->
    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
      <div
        class="h-full bg-gradient-to-r"
        :class="
          evaluator.classification === 'Strict'
            ? 'from-red-500 to-red-400'
            : evaluator.classification === 'Generous'
              ? 'from-blue-500 to-blue-400'
              : 'from-emerald-500 to-emerald-400'
        "
        :style="{
          width: `${(evaluator.averageRating / 100) * 100}%`,
        }"
      ></div>
    </div>

    <!-- Link -->
    <span
      class="text-[9px] block text-left mt-1 transition-colors duration-300"
      :class="isActive ? 'text-[#33BCE1] underline' : 'text-[#33BCE1]/70 hover:text-[#33BCE1]'"
    >
      {{ $t("evaluation.click_to_compare") }}
    </span>
  </div>
</template>

<script setup>
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
