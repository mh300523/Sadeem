<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  infoText: {
    type: String,
    default: "",
  },
  cards: {
    type: Array,
    required: true,
  },
  recTitle: {
    type: String,
    required: true,
  },
  recCard: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="mb-6 flex flex-col gap-6">
    <!-- Header with Title and Cyan Info Badge -->
    <div class="">
      <h2 class="text-white text-xs md:text-sm font-medium mb-3.5">
        {{ title }}
      </h2>
      <div
        v-if="infoText"
        class="bg-[#06B6D4]/10 border border-dashed border-[#06B6D4] px-4 py-2.5 rounded-xl text-[#06B6D4] text-xs font-semibold w-fit"
      >
        {{ infoText }}
      </div>
    </div>

    <!-- 2x2 Grid of Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="card in cards"
        :key="card.title"
        class="border border-white/10 bg-[#061E2E]/40 p-5 rounded-[20px] flex flex-col gap-2"
      >
        <h3 class="text-white">
          {{ card.title }}
        </h3>
        <p class="text-white/70 text-xs md:text-sm leading-relaxed">
          {{ card.text }}
        </p>
      </div>
    </div>

    <!-- AI Recommendation Section -->
    <div class="mt-2">
      <h2 class="text-white text-xs md:text-sm font-medium mb-3.5">
        {{ recTitle }}
      </h2>
      <div
        class="border border-white/5 bg-[#061E2E]/40 p-5 rounded-[20px] flex flex-col gap-2"
      >
        <h3 class="text-white">
          {{ recCard.title }}
        </h3>
        <p class="text-white/70 text-xs md:text-sm leading-relaxed">
          {{ recCard.text }}
        </p>
      </div>
    </div>
  </div>
</template>
