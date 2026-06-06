<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import RadarChart from "@/components/tabsBlocks/RadarChart.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const { t } = useI18n();

// View toggle state: "sliders" (Criteria view) or "bias" (Bias comparison dashboard view)
const currentView = ref("sliders");

// 8 Evaluation Criteria
const criteria = ref([
  {
    key: "creativity",
    label: "الإبداع",
    description:
      "يقيس أصالة الفكرة ومدى اختلافها عن الحلول التقليدية أو الموجودة.",
    weight: "20%",
    value: 3,
  },
  {
    key: "need",
    label: "الحاجة / الطلب",
    description: "مدى حاجة الفئة المستهدفة أو المؤسسة لتطبيق هذه الفكرة.",
    weight: "20%",
    value: 3,
  },
  {
    key: "feasibility",
    label: "قابلية التنفيذ",
    description: "مدى إمكانية تنفيذ الفكرة عملياً باستخدام الموارد الحالية.",
    weight: "20%",
    value: 3,
  },
  {
    key: "sustainability",
    label: "الاستدامة",
    description:
      "قدرة الفكرة على الاستمرار وإحداث الأثر الإيجابي على المدى الطويل.",
    weight: "20%",
    value: 3,
  },
  {
    key: "impact",
    label: "الأثر المؤسسي",
    description:
      "مدى مساهمة الفكرة في تحسين أداء المؤسسة أو كفاءتها التشغيلية.",
    weight: "20%",
    value: 3,
  },
  {
    key: "alignment",
    label: "التوافق الاستراتيجي",
    description: "مدى توافق الفكرة مع الأهداف الاستراتيجية ورؤية المؤسسة.",
    weight: "20%",
    value: 3,
  },
  {
    key: "risk",
    label: "تقليل المخاطر",
    description:
      "مدى مساهمة الفكرة في معالجة أو تقليل المخاطر التي تواجه المؤسسة.",
    weight: "20%",
    value: 3,
  },
  {
    key: "reputation",
    label: "السمعة المؤسسية",
    description:
      "مدى مساهمة الفكرة في تعزيز الصورة الذهنية والسمعة العامة للمؤسسة.",
    weight: "20%",
    value: 3,
  },
]);

// Radar labels (in English matching Screen layout)
const radarLabels = [
  "Creativity",
  "Need/Demand",
  "Feasibility",
  "Sustainability",
  "Institutional impact",
  "Strategic Alignment",
  "Risk Mitigation",
  "Institutional Reputation",
];

// Default baseline scores
const aiScores = [4, 3, 4, 3, 5, 4, 4, 3];
const teamScores = [3, 4, 3, 4, 4, 3, 3, 4];

// Dynamic sliders scores series
const sliderScores = computed(() => criteria.value.map((c) => c.value));

// Evaluators database for Bias Dashboard View
const evaluators = ref([
  {
    name: "Khaled",
    bias: "+4.2%",
    classification: "Balanced",
    averageRating: 75,
    teamAverage: 72,
    badgeClass: "bg-[#10B981] border-[#10B981]/30 text-white",
    scores: [4, 3, 4, 3, 5, 4, 4, 3],
  },
  {
    name: "Sara",
    bias: "-5.6%",
    classification: "Generous",
    averageRating: 68,
    teamAverage: 72,
    badgeClass: "bg-blue-500 border-blue-500/30 text-white",
    scores: [4, 4, 3, 5, 4, 3, 4, 4],
  },
  {
    name: "Omar",
    bias: "-1.4%",
    classification: "Balanced",
    averageRating: 71,
    teamAverage: 72,
    badgeClass: "bg-[#10B981] border-[#10B981]/30 text-white",
    scores: [3, 4, 3, 3, 4, 4, 3, 4],
  },
  {
    name: "Lina",
    bias: "-16.7%",
    classification: "Strict",
    averageRating: 60,
    teamAverage: 72,
    badgeClass: "bg-[#EF4444] border-[#EF4444]/30 text-white",
    scores: [2, 3, 2, 4, 3, 2, 3, 2],
  },
  {
    name: "Shams",
    bias: "-5.6%",
    classification: "Strict",
    averageRating: 68,
    teamAverage: 72,
    badgeClass: "bg-[#EF4444] border-[#EF4444]/30 text-white",
    scores: [3, 2, 3, 3, 3, 3, 2, 3],
  },
]);

