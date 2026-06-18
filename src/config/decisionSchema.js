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
              },
              {
                id: "f8",
                label: "تعيين الراعي التنفيذي",
                optionsKey: "executiveSponsor",
              },
              {
                id: "f9",
                label: "تعيين اللجنة التوجيهية",
                optionsKey: "steeringCommittee",
              },
              {
                id: "f10",
                label: "طريقة بدء التنفيذ",
                optionsKey: "executionStartMethod",
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
                optionsKey: "consultantMentor",
              },
              {
                id: "sectionType",
                label: "اختيار حاضنة / مسار",
                optionsKey: "sectionType",
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
            checked: true,
          },
          {
            id: "rb2",
            label: "مستشار / موجه الابتكار",
            desc: "يستلم دعوة لمساندة صاحب الفكرة في تطويرها وإعادة تقديمها بصورة أقوى.",
            badge: "يظهر عند اختيار دعوة موجه",
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
    pathTitle: "مسار قرار التسريع",
    pathmessage:
      "تم تصنيف هذه الفكرة كفرصة ابتكارية عالية التأثير وعالية الجاهزية، ويوصى بتطبيق مسار تسريع خاص لضمان سرعة التنفيذ وتعظيم القيمة المؤسسية المتوقعة.",
    pathmessageBadge: "High Priority / Fast-Track Innovation Initiative",
    sections: [
      {
        type: "dropdowns",
        title: "إعدادات التسريع الأساسية",
        fields: [
          {
            id: "h1",
            label: "تعيين مدير المشروع",
            optionsKey: "projectManager",
          },
          {
            id: "h2",
            label: "مركبة الابتكار",
            optionsKey: "innovationVehicle",
          },
          {
            id: "h3",
            label: "القطاع المسؤول عن التنفيذ",
            optionsKey: "executionSector",
          },
          {
            id: "h4",
            label: "درجة الأولوية",
            optionsKey: "priority",
          },
          {
            id: "h5",
            label: "نطاق التنفيذ",
            optionsKey: "executionScope",
          },
          {
            id: "h6",
            label: "تاريخ المراجعة السريعة",
            optionsKey: "reviewDate",
          },
        ],
      },
      {
        type: "checklist",
        title: "إجراءات التسريع",
        items: [
          {
            id: "a1",
            label: "تسريع التنفيذ",
            desc: "إدخال المشروع مباشرة ضمن قائمة الأولويات التنفيذية.",
            checked: true,
          },
          {
            id: "a2",
            label: "Rapid Pilot",
            desc: "إطلاق مرحلة Pilot سريعة للتحقق والتجربة.",
            checked: true,
          },
          {
            id: "a3",
            label: "Urgent Resource Allocation",
            desc: "تخصيص موارد عاجلة لدعم التنفيذ السريع.",
            checked: false,
          },
          {
            id: "a4",
            label: "Executive Sponsorship",
            desc: "إضافة دعم تنفيذي مباشر لتسريع القرارات والتنفيذ.",
            checked: false,
          },
          {
            id: "a5",
            label: "Sandbox / Experimentation",
            desc: "توفير بيئة تجريبية مرنة لاختبار الحلول بسرعة.",
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
            label: "Urgent Partnership Support",
            desc: "إشراك شركاء خارجيين أو جهات داعمة بشكل عاجل.",
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
            label: "Fast-Track Governance Review",
            desc: "تقليل دورات المراجعة وتسريع الموافقات.",
            checked: false,
          },
          {
            id: "a10",
            label: "Create Innovation Project View",
            desc: "إنشاء صفحة المشروع الابتكاري بشكل مباشر.",
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
                id: "h7",
                label: "تعيين فريق التنفيذ",
                optionsKey: "executionTeam",
              },
              {
                id: "h8",
                label: "الراعي التنفيذي",
                optionsKey: "executiveSponsor",
              },
              {
                id: "h9",
                label: "اللجنة التوجيهية",
                optionsKey: "steeringCommittee",
              },
              {
                id: "h10",
                label: "نمط بدء التنفيذ",
                optionsKey: "executionStartMethod",
              },
            ],
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
            desc: "يستلم ملخص المشروع ورابط الوصول للمشروع الابتكاري.",
            badge: "صلاحية عرض",
            checked: true,
          },
          {
            id: "ab2",
            label: "صاحب الفكرة",
            desc: "يستلم رسالة تهنئة واعتماد الفكرة والخطوات القادمة.",
            badge: "صلاحية عرض",
            checked: true,
          },
          {
            id: "ab3",
            label: "فريق الابتكار",
            desc: "يستلم إشعار تحويل الفكرة إلى مشروع ابتكاري.",
            badge: "صلاحية محدودة",
            checked: false,
          },
          {
            id: "ab4",
            label: "فريق التنفيذ",
            desc: "يستلم دعوة للمشاركة في تنفيذ المشروع.",
            badge: "صلاحية حوكمة",
            checked: false,
          },
          {
            id: "ab5",
            label: "PMO",
            desc: "الراعي التنفيذي",
            badge: "صلاحية تنفيذ",
            checked: false,
          },
          {
            id: "ab6",
            label: "PMO",
            desc: "يستلم بيانات المشروع ومسارات التنفيذ.",
            badge: "صلاحية تنفيذية",
            checked: false,
          },
          {
            id: "ab7",
            label: "رئيس القطاع المسؤول",
            desc: "يستلم ملخص المشروع المرتبط بقطاعه.",
            badge: "حوكمة مشاريع",
            checked: false,
          },
          {
            id: "ab8",
            label: "الفريق التقني / المستشارون",
            desc: "يستلم طلبات التقييم والمراجعة التقنية.",
            badge: "صلاحية تقتية",
            checked: false,
          },
          {
            id: "ab9",
            label: "فريق الحوكمة والمخاطر",
            desc: "يستلم طلبات مراجعة الحوكمة والمخاطر.",
            badge: "صلاحية حوكمة",
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
    pathmessage:
      "يستخدم هذا المسار عندما تحتاج الفكرة إلى مراجعة استراتيجية أو تخصصية عليا بسبب ارتفاع التأثير أو المخاطر أو التعقيد أو وجود تضارب في نتائج التقييم.",
    sections: [
      {
        type: "board-info",
        title: "اللجنة الاستراتيجية للابتكار",
        text: "Strategic Innovation Board تتكون اللجنة الاستراتيجية للابتكار من أعضاء متعددين التخصصات يمتلكون خبرات في الابتكار والاستراتيجية، والتحول التقني والرقمي، والاستثمار والقيمة المؤسسية، والحوكمة وإدارة المخاطر، والسياسات والامتثال التنظيمي، والتحول المؤسسي واستشراف المستقبل.",
        badge: "Multidisciplinary Strategic Board",
      },
      {
        type: "sub-checklists",
        title: "أسباب التصعيد",
        groups: [
          {
            id: "g1",
            label: "أفكار تحويلية أو مزعزعة",
            checked: false,
            items: [
              { id: "e1_1", label: "أثر مؤسسي مرتفع جداً", checked: false },
              {
                id: "e1_2",
                label: "تغيير جذري في نموذج العمل الحالي",
                checked: false,
              },
              { id: "e1_3", label: "فرصة مستقبلية أو ناشئة", checked: false },
              {
                id: "e1_4",
                label: "تحتاج توجيه استراتيجي من القيادة",
                checked: false,
              },
              {
                id: "e1_5",
                label: "قد تؤثر على عدة قطاعات أو خدمات",
                checked: false,
              },
            ],
          },
          {
            id: "g2",
            label: "ارتفاع مستوى المخاطر",
            checked: false,
            items: [
              { id: "e2_1", label: "مخاطر تشغيلية", checked: false },
              { id: "e2_2", label: "مخاطر تقنية", checked: false },
              { id: "e2_3", label: "مخاطر تنظيمية أو تشريعية", checked: false },
              {
                id: "e2_4",
                label: "مخاطر أمن معلومات أو بيانات",
                checked: false,
              },
              { id: "e2_5", label: "مخاطر سمعة مؤسسية", checked: false },
              { id: "e2_6", label: "ارتفاع مستوى عدم اليقين", checked: false },
            ],
          },
          {
            id: "g3",
            label: "ارتفاع التكلفة أو الاستثمار",
            checked: false,
            items: [
              { id: "e3_1", label: "تحتاج ميزانية مرتفعة", checked: false },
              {
                id: "e3_2",
                label: "تحتاج استثمار متعدد المراحل",
                checked: false,
              },
              {
                id: "e3_3",
                label: "تحتاج تمويل خارجي أو استثمار استراتيجي",
                checked: false,
              },
              { id: "e3_4", label: "التزام مالي طويل المدى", checked: false },
              {
                id: "e3_5",
                label: "تحتاج موافقة استثمارية خاصة",
                checked: false,
              },
            ],
          },
          {
            id: "g4",
            label: "الحاجة إلى شراكات استراتيجية",
            checked: false,
            items: [
              { id: "e4_1", label: "تحتاج شراكة مع جامعة", checked: false },
              {
                id: "e4_2",
                label: "تحتاج شراكة مع القطاع الخاص",
                checked: false,
              },
              {
                id: "e4_3",
                label: "تحتاج تعاون مع شركات ناشئة",
                checked: false,
              },
              { id: "e4_4", label: "تحتاج تعاون حكومي مشترك", checked: false },
              {
                id: "e4_5",
                label: "تحتاج شراكات طويلة المدى ضمن النظام الإيكولوجي",
                checked: false,
              },
            ],
          },
          {
            id: "g5",
            label: "تضارب تقييمات المقيمين أو مؤشرات التحيز",
            checked: false,
            items: [
              {
                id: "e5_1",
                label: "وجود تفاوت كبير في درجات المقيمين",
                checked: false,
              },
              {
                id: "e5_2",
                label: "وجود مؤشرات تحيز في التقييم",
                checked: false,
              },
              {
                id: "e5_3",
                label: "اختلاف حاد في تقييم قابلية التنفيذ",
                checked: false,
              },
              {
                id: "e5_4",
                label: "اختلاف حاد في تقييم القيمة الاستراتيجية",
                checked: false,
              },
              {
                id: "e5_5",
                label: "الحاجة إلى مراجعة عليا محايدة",
                checked: false,
              },
            ],
          },
          {
            id: "g6",
            label: "أثر مؤسسي ضخم",
            checked: false,
            items: [
              {
                id: "e6_1",
                label: "يؤثر على عدة قطاعات أو إدارات",
                checked: false,
              },
              {
                id: "e6_2",
                label: "تأثير كبير على المتعاملين أو الجمهور",
                checked: false,
              },
              {
                id: "e6_3",
                label: "فرصة ذات أثر وطني أو إعلامي",
                checked: false,
              },
              {
                id: "e6_4",
                label: "قد تؤثر على التوجه الاستراتيجي للمؤسسة",
                checked: false,
              },
              { id: "e6_5", label: "قيمة طويلة المدى مرتفعة", checked: false },
            ],
          },
          {
            id: "g7",
            label: "قيمة مرتفعة مع انخفاض قابلية التنفيذ",
            checked: false,
            items: [
              {
                id: "e7_1",
                label: "قيمة استراتيجية أو تشغيلية عالية جداً",
                checked: false,
              },
              {
                id: "e7_2",
                label: "انخفاض الجاهزية الحالية للتنفيذ",
                checked: false,
              },
              {
                id: "e7_3",
                label: "الجاهزية التقنية غير مكتملة",
                checked: false,
              },
              {
                id: "e7_4",
                label: "تحتاج قدرات مستقبلية غير متوفرة حالياً",
                checked: false,
              },
              {
                id: "e7_5",
                label: "تحتاج مراحل تجريبية متعددة",
                checked: false,
              },
            ],
          },
          {
            id: "g8",
            label: "تعارض مع السياسات أو الحوكمة الحالية",
            checked: false,
            items: [
              {
                id: "e8_1",
                label: "تعارض مع السياسات الحالية",
                checked: false,
              },
              {
                id: "e8_2",
                label: "تحتاج تعديل سياسات أو تشريعات",
                checked: false,
              },
              { id: "e8_3", label: "تحتاج مراجعة قانونية", checked: false },
              { id: "e8_4", label: "تحتاج استثناءات حوكمية", checked: false },
              {
                id: "e8_5",
                label: "تحتاج موافقات قيادية خاصة",
                checked: false,
              },
            ],
          },
          {
            id: "g9",
            label: "قيمة مرتفعة مع انخفاض قابلية التنفيذ",
            checked: false,
            items: [
              { id: "e9_1", label: "تعتمد على تقنيات ناشئة", checked: false },
              {
                id: "e9_2",
                label: "تحتاج مراجعة ذكاء اصطناعي أو تحليلات متقدمة",
                checked: false,
              },
              { id: "e9_3", label: "تحتاج تكامل مؤسسي معقد", checked: false },
              { id: "e9_4", label: "تحتاج بنية تحتية جديدة", checked: false },
              { id: "e9_5", label: "تحتاج خبرات تقنية خارجية", checked: false },
            ],
          },
          {
            id: "g10",
            label: "تعارض مع السياسات أو الحوكمة الحالية",
            checked: false,
            items: [
              {
                id: "e10_1",
                label: "مبادرة ذات حساسية مؤسسية",
                checked: false,
              },
              { id: "e10_2", label: "مبادرة استراتيجية سرية", checked: false },
              {
                id: "e10_3",
                label: "احتمال وجود فرصة ملكية فكرية",
                checked: false,
              },
              { id: "e10_4", label: "ميزة تنافسية استراتيجية", checked: false },
              {
                id: "e10_5",
                label: "تحتاج مراجعة مفيدة أو خاصة",
                checked: false,
              },
            ],
          },
        ],
      },
      {
        type: "escalation-summary",
        title: "AI Escalation Summary",
        infoText:
          "سيتم توليد هذا الملخص تلقائياً بعد اختيار أسباب التصعيد الرئيسية والفرعية أعلاه.",
        cards: [
          {
            title: "Escalation Overview",
            text: "ملخص تنفيذي يوضح لماذا تحتاج الفكرة إلى مراجعة من اللجنة الاستراتيجية للابتكار بناءً على الأسباب المختارة.",
          },
          {
            title: "Detected Escalation Factors",
            text: "قائمة بالعوامل التي تم رصدها من الاختيارات، مثل: أثر مؤسسي مرتفع، مخاطر عالية، تضارب في التقييمات، أو حساسية حوكمية.",
          },
          {
            title: "Risk & Priority Level",
            text: "تحديد مستوى الخطورة والأولوية المقترحة للتصعيد: Medium / High / Critical.",
          },
          {
            title: "Key Review Points for the Board",
            text: "نقاط المراجعة المطلوبة من اللجنة، مثل: الجاهزية التنفيذية، المخاطر، الاستثمار، الشراكات، السياسات، أو الحوكمة.",
          },
        ],
        recTitle: "AI Recommendation",
        recCard: {
          title: "التوصية الذكية",
          text: "يوصي الذكاء الاصطناعي بإحالة الفكرة إلى اللجنة الاستراتيجية للابتكار لمراجعة الأثر والمخاطر والجدوى الاستراتيجية قبل اتخاذ القرار النهائي، مع توضيح نوع المراجعة المطلوبة.",
        },
      },
      {
        type: "textarea",
        id: "escalationNotes",
        label: "ملاحظات التصعيد قبل الإرسال",
        placeholder:
          "يرجى مراجعة أسباب التصعيد المختارة وملخص الذكاء الاصطناعي قبل إرسال الفكرة إلى اللجنة الاستراتيجية للابتكار.",
        rows: 4,
      },
      {
        type: "recipients",
        title: "المستفيدون من الإشعارات",
        description: "اختر المستفيدين الذين سيصلهم إشعار بقرار التصعيد:",
        items: [
          {
            id: "eb7",
            label: "اللجنة الاستراتيجية للابتكار",
            desc: "يستلم رسالة تهنئة واعتماد الفكرة والخطوات القادمة.",
            badge: "Committee Review Access",
            checked: true,
          },
          {
            id: "eb1",
            label: "فريق الابتكار",
            desc: "يستلم إشعار تحويل الفكرة إلى مشروع ابتكاري.",
            badge: "Governance Tracking",
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
  reject: {
    key: "reject",
    label: "رفض",
    description: "إغلاق الفكرة مع توضيح نقاط الضعف والتوصيات.",
    pathTitle: "قرار عدم اعتماد الفكرة",
    pathmessage:
      "تمت مراجعة الفكرة وفق معايير التقييم المعتمدة داخل منصة سديم، ولم تحقق الفكرة في هذه المرحلة الحد المطلوب للاعتماد أو التحويل إلى مشروع ابتكاري.",
    sections: [
      {
        type: "reject-summary",
        title: "ملخص نتائج التقييم",
        summaryItems: [
          {
            label: "النتيجة العامة للتقييم",
            text: "أظهرت نتائج التقييم أن الفكرة تحمل توجهًا تطويريًا جيدًا، إلا أنها تحتاج إلى مستوى أعلى من الوضوح والجاهزية وقابلية التنفيذ قبل اعتمادها كمشروع ابتكاري.",
          },
          {
            label: "أقوى الجوانب",
            text: "وجود فرصة تطوير تشغيلية واعدة وإمكانية تحسين تجربة المستفيد مستقبلًا.",
          },
          {
            label: "أضعف الجوانب",
            text: "ضعف البيانات الداعمة وعدم وضوح آلية التنفيذ والأثر المؤسسي المتوقع.",
          },
          {
            label: "ملخص تقييم الذكاء الاصطناعي",
            text: "تشير قراءة الذكاء الاصطناعي إلى أن الفكرة تحتاج إلى تعزيز قابلية التنفيذ ووضوح القيمة المضافة قبل أن تكون جاهزة للاعتماد ضمن محفظة المشاريع الابتكارية.",
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
            checked: true,
          },
          {
            id: "rjb2",
            label: "فريق الابتكار",
            desc: "يتابع ملف الرفض من منظور الحوكمة.",
            badge: "حوكمة",
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
