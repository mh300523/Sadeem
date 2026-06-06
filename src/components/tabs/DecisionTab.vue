<script setup>
import { ref, computed, watch } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseCheckableCard from "@/components/ui/BaseCheckableCard.vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

// Fallback decision list in case data prop is empty
const fallbackDecisionsList = [
  {
    key: "accept",
    label: "قبول",
    description: "تحويل الفكرة إلى مشروع ابتكاري داخل المنصة.",
  },
  {
    key: "revise",
    label: "إعادة تحسين",
    description: "إرجاع الفكرة للمخطط أو تحسين المحتوى.",
  },
  {
    key: "accelerate",
    label: "تسريع",
    description: "مرور الفكرة ضمن أولوية مرتفعة.",
  },
  {
    key: "freeze",
    label: "تجميد",
    description: "تحويل الفكرة إلى حالة مجمدة لمراجعتها.",
  },
  {
    key: "reject",
    label: "رفض",
    description: "إغلاق الفكرة مع توضيح نقاط الضعف والتوصيات.",
  },
];

const decisionsList = computed(
  () => props.data?.decisionsList || fallbackDecisionsList,
);
const dropdownOptions = computed(() => props.data?.dropdownOptions || {});
const configsSource = computed(() => props.data?.configs || null);

// Selected recommendation path state
const selectedDecision = ref("revise");

