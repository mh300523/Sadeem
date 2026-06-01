<script setup>
import { computed } from "vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({
      sidebar: {
        title: "",
        description: "",
        gii: { title: "", stats: [] },
        summary: {
          title: "",
          items: [],
          gaps: { label: "", items: [] },
          recommendations: { label: "", items: [] },
        },
      },
      strategies: [],
    }),
  },
});

const alignmentData = computed(() => props.data || {});
const sidebarData = computed(() => alignmentData.value.sidebar || {});
const giiData = computed(() => sidebarData.value.gii || {});
const summaryData = computed(() => sidebarData.value.summary || {});
const strategiesList = computed(() => alignmentData.value.strategies || []);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar Column (Right in RTL, Left in LTR) -->
    <div class="lg:col-span-3 flex flex-col gap-5">
      <!-- Intro Card with Astronaut -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-[#1E293B]/70 to-[#0F172A]/70 rounded-[20px] border border-white/10 p-5 flex items-start gap-4"
      >
        <!-- Astronaut / Rocket SVG -->
        <div class="w-12 h-12 text-cyan-400 shrink-0 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-full h-full"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 2.5-2 3.5 1-.5 2.24-1 3.5-2.5" />
            <path
              d="M12 2C8.5 2 6 5 6 9c0 1.5.5 3 1.5 4.5L12 22l4.5-8.5c1-1.5 1.5-3 1.5-4.5 0-4-2.5-7-6-7z"
            />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <div class="flex-1">
          <h3
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] font-bold text-base leading-normal mb-1.5"
          >
            {{ sidebarData.title }}
          </h3>
          <p class="text-white/60 text-xs leading-relaxed text-justify">
            {{ sidebarData.description }}
          </p>
        </div>
      </div>

      <!-- Global Innovation Index (GII) Card -->
      <div
        class="border border-white/10 rounded-[20px] p-5 bg-gradient-to-b from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl flex flex-col"
      >
        <h4
          class="py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] text-white font-bold text-xs md:text-sm mb-4 text-center"
        >
          {{ giiData.title }}
        </h4>

        <div class="flex flex-col gap-4">
          <!-- Stat 1 with Percentage -->
          <div
            v-if="giiData.stats?.[0]"
            class="border-inline-start-2 border-[#FF6B35] ps-3 flex flex-col gap-1"
          >
            <span class="text-white/50 text-[11px] md:text-xs leading-none">
              {{ giiData.stats[0].label }}
            </span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-[#60a5fa] text-2xl font-extrabold leading-none">
                {{ giiData.stats[0].value }}
              </span>
              <span class="text-[#60a5fa] text-[11px] font-bold">
                {{ giiData.stats[0].badge }}
              </span>
            </div>
          </div>

          <!-- Other GII items -->
          <div
            v-for="(item, idx) in giiData.stats?.slice(1)"
            :key="idx"
            class="border-inline-start-2 border-[#FF6B35] ps-3 flex flex-col gap-1"
          >
            <span class="text-white text-xs font-bold leading-normal">
              {{ item.label }}:
            </span>
            <span class="text-white/60 text-[11px] md:text-xs leading-relaxed">
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- Final Summary Card -->
      <div
        class="border border-white/10 rounded-[20px] p-5 bg-gradient-to-b from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl flex flex-col"
      >
        <h4
          class="py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] text-white font-bold text-xs md:text-sm mb-4 text-center"
        >
          {{ summaryData.title }}
        </h4>

        <div class="flex flex-col gap-4">
          <!-- Key summary items -->
          <div
            v-for="(item, idx) in summaryData.items"
            :key="idx"
            class="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-0 last:pb-0"
          >
            <span class="text-white text-xs font-bold">
              {{ item.label }}:
            </span>
            <span
              class="text-white/60 text-xs leading-normal"
              :class="{
                'bg-[#FF6B35]/15 border border-[#FF6B35]/30 rounded px-2 py-1 inline-block text-white font-bold':
                  idx === 2,
              }"
            >
              {{ item.value }}
            </span>
          </div>

          <!-- Gaps Section -->
          <div v-if="summaryData.gaps" class="flex flex-col gap-1.5">
            <span class="text-white text-xs font-bold">
              {{ summaryData.gaps.label }}
            </span>
            <ul class="flex flex-col gap-1">
              <li
                v-for="(gap, gIdx) in summaryData.gaps.items"
                :key="gIdx"
                class="flex items-start gap-1.5 text-white/50 text-[11px] md:text-xs leading-relaxed"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"
                ></span>
                <span>{{ gap }}</span>
              </li>
            </ul>
          </div>

          <!-- Recommendations Section -->
          <div
            v-if="summaryData.recommendations"
            class="flex flex-col gap-1.5"
          >
            <span class="text-white text-xs font-bold">
              {{ summaryData.recommendations.label }}
            </span>
            <ul class="flex flex-col gap-1">
              <li
                v-for="(rec, rIdx) in summaryData.recommendations.items"
                :key="rIdx"
                class="flex items-start gap-1.5 text-white/50 text-[11px] md:text-xs leading-relaxed"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"
                ></span>
                <span>{{ rec }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Column (Left in RTL, Right in LTR) -->
    <div class="lg:col-span-9 flex flex-col gap-4">
      <div
        v-for="strategy in strategiesList"
        :key="strategy.id"
        class="border border-white/10 rounded-[20px] p-6 bg-gradient-to-b from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl flex gap-4 items-start hover:border-white/20 transition-all duration-300"
      >
        <!-- Number Badge -->
        <span
          class="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-md"
        >
          {{ strategy.id }}
        </span>

        <!-- Content Area -->
        <div class="flex-1 min-w-0">
          <!-- Header (Title & Badges) -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-white text-base md:text-lg font-bold">
              {{ strategy.title }}
            </h3>

            <div class="flex items-center gap-2 shrink-0">
              <!-- Percentage badge -->
              <span
                class="px-3 py-1 rounded-full bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30 text-xs font-extrabold shadow-sm"
              >
                {{ strategy.percentage }}
              </span>

              <!-- Alignment status badge -->
              <span
                class="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                :class="strategy.alignmentClass"
              >
                {{ strategy.alignmentType }}
              </span>
            </div>
          </div>

          <!-- Analysis text -->
          <p
            class="text-white/60 text-xs md:text-sm mt-3 leading-relaxed text-justify whitespace-pre-line"
          >
            {{ strategy.analysis }}
          </p>

          <!-- Bulleted List -->
          <ul
            v-if="strategy.bullets && strategy.bullets.length"
            class="mt-4 flex flex-col gap-2.5 border-t border-white/5 pt-4"
          >
            <li
              v-for="(bullet, bIdx) in strategy.bullets"
              :key="bIdx"
              class="flex items-start gap-2.5 text-white/50 text-xs md:text-sm leading-relaxed"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"
              ></span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
