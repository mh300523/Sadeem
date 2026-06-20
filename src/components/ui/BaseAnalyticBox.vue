<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <BaseBox class="rounded-[20px] p-4 sm:p-6" type="glass">
    <h2
      v-if="title"
      class="text-base lg:text-lg font-bold text-gradient-primary mb-3"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-xs text-theme-text/70 mb-7">
      {{ subtitle }}
    </p>
    <slot />
  </BaseBox>
</template>
