<script setup>
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  steps: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="py-3">
    <h4
      v-if="title"
      class="py-4 px-5 rounded-2xl rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#FF8E53] to-[#FF6B35] text-white font-medium mb-4"
    >
      {{ title }}
    </h4>

    <!-- Stepper -->
    <div class="">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="relative mb-5 last:mb-0 step-wrapper"
      >
        <!-- Icon -->
        <div class="absolute start-0 top-6 z-10 rounded-full bg-[#1B2A52]">
          <SvgIcon :name="step.icon" />
        </div>

        <!-- Card -->
        <div
          class="step-card relative z-10 ms-6 rounded-xl border border-white/16 backdrop-blur-xl p-3 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/70 to-[#1E293B]/30"
        >
          <h4 class="mb-2 text-white">
            {{ step.title }}
          </h4>

          <p class="text-white/50">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-wrapper:not(:last-child)::before {
  content: "";
  position: absolute;
  width: 1px;
  height: calc(100% - 1.5rem);
  border-inline-end: 1px dashed white;
  top: 55px;
  inset-inline-start: 5px;
}
.step-card {
  position: relative;
}
.step-card::before {
  content: "";
  position: absolute;
  top: 24px;
  inset-inline-start: -6px;
  background-color: beige;
  width: 10px;
  height: 10px;
  background-color: transparent;
  border-block-start: 1px solid rgba(255, 255, 255, 0.16);
  border-inline-start: 1px solid rgba(255, 255, 255, 0.16);
  background-color: #1e293b;
  transform: rotate(45deg);
}
</style>
