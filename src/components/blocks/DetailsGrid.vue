<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({
      label: "",
      items: [],
      requirements: { label: "", items: [] },
      outputs: { label: "", items: [] },
    }),
  },
});
</script>

<template>
  <div
    class="border border-white/10 bg-gradient-to-l from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl rounded-2xl overflow-hidden"
  >
    <!-- Header Bar Title Banner -->
    <div
      class="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#7F4FFF] text-white py-3 px-6 font-bold text-base"
    >
      {{ data.label }}
    </div>

    <!-- Key-Value Details Grid Table Structure -->
    <div class="px-6 divide-y divide-[#a9a9a9]/30">
      <!-- Loop through normal text details items -->
      <div v-for="item in data.items" :key="item.key" class="py-4">
        <h4 class="text-xs mb-1 text-white/50">
          {{ item.label }}
        </h4>
        <p class="text-white text-base font-medium leading-relaxed">
          {{ item.value }}
        </p>
      </div>

      <!-- Row for Implementation Requirements -->
      <div v-if="data.requirements" class="py-4">
        <h4 class="text-xs mb-1 text-white/50">
          {{ data.requirements.label }}
        </h4>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(req, idx) in data.requirements.items"
            :key="idx"
            class="inline-flex items-center gap-1 text-white text-base font-medium bg-[#F6D06E]/10 rounded-full px-3 py-1"
          >
            <span
              class="w-4.5 h-4.5 rounded-full border border-[#F6D06E] flex items-center justify-center text-[#EEB252] shrink-0"
            >
              <svg
                class="w-2.5 h-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{{ req }}</span>
          </li>
        </ul>
      </div>

      <!-- Row for Expected Innovation Outputs -->
      <div v-if="data.outputs" class="py-4">
        <h4 class="text-xs mb-1 text-white/50">
          {{ data.outputs.label }}
        </h4>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(out, idx) in data.outputs.items"
            :key="idx"
            class="inline-flex items-center gap-1 text-white text-base font-medium bg-[#F6D06E]/10 rounded-full px-3 py-1"
          >
            <div
              class="w-4.5 h-4.5 rounded-full border border-[#F6D06E] flex items-center justify-center text-[#F6D06E] shrink-0"
            >
              <svg
                class="w-2.5 h-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>{{ out }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
