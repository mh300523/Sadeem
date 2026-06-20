<script setup>
import BaseTagList from "@/components/ui/BaseTagList.vue";
import BaseBox from "@/components/ui/BaseBox.vue";
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <BaseBox class="border-subtle rounded-2xl overflow-hidden">
    <!-- Header Bar Title Banner -->
    <div class="bg-gradient-primary text-theme-text py-3 px-6 font-bold text-base">
      {{ data.label }}
    </div>

    <!-- Key-Value Details Grid Table Structure -->
    <div class="px-6 divide-y divide-[#a9a9a9]/30">
      <!-- Loop through normal text details items -->
      <div v-for="item in data.items" :key="item.key" class="py-4">
        <h4 class="text-xs mb-1 text-theme-text/50">
          {{ item.label }}
        </h4>
        <p class="text-theme-text text-base font-medium leading-relaxed">
          {{ item.value }}
        </p>
      </div>

      <!-- Row for Implementation Requirements -->
      <BaseTagList
        v-if="data.requirements"
        :label="data.requirements.label"
        :items="data.requirements.items"
        :classes="{
          pill: 'bg-[#F6D06E]/10 text-theme-text text-base font-medium',
          icon: 'border-[#F6D06E] text-[#EEB252]',
        }"
      />

      <!-- Row for Expected Innovation Outputs -->

      <BaseTagList
        v-if="data.outputs"
        :label="data.outputs.label"
        :items="data.outputs.items"
        :classes="{
          pill: 'bg-[#F6D06E]/10 text-theme-text text-base font-medium',
          icon: 'border-[#F6D06E] text-[#EEB252]',
        }"
      />
    </div>
  </BaseBox>
</template>
