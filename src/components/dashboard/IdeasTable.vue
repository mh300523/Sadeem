<script setup>
import { useI18n } from "vue-i18n";
import BaseTable from "@/components/ui/BaseTable.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

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

function getBadgeConfig(statusId) {
  return props.statusConfigs[statusId] || props.statusConfigs.new;
}
</script>

<template>
  <BaseTable
    :headers="headers"
    :items="ideas"
    tableClass="min-w-[1350px] ideas-table"
  >
    <!-- Custom cell for Idea ID -->
    <template #cell(id)="{ item }">
      <span class="text-white/75 text-sm">
        {{ item.id }}
      </span>
    </template>

    <!-- Custom cell for Title -->
    <template #cell(title)="{ item }">
      <div class="flex items-start gap-2.5">
        <SvgIcon name="solar_clipboard" />
        <span class="text-white/75 text-sm leading-relaxed line-clamp-2">
          {{ item.title }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Submitter -->
    <template #cell(submitter)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_user" />
        <span class="text-white/75 text-sm">
          {{ item.submitter }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Department -->
    <template #cell(department)="{ item }">
      <div class="flex items-center gap-2.5">
        <SvgIcon name="solar_pie-chart" />
        <span class="text-white/75 text-sm">
          {{ item.department }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Innovation Type -->
    <template #cell(innovationType)="{ item }">
      <div class="flex items-center gap-1.5">
        <SvgIcon name="bulb-green" />

        <span class="text-white/75 text-sm">
          {{ item.innovationType }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Time Horizon -->
    <template #cell(timeHorizon)="{ item }">
      <div class="flex items-center gap-1.5">
        <SvgIcon name="solar_chart" />
        <span class="text-white/75 text-sm">{{ item.timeHorizon }}</span>
      </div>
    </template>

    <!-- Custom cell for Innovation Track -->
    <template #cell(track)="{ item }">
      <div class="flex items-center gap-1.5">
        <SvgIcon name="solar_branching-paths-up" />
        <span class="line-clamp-2 text-sm" :title="item.track">
          {{ item.track }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Evaluators Count -->
    <template #cell(evaluatorsCount)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_users-group" />
        <span class="text-slate-300 text-sm">
          {{ item.evaluatorsCount }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Rating -->
    <template #cell(averageRating)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_star" />
        <span class="text-slate-300 text-sm">
          {{ item.averageRating }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Status Badge -->
    <template #cell(status)="{ item }">
      <div
        class="flex items-center justify-center gap-1 px-4 py-2 min-w-[130px] min-h-[32px] rounded-full text-sm text-white"
        :class="[getBadgeConfig(item.status.id).bgClass]"
      >
        <!-- Icon -->

        <SvgIcon :name="getBadgeConfig(item.status.id).iconName" />

        <!-- Text -->
        <span class="whitespace-nowrap">
          {{ item.status.name }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Submission Date -->
    <template #cell(submittedAt)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_calendar" />
        <span class="text-slate-400 text-sm">
          {{ item.submittedAt }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Action -->
    <template #cell(action)="{ item }">
      <RouterLink
        :to="{ name: 'IdeaDetails', params: { id: item.id } }"
        class="text-white/75 hover:text-white font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
      >
        <span>{{ $t("details.view") }}</span>
        <span
          class="text-lg leading-none transform transition-transform duration-200"
        >
          {{ locale === "ar" ? "←" : "→" }}
        </span>
      </RouterLink>
    </template>
  </BaseTable>
</template>

<style scoped></style>
