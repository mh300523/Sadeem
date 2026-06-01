<script setup>
import { computed } from "vue";
import TimelineStepper from "@/components/tabsBlocks/TimelineStepper.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({
      sidebar: { title: "", journey: { title: "", steps: [] } },
      interactiveExperience: { title: "", subtitle: "", stats: [], buttons: {} },
      canvas: { title: "", subtitle: "", sections: [] },
    }),
  },
});

const businessData = computed(() => props.data || {});
const sidebarData = computed(() => businessData.value.sidebar || {});
const interactiveData = computed(() => businessData.value.interactiveExperience || {});
const canvasData = computed(() => businessData.value.canvas || {});

// Group canvas sections by key/column to match the layout
const customerSections = computed(() => {
  const sections = canvasData.value.sections || [];
  const keys = ["segments", "relationships", "channels"];
  return keys.map((k) => sections.find((s) => s.key === k)).filter(Boolean);
});

const valueSections = computed(() => {
  const sections = canvasData.value.sections || [];
  const keys = ["value_proposition", "activities", "partners"];
  return keys.map((k) => sections.find((s) => s.key === k)).filter(Boolean);
});

const infrastructureSections = computed(() => {
  const sections = canvasData.value.sections || [];
  const keys = ["resources", "costs", "revenue"];
  return keys.map((k) => sections.find((s) => s.key === k)).filter(Boolean);
});

function getStatColorClass(idx) {
  const colors = [
    "text-[#a78bfa]", // Violet
    "text-[#22d3ee]", // Cyan
    "text-[#60a5fa]", // Blue
    "text-[#fb923c]", // Orange
  ];
  return colors[idx % colors.length];
}

function getSectionIconColor(key) {
  const colors = {
    resources: "text-blue-400",
    costs: "text-orange-400",
    revenue: "text-yellow-500",
    value_proposition: "text-red-500",
    activities: "text-yellow-400",
    partners: "text-amber-400",
    segments: "text-cyan-400",
    relationships: "text-yellow-400",
    channels: "text-blue-400",
  };
  return colors[key] || "text-white";
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar Column (will render on the right in RTL, and left in LTR) -->
    <div class="lg:col-span-3">
      <!-- Space Card -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-[#1E293B]/70 to-[#0F172A]/70 rounded-[20px] border border-white/10 p-5 mb-4 flex items-center justify-between"
      >
        <div class="flex-1">
          <h3
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] font-bold text-lg leading-snug"
          >
            {{ sidebarData.title || "مشروع ابتكاري متقدم..." }}
          </h3>
        </div>
        <!-- Rocket / Space SVG -->
        <div class="w-14 h-14 text-cyan-400 shrink-0">
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
      </div>

      <!-- Timeline Stepper -->
      <TimelineStepper
        :title="sidebarData.journey?.title"
        :steps="sidebarData.journey?.steps"
      />
    </div>

    <!-- Main Content Column (will render on the left in RTL, and right in LTR) -->
    <div class="lg:col-span-9 flex flex-col gap-6">
      <!-- Interactive Experience Card -->
      <div
        class="border border-white/10 rounded-[20px] p-6 bg-gradient-to-b from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl"
      >
        <div class="mb-4">
          <h3 class="text-white text-lg font-bold">
            {{ interactiveData.title }}
          </h3>
          <p class="text-white/50 text-xs md:text-sm mt-1">
            {{ interactiveData.subtitle }}
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div
            v-for="(stat, idx) in interactiveData.stats"
            :key="idx"
            class="border border-white/10 rounded-[16px] p-4 text-center backdrop-blur-xl bg-gradient-to-b from-[#1E293B]/70 to-[#1E293B]/40 hover:scale-[1.03] transition-all duration-300"
          >
            <span
              class="block text-3xl font-extrabold mb-1"
              :class="getStatColorClass(idx)"
            >
              {{ stat.value }}
            </span>
            <span class="text-white/50 text-[11px] md:text-xs leading-normal">
              {{ stat.label }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-end">
          <button
            class="bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] text-white text-xs md:text-sm font-medium py-2.5 px-6 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {{ interactiveData.buttons?.brochure }}
          </button>
          <button
            class="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-xs md:text-sm font-medium py-2.5 px-6 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {{ interactiveData.buttons?.details }}
          </button>
        </div>
      </div>

      <!-- Business Model Canvas Section -->
      <div class="flex flex-col gap-6">
        <!-- Banner Header -->
        <div
          class="py-4 px-5 rounded-2xl bg-gradient-to-r from-[#06B6D4]/90 via-[#3B82F6] to-[#FF6B35]/50 text-white flex flex-col gap-1"
        >
          <h3 class="text-lg font-bold leading-normal">
            {{ canvasData.title }}
          </h3>
          <p class="text-white/70 text-xs md:text-sm">
            {{ canvasData.subtitle }}
          </p>
        </div>

        <!-- Canvas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Column 1 (Right in RTL / Customer-facing) -->
          <div class="flex flex-col gap-5">
            <div
              v-for="section in customerSections"
              :key="section.key"
              class="border border-white/10 rounded-[16px] p-5 backdrop-blur-xl bg-gradient-to-b from-[#1E293B]/70 to-[#1E293B]/30 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col gap-2.5"
            >
              <div
                class="flex items-center gap-2 pb-2 border-b border-white/5"
              >
                <SvgIcon
                  :name="section.icon"
                  :classes="`w-5 h-5 ${getSectionIconColor(section.key)}`"
                />
                <h4 class="text-white text-sm font-bold leading-none">
                  {{ section.title }}
                </h4>
              </div>
              <p
                class="text-white/60 text-xs leading-relaxed text-justify whitespace-pre-line"
              >
                {{ section.content }}
              </p>
            </div>
          </div>

          <!-- Column 2 (Middle / Value & Core Activities) -->
          <div class="flex flex-col gap-5">
            <div
              v-for="section in valueSections"
              :key="section.key"
              class="border border-white/10 rounded-[16px] p-5 backdrop-blur-xl bg-gradient-to-b from-[#1E293B]/70 to-[#1E293B]/30 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col gap-2.5"
            >
              <div
                class="flex items-center gap-2 pb-2 border-b border-white/5"
              >
                <SvgIcon
                  :name="section.icon"
                  :classes="`w-5 h-5 ${getSectionIconColor(section.key)}`"
                />
                <h4 class="text-white text-sm font-bold leading-none">
                  {{ section.title }}
                </h4>
              </div>
              <p
                class="text-white/60 text-xs leading-relaxed text-justify whitespace-pre-line"
              >
                {{ section.content }}
              </p>
            </div>
          </div>

          <!-- Column 3 (Left in RTL / Infrastructure & Finance) -->
          <div class="flex flex-col gap-5">
            <div
              v-for="section in infrastructureSections"
              :key="section.key"
              class="border border-white/10 rounded-[16px] p-5 backdrop-blur-xl bg-gradient-to-b from-[#1E293B]/70 to-[#1E293B]/30 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col gap-2.5"
            >
              <div
                class="flex items-center gap-2 pb-2 border-b border-white/5"
              >
                <SvgIcon
                  :name="section.icon"
                  :classes="`w-5 h-5 ${getSectionIconColor(section.key)}`"
                />
                <h4 class="text-white text-sm font-bold leading-none">
                  {{ section.title }}
                </h4>
              </div>
              <p
                class="text-white/60 text-xs leading-relaxed text-justify whitespace-pre-line"
              >
                {{ section.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
