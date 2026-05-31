<script setup>
import { computed, ref } from "vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      intro: {},
      timeline: [],
      sidebar: { journey: {}, features: {} },
    }),
  },
});

const isPlaying = ref(false);

const storyData = computed(() => props.data || {});
const sidebarData = computed(() => storyData.value.sidebar || {});

function togglePlay() {
  isPlaying.value = !isPlaying.value;
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar Column -->
    <div
      class="lg:col-span-3 bg-[url('@/assets/images/storytab-side-bg.png')] rounded-[16px]"
    >
      <!-- Audio Player Card -->
      <div class="rounded-[24px] px-4 py-5">
        <h3
          class="text-transparent bg-clip-text rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#06B6D4] via-[#3B82F6] to-[#FF6B35] uppercase tracking-wider font-bold text-xl mb-4"
        >
          {{ storyData.intro?.label }}
        </h3>

        <!-- Premium Wave Audio Player UI -->
        <div
          class="p-4 rounded-2xl rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#06B6D4]/90 via-[#3B82F6] to-[#FF6B35]/50"
        >
          <h4 class="text-white mb-2">
            {{ storyData.intro?.audioLabel }}
          </h4>

          <div class="flex items-center gap-3">
            <!-- Play/Pause Button -->
            <button
              @click="togglePlay"
              class="w-10 h-10 rounded-full bg-white text-[#FF6B35] flex items-center justify-center shrink-0 cursor-pointer"
            >
              <svg
                v-if="!isPlaying"
                class="w-5 h-5 translate-x-[1px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <!-- Waveform Animation -->
            <div
              class="flex-1 h-8 w-full flex items-center justify-center gap-[3px] px-2 overflow-hidden"
            >
              <div
                v-for="i in 30"
                :key="i"
                class="w-[3px] rounded-full bg-gradient-to-t from-orange-400 to-amber-500 transition-all duration-300"
                :class="isPlaying ? 'animate-wave-bar' : 'h-3'"
                :style="{
                  animationDelay: `${i * 0.15}s`,
                  height: !isPlaying
                    ? `${Math.max(6, (i % 5) * 6)}px`
                    : undefined,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Innovation Journey Sidebar Stepper -->
      <div class="px-4 py-3">
        <h4
          class="py-4 px-5 rounded-2xl rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#FF8E53] to-[#FF6B35] text-white font-medium mb-4"
        >
          {{ storyData.intro?.journeyBtn }}
        </h4>

        <!-- Stepper -->
        <div class="">
          <div
            v-for="(step, idx) in sidebarData.journey?.steps"
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

      <!-- Features checklist card -->
      <div
        class="border border-[#1e293b]/30 bg-[#060e1d]/50 rounded-[24px] p-5 backdrop-blur-xl shadow-lg flex flex-col gap-4"
      >
        <h5 class="text-slate-400 text-xs font-bold uppercase tracking-wider">
          {{ sidebarData.features?.title }}
        </h5>

        <div class="flex flex-col gap-2.5">
          <div
            v-for="(feat, idx) in sidebarData.features?.items"
            :key="idx"
            class="flex items-start gap-2.5 py-1"
          >
            <!-- Check Circle SVG -->
            <div
              class="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-inner"
            >
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span
              class="text-slate-300 text-xs font-medium leading-relaxed text-right"
            >
              {{ feat }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Story Timeline Column -->
    <div class="lg:col-span-9">
      <!-- Vertical Connecting Line behind timeline numbers -->
      <div
        class="absolute top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FF6B35]/50 via-[#895AF7]/40 to-blue-500/20"
      ></div>

      <!-- Timeline Steps -->
      <div
        v-for="step in storyData.timeline"
        :key="step.id"
        class="relative flex gap-6"
      >
        <!-- Circle Step Number badge -->
        <span
          class="absolute top-1 w-12 h-12 rounded-full border bg-[#060e1d] flex items-center justify-center text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-110 z-10 shrink-0"
          :class="[
            step.id === 1
              ? 'border-[#FF6B35] text-[#FF6B35] shadow-[#FF6B35]/10'
              : step.id === 2
                ? 'border-[#895AF7] text-[#895AF7] shadow-[#895AF7]/10'
                : step.id === 3
                  ? 'border-blue-500 text-blue-400 shadow-blue-500/10'
                  : 'border-teal-500 text-teal-400 shadow-teal-500/10',
          ]"
        >
          {{ step.id }}
        </span>

        <!-- Step content card -->
        <div
          class="flex-1 flex flex-col gap-4 border border-[#1e293b]/25 bg-[#060e1d]/50 p-6 rounded-3xl backdrop-blur-xl shadow-md"
        >
          <!-- Step Title and Subtitle -->
          <div class="flex flex-col gap-1">
            <h4 class="text-white text-lg font-bold flex items-center gap-2">
              {{ step.title }}
            </h4>
            <span class="text-slate-400 text-xs font-semibold leading-relaxed">
              {{ step.subtitle }}
            </span>
          </div>

          <!-- Description Text -->
          <p
            class="text-slate-300 text-sm md:text-base leading-relaxed text-justify whitespace-pre-line font-light"
          >
            {{ step.text }}
          </p>

          <!-- Sammy Card -->
          <div
            v-if="step.card && step.card.type === 'sammy'"
            class="flex items-center gap-4.5 p-4.5 rounded-2xl border border-[#895AF7]/30 bg-[#131131]/80 mt-2"
          >
            <div
              class="relative w-16 h-16 rounded-2xl rtl:bg-gradient-to-br ltr:bg-gradient-to-bl from-indigo-600 to-[#895AF7] border border-[#895AF7]/40 flex flex-col items-center justify-center shrink-0 shadow-lg text-white font-bold overflow-hidden select-none"
            >
              <svg
                class="w-8 h-8 text-white/95"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 0l-2.07-1.42a2 2 0 00-2.24 0L3 14.75V21h18v-6.25l-2.44-1.8a2 2 0 00-2.24 0l-2.07 1.42z"
                />
              </svg>
            </div>

            <div class="h-10 w-[1px] bg-[#895AF7]/40 shrink-0"></div>

            <div
              class="w-16 h-16 rounded-full bg-[#32BEA6] text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-md"
            >
              {{ step.card.avatar }}
            </div>

            <div class="flex-1 flex flex-col gap-1 text-right">
              <h5 class="text-white text-base font-bold">
                {{ step.card.title }}
              </h5>
              <p class="text-slate-300 text-xs font-light leading-relaxed">
                {{ step.card.text }}
              </p>
            </div>
          </div>

          <!-- Quote Card -->
          <div
            v-else-if="step.card && step.card.type === 'quote'"
            class="p-5 rounded-2xl border border-[#1e293b]/50 bg-[#070e1a]/80 mt-2 flex flex-col gap-2.5 text-center items-center justify-center"
          >
            <h5 class="text-white text-base md:text-lg font-bold">
              {{ step.card.title }}
            </h5>
            <p
              v-if="step.card.text"
              class="text-slate-300 text-xs md:text-sm font-light leading-relaxed text-justify"
            >
              {{ step.card.text }}
            </p>
          </div>

          <!-- Step 2 Interactive Box -->
          <div
            v-if="step.interactive"
            class="flex flex-col gap-4.5 p-5 rounded-2xl border border-[#895AF7]/30 bg-[#895AF7]/10 shadow-md mt-2"
          >
            <div class="flex flex-col gap-1">
              <h5
                class="text-white text-sm md:text-base font-bold flex items-center gap-2"
              >
                <span
                  class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
                ></span>
                {{ step.interactive.question }}
              </h5>
              <p class="text-slate-200 text-xs md:text-sm font-light">
                {{ step.interactive.answer }}
              </p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="(tag, idx) in step.interactive.tags"
                :key="idx"
                class="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-extrabold bg-white shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                :class="[
                  tag.icon === 'sparkles'
                    ? 'text-[#FF6B35] border border-[#FF6B35]'
                    : 'text-slate-700 border border-slate-300',
                ]"
              >
                <span
                  class="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                  :class="[
                    tag.icon === 'sparkles'
                      ? 'border-[#FF6B35]'
                      : 'border-slate-400',
                  ]"
                >
                  <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span>{{ tag.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes wave {
  0%,
  100% {
    height: 6px;
  }
  50% {
    height: 28px;
  }
}

.animate-wave-bar {
  animation: wave 1.2s ease-in-out infinite;
}
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