// Fallback configs when data prop is empty
const fallbackConfigs = {
  accept: {
    title: "مسار قرار قبول الفكرة",
    description:
      "تم اعتماد الفكرة وسيتم توجيهها للتحويل لمشروع ابتكاري فعلي وتعيين الفريق المسؤول.",
    actionTitle: "إجراءات التوجيه والاعتماد",
    showDropdowns: true,
    checkboxes: [
      {
        id: "c1",
        label: "طلب ميزانية أولية",
        desc: "طلب تمويل أولي لبدء مرحلة النمذجة أو الاختبار.",
        checked: true,
      },
      {
        id: "c2",
        label: "طلب دراسة جدوى",
        desc: "إجراء دراسة تفصيلية للجدوى المالية والاقتصادية.",
        checked: false,
      },
      {
        id: "c3",
        label: "طلب تقييم تقني",
        desc: "تقييم متعمق للمتطلبات التقنية والأمنية للفكرة.",
        checked: false,
      },
      {
        id: "c4",
        label: "طلب نموذج تجريبي",
        desc: "بناء PoC أو نموذج مبدئي لاختبار فرضيات الفكرة.",
        checked: false,
      },
      {
        id: "c5",
        label: "طلب دراسة حالة العمل",
        desc: "تطوير وثيقة Business Case شاملة للمشروع.",
        checked: false,
      },
      {
        id: "c6",
        label: "طلب تقييم تنافسي",
        desc: "تحليل الحلول المماثلة في السوق والمنافسين.",
        checked: false,
      },
    ],
    beneficiaries: [
      { id: "b1", label: "مدير المشروع", badge: "صلاحية تحرير", checked: true },
      { id: "b2", label: "صاحب الفكرة", badge: "متابعة فقط", checked: true },
      {
        id: "b3",
        label: "فريق الابتكار",
        badge: "متابعة وتحديث",
        checked: true,
      },
      {
        id: "b4",
        label: "فريق التنفيذ",
        badge: "صلاحية تحرير",
        checked: false,
      },
      { id: "b5", label: "PMO", badge: "متابعة وإفادة", checked: false },
      {
        id: "b6",
        label: "الراعي الاستراتيجي",
        badge: "متابعة فقط",
        checked: false,
      },
      {
        id: "b7",
        label: "رئيس القطاع المسؤول",
        badge: "موافقة واعتماد",
        checked: false,
      },
      {
        id: "b8",
        label: "فريق الحوكمة والمخاطر",
        badge: "صلاحية مراجعة",
        checked: false,
      },
    ],
    previewSubject: "الموضوع: تعيين مدير مشروع ابتكاري جديد",
    previewBody:
      'يسعدنا إبلاغك بتعيينك مديراً للمشروع الابتكاري "نظام تحسين استهلاك الطاقة باستخدام الذكاء الاصطناعي" ضمن منصة سديم، للبدء بالخطوات التمهيدية ومتابعة متطلبات المشروع الاستراتيجية.',
  },
  revise: {
    title: "مسار قرار إعادة التحسين",
    description:
      "إرجاع الفكرة للمبتكر لإعادة تحسين المحتوى أو توفير تفاصيل إضافية قبل المراجعة القادمة.",
    actionTitle: "إجراءات إعادة التحسين",
    showDropdowns: false,
    checkboxes: [
      {
        id: "r1",
        label: "طلب توضيحات إضافية",
        desc: "طلب تفاصيل حول الفكرة أو المشكلة أو الأثر المقترح.",
        checked: true,
      },
      {
        id: "r2",
        label: "طلب بيانات داعمة",
        desc: "طلب أرقام أو إحصاءات أو دراسات أو أدلة تدعم الفكرة.",
        checked: false,
      },
      {
        id: "r3",
        label: "دعوة مستشار / موجه ابتكار",
        desc: "إشراك مستشار يساهم في تحسين الفكرة تقنياً أو تنظيمياً وإعادة تقييمها.",
        checked: false,
      },
      {
        id: "r4",
        label: "تحسين نموذج العمل",
        desc: "طلب تحسين نموذج العمل التجاري أو نموذج طرح القيمة الخاص بالفكرة.",
        checked: false,
      },
    ],
    beneficiaries: [
      { id: "rb1", label: "صاحب الفكرة", badge: "إشعار أساسي", checked: true },
      {
        id: "rb2",
        label: "مستشار / موجه الابتكار",
        badge: "يظهر عند اختيار دعوة موجه",
        checked: false,
      },
    ],
    previewSubject: "الموضوع: طلب إعادة تحسين الفكرة الابتكارية",
    previewBody:
      'نشكر لك مشاركتك فكرتك القيمة "نظام تحسين استهلاك الطاقة باستخدام الذكاء الاصطناعي" عبر منصة سديم.\nتم اتخاذ قرار بإعادة الفكرة لمرحلة التحسين. يرجى مراجعة التعليقات المرفقة لتحديث الفكرة وتطوير نموذج العمل قبل إعادة التقديم.',
  },
  accelerate: {
    title: "مسار قرار تسريع المشروع",
    description:
      "تم اعتماد مسار تسريع الفكرة لتقليل مدة التطوير ونقل الفكرة لمرحلة التنفيذ فوراً بناءً على الاحتياج العاجل للمؤسسة.",
    actionTitle: "إجراءات تسريع التطوير",
    showDropdowns: true,
    checkboxes: [
      {
        id: "a1",
        label: "تسريع الاعتماد",
        desc: "تسهيل دورات الموافقة التنظيمية والمالية.",
        checked: true,
      },
      {
        id: "a2",
        label: "التخصيص المباشر للموارد",
        desc: "توفير الموارد التقنية والبشرية فوراً.",
        checked: true,
      },
      {
        id: "a3",
        label: "عقد ورش عمل مكثفة",
        desc: "عقد ورش عمل لتسريع التصميم والتنفيذ.",
        checked: false,
      },
      {
        id: "a4",
        label: "تجاوز الحوكمة التقليدية",
        desc: "تطبيق مسار رشيق ومستثنى لتسريع الانطلاق.",
        checked: false,
      },
      {
        id: "a5",
        label: "تطوير تجربة سريعة",
        desc: "تطوير نموذج أولي سريع جداً في بيئة اختبارية.",
        checked: false,
      },
      {
        id: "a6",
        label: "توفير ميزانية استثنائية",
        desc: "تمويل المشروع من ميزانية الطوارئ الابتكارية.",
        checked: false,
      },
      {
        id: "a7",
        label: "توفير الدعم المباشر من القيادة",
        desc: "رعاية مباشرة من الإدارة العليا لتذليل العقبات.",
        checked: false,
      },
      {
        id: "a8",
        label: "توفير بيئة اختبار آمنة",
        desc: "تأمين Sandbox أو مسار تجريبي سريع وآمن.",
        checked: false,
      },
    ],
    beneficiaries: [
      {
        id: "ab1",
        label: "مدير المشروع",
        badge: "صلاحية تحرير",
        checked: true,
      },
      { id: "ab2", label: "صاحب الفكرة", badge: "متابعة فقط", checked: true },
      {
        id: "ab3",
        label: "فريق الابتكار",
        badge: "متابعة وتحديث",
        checked: true,
      },
      {
        id: "ab4",
        label: "فريق التنفيذ",
        badge: "صلاحية تحرير",
        checked: false,
      },
    ],
    previewSubject: "الموضوع: اعتماد مسار تسريع الفكرة الابتكارية",
    previewBody:
      'نعلمكم بأنه قد تم اعتماد مسار تسريع فكرتكم الابتكارية "نظام تحسين استهلاك الطاقة باستخدام الذكاء الاصطناعي" للانطلاق الفوري في النماذج والتنفيذ السريع لتلبية متطلبات المؤسسة العاجلة.',
  },
  freeze: {
    title: "مسار قرار تجميد الفكرة",
    description:
      "تم تجميد الفكرة وتخزينها في قاعدة البيانات لمراجعتها لاحقاً بناءً على معطيات السوق والاحتياجات الاستراتيجية الحالية.",
    actionTitle: "أسباب التجميد",
    showDropdowns: true,
    checkboxes: [
      {
        id: "f1",
        label: "تأجيل التمويل",
        desc: "تأجيل رصد الميزانيات المالية للفكرة حالياً.",
        checked: true,
      },
      {
        id: "f2",
        label: "تأجيل التنفيذ",
        desc: "تأجيل إطلاق المشروع لعدم جاهزية بيئة العمل.",
        checked: false,
      },
      {
        id: "f3",
        label: "تغيير أولويات المؤسسة",
        desc: "تغير في خطة المؤسسة السنوية للمشاريع.",
        checked: false,
      },
      {
        id: "f4",
        label: "انتظار تقنيات جديدة",
        desc: "ترقب تقنيات داعمة تجعل الفكرة أكثر جدوى.",
        checked: false,
      },
      {
        id: "f5",
        label: "انتظار دراسات سوق إضافية",
        desc: "الحاجة لبيانات تسويقية واستهلاكية أحدث.",
        checked: false,
      },
      { id: "f6", label: "عدم كفاية الموارد حالياً", checked: false },
      { id: "f7", label: "الفكرة بحاجة للتطوير الذاتي", checked: false },
      { id: "f8", label: "أسباب تنظيمية أو تشريعية", checked: false },
    ],
    beneficiaries: [
      { id: "fb1", label: "صاحب الفكرة", badge: "متابعة فقط", checked: true },
      {
        id: "fb2",
        label: "فريق الابتكار",
        badge: "متابعة وتحديث",
        checked: true,
      },
      { id: "fb3", label: "PMO", badge: "متابعة وإفادة", checked: false },
    ],
    previewSubject: "الموضوع: تجميد الفكرة الابتكارية مؤقتاً",
    previewBody:
      'نشكركم على مشاركتكم المتميزة بتقديم فكرة "نظام تحسين استهلاك الطاقة باستخدام الذكاء الاصطناعي" عبر منصة سديم. نود إبلاغكم بتجميد الفكرة مؤقتاً لحين ملاءمة معطيات السوق وتوفر الموارد المناسبة.',
  },
  reject: {
    title: "قرار عدم اعتماد الفكرة",
    description:
      "تحت إشراف وتدقيق رئيس وأعضاء اللجنة، تم مراجعة الفكرة وتم اتخاذ القرار بعدم اعتمادها للعديد من الأسباب.",
    actionTitle: "أسباب عدم الاعتماد",
    showDropdowns: false,
    warningText:
      "تحت إشراف وتدقيق رئيس وأعضاء اللجنة، تم مراجعة الفكرة وتم اتخاذ القرار بعدم اعتمادها للعديد من الأسباب والملاحظات الفنية الموضحة أدناه.",
    rejectSummary: [
      {
        label: "النتيجة العامة للتقييم:",
        text: "أظهرت تقارير التقييم أن الفكرة تحمل أفكاراً جيدة، إلا أنها تفتقر إلى الجدوى الفنية والمالية، بالإضافة إلى ضعف التوافق الاستراتيجي مع الأهداف الحالية.",
      },
      {
        label: "ملخص نقاط الضعف:",
        text: "ضعف البيانات الداعمة وعدم وضوح آلية التنفيذ والأثر المؤسسي المتوقع والمخاطر التشغيلية المصاحبة لتطبيق الفكرة.",
      },
    ],
    checkboxes: [
      {
        id: "rj1",
        label: "ضعف وضوح المشكلة",
        desc: "المشكلة المستهدفة غير محددة أو غير مدعومة بالبيانات الكافية.",
        checked: true,
      },
      {
        id: "rj2",
        label: "نقص البيانات أو الأدلة الداعمة",
        desc: "افتقار الفكرة لدراسات أو أرقام حقيقية تؤكد جدواها.",
        checked: false,
      },
      {
        id: "rj3",
        label: "ضعف المواءمة الاستراتيجية",
        desc: "الفكرة لا تتماشى مع رؤية المؤسسة أو أهدافها الرئيسية.",
        checked: false,
      },
      {
        id: "rj4",
        label: "عدم وضوح نموذج العمل أو القيمة",
        desc: "نموذج التشغيل أو العائد من الاستثمار غير واضح.",
        checked: false,
      },
      {
        id: "rj5",
        label: "ضعف قابلية التنفيذ",
        desc: "التقنيات المطلوبة غير متوفرة أو معقدة للغاية في التطبيق.",
        checked: false,
      },
      {
        id: "rj6",
        label: "ضعف الأثر المؤسسي",
        desc: "العائد التشغيلي أو الأثر المتوقع محدود للغاية.",
        checked: false,
      },
      {
        id: "rj7",
        label: "ارتفاع المخاطر مقارنة بالقيمة",
        desc: "مخاطر التطبيق تفوق المكاسب الابتكارية المتوقعة.",
        checked: false,
      },
      {
        id: "rj8",
        label: "الفكرة غير ناجحة حالياً",
        desc: "تحديات تنظيمية أو تشريعية تمنع اعتماد الفكرة.",
        checked: false,
      },
    ],
    beneficiaries: [
      { id: "rjb1", label: "صاحب الفكرة", badge: "إشعار أساسي", checked: true },
      { id: "rjb2", label: "فريق الابتكار", badge: "حوكمة", checked: true },
    ],
    previewSubject: "الموضوع: تحديث بخصوص فكرتكم الابتكارية",
    previewBody:
      "نشكركم على مشاركتكم فكرتكم الابتكارية ودعم مسيرة التطوير. نود إبلاغكم بأنه بعد المراجعة والتقييم، تعذر اعتماد الفكرة حالياً نظراً لبعض الجوانب الفنية والمالية التي تعوق التنفيذ في الوقت الراهن.",
  },
};

// Deep-copy configs from source so checkbox toggles are reactive & mutable
const configs = ref({});

const initConfigs = () => {
  const source = configsSource.value || fallbackConfigs;
  configs.value = JSON.parse(JSON.stringify(source));
};

watch(configsSource, initConfigs, { immediate: true });

const currentConfig = computed(
  () => configs.value[selectedDecision.value] || {},
);

// Dropdown models
const directionType = ref("prototype");
const executionPriority = ref("high");
const innovationPathSelect = ref("pathway1");
const projectManager = ref("ahmed");
const projectMentor = ref("khaled");

// Consultant select models (for Revise path)
const consultantMentor = ref("advisor");
const sectionType = ref("pathway1");

const feedbackNotes = ref("");
const successModalOpen = ref(false);

// Computed dropdown option lists with fallback
const directionTypeOptions = computed(
  () =>
    dropdownOptions.value.directionType || [
      { value: "prototype", label: "تطوير نموذج أولي" },
      { value: "assessment", label: "تقييم فني" },
    ],
);
const executionPriorityOptions = computed(
  () =>
    dropdownOptions.value.executionPriority || [
      { value: "high", label: "عالية" },
      { value: "medium", label: "متوسطة" },
    ],
);
const innovationPathOptions = computed(
  () =>
    dropdownOptions.value.innovationPath || [
      { value: "pathway1", label: "المسار 1 - إدامة السوق" },
      { value: "pathway2", label: "المسار 2" },
    ],
);
const projectManagerOptions = computed(
  () =>
    dropdownOptions.value.projectManager || [
      { value: "ahmed", label: "تعيين مدير: أحمد خالد" },
      { value: "mostafa", label: "تعيين مدير: مصطفى كامل" },
    ],
);
const projectMentorOptions = computed(
  () =>
    dropdownOptions.value.projectMentor || [
      { value: "khaled", label: "تعيين موجه: خالد سعيد" },
      { value: "sara", label: "تعيين موجه: سارة علي" },
    ],
);
const consultantMentorOptions = computed(
  () =>
    dropdownOptions.value.consultantMentor || [
      { value: "advisor", label: "Innovation Consultant - Advisor" },
      { value: "mentor", label: "Senior Innovation Mentor" },
    ],
);
const sectionTypeOptions = computed(
  () =>
    dropdownOptions.value.sectionType || [
      { value: "pathway1", label: "حاضنة تسريع الفكرة" },
      { value: "pathway2", label: "القسم التقني" },
    ],
);

