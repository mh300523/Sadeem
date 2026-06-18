<script setup>
import { computed, ref } from "vue";
import BaseTagList from "@/components/ui/BaseTagList.vue";
import TimelineStepper from "@/components/tabs/_shared/TimelineStepper.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
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
    <div class="lg:col-span-3">
      <div
        class="sidebar-container relative bg-[url('@/assets/images/storytab-side-bg.png')] bg-cover bg-center bg-no-repeat rounded-[16px] px-4 py-5"
      >
        <!-- Audio Player Card -->
        <div class="rounded-[24px]">
          <h2 class="sidebar-gradient-title secondery-text-gradient">
            {{ storyData.intro?.label }}
          </h2>

          <!-- Premium Wave Audio Player UI -->
          <div
            class="p-4 rounded-2xl rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#06B6D4]/90 via-[#3B82F6] to-[#FF6B35]/50"
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
                  class="w-5 h-5 translate-x-px"
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
                  class="w-[3px] rounded-full bg-linear-to-t from-orange-400 to-amber-500 transition-all duration-300"
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
        <TimelineStepper
          v-if="sidebarData.journey?.steps?.length"
          :title="storyData.intro?.journeyBtn"
          :steps="sidebarData.journey.steps"
        />

        <!-- Features checklist card -->
        <div class="">
          <h4 class="sidebar-gradient-title secondery-text-gradient">
            {{ sidebarData.features?.title }}
          </h4>

          <BaseTagList
            v-if="sidebarData.features?.items?.length"
            :items="sidebarData.features.items"
            class="rtl:bg-linear-to-l ltr:bg-linear-to-r from-[#1E293B] to-[#1E293B] rounded-xl overflow-hidden p-[14px] backdrop-blur-xl border border-white/6"
            :classes="{
              pill: 'bg-[#06B6D4]/10 text-white/76',
              icon: 'border-[#06B6D4] text-[#06B6D4]',
            }"
          />
        </div>
      </div>
    </div>
    <!-- Main Story Timeline Column -->
    <div class="lg:col-span-9">
      <!-- Timeline Steps -->
      <BaseBox
        v-for="step in storyData.timeline"
        :key="step.id"
        class="white-border p-6 rounded-2xl mb-6 last:mb-0"
      >
        <!-- Step content card -->
        <div class="">
          <!-- Step Title and Subtitle -->
          <div class="flex gap-2 mb-[14px]">
            <!-- Circle Step Number badge -->
            <span
              class="w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-lg font-medium shrink-0"
            >
              {{ step.id }}
            </span>
            <h4
              class="text-white text-base md:text-xl font-bold flex items-center gap-2"
            >
              {{ step.title }}
              <span class="text-white/50 text-xs font-normal leading-relaxed">
                ({{ step.subtitle }})
              </span>
            </h4>
          </div>

          <!-- Description Text -->
          <p
            class="text-white text-xs md:text-sm leading-relaxed text-justify whitespace-pre-line"
          >
            {{ step.text }}
          </p>

          <!-- Sammy Card -->
          <div
            v-if="step.card && step.card.type === 'sammy'"
            class="flex items-center gap-4.5 py-[30px] px-5 rounded-2xl white-border bg-[url('@/assets/images/sammy-card-bg.png')] bg-cover bg-center bg-no-repeat mt-4"
          >
            <div
              class="w-[100px] h-[100px] rounded-full rtl:bg-linear-to-l ltr:bg-linear-to-r from-[#0A2A40] to-[#1B4D72] backdrop-blur-xl text-white flex items-center justify-center shrink-0 font-bold text-[22px] shadow-md"
            >
              {{ step.card.avatar }}
            </div>

            <div class="flex-1 flex flex-col gap-1">
              <h3 class="text-white text-xl font-bold">
                {{ step.card.title }}
              </h3>
              <p class="text-white leading-relaxed">
                {{ step.card.text }}
              </p>
            </div>
          </div>

          <!-- Quote Card -->
          <div
            v-else-if="step.card && step.card.type === 'quote'"
            class="mb-6 p-7 rounded-2xl white-border bg-[url('@/assets/images/quote-bg.png')] bg-cover bg-top bg-no-repeat mt-2 text-center"
          >
            <h3 class="text-white text-lg md:text-xl font-bold">
              {{ step.card.title }}
            </h3>
          </div>

          <!-- Paragraph after card (specifically for quote type where we want the description outside the card) -->
          <p
            v-if="step.card && step.card.type === 'quote' && step.card.text"
            class="text-white text-xs md:text-sm leading-relaxed text-justify whitespace-pre-line mt-4 mb-6"
          >
            {{ step.card.text }}
          </p>

          <!-- Step 2 Interactive Box -->
          <div
            v-if="step.interactive"
            class="p-5 rounded-[20px] rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#FF6B35] to-[#8B5CF6] flex flex-col items-center"
          >
            <h4 class="text-white text-sm md:text-lg font-bold">
              {{ step.interactive.question }}
            </h4>
            <p class="text-white text-xs md:text-sm my-2">
              {{ step.interactive.answer }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="(tag, idx) in step.interactive.tags"
                :key="idx"
                class="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-sm font-bold bg-white text-[#0A2A40] shadow-md cursor-pointer"
              >
                <span>{{ tag.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </BaseBox>
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
</style>