const selectedEvaluatorIndex = ref(0);
const selectedEvaluator = computed(
  () => evaluators.value[selectedEvaluatorIndex.value],
);

// Dynamic strongest/weakest trait computations based on sliders
const strongestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => b.value - a.value);
  const maxVal = sorted[0].value;
  const top = sorted.filter((c) => c.value === maxVal).slice(0, 2);
  return top.map((t) => `${t.label} (${t.value}/5)`).join("، ");
});

const weakestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => a.value - b.value);
  const minVal = sorted[0].value;
  const bottom = sorted.filter((c) => c.value === minVal).slice(0, 2);
  return bottom.map((b) => `${b.label} (${b.value}/5)`).join("، ");
});

// Map series data for display
const sliderSeries = computed(() => [
  {
    name: "التقييم الحالي",
    values: sliderScores.value,
    strokeColor: "#3B82F6",
    fillColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: "متوسط الفريق",
    values: teamScores,
    strokeColor: "#F59E0B",
    fillColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    name: "تقييم الذكاء الاصطناعي الأولي",
    values: aiScores,
    strokeColor: "#10B981",
    fillColor: "rgba(16, 185, 129, 0.08)",
  },
]);

const biasSeries = computed(() => [
  {
    name: "التقييم الحالي",
    values: selectedEvaluator.value.scores,
    strokeColor: "#3B82F6",
    fillColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: "متوسط الفريق",
    values: teamScores,
    strokeColor: "#F59E0B",
    fillColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    name: "تقييم الذكاء الاصطناعي الأولي",
    values: aiScores,
    strokeColor: "#10B981",
    fillColor: "rgba(16, 185, 129, 0.08)",
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
    <!-- Right Sidebar (تقييم الفكرة - Static across dashboard view states) -->
    <div class="lg:col-span-3 flex flex-col gap-4">
      <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
        <!-- Sidebar Title with Stars -->
        <div
          class="flex justify-between items-center border-b border-white/10 pb-3"
        >
          <div class="flex gap-1 text-[#FFB017]">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </div>
          <h3 class="text-white text-sm md:text-base font-bold">
            تقييم الفكرة
          </h3>
        </div>

        <!-- Gradient Info Box -->
        <div
          class="p-5 rounded-2xl bg-gradient-to-r from-[rgba(1,138,175,0.2)] to-[rgba(127,79,255,0.2)] border border-white/10 text-right flex flex-col gap-3 relative overflow-hidden"
        >
          <span class="text-white/40 text-[10px] font-bold">IDEA-1023</span>
          <h4 class="text-white text-sm font-bold leading-normal">
            تحسين الاستجابة الذكية للطوارئ
          </h4>
          <span class="text-white/60 text-xs">أحمد علي - قسم البيئة</span>

          <span
            class="w-fit px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-[10px] font-bold"
          >
            الرادار المباشر مفعل
          </span>
        </div>

        <!-- Metric rating cards -->
        <div class="flex flex-col gap-3">
          <!-- Card 1: تقييمك -->
          <div
            class="p-4 rounded-xl bg-[#161F30] border border-white/5 flex justify-between items-center"
          >
            <span class="text-white/50 text-xs font-semibold">تقييمك</span>
            <span class="text-white text-base md:text-lg font-bold">54.0</span>
          </div>

          <!-- Card 2: متوسط الفريق -->
          <div
            class="p-4 rounded-xl bg-[#161F30] border border-white/5 flex justify-between items-center"
          >
            <span class="text-white/50 text-xs font-semibold"
              >متوسط الفريق</span
            >
            <span class="text-white text-base md:text-lg font-bold">74.0</span>
          </div>

          <!-- Card 3: تقييم الذكاء الاصطناعي الأولي -->
          <div
            class="p-4 rounded-xl bg-[#161F30] border border-white/5 flex justify-between items-center"
          >
            <span class="text-white/50 text-xs font-semibold"
              >تقييم الذكاء الاصطناعي الأولي</span
            >
            <span class="text-white text-base md:text-lg font-bold">78.0</span>
          </div>
        </div>

        <!-- Transition bias button (Shown in sliders view) -->
        <button
          v-if="currentView === 'sliders'"
          @click="currentView = 'bias'"
          class="w-full py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition-all text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-2"
        >
          <span>عرض نسبة التحيز</span>
          <svg
            class="w-4 h-4 transform rotate-180"
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
        </button>
      </BaseBox>
    </div>

    <!-- Main Content Panels -->
    <!-- VIEW A: Criteria Sliders -->
    <template v-if="currentView === 'sliders'">
      <!-- Left card: Radar spider map & AI analysis results -->
      <div class="lg:col-span-3 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
          <h3
            class="text-white text-sm md:text-base font-bold border-b border-white/10 pb-2"
          >
            Radar Spider Chart
          </h3>

          <!-- Spider radar SVG map -->
          <div class="w-full h-[220px] flex items-center justify-center">
            <RadarChart
              :labels="radarLabels"
              :series="sliderSeries"
              :size="200"
            />
          </div>

          <!-- Color legends -->
          <div class="flex flex-col gap-2 border-t border-white/10 pt-3">
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span>
              <span>التقييم الحالي</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]"></span>
              <span>متوسط الفريق</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span>
              <span>تقييم الذكاء الاصطناعي الأولي</span>
            </div>
          </div>

          <!-- AI Analysis insights panel -->
          <div
            class="flex flex-col gap-3.5 mt-2 border-t border-white/10 pt-4 text-right"
          >
            <button
              class="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#018AAF] to-[#8B5CF6] text-white text-xs font-bold text-center"
            >
              تحليلات الذكاء الاصطناعي
            </button>

            <!-- Strongest aspect -->
            <div>
              <span class="text-white/40 text-[10px] font-bold block mb-1"
                >أقوى الجوانب:</span
              >
              <p class="text-[#10B981] text-xs font-bold">
                {{ strongestAspects }}
              </p>
            </div>

            <!-- Weakest aspect -->
            <div>
              <span class="text-white/40 text-[10px] font-bold block mb-1"
                >أضعف الجوانب:</span
              >
              <p class="text-[#EF4444] text-xs font-bold">
                {{ weakestAspects }}
              </p>
            </div>

            <!-- Direct notes -->
            <div>
              <span class="text-white/40 text-[10px] font-bold block mb-1"
                >ملاحظة مباشرة:</span
              >
              <p class="text-white/70 text-[11px] leading-relaxed">
                قد تحتاج هذه الفكرة إلى توضيح إضافي أو إعادة تصميم قبل الموافقة
                عليها.
              </p>
            </div>
          </div>
        </BaseBox>
      </div>

      <!-- Center: 8 Criteria sliders -->
      <div class="lg:col-span-6 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
          <div class="border-b border-white/10 pb-3">
            <h3 class="text-white text-sm md:text-base font-bold">
              معايير التقييم
            </h3>
          </div>

          <!-- Criteria sliders wrapper list -->
          <div class="flex flex-col gap-4.5">
            <div
              v-for="crit in criteria"
              :key="crit.key"
              class="p-4 rounded-xl bg-[#161F30]/50 border border-white/5 flex flex-col gap-3 text-right relative overflow-hidden slider-card"
            >
              <!-- Top weight / Reset details -->
              <div class="flex justify-between items-center w-full">
                <!-- Weight & label -->
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#018AAF]/20 text-[#33BCE1] border border-[#018AAF]/30"
                  >
                    {{ crit.weight }}
                  </span>
                  <h4 class="text-white text-sm font-bold">
                    {{ crit.label }}
                  </h4>
                </div>

                <!-- Reset handle -->
                <button
                  @click="crit.value = 3"
                  class="text-white/30 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  title="إعادة التعيين للقيمة الافتراضية"
                >
                  <svg
                    class="w-3.5 h-3.5"
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

              <!-- Brief description -->
              <p class="text-white/60 text-[11px] leading-relaxed">
                {{ crit.description }}
              </p>

              <!-- Slider control row -->
              <div class="flex items-center justify-between gap-6 w-full pt-1">
                <!-- Value select circle bubble -->
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-white/40 text-[10px]"
                    >التقييم المختار:</span
                  >
                  <span
                    class="w-6 h-6 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-[11px]"
                  >
                    {{ crit.value }}
                  </span>
                </div>

                <!-- Slider and grid layout values scale -->
                <div class="flex-1 flex flex-col gap-1 w-full">
                  <input
                    type="range"
                    v-model.number="crit.value"
                    min="1"
                    max="5"
                    step="1"
                    class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF6B35] focus:outline-none"
                  />
                  <div
                    class="flex justify-between text-[9px] text-white/35 px-1 font-semibold"
                  >
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseBox>
      </div>
    </template>

    <!-- VIEW B: Evaluator Bias Dashboard (Screen 1 Layout) -->
    <template v-else-if="currentView === 'bias'">
      <!-- Left side (Evaluators list column) -->
      <div class="lg:col-span-3 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-4">
          <!-- Header and Manager mode button -->
          <div
            class="flex justify-between items-center border-b border-white/10 pb-3"
          >
            <button
              class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[rgba(1,138,175,0.2)] to-[rgba(127,79,255,0.2)] border border-[#7F4FFF]/30 text-[#7F4FFF] text-[10px] font-bold hover:bg-white/5 transition-colors cursor-pointer"
            >
              وضع مسؤول المقيمين
            </button>
            <h3 class="text-white text-sm md:text-base font-bold">المقيمين</h3>
          </div>

          <!-- List of Evaluators -->
          <div class="flex flex-col gap-3.5">
            <div
              v-for="(evaluator, index) in evaluators"
              :key="evaluator.name"
              @click="selectedEvaluatorIndex = index"
              class="p-3.5 rounded-xl border transition-all cursor-pointer text-right flex flex-col gap-2"
              :class="
                selectedEvaluatorIndex === index
                  ? 'bg-[#161F30] border-[#018AAF]'
                  : 'bg-[#161F30]/50 border-white/5 hover:border-white/15'
              "
            >
              <!-- Top Row: Name and Bias Rating Badge -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-white/40"
                    >التحيز:</span
                  >
                  <span class="text-xs font-bold text-[#33BCE1]">{{
                    evaluator.bias
                  }}</span>
                  <span
                    class="px-2 py-0.5 rounded-md text-[9px] font-bold border"
                    :class="evaluator.badgeClass"
                  >
                    {{ evaluator.classification }}
                  </span>
                </div>
                <h4 class="text-white text-xs font-bold">
                  {{ evaluator.name }}
                </h4>
              </div>

              <!-- Rating data stats -->
              <div class="flex items-center gap-4 text-[10px] text-white/50">
                <span
                  >معدل تقييم المقيم:
                  <strong class="text-white">{{
                    evaluator.averageRating
                  }}</strong></span
                >
                <span
                  >متوسط الفريق:
                  <strong class="text-white">{{
                    evaluator.teamAverage
                  }}</strong></span
                >
              </div>

              <!-- Mini progress bar -->
              <div
                class="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1"
              >
                <div
                  class="h-full bg-gradient-to-r"
                  :class="
                    evaluator.classification === 'Strict'
                      ? 'from-red-500 to-red-400'
                      : evaluator.classification === 'Generous'
                        ? 'from-blue-500 to-blue-400'
                        : 'from-emerald-500 to-emerald-400'
                  "
                  :style="{
                    width: `${(evaluator.averageRating / 100) * 100}%`,
                  }"
                ></div>
              </div>

              <!-- Link -->
              <span
                class="text-[9px] text-[#33BCE1] hover:underline block text-left mt-1"
              >
                اضغط لمقارنة هذا التقييم على الرسم البياني
              </span>
            </div>
          </div>
        </BaseBox>
      </div>

      <!-- Center: Bias radar details & stats -->
      <div class="lg:col-span-6 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
          <!-- Dashboard header with back button -->
          <div
            class="flex justify-between items-center border-b border-white/10 pb-3"
          >
            <h3
              class="text-white text-base md:text-lg font-bold flex items-center gap-3"
            >
              <!-- Back arrow button -->
              <button
                @click="currentView = 'sliders'"
                class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                title="الرجوع لمعايير التقييم"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <span>لوحة تحيز المقيمين - سديم</span>
            </h3>
          </div>

          <!-- Description text -->
          <p class="text-white/60 text-xs leading-relaxed">
            تجنب سلوك التحيز واتجاهات التميز لديهم ومدى اتساق التقييمات عبر فريق
            التقييم.
          </p>

          <!-- Row display selected evaluator metrics -->
          <div
            class="grid grid-cols-3 gap-4 border border-white/5 p-4 rounded-xl bg-[#161F30]/50 text-center"
          >
            <!-- Classification -->
            <div>
              <span class="text-white/40 text-[10px] block mb-1">التصنيف</span>
              <p class="text-[#06B6D4] text-sm md:text-base font-bold">
                {{ selectedEvaluator.classification }}
              </p>
            </div>

            <!-- Bias percentage -->
            <div>
              <span class="text-white/40 text-[10px] block mb-1"
                >نسبة التحيز</span
              >
              <p class="text-white text-sm md:text-base font-bold">
                {{ selectedEvaluator.bias }}
              </p>
            </div>

            <!-- Selected Evaluator -->
            <div>
              <span class="text-white/40 text-[10px] block mb-1"
                >المقيم المحدد</span
              >
              <p class="text-white text-sm md:text-base font-bold">
                {{ selectedEvaluator.name }}
              </p>
            </div>
          </div>

          <!-- Big Radar Chart in Center -->
          <div class="w-full h-[280px] flex items-center justify-center my-2">
            <RadarChart
              :labels="radarLabels"
              :series="biasSeries"
              :size="260"
            />
          </div>

          <!-- Color legends row -->
          <div class="flex justify-center gap-6 border-b border-white/10 pb-4">
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span>
              <span>التقييم الحالي</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]"></span>
              <span>متوسط الفريق</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-white/70">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span>
              <span>تقييم الذكاء الاصطناعي الأولي</span>
            </div>
          </div>

          <!-- Bias Metrics Section bottom -->
          <div class="flex flex-col gap-4 pt-1">
            <button
              class="w-full py-2 rounded-xl bg-gradient-to-r from-[#018AAF] to-[#8B5CF6] text-white text-xs font-bold text-center"
            >
              مقاييس التحيز
            </button>

            <p class="text-white/50 text-[10px] leading-relaxed">
              التحيز يقاس مقابل متوسط تقييم الفريق للأفكار المقيمة.
            </p>

            <!-- Metrics details columns -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- balance rate -->
              <div
                class="p-3.5 rounded-xl bg-[#161F30] border border-white/5 text-right flex flex-col gap-1"
              >
                <span class="text-white/40 text-[9px] block"
                  >معدل الموازنة</span
                >
                <p
                  class="text-white text-xs font-bold leading-normal"
                  dir="ltr"
                >
                  -5% to +5%
                </p>
              </div>

              <!-- average bias -->
              <div
                class="p-3.5 rounded-xl bg-[#161F30] border border-white/5 text-right flex flex-col gap-1"
              >
                <span class="text-white/40 text-[9px] block">متوسط التحيز</span>
                <p
                  class="text-white text-xs font-bold leading-normal"
                  dir="ltr"
                >
                  %6% to 12%
                </p>
              </div>

              <!-- highest bias -->
              <div
                class="p-3.5 rounded-xl bg-[#161F30] border border-white/5 text-right flex flex-col gap-1"
              >
                <span class="text-white/40 text-[9px] block">أعلى تحيز</span>
                <p class="text-white text-xs font-bold leading-normal">
                  أعلى *12%
                </p>
              </div>
            </div>

            <!-- Informational footnotes -->
            <div
              class="mt-1 flex flex-col gap-1 text-[10px] text-white/40 pr-1 leading-relaxed"
            >
              <p>
                • المقيمين الـ
                <strong class="text-red-400">Strict</strong> تقييمهم أقل من
                متوسط الفريق.
              </p>
              <p>
                • المقيمين الـ
                <strong class="text-blue-400">Generous</strong> تقييمهم أعلى من
                متوسط الفريق.
              </p>
              <p>
                • المقيمين الـ
                <strong class="text-emerald-400">Balanced</strong> تقييمهم قريب
                من متوسط الفريق.
              </p>
            </div>
          </div>
        </BaseBox>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Range slider track and thumb customization */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
}

input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
  border: none;
}

/* Gradient rainbow bottom border on each slider card */
.slider-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ff6b35);
  border-radius: 0 0 12px 12px;
}
</style>