// Badge type mapping helper for beneficiary badges
const getBadgeType = (badge) => {
  if (badge === "إشعار أساسي" || badge === "موافقة واعتماد") return "primary";
  if (badge === "صلاحية تحرير") return "success";
  if (badge === "صلاحية مراجعة") return "warning";
  return "outline";
};

// Check if revise consultant invitation is selected
const isConsultantInviteChecked = computed(() => {
  const checkboxes = currentConfig.value?.checkboxes;
  if (!checkboxes) return false;
  const consultant = checkboxes.find((cb) => cb.id === "r3");
  return consultant?.checked ?? false;
});

const handleSendDecision = () => {
  successModalOpen.value = true;
};
</script>

<template>
  <div class="flex flex-col gap-6 text-right">
    <!-- Top Recommendation Cards Row -->
    <div class="flex flex-col gap-3">
      <div
        class="flex items-center justify-between border-b border-white/10 pb-3"
      >
        <h3 class="text-white text-sm md:text-base font-bold">
          اختيار التوصية النهائية
        </h3>
      </div>
      <p class="text-white/60 text-xs">
        استعرض وأثبت وأرشف هذه الفكرة، يرجى تحديد التوصية النهائية والإجراءات
        المترتبة عليها أدناه:
      </p>

      <!-- Grid of Recommendations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
        <div
          v-for="dec in decisionsList"
          :key="dec.key"
          @click="selectedDecision = dec.key"
          class="p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 min-h-[110px]"
          :class="
            selectedDecision === dec.key
              ? 'bg-[#018AAF]/10 border-[#018AAF] text-[#33BCE1]'
              : 'bg-[#161F30]/40 border-white/5 hover:border-white/15 text-white/80'
          "
        >
          <h4
            class="text-xs md:text-sm font-bold"
            :class="
              selectedDecision === dec.key ? 'text-[#33BCE1]' : 'text-white'
            "
          >
            {{ dec.label }}
          </h4>
          <p class="text-[10px] text-white/50 leading-normal">
            {{ dec.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Active path layout -->
    <div class="border-t border-white/10 pt-5 flex flex-col gap-4">
      <!-- Title & description -->
      <div>
        <h3 class="text-white text-sm md:text-base font-bold">
          {{ currentConfig.title }}
        </h3>
        <p class="text-white/60 text-xs mt-1 leading-normal">
          {{ currentConfig.description }}
        </p>
      </div>

      <!-- Reject specific warning card & feedback inputs -->
      <div v-if="selectedDecision === 'reject'" class="flex flex-col gap-4">
        <div
          class="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-normal"
        >
          {{ currentConfig.warningText }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in currentConfig.rejectSummary"
            :key="item.label"
            class="p-4 rounded-xl bg-[#161F30] border border-white/5 text-right flex flex-col gap-1.5"
          >
            <span class="text-white/40 text-[10px] font-bold">{{
              item.label
            }}</span>
            <p class="text-white/70 text-xs leading-relaxed">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- Action Select boxes (Accept / Accelerate / Freeze) -->
      <div
        v-if="currentConfig.showDropdowns && selectedDecision !== 'reject'"
        class="grid grid-cols-1 md:grid-cols-2 gap-5 border border-white/5 p-4 rounded-xl bg-[#161F30]/30"
      >
        <!-- Direction/Priorities Selects -->
        <div class="flex flex-col gap-3">
          <h4 class="text-white/60 text-xs font-bold mb-1">معايير التوجيه</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BaseSelect
              v-model="directionType"
              :options="directionTypeOptions"
              placeholder="نوع التوجيه"
            />
            <BaseSelect
              v-model="executionPriority"
              :options="executionPriorityOptions"
              placeholder="أولوية التنفيذ"
            />
            <BaseSelect
              v-model="innovationPathSelect"
              :options="innovationPathOptions"
              placeholder="مسار الابتكار"
            />
          </div>
        </div>

        <!-- Manager / Mentor Selector fields -->
        <div class="flex flex-col gap-3">
          <h4 class="text-white/60 text-xs font-bold mb-1">تعيين مدير وموجه</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BaseSelect
              v-model="projectManager"
              :options="projectManagerOptions"
              placeholder="مدير المشروع"
            />
            <BaseSelect
              v-model="projectMentor"
              :options="projectMentorOptions"
              placeholder="موجه المشروع"
            />
          </div>
        </div>
      </div>

      <!-- Action checklist items (using BaseCheckableCard) -->
      <div>
        <h4 class="text-white text-xs font-bold mb-3">
          {{ currentConfig.actionTitle }}
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseCheckableCard
            v-for="cb in currentConfig.checkboxes"
            :key="cb.id"
            v-model="cb.checked"
            :title="cb.label"
            :subtitle="cb.desc"
          />
        </div>
      </div>

      <!-- Revise specific: consultant invitation select dropdowns -->
      <div
        v-if="selectedDecision === 'revise' && isConsultantInviteChecked"
        class="grid grid-cols-1 md:grid-cols-2 gap-5 border border-white/5 p-4 rounded-xl bg-[#161F30]/30"
      >
        <div class="flex flex-col gap-2">
          <span class="text-white/60 text-[10px] font-bold"
            >تعيين مستشار / موجه الابتكار</span
          >
          <BaseSelect
            v-model="consultantMentor"
            :options="consultantMentorOptions"
            placeholder="اختر مستشار/موجه الابتكار"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-white/60 text-[10px] font-bold">Section Type</span>
          <BaseSelect
            v-model="sectionType"
            :options="sectionTypeOptions"
            placeholder="اختر حاضنة/مسار"
          />
        </div>
      </div>
    </div>

    <!-- Recipients Section -->
    <div class="border-t border-white/10 pt-5">
      <h3 class="text-white text-sm md:text-base font-bold mb-3">
        المستفيدون من الإشعارات
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <BaseCheckableCard
          v-for="ben in currentConfig.beneficiaries"
          :key="ben.id"
          v-model="ben.checked"
          :title="ben.label"
          :badge-text="ben.badge"
          :badge-type="getBadgeType(ben.badge)"
        />
      </div>
    </div>

    <!-- Notification Email Preview Section -->
    <div class="border-t border-white/10 pt-5 flex flex-col gap-3">
      <h3 class="text-white text-sm md:text-base font-bold">
        معاينة الإشعارات
      </h3>
      <p class="text-white/60 text-xs">
        يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني ونموذج الإشعار
        أدناه:
      </p>

      <!-- Preview layout container -->
      <div
        class="border border-white/5 rounded-2xl bg-[#161F30]/30 p-5 flex flex-col gap-4 mt-2"
      >
        <!-- Email Header details -->
        <div
          class="p-4 rounded-xl bg-[#161F30]/80 border border-white/5 text-right flex flex-col gap-3"
        >
          <p class="font-bold text-white text-xs md:text-sm">
            {{ currentConfig.previewSubject }}
          </p>

          <div
            class="border-t border-white/5 pt-3 text-white/80 text-xs leading-relaxed font-sans"
          >
            <p class="font-semibold text-white mb-2">عزيزي مستلم البريد،</p>
            <p class="whitespace-pre-line">{{ currentConfig.previewBody }}</p>

            <!-- Styled Email Button Mockup -->
            <div class="my-4">
              <button
                class="px-5 py-2.5 rounded-lg bg-[#018AAF] text-white text-xs font-bold pointer-events-none"
              >
                زر منصة المشروع الابتكاري
              </button>
            </div>

            <p class="text-white/40 text-[10px] mt-4">
              مع خالص التقدير،<br />
              فريق منصة سديم للابتكار
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Note and Send bottom row -->
    <div class="border-t border-white/10 pt-5 flex flex-col gap-4">
      <h3 class="text-white text-sm md:text-base font-bold mb-1">
        ملاحظات القرار والإشعار
      </h3>
      <textarea
        v-model="feedbackNotes"
        placeholder="اكتب ملاحظات القرار النهائي أو التوجيهات أو الملاحظات الخاصة بالحوكمة..."
        rows="3"
        class="w-full p-4 rounded-xl bg-[#161F30] border border-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#32BEA6]/50 resize-none transition-colors"
      ></textarea>

      <!-- Bottom button actions -->
      <div
        class="flex flex-col sm:flex-row justify-end items-center gap-3 mt-2"
      >
        <button
          @click="handleSendDecision"
          class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm md:text-base font-bold text-white bg-[#32BEA6] hover:bg-[#28a38e] transition-colors cursor-pointer text-center font-sans"
        >
          ارسال القرار
        </button>
        <button
          class="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm md:text-base font-bold text-white/80 bg-[#1A2338]/50 border border-white/10 hover:bg-[#1A2338] transition-colors cursor-pointer text-center font-sans"
        >
          حفظ كمسودة
        </button>
        <button
          class="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm md:text-base font-bold text-white/80 bg-[#1A2338]/50 border border-white/10 hover:bg-[#1A2338] transition-colors cursor-pointer text-center font-sans"
        >
          معاينة جميع الإشعارات
        </button>
      </div>
    </div>

    <!-- Success Confirmation Modal -->
    <BaseActionModal
      :is-open="successModalOpen"
      title="قرار التوجيه والاعتماد"
      :has-mascot="true"
      mascot-name="robot"
      @close="successModalOpen = false"
    >
      <div class="p-6">
        <div
          class="flex flex-col items-center justify-center text-center py-6 gap-4"
        >
          <div
            class="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]"
          >
            <svg
              class="w-8 h-8 stroke-[3px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-white text-lg font-bold">
            تم إرسال واعتماد القرار بنجاح
          </h3>
          <p class="text-white/60 text-xs md:text-sm">
            تم إرسال الإشعارات والقرارات لكافة الأطراف والمستفيدين المعنيين.
          </p>
        </div>
      </div>
    </BaseActionModal>
  </div>
</template>
