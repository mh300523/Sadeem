<script setup>
import { computed } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import TimelineStepper from "@/components/tabs/_shared/TimelineStepper.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const alignmentData = computed(() => props.data || {});
const sidebarData = computed(() => alignmentData.value.sidebar || {});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Main Content Column (Left in RTL, Right in LTR) -->
    <div class="lg:col-span-9 flex flex-col gap-4">
      <BaseBox
        v-for="strategy in alignmentData.strategies"
        :key="strategy.id"
        class="gradient-border rounded-[20px]! py-5 px-3 flex gap-2"
      >
        <!-- Number Badge -->
        <span
          class="w-10 h-10 rounded-full bg-[#FF6B35] text-theme-text flex items-center justify-center shrink-0 text-lg font-bold"
        >
          {{ strategy.id }}
        </span>

        <!-- Content Area -->
        <div class="">
          <!-- Header (Title & Badges) -->
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-theme-text md:text-base font-medium">
              {{ strategy.title }}
            </h3>

            <div class="flex items-center gap-2 shrink-0">
              <!-- Percentage badge -->
              <span class="badge-gradient">
                {{ strategy.percentage }}
              </span>

              <!-- Alignment status badge -->
              <span
                class="gradient-border px-4 py-1 rounded-full text-theme-text bg-theme-accent-primary-bg"
              >
                {{ strategy.alignmentType }}
              </span>
            </div>
          </div>

          <!-- Analysis text -->
          <p
            class="text-theme-text/76 text-xs md:text-sm mt-3 leading-relaxed text-justify whitespace-pre-line"
          >
            {{ strategy.analysis }}
          </p>

          <!-- Bulleted List -->
          <ul v-if="strategy.bullets && strategy.bullets.length" class="mt-2">
            <li
              v-for="(bullet, bIdx) in strategy.bullets"
              :key="bIdx"
              class="flex items-start gap-2.5 text-theme-text/76 text-xs md:text-sm leading-relaxed"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-theme-accent-primary shrink-0 mt-2"
              ></span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </div>
      </BaseBox>
    </div>
    <!-- Sidebar Column (Right in RTL, Left in LTR) -->
    <div class="lg:col-span-3">
      <BaseBox
        class="sidebar-robot-panel px-[14px] py-5 border-subtle rounded-2xl"
      >
        <!-- Intro Card with Astronaut -->
        <div class="mb-[14px]">
          <h2 class="panel-title text-gradient-secondary">
            {{ sidebarData.title }}
          </h2>
          <p class="text-[#7F8C8D] leading-relaxed text-justify">
            {{ sidebarData.description }}
          </p>
        </div>

        <!-- Global Innovation Index (GII) Card -->
        <TimelineStepper
          v-if="sidebarData.gii"
          :title="sidebarData.gii.title"
          :steps="sidebarData.gii.stats || []"
          variant="dot"
        >
          <template #card="{ step, index }">
            <div
              class="gradient-border p-3 flex-1 bg-gradient-surface backdrop-blur-xl rounded-xl"
            >
              <!-- Stat 1 with Percentage -->
              <template v-if="index === 0">
                <h4 class="text-theme-text/76 text-xs leading-none mb-2">
                  {{ step.label }}
                </h4>
                <div class="flex items-baseline gap-1.5">
                  <span
                    class="text-transparent bg-clip-text bg-gradient-primary text-3xl font-extrabold mb-1 italic"
                  >
                    {{ step.value }}
                  </span>
                  <span
                    class="text-theme-text text-xs md:text-sm leading-relaxed"
                  >
                    {{ step.badge }}
                  </span>
                </div>
              </template>

              <!-- Other GII items -->
              <template v-else>
                <h4 class="text-theme-text/76 text-xs leading-normal mb-2">
                  {{ step.label }}:
                </h4>
                <p class="text-theme-text text-xs md:text-sm leading-relaxed">
                  {{ step.text }}
                </p>
              </template>
            </div>
          </template>
        </TimelineStepper>

        <!-- Final Summary Card -->
        <div class="">
          <h2
            class="bg-gradient-accent py-4 px-5 rounded-2xl text-theme-text font-medium mb-4"
          >
            {{ sidebarData.summary.title }}
          </h2>

          <BaseBox class="gradient-border p-3">
            <!-- Key summary items -->
            <div
              v-for="(item, idx) in sidebarData.summary.items"
              :key="idx"
              class="mb-1"
            >
              <span class="text-theme-text text-xs"> {{ item.label }}: </span>
              <span class="text-theme-text/76 text-xs leading-normal">
                {{ item.value }}
              </span>
            </div>

            <!-- Gaps Section -->
            <div
              v-if="sidebarData.summary.gaps"
              class="border-t border-b border-theme-accent-primary/20 my-2 py-2"
            >
              <span class="text-theme-text text-xs md-text-sm">
                {{ sidebarData.summary.gaps.label }}
              </span>
              <ul class="flex flex-col gap-1">
                <li
                  v-for="(gap, gIdx) in sidebarData.summary.gaps.items"
                  :key="gIdx"
                  class="flex items-start gap-1.5 text-theme-text/50 text-[11px] md:text-xs leading-relaxed"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-theme-accent-primary shrink-0 mt-1.5"
                  ></span>
                  <span>{{ gap }}</span>
                </li>
              </ul>
            </div>

            <!-- Recommendations Section -->
            <div v-if="sidebarData.summary.recommendations" class="">
              <span class="text-theme-text text-xs font-bold">
                {{ sidebarData.summary.recommendations.label }}
              </span>
              <ul class="flex flex-col gap-1">
                <li
                  v-for="(rec, rIdx) in sidebarData.summary.recommendations
                    .items"
                  :key="rIdx"
                  class="flex items-start gap-1.5 text-theme-text/50 text-[11px] md:text-xs leading-relaxed"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-theme-accent-primary shrink-0 mt-1.5"
                  ></span>
                  <span>{{ rec }}</span>
                </li>
              </ul>
            </div>
          </BaseBox>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<style scoped></style>
