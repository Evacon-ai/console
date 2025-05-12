export default {
  title: 'المؤسسات',
  addNew: 'إضافة مؤسسة',
  notes: {
    title: 'الملاحظات',
    edit: 'تعديل الملاحظات'
  },
  status: {
    active: 'نشط',
    inactive: 'غير نشط'
  },
  billing: {
    title: 'الفواتير',
    currentPlan: 'الخطة الحالية',
    upgradePlan: 'ترقية الخطة',
    freeTrial: 'تجربة مجانية',
    trialEnds: 'تنتهي فترة التجربة خلال {days} يوم',
    paymentMethods: 'طرق الدفع',
    addPaymentMethod: 'إضافة طريقة دفع',
    noPaymentMethods: 'لم يتم إضافة طرق دفع بعد',
    addCreditCard: 'أضف بطاقة ائتمان لتمكين المدفوعات التلقائية',
    billingHistory: 'سجل الفواتير',
    export: 'تصدير',
    noInvoices: 'لا توجد فواتير بعد',
    invoicesWillAppear: 'سيظهر سجل الفواتير هنا بمجرد بدء استخدام الميزات المدفوعة',
    comingSoon: 'ميزات الفواتير قادمة قريباً! نحن نعمل على دمج Stripe للمدفوعات الآمنة.'
  },
  integrations: {
    title: 'التكاملات',
    configureApiKey: 'تكوين مفتاح API',
    tiaPortal: {
      description: 'الاتصال بـ TIA Portal للبرمجة والتكوين الآلي لـ PLC.',
      title: 'تكامل TIA Portal',
      apiKeyLabel: 'مفتاح API لـ TIA Portal',
      apiKeyDescription: 'أدخل مفتاح API الخاص بـ TIA Portal لتمكين برمجة وتكوين PLC الآلي.'
    },
    eplan: {
      description: 'التكامل مع EPLAN للهندسة الكهربائية والتوثيق.',
      title: 'تكامل EPLAN',
      apiKeyLabel: 'مفتاح API لـ EPLAN',
      apiKeyDescription: 'أدخل مفتاح API الخاص بـ EPLAN لتمكين تكامل الهندسة الكهربائية.'
    },
    comingSoon: 'قريباً'
  },
  details: {
    title: 'التفاصيل',
    address: {
      edit: 'تعديل العنوان',
      street: 'الشارع',
      streetRequired: 'الشارع مطلوب',
      city: 'المدينة',
      cityRequired: 'المدينة مطلوبة',
      state: 'الولاية/المنطقة',
      stateRequired: '{label} مطلوب',
      postalCode: 'الرمز البريدي',
      postalCodeRequired: 'الرمز البريدي مطلوب',
      country: 'الدولة',
      countryRequired: 'الدولة مطلوبة'
    },
    name: {
      edit: 'تعديل اسم المؤسسة',
      name: 'اسم المؤسسة',
      nameRequired: 'اسم المؤسسة مطلوب'
    },
    logo: {
      update: 'تحديث شعار المؤسسة',
      dropHint: 'قم بإسقاط الشعار هنا أو انقر للاختيار',
      supportedFormats: 'الصيغ المدعومة: PNG, JPG, GIF',
      invalidFormat: 'الرجاء اختيار ملف صورة صالح (PNG, JPG, أو GIF)',
      fileTooLarge: 'يجب أن يكون حجم الملف أقل من 5MB',
      uploadFailed: 'فشل تحميل الشعار'
    }
  },
  organization: 'المؤسسة',
  name: 'اسم المؤسسة',
  nameRequired: 'اسم المؤسسة مطلوب',
  projectCount: 'المشاريع: {count}',
  viewProjects: 'عرض مشاريع المؤسسة',
  addedOn: 'تمت الإضافة منذ {date}',
  noOrganizations: 'لم يتم العثور على مؤسسات',
  failedToLoad: 'فشل في تحميل المؤسسات',
  failedToCreate: 'فشل في إنشاء المؤسسة',
  failedToUpdate: 'فشل في تحديث المؤسسة',
  failedToDelete: 'فشل في حذف المؤسسة',
  users: {
    title: 'مستخدمو المؤسسة',
    noUsers: 'لم يتم العثور على مستخدمين',
    noUsersCaption: 'أضف مستخدمين إلى مؤسستك للبدء في التعاون',
    addUser: 'إضافة مستخدم',
    editRole: 'تعديل الدور',
    remove: 'إزالة',
    removeTitle: 'إزالة المستخدم',
    removeConfirm: 'هل أنت متأكد أنك تريد إزالة {name} من هذه المؤسسة؟',
    removeWarning: 'لا يمكن التراجع عن هذا الإجراء.',
    onlyAdminsCanAdd: 'يمكن للمسؤولين فقط إضافة مستخدمين',
    onlyAdminsCanChangeStatus: 'يمكن للمسؤولين فقط تغيير حالة المؤسسة',
    selectOrganization: 'اختر المؤسسة',
    roles: {
      administrator: 'مسؤول',
      user: 'مستخدم'
    },
    edit: {
      title: 'تعديل الدور',
      role: 'الدور',
      roleRequired: 'الدور مطلوب'
    }
  }
}