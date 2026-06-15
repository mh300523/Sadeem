<script setup>
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

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

// Measure the full track width (from inner edge to inner edge)
const trackWidth = ref(0);
const trackRef = ref(null);

onMounted(() => {
  if (trackRef.value) {
    const rect = trackRef.value.getBoundingClientRect();
    trackWidth.value = rect.width;
  }
});

// Mirrored thumb position style
const thumbStyle = computed(() => {
  const offset = 24;
  const usableWidth = trackWidth.value - offset * 2;

  const position = offset + (percentageVal.value / 100) * usableWidth;

  if (isRtl.value) {
    return {
      right: `${position}px`,
      transform: "translateX(50%)",
    };
  } else {
    return {
      left: `${position}px`,
      transform: "translateX(-50%)",
    };
  }
});
</script>

<template>
  <div
    class="evaluation-criterion relative rtl:after:bg-linear-to-l ltr:after:bg-linear-to-r after:from-[#434343] after:to-[#A9A9A900] mb-4"
  >
    <!-- Top Row: Title & Description and Percentage Pill -->
    <BaseBox
      type="glass"
      class="flex justify-between items-start w-full gap-4 p-5 mb-3"
    >
      <!-- Title & Description -->
      <div>
        <h3 class="text-white font-bold mb-1.5">
          {{ label }}
        </h3>
        <p class="text-white/70 text-[10px] leading-relaxed">
          {{ description }}
        </p>
      </div>
      <!-- Percentage Pill -->
      <span
        class="px-3 py-1.5 rounded-full bg-[#FF6B351A] text-[#FF8E53] font-medium shrink-0"
      >
        {{ currentPercentage }}
      </span>
    </BaseBox>

    <div class="py-4 px-5">
      <!-- Middle Row: Slider Scale + Track (Start) and Reset Button (End) -->
      <div class="flex items-end gap-8">
        <!-- Slider Wrapper (Scale + Track) -->
        <div class="flex-1 flex flex-col relative">
          <!-- Custom Slider Track and Thumb -->
          <div
            class="h-8 flex items-center bg-[#1E293B] rounded-full shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
          >
            <!-- Background Track -->
            <div
              ref="trackRef"
              class="w-[90%] relative h-[2px] rtl:bg-linear-to-l ltr:bg-linear-to-r from-[#1E293B] via-[#222D3F] to-[#283345] rounded-full pointer-events-none m-auto"
            >
              <!-- Scale numbers 1 to 5 (Above the track, aligned with ticks) -->

              <div
                class="absolute left-6 right-6 flex justify-between text-white font-meduim mb-2 -top-8"
              >
                <span v-for="n in 5" :key="n">{{ n }}</span>
              </div>
              <!-- Active Fill (Direction-aware Gradient from Cyan/Teal to Purple/Pink) -->
              <span
                class="absolute h-[6px] rounded-full pointer-events-none transition-all duration-75 ltr:bg-[linear-gradient(to_right,#018AAF00_0%,#018AAF_16%,#7F4FFF_100%)] rtl:bg-[linear-gradient(to_left,#018AAF00_0%,#018AAF_16%,#7F4FFF_100%)]"
                :style="{ width: `${percentageVal}%` }"
              ></span>

              <!-- Vertical Ticks crossing the track -->
              <span
                class="absolute left-6 right-6 flex justify-between items-center pointer-events-none top-1/2 -translate-y-1/2"
              >
                <span
                  v-for="n in 5"
                  :key="n"
                  class="w-[3px] h-[11px] bg-[#515151] rounded-full"
                ></span>
              </span>

              <!-- Custom Glassmorphic Thumb with bright cyan center dot -->
              <span
                class="absolute w-6 h-6 rounded-full bg-[#121E31] border border-white/20 shadow-[0_0_10px_rgba(0,226,255,0.4)] flex items-center justify-center pointer-events-none transition-all duration-75 top-1/2 -translate-y-1/2"
                :style="thumbStyle"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E2FF]"
                ></span>
              </span>
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
          <BaseButton
            @click="$emit('reset')"
            class="text-white/70 hover:text-white p-0!"
            title="Reset"
          >
            <!-- Clockwise/Counter-clockwise circular arrow matching designs -->

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="w-6 h-6 rtl:rotate-y-180"
            >
              <path
                d="M436.7 74.7L448 85.4 448 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l47.9 0-7.6-7.2c-.2-.2-.4-.4-.6-.6-75-75-196.5-75-271.5 0s-75 196.5 0 271.5 196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c99.9-99.9 261.7-100 361.7-.3z"
              />
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- Bottom Row: Selected Rating pill and text (Far Right in RTL, Left in LTR) -->
      <div class="flex items-center gap-2.5 mt-6">
        <span class="text-white/70 text-xs">
          {{ $t("evaluation.selected_rating") }}
        </span>
        <span
          class="min-w-11 h-7 rounded-full bg-[#FF6B35] text-white font-medium flex items-center justify-center"
        >
          {{ modelValue }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.evaluation-criterion::after {
  content: "";
  position: absolute;
  top: 100%;
  width: 100%;
  height: 1px;
}
</style>
