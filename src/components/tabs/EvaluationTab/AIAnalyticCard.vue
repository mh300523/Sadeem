<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";

defineProps({
  analyticType: {
    type: String,
    required: true,
  },
  analyticContent: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BaseBox type="glass" class="p-5 mb-4 :last:mb-0">
    <h3
      class="text-white font-bold mb-3 pb-4 border-bottom-gradient relative rtl:after:bg-linear-to-l ltr:after:bg-linear-to-r after:from-[#434343] after:to-[#A9A9A900]"
    >
      {{ analyticType }}
    </h3>
    <p class="text-white/70">
      {{ analyticContent }}
    </p>
  </BaseBox>
</template>
