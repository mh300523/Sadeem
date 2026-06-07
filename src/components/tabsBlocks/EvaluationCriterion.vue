<template>
  <div
    class="p-5 rounded-2xl bg-[#091522] border border-white/5 flex flex-col gap-4 text-right relative overflow-hidden select-none"
  >
    <!-- Top Row: Percentage Pill (Left in RTL, Right in LTR) and Title/Description (Right in RTL, Left in LTR) -->
    <div class="flex justify-between items-start w-full gap-4">
      <!-- LTR/RTL Mirroring handled by flex-row-reverse for LTR, or natural flex row order -->
      <!-- Percentage Pill -->
      <span
        class="px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 text-xs font-semibold select-none shrink-0 order-first ltr:order-last"
      >
        {{ currentPercentage }}
      </span>

      <!-- Title & Description -->
      <div class="flex flex-col gap-1.5 flex-1 items-start text-right ltr:text-left ltr:items-end">
        <h4 class="text-white text-sm md:text-base font-bold">
          {{ label }}
        </h4>
        <p class="text-white/60 text-xs leading-relaxed max-w-xl">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Middle Row: Slider Scale + Track (Start) and Reset Button (End) -->
    <div class="flex items-end gap-4 w-full" :dir="isRtl ? 'rtl' : 'ltr'">
      <!-- Slider Wrapper (Scale + Track) -->
      <div class="flex-1 flex flex-col relative">
        <!-- Scale numbers 1 to 5 (Above the track, aligned with ticks) -->
        <div class="flex justify-between text-xs text-white/50 px-[2px] mb-2 font-bold select-none">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>

        <!-- Custom Slider Track and Thumb -->
        <div class="relative w-full h-[24px] flex items-center">
          <!-- Background Track -->
          <div
            class="absolute left-0 right-0 h-[6px] bg-[#121E31] rounded-full pointer-events-none"
          ></div>

          <!-- Active Fill (Direction-aware Gradient from Cyan/Teal to Purple/Pink) -->
          <div
            class="absolute h-[6px] rounded-full pointer-events-none transition-all duration-75"
            :style="trackFillStyle"
          ></div>

          <!-- Vertical Ticks crossing the track -->
          <div
            class="absolute left-0 right-0 h-[6px] flex justify-between items-center pointer-events-none px-[2px]"
          >
            <div
              v-for="n in 5"
              :key="n"
              class="w-[2px] h-[8px] bg-white/20 rounded-full"
            ></div>
          </div>

          <!-- Custom Glassmorphic Thumb with bright cyan center dot -->
          <div
            class="absolute w-6 h-6 rounded-full bg-[#121E31] border border-white/20 shadow-[0_0_10px_rgba(0,226,255,0.4)] flex items-center justify-center pointer-events-none transition-all duration-75"
            :style="thumbStyle"
          >
            <div
              class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E2FF]"
            ></div>
          </div>

          <!-- Native input overlay for accessibility and range dragging -->
          <input
            type="range"
            :value="modelValue"
            @input="$emit('update:modelValue', Number($event.target.value))"
            min="1"
            max="5"
            step="1"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>
      </div>

      <!-- Reset Button (Aligned with track, mirrored naturally via flex layout order) -->
      <div class="flex items-center h-[24px] shrink-0">
        <button
          @click="$emit('reset')"
          class="text-white/40 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
          title="إعادة التعيين للقيمة الافتراضية"
        >
          <!-- Clockwise/Counter-clockwise circular arrow matching designs -->
          <svg
            class="w-5 h-5 transform -scale-x-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 12H19c0-3.86-3.14-7-7-7-3.86 0-7 3.14-7 7 0 3.86 3.14 7 7 7a6.99 6.99 0 005.42-2.581"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Bottom Row: Selected Rating pill and text (Far Right in RTL, Left in LTR) -->
    <div class="flex items-center justify-end ltr:justify-start gap-2.5 w-full pt-1">
      <span class="text-white/60 text-xs">
        {{ $t("evaluation.selected_rating") }}
      </span>
      <span
        class="w-10 h-6 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-[0_0_10px_rgba(255,107,53,0.4)]"
      >
        {{ modelValue }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:modelValue", "reset"]);

const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

// Slider dynamic percentage computation
const percentageVal = computed(() => ((props.modelValue - 1) / 4) * 100);

// Dynamic evaluation score percentage computation (e.g. 60% for a value of 3)
const currentPercentage = computed(() => `${(props.modelValue / 5) * 100}%`);

// Mirrored track fill background gradient & sizing style
const trackFillStyle = computed(() => {
  if (isRtl.value) {
    return {
      right: 0,
      width: `${percentageVal.value}%`,
      background: "linear-gradient(to left, #00E2FF, #8B5CF6)",
    };
  } else {
    return {
      left: 0,
      width: `${percentageVal.value}%`,
      background: "linear-gradient(to right, #00E2FF, #8B5CF6)",
    };
  }
});

// Mirrored thumb position style
const thumbStyle = computed(() => {
  if (isRtl.value) {
    return {
      right: `${percentageVal.value}%`,
      transform: "translateX(50%)",
    };
  } else {
    return {
      left: `${percentageVal.value}%`,
      transform: "translateX(-50%)",
    };
  }
});
</script>

<style scoped>
/* Standard styling is achieved using Tailwind CSS and inline styles for dynamics */
</style>

