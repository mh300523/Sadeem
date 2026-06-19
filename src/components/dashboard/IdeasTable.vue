<script setup>
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

function getBadgeConfig(statusId) {
  return props.statusConfigs[statusId] || props.statusConfigs.new;
}
</script>

<template>
  <BaseTable
    :headers="headers"
    :items="ideas"
    tableClass="ideas-table border-separate border-spacing-y-3 min-w-[1350px]  border border-theme-card-border bg-theme-card/50 p-4 md:p-6 backdrop-blur-xl "
    headerClass="pt-0!"
    rowClass="rtl:bg-linear-to-l ltr:bg-linear-to-r from-theme-row-start to-theme-row-end backdrop-blur-xl rounded-[20px]"
    cellClass="border-y border-theme-border/10 group-hover:border-theme-border/20 first:border-s first:rounded-s-[20px] last:border-e last:rounded-e-[20px]"
  >
    <!-- Custom cell for Idea ID -->
    <template #cell(id)="{ item }">
      <span class="text-theme-text/75 text-sm">
        {{ item.id }}
      </span>
    </template>

    <!-- Custom cell for Title -->
    <template #cell(title)="{ item }">
      <div class="flex items-start gap-2.5">
        <SvgIcon name="solar_clipboard" />
        <span class="text-theme-text/75 text-sm leading-relaxed line-clamp-2">
          {{ item.title }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Submitter -->
    <template #cell(submitter)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_user" />
        <span class="text-theme-text/75 text-sm">
          {{ item.submitter }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Department -->
    <template #cell(department)="{ item }">
      <div class="flex items-center gap-2.5">
        <SvgIcon name="solar_pie-chart" />
        <span class="text-theme-text/75 text-sm">
          {{ item.department }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Innovation Type -->
    <template #cell(innovationType)="{ item }">
      <div class="flex items-center gap-1.5">
        <SvgIcon name="bulb-green" />

        <span class="text-theme-text/75 text-sm">
          {{ item.innovationType }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Time Horizon -->
    <template #cell(timeHorizon)="{ item }">
      <div class="flex items-center gap-1.5">
        <SvgIcon name="solar_chart" />
        <span class="text-theme-text/75 text-sm">{{ item.timeHorizon }}</span>
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
        <span class="text-theme-text/80 text-sm">
          {{ item.evaluatorsCount }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Rating -->
    <template #cell(averageRating)="{ item }">
      <div class="flex items-center gap-2">
        <SvgIcon name="solar_star" />
        <span class="text-theme-text/80 text-sm">
          {{ item.averageRating }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Status Badge -->
    <template #cell(status)="{ item }">
      <div
        class="flex items-center justify-center gap-1 px-4 py-2 min-w-[130px] min-h-[32px] rounded-full text-sm text-theme-text"
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
        <span class="text-theme-text/60 text-sm">
          {{ item.submittedAt }}
        </span>
      </div>
    </template>

    <!-- Custom cell for Action -->
    <template #cell(action)="{ item }">
      <RouterLink
        :to="{ name: 'IdeaDetails', params: { id: item.id } }"
        class="text-theme-text/75 hover:text-theme-text font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
      >
        <span>{{ $t("actions.view") }}</span>
        <svg
          class="w-4 h-4 rtl:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </RouterLink>
    </template>
  </BaseTable>
</template>

<style scoped></style>
