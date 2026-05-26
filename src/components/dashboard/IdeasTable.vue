<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import BaseTable from "@/components/ui/BaseTable.vue";

const props = defineProps({
  ideas: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  statusConfigs: {
    type: Object,
    required: true,
  },
});

const { locale } = useI18n();

const localizedHeaders = computed(() => {
  return props.headers.map((h) => ({
    ...h,
    label: h.label[locale.value],
  }));
});

const actionHeader = computed(() => {
  return props.headers.find((h) => h.key === "action");
});

const localizedViewLabel = computed(() => {
  return actionHeader.value?.viewLabel?.[locale.value] || "";
});

function getBadgeConfig(status) {
  return props.statusConfigs[status] || props.statusConfigs.new;
}
</script>

<template>
  <BaseTable
    :headers="localizedHeaders"
    :items="ideas"
    tableClass="min-w-[1350px]"
  >
    <!-- Custom cell for Idea ID -->
    <template #cell(id)="{ value }">
      <span class="text-slate-400 font-mono text-sm tracking-wider">
        {{ value }}
      </span>
    </template>

    <!-- Custom cell for Title -->
    <template #cell(title)="{ item }">
      <div class="flex items-start gap-2.5">
        <svg
          class="w-4.5 h-4.5 text-blue-400 mt-0.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span
          class="text-white text-sm font-medium leading-relaxed line-clamp-2"
          :title="locale === 'ar' ? item.title_ar : item.title_en"
        >
          {{ locale === "ar" ? item.title_ar : item.title_en }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Submitter -->
    <template #cell(submitter)="{ item }">
      <div class="flex items-center gap-2">
        <svg
          class="w-4 h-4 text-blue-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="text-slate-300 text-sm font-medium">
          {{ locale === "ar" ? item.submitter_ar : item.submitter_en }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Department -->
    <template #cell(department)="{ item }">
      <div class="flex items-center gap-2.5">
        <!-- Energy Icon (Red/Rose) -->
        <div
          v-if="item.department_en === 'Energy'"
          class="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 shrink-0"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <!-- Health Icon (Green/Emerald) -->
        <div
          v-else
          class="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 shrink-0"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <span class="text-slate-300 text-sm font-medium">
          {{ locale === "ar" ? item.department_ar : item.department_en }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Innovation Type -->
    <template #cell(innovationType)="{ item }">
      <div class="flex items-center gap-2.5">
        <div
          class="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 shrink-0"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <span class="text-slate-300 text-sm font-medium">
          {{
            locale === "ar" ? item.innovationType_ar : item.innovationType_en
          }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Time Horizon -->
    <template #cell(timeHorizon)="{ value }">
      <div
        class="flex items-center gap-1.5 text-slate-200 font-semibold text-sm"
      >
        <svg
          class="w-4 h-4 text-orange-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span>{{ value }}</span>
      </div>
    </template>

    <!-- Custom cell for Innovation Track -->
    <template #cell(track)="{ item }">
      <div class="flex items-center gap-1.5 text-slate-300 text-sm">
        <div
          class="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <span
          class="line-clamp-1 text-slate-300 text-sm font-medium"
          :title="locale === 'ar' ? item.track_ar : item.track_en"
        >
          {{ locale === "ar" ? item.track_ar : item.track_en }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Evaluators Count -->
    <template #cell(evaluatorsCount)="{ value }">
      <div class="flex items-center gap-2">
        <svg
          class="w-4 h-4 text-blue-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="text-slate-300 text-sm font-semibold">
          {{ value }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Rating -->
    <template #cell(averageRating)="{ value }">
      <div class="flex items-center gap-2">
        <svg
          class="w-4 h-4 text-yellow-400 fill-transparent shrink-0"
          stroke="currentColor"
          stroke-width="1.8"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.783-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
        <span class="text-slate-300 text-sm font-bold">
          {{ value }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Status Badge -->
    <template #cell(status)="{ value }">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border shadow-[0_2px_10px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 min-w-[125px] justify-between"
        :class="[
          getBadgeConfig(value).bgClass,
          getBadgeConfig(value).borderClass,
          getBadgeConfig(value).textClass,
        ]"
      >
        <!-- Text -->
        <span class="whitespace-nowrap font-medium pr-1 pl-1">{{
          getBadgeConfig(value)[locale]
        }}</span>

        <!-- Icon Circle -->
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-inner"
          :class="getBadgeConfig(value).iconBgClass"
        >
          <svg
            class="w-3.5 h-3.5"
            :class="getBadgeConfig(value).iconColorClass"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              :d="getBadgeConfig(value).iconPath"
            ></path>
          </svg>
        </div>
      </div>
    </template>

    <!-- Custom cell for Submission Date -->
    <template #cell(submittedAt)="{ item }">
      <div class="flex items-center gap-2">
        <svg
          class="w-4 h-4 text-blue-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-slate-400 text-xs font-medium">
          {{ locale === "ar" ? item.submittedAt_ar : item.submittedAt_en }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Action -->
    <template #cell(action)>
      <a
        href="#"
        class="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1.5 hover:underline"
      >
        <span>{{ localizedViewLabel }}</span>
        <span
          class="text-lg leading-none transform transition-transform duration-200"
          :class="
            locale === 'ar' ? 'hover:-translate-x-1' : 'hover:translate-x-1'
          "
        >
          {{ locale === "ar" ? "←" : "→" }}
        </span>
      </a>
    </template>
  </BaseTable>
</template>
