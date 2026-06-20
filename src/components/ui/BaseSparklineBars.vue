<template>
  <div class="h-35 flex gap-4 items-end mt-4">
    <span
      v-for="(val, idx) in data"
      :key="idx"
      class="relative flex-1 rounded-t bg-linear-to-b from-theme-accent-primary/20 to-[#7F4FFF]/20 transition-all duration-300 h-full"
      ><span
        class="absolute rounded-t bottom-0 w-full bg-linear-to-b from-theme-accent-primary to-[#7F4FFF] z-20"
        :style="{ height: `${val}%` }"
      ></span>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
