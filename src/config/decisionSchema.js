export const decisionSchema = {
  accept: {
    key: "accept",
    label: "قبول",
    description: "تحويل الفكرة إلى مشروع ابتكاري داخل المنصة.",
    pathTitle: "مسار تنفيذ قرار القبول",
    sections: [
      {
        type: "dropdowns",
        title: "إعدادات التنفيذ الأساسية",
        fields: [
          {
            id: "f1",
            label: "تعيين مدير المشروع",
            optionsKey: "projectManager",
          },
          {
            id: "f2",
            label: "اختيار مركبة الابتكار",
            optionsKey: "innovationVehicle",
          },
          {
            id: "f3",
            label: "تحديد مالك التنفيذ",
            optionsKey: "executionOwner",
          },
          { id: "f4", label: "درجة الأولوية", optionsKey: "priority" },
          {
            id: "f5",
            label: "القطاع المسؤول عن التنفيذ",
            optionsKey: "executionSector",
          },
          { id: "f6", label: "نطاق التنفيذ", optionsKey: "executionScope" },
        ],
      },
      {
        type: "checklist",
        title: "طلبات التنفيذ الاختيارية",
        items: [
          {
            id: "c1",
            label: "طلب نموذج أولي",
            desc: "إضافة مهمة تطوير نموذج أولي للمشروع.",
            checked: true,
          },
          {
            id: "c2",
            label: "طلب مرحلة تجريبية",
            desc: "إنشاء مرحلة Pilot للتجربة والتحقق.",
            checked: false,
          },
          {
            id: "c3",
            label: "طلب دراسة جدوى",
            desc: "إضافة مهمة دراسة جدوى للمشروع.",
            checked: false,
          },
          {
            id: "c4",
            label: "طلب دراسة حالة أعمال",
            desc: "إعداد دراسة Business Case تفصيلية.",
            checked: false,
          },
          {
            id: "c5",
            label: "طلب تقييم تقني",
            desc: "تحويل المشروع للمراجعة التقنية.",
            checked: false,
          },
          {
            id: "c6",
            label: "طلب تقييم مخاطر",
            desc: "تحويل المشروع لفريق الحوكمة والمخاطر.",
            checked: false,
          },
        ],
      },
      {
        type: "dropdowns",
        groups: [
          {
            label: "إعدادات الفرق والحوكمة",

            fields: [
              {
                id: "f7",
                label: "تعيين فريق التنفيذ",
                optionsKey: "executionTeam",
                default: "ai_ops",
              },
              {
                id: "f8",
                label: "تعيين الراعي التنفيذي",
                optionsKey: "executiveSponsor",
                default: "ceo_innovation",
              },
              {
                id: "f9",
                label: "تعيين اللجنة التوجيهية",
                optionsKey: "steeringCommittee",
                default: "innovation_committee",
              },
              {
                id: "f10",
                label: "طريقة بدء التنفيذ",
                optionsKey: "executionStartMethod",
                default: "start_pilot",
              },
            ],
          },
        ],
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description:
          "سيتم إرسال رسائل مخصصة لكل دور يتم اختياره، مع روابط وصول حسب الصلاحيات المسموح بها داخل المنصة.",
        items: [
          {
            id: "b1",
            label: "مدير المشروع",
            desc: "صلاحية إدارة المشروع ومتابعة تطوره.",
            badge: "صلاحية عرض",
            checked: true,
          },
          {
            id: "b2",
            label: "صاحب الفكرة",
            desc: "مقدم الفكرة الأصلية يتابع تطور قرار الاعتماد.",
            badge: "صلاحية عرض",
            checked: true,
          },
          {
            id: "b3",
            label: "فريق الابتكار",
            desc: "فريق مسؤول عن متابعة وتحديث الفكرة.",
            badge: "صلاحية محدودة",
            checked: true,
          },
          {
            id: "b4",
            label: "فريق التنفيذ",
            desc: "الفريق المنفذ للمشروع الابتكاري.",
            badge: "صلاحية حوكمة",
            checked: false,
          },
          {
            id: "b5",
            label: "PMO",
            desc: "مكتب إدارة المشاريع.",
            badge: "صلاحية تنفيذ",
            checked: false,
          },
          {
            id: "b6",
            label: "الراعي الاستراتيجي",
            desc: "الداعم الاستراتيجي للمشروع.",
            badge: "صلاحية تنفيذية",
            checked: false,
          },
          {
            id: "b7",
            label: "رئيس القطاع المسؤول",
            desc: "المسؤول عن اعتماد القرارات الاستراتيجية.",
            badge: "حوكمة مشاريع",
            checked: false,
          },
          {
            id: "b8",
            label: "الفريق التقني / المستشارون",
            desc: "يستلم طلبات التقييم والمراجعة التقنية.",
            badge: "صلاحية تقتية",
            checked: false,
          },
          {
            id: "b9",
            label: "فريق الحوكمة والمخاطر",
            desc: "فريق مراجعة الحوكمة والمخاطر المؤسسية.",
            badge: "صلاحية حوكمة",
            checked: false,
          },
        ],
      },
      {
        type: "notification",
        title: "معاينة الإشعارات",
        description:
          "يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني ونموذج الإشعار أدناه:",
      },
    ],
  },
  revise: {
    key: "revise",
    label: "إعادة تحسين",
    description: "إرجاع الفكرة للمبتكر لإعادة تحسين المحتوى.",
    pathTitle: "مسار قرار إعادة التحسين",
    sections: [
      {
        type: "checklist",
        title: "إجراءات إعادة التحسين",
        items: [
          {
            id: "r1",
            label: "طلب توضيحات إضافية",
            desc: "طلب تفاصيل إضافية حول الفكرة أو المشكلة أو الحل المقترح.",
            checked: true,
          },
          {
            id: "r2",
            label: "طلب بيانات داعمة",
            desc: "طلب أرقام أو مرفقات أو دراسات أو أمثلة تدعم الفكرة.",
            checked: false,
          },
          {
            id: "r3",
            label: "دعوة مستشار / موجه ابتكار",
            desc: "إشراك مستشار ابتكار لدعم صاحب الفكرة في تحسينها وإعادة تقديمها.",
            checked: false,
          },
          {
            id: "r4",
            label: "تحسين نموذج العمل",
            desc: "طلب تحسين نموذج العمل التجاري أو نموذج خلق القيمة المرتبط بالفكرة.",
            checked: false,
          },
        ],
      },
      {
        type: "dropdowns",
        groups: [
          {
            label: "تعيين مستشار / موجه الابتكار",
            fields: [
              {
                id: "consultantMentor",
                label: "مستشار/مرشد في مجال الابتكار",
                placeholder: "اختر مستشار/موجه الابتكار",
                optionsKey: "consultantMentor",
                default: "advisor",
              },
              {
                id: "sectionType",
                label: "اختيار حاضنة / مسار",
                placeholder: "اختر حاضنة/مسار",
                optionsKey: "sectionType",
                default: "incubator",
              },
            ],
          },
        ],
      },
      {
        type: "textarea",
        id: "reviseNotes",
        label: "ملاحظات قبل الإرسال",
        placeholder:
          "يرجى التركيز على توضيح المشكلة بشكل أدق، وإضافة بيانات داعمة، وتحسين نموذج العمل قبل إعادة تقديم الفكرة للتقييم ...",
        default: "",
        rows: 4,
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description: "اختر المستفيدين الذين سيصلهم إشعار بقرار إعادة التحسين:",
        items: [
          {
            id: "rb1",
            label: "صاحب الفكرة",
            desc: "يستلم طلب إعادة التحسين مع الإجراءات المطلوبة والملاحظات قبل إعادة التقديم.",
            badge: "إشعار أساسي",
            badgeType: "primary",
            checked: true,
          },
          {
            id: "rb2",
            label: "مستشار / موجه الابتكار",
            desc: "يستلم دعوة لمساندة صاحب الفكرة في تطويرها وإعادة تقديمها بصورة أقوى.",
            badge: "يظهر عند اختيار دعوة موجه",
            badgeType: "outline",
            checked: false,
          },
        ],
      },
      {
        type: "notification",
        title: "معاينة الإشعارات",
        description:
          "يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني:",
      },
    ],
  },
  accelerate: {
    key: "accelerate",
    label: "تسريع",
    description: "مرور الفكرة ضمن أولوية مرتفعة وتنفيذ سريع.",
    pathTitle: "مسار قرار تسريع المشروع",
    pathDescription:
      "تم اعتماد مسار تسريع الفكرة لتقليل مدة التطوير ونقل الفكرة لمرحلة التنفيذ فوراً بناءً على الاحتياج العاجل للمؤسسة.",
    sections: [
      {
        type: "dropdowns",
        groups: [
          {
            label: "معايير التسريع",
            fields: [
              {
                id: "accelerationTrack",
                label: "مسار التسريع",
                placeholder: "اختر مسار التسريع",
                optionsKey: "accelerationTrack",
                default: "fast",
              },
              {
                id: "executionPriority",
                label: "أولوية التنفيذ",
                placeholder: "اختر أولوية التنفيذ",
                optionsKey: "executionPriority",
                default: "high",
              },
            ],
          },
          {
            label: "الشراكة والتنفيذ",

            fields: [
              {
                id: "projectManager",
                label: "مدير المشروع",
                placeholder: "اختر مدير المشروع",
                optionsKey: "projectManager",
                default: "ahmed",
              },
              {
                id: "partnerType",
                label: "نوع الشراكة",
                placeholder: "اختر نوع الشراكة",
                optionsKey: "partnerType",
                default: "internal",
              },
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "إجراءات تسريع التطوير",
        items: [
          {
            id: "a1",
            label: "طلب تجربة تجارية",
            desc: "طلب تجربة تجارية مبكرة في السوق المستهدف.",
            checked: true,
          },
          {
            id: "a2",
            label: "طلب دراسة دولية",
            desc: "الاستعانة بمرجعية دولية لتسريع التطوير.",
            checked: true,
          },
          {
            id: "a3",
            label: "طلب تقييم تقني",
            desc: "تقييم سريع للمتطلبات التقنية.",
            checked: false,
          },
          {
            id: "a4",
            label: "طلب تقييم محلي",
            desc: "تقييم محلي للبيئة التشغيلية.",
            checked: false,
          },
          {
            id: "a5",
            label: "Rapid Pilot",
            desc: "إطلاق نموذج أولي سريع في بيئة محدودة.",
            checked: false,
          },
          {
            id: "a6",
            label: "Innovation Sponsorship",
            desc: "الحصول على رعاية ابتكارية من جهات داعمة.",
            checked: false,
          },
          {
            id: "a7",
            label: "Urgent Resource Allocation",
            desc: "تخصيص موارد عاجلة لدعم التنفيذ السريع.",
            checked: false,
          },
          {
            id: "a8",
            label: "Sandbox / Experimentation",
            desc: "اختبار الفكرة في بيئة تجريبية آمنة.",
            checked: false,
          },
          {
            id: "a9",
            label: "Urgent Partnership Support",
            desc: "الحصول على دعم شراكات عاجلة.",
            checked: false,
          },
          {
            id: "a10",
            label: "Fast-Track Governance Review",
            desc: "مراجعة حوكمة مسار سريع لضمان الامتثال.",
            checked: false,
          },
        ],
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description: "اختر المستفيدين الذين سيصلهم إشعار بقرار التسريع:",
        items: [
          {
            id: "ab1",
            label: "مدير المشروع",
            desc: "يتولى إدارة التسريع الميداني.",
            badge: "صلاحية تحرير",
            badgeType: "success",
            checked: true,
          },
          {
            id: "ab2",
            label: "صاحب الفكرة",
            desc: "يتابع قرار تسريع فكرته.",
            badge: "متابعة فقط",
            badgeType: "outline",
            checked: true,
          },
          {
            id: "ab3",
            label: "جهة ثانوية",
            desc: "جهة داعمة في مسار التسريع.",
            badge: "متابعة فقط",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "ab4",
            label: "فريق الابتكار",
            desc: "فريق متابعة التسريع.",
            badge: "متابعة وتحديث",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "ab5",
            label: "PMO",
            desc: "مكتب إدارة المشاريع.",
            badge: "متابعة وإفادة",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "ab6",
            label: "القيادة والاستشارة / المستشار",
            desc: "الداعم القيادي والاستراتيجي للتسريع.",
            badge: "موافقة واعتماد",
            badgeType: "primary",
            checked: false,
          },
          {
            id: "ab7",
            label: "فريق الحوكمة والمخاطر",
            desc: "يراجع مسار التسريع من منظور الحوكمة.",
            badge: "صلاحية مراجعة",
            badgeType: "warning",
            checked: false,
          },
        ],
      },
      {
        type: "notification",
        title: "معاينة الإشعارات",
        description:
          "يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني:",
      },
    ],
  },
  escalate: {
    key: "escalate",
    label: "تصعيد",
    description: "تصعيد الفكرة للجهات القيادية والحوكمة الاستراتيجية.",
    pathTitle: "مسار قرار التصعيد",
    pathDescription:
      "تم تصعيد الفكرة للمراجعة الاستراتيجية من قِبل الجهات القيادية والحوكمة العليا، بناءً على أثرها الاستراتيجي المرتفع وتعقيداتها التنفيذية.",
    sections: [
      {
        type: "dropdowns",
        groups: [
          {
            label: "جهة التصعيد والسبب",

            fields: [
              {
                id: "escalationTarget",
                label: "جهة التصعيد",
                placeholder: "اختر جهة التصعيد",
                optionsKey: "escalationTarget",
                default: "board",
              },
              {
                id: "escalationReason",
                label: "سبب التصعيد",
                placeholder: "اختر سبب التصعيد",
                optionsKey: "escalationReason",
                default: "strategic",
              },
            ],
          },
          {
            label: "مستوى المخاطر والجدول الزمني",
            fields: [
              {
                id: "riskLevel",
                label: "مستوى المخاطر",
                placeholder: "اختر مستوى المخاطر",
                optionsKey: "riskLevel",
                default: "high",
              },
              {
                id: "reviewTimeline",
                label: "الجدول الزمني للمراجعة",
                placeholder: "اختر الجدول الزمني للمراجعة",
                optionsKey: "reviewTimeline",
                default: "urgent",
              },
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "إجراءات التصعيد الاستراتيجي",
        items: [
          {
            id: "e1",
            label: "طلب مراجعة تجارية",
            desc: "طلب مراجعة شاملة للجدوى التجارية والأثر المالي.",
            checked: true,
          },
          {
            id: "e2",
            label: "طلب تقييم تقني",
            desc: "تقييم فني متعمق من فريق الخبراء.",
            checked: false,
          },
          {
            id: "e3",
            label: "طلب دراسة دولية",
            desc: "الاستعانة بمرجعيات دولية لدعم القرار الاستراتيجي.",
            checked: false,
          },
          {
            id: "e4",
            label: "طلب تقييم محلي",
            desc: "تقييم البيئة المحلية والبيانات الاستراتيجية.",
            checked: false,
          },
          {
            id: "e5",
            label: "Rapid Pilot",
            desc: "إطلاق تجربة أولية محدودة النطاق لدعم القرار.",
            checked: false,
          },
          {
            id: "e6",
            label: "Executive Sponsorship",
            desc: "الحصول على رعاية مباشرة من الإدارة التنفيذية العليا.",
            checked: false,
          },
          {
            id: "e7",
            label: "Innovation Sponsorship",
            desc: "تأمين رعاية ابتكارية مؤسسية لدعم التصعيد.",
            checked: false,
          },
          {
            id: "e8",
            label: "Urgent Resource Allocation",
            desc: "تخصيص موارد فورتية لتنفيذ قرار التصعيد.",
            checked: false,
          },
          {
            id: "e9",
            label: "Creative Sponsorship",
            desc: "شراكة إبداعية لدعم التطوير الاستراتيجي.",
            checked: false,
          },
          {
            id: "e10",
            label: "Sandbox / Experimentation",
            desc: "بيئة اختبار آمنة لتقييم الفكرة استراتيجياً.",
            checked: false,
          },
          {
            id: "e11",
            label: "Urgent Partnership Support",
            desc: "دعم الشراكات العاجلة لتسهيل عملية التصعيد.",
            checked: false,
          },
          {
            id: "e12",
            label: "Fast-Track Governance Review",
            desc: "مراجعة حوكمة سريعة لضمان الامتثال الاستراتيجي.",
            checked: false,
          },
        ],
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description: "اختر المستفيدين الذين سيصلهم إشعار بقرار التصعيد:",
        items: [
          {
            id: "eb1",
            label: "مدير المشروع",
            desc: "مسؤول تنسيق ملف التصعيد.",
            badge: "صلاحية تحرير",
            badgeType: "success",
            checked: true,
          },
          {
            id: "eb2",
            label: "صاحب الفكرة",
            desc: "مقدم الفكرة يتابع قرار التصعيد.",
            badge: "متابعة فقط",
            badgeType: "outline",
            checked: true,
          },
          {
            id: "eb3",
            label: "جهة ثانوية",
            desc: "جهة داعمة في مسار التصعيد.",
            badge: "متابعة فقط",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "eb4",
            label: "فريق الابتكار",
            desc: "فريق يدعم ملف التصعيد.",
            badge: "متابعة وتحديث",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "eb5",
            label: "PMO",
            desc: "يتابع ملف التصعيد من منظور إدارة المشاريع.",
            badge: "متابعة وإفادة",
            badgeType: "outline",
            checked: false,
          },
          {
            id: "eb6",
            label: "رئيس القطاع المسؤول",
            desc: "يعتمد قرار التصعيد القطاعي.",
            badge: "موافقة واعتماد",
            badgeType: "primary",
            checked: false,
          },
          {
            id: "eb7",
            label: "القيادة والاستشارة / المستشار",
            desc: "القيادة العليا المعنية بالتصعيد.",
            badge: "موافقة واعتماد",
            badgeType: "primary",
            checked: false,
          },
          {
            id: "eb8",
            label: "فريق الحوكمة والمخاطر",
            desc: "يراجع الحوكمة والمخاطر في ملف التصعيد.",
            badge: "صلاحية مراجعة",
            badgeType: "warning",
            checked: false,
          },
        ],
      },
      {
        type: "notification",
        title: "معاينة الإشعارات",
        description:
          "يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني:",
      },
    ],
  },
  reject: {
    key: "reject",
    label: "رفض",
    description: "إغلاق الفكرة مع توضيح نقاط الضعف والتوصيات.",
    pathTitle: "قرار عدم اعتماد الفكرة",
    pathDescription:
      "تحت إشراف وتدقيق رئيس وأعضاء اللجنة، تم مراجعة الفكرة وتم اتخاذ القرار بعدم اعتمادها للعديد من الأسباب.",
    sections: [
      {
        type: "reject-summary",
        warningText:
          "تحت إشراف وتدقيق رئيس وأعضاء اللجنة، تم مراجعة الفكرة وتم اتخاذ القرار بعدم اعتمادها للعديد من الأسباب والملاحظات الفنية الموضحة أدناه.",
        summaryItems: [
          {
            label: "النتيجة العامة للتقييم:",
            text: "أظهرت تقارير التقييم أن الفكرة تحمل أفكاراً جيدة، إلا أنها تفتقر إلى الجدوى الفنية والمالية، بالإضافة إلى ضعف التوافق الاستراتيجي مع الأهداف الحالية.",
          },
          {
            label: "ملخص نقاط الضعف:",
            text: "ضعف البيانات الداعمة وعدم وضوح آلية التنفيذ والأثر المؤسسي المتوقع والمخاطر التشغيلية المصاحبة لتطبيق الفكرة.",
          },
        ],
      },
      {
        type: "checklist",
        title: "أسباب عدم الاعتماد",
        items: [
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
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description: "اختر المستفيدين الذين سيصلهم إشعار بقرار الرفض:",
        items: [
          {
            id: "rjb1",
            label: "صاحب الفكرة",
            desc: "يتلقى إشعاراً بقرار عدم الاعتماد مع الملاحظات.",
            badge: "إشعار أساسي",
            badgeType: "primary",
            checked: true,
          },
          {
            id: "rjb2",
            label: "فريق الابتكار",
            desc: "يتابع ملف الرفض من منظور الحوكمة.",
            badge: "حوكمة",
            badgeType: "warning",
            checked: true,
          },
        ],
      },
      {
        type: "notification",
        title: "معاينة الإشعارات",
        description:
          "يمكنك معاينة الرسالة الموجهة إلى مستلمي البريد الإلكتروني:",
      },
    ],
  },
};
