<script setup>
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  steps: {
    type: Array,
    default: () => [],
  },
  variant: {
    type: String,
    default: "icon", // 'icon' or 'dot'
  },
});
</script>

<template>
  <div class="py-3">
    <!-- Optional Title Header -->
    <h2
      v-if="title"
      class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
    >
      {{ title }}
    </h2>

    <!-- Stepper -->
    <div class="">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="relative mb-5 last:mb-0 step-wrapper flex"
      >
        <!-- Bullet element (Icon or Dot) -->
        <div
          class="step-icon relative mt-5 w-6 flex justify-center shrink-0"
          :style="{ '--bullet-height': variant === 'dot' ? '12px' : '24px' }"
        >
          <span
            v-if="variant === 'dot'"
            class="w-3 h-3 rounded-full bg-[#FF6B35]"
          ></span>
          <SvgIcon v-else :name="step.icon" />
        </div>

        <!-- Card Slot / Default Card fallback -->
        <div class="flex-1 ms-2">
          <slot name="card" :step="step" :index="idx">
            <BaseBox
              class="step-card white-border relative z-10 rounded-xl p-3"
            >
              <h4 class="mb-2 text-white text-sm md:text-base">
                {{ step.title }}
              </h4>
              <p class="text-white/50 text-xs md:text-sm">
                {{ step.description }}
              </p>
            </BaseBox>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-wrapper:not(:last-of-type) .step-icon::after {
  content: "";
  position: absolute;
  width: 1px;
  height: calc(100% + 28px - var(--bullet-height));
  border-inline-end: 1px dashed white;
  top: calc(var(--bullet-height) + 6px);
  left: 50%;
  transform: translateX(-50%);
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
