export default {
  title: 'ארגונים',
  addNew: 'הוסף ארגון',
  notes: {
    title: 'הערות',
    edit: 'ערוך הערות'
  },
  status: {
    active: 'פעיל',
    inactive: 'לא פעיל'
  },
  billing: {
    title: 'חיוב',
    currentPlan: 'תוכנית נוכחית',
    upgradePlan: 'שדרג תוכנית',
    freeTrial: 'ניסיון חינם',
    trialEnds: 'תקופת הניסיון שלך מסתיימת בעוד {days} ימים',
    paymentMethods: 'אמצעי תשלום',
    addPaymentMethod: 'הוסף אמצעי תשלום',
    noPaymentMethods: 'טרם נוספו אמצעי תשלום',
    addCreditCard: 'הוסף כרטיס אשראי כדי לאפשר תשלומים אוטומטיים',
    billingHistory: 'היסטוריית חיובים',
    export: 'ייצוא',
    noInvoices: 'אין חשבוניות עדיין',
    invoicesWillAppear: 'היסטוריית החיובים שלך תופיע כאן ברגע שתתחיל להשתמש בתכונות בתשלום',
    comingSoon: 'תכונות חיוב בקרוב! אנחנו עובדים על שילוב Stripe לתשלומים מאובטחים.'
  },
  integrations: {
    title: 'אינטגרציות',
    configureApiKey: 'הגדר מפתח API',
    tiaPortal: {
      description: 'התחבר ל-TIA Portal לתכנות והגדרת PLC אוטומטיים.',
      title: 'אינטגרציית TIA Portal',
      apiKeyLabel: 'מפתח API של TIA Portal',
      apiKeyDescription: 'הזן את מפתח ה-API של TIA Portal כדי לאפשר תכנות והגדרת PLC אוטומטיים.'
    },
    eplan: {
      description: 'אינטגרציה עם EPLAN להנדסת חשמל ותיעוד.',
      title: 'אינטגרציית EPLAN',
      apiKeyLabel: 'מפתח API של EPLAN',
      apiKeyDescription: 'הזן את מפתח ה-API של EPLAN כדי לאפשר אינטגרציית הנדסת חשמל.'
    },
    comingSoon: 'בקרוב'
  },
  details: {
    title: 'פרטים',
    address: {
      edit: 'ערוך כתובת',
      street: 'רחוב',
      streetRequired: 'רחוב נדרש',
      city: 'עיר',
      cityRequired: 'עיר נדרשת',
      state: 'מדינה/מחוז',
      stateRequired: '{label} נדרש',
      postalCode: 'מיקוד',
      postalCodeRequired: 'מיקוד נדרש',
      country: 'מדינה',
      countryRequired: 'מדינה נדרשת'
    },
    name: {
      edit: 'ערוך שם ארגון',
      name: 'שם הארגון',
      nameRequired: 'שם הארגון נדרש'
    },
    logo: {
      update: 'עדכן לוגו ארגון',
      dropHint: 'שחרר את הלוגו כאן או לחץ לבחירה',
      supportedFormats: 'פורמטים נתמכים: PNG, JPG, GIF',
      invalidFormat: 'אנא בחר קובץ תמונה חוקי (PNG, JPG, או GIF)',
      fileTooLarge: 'גודל הקובץ חייב להיות פחות מ-5MB',
      uploadFailed: 'העלאת הלוגו נכשלה'
    }
  },
  organization: 'ארגון',
  name: 'שם הארגון',
  nameRequired: 'שם הארגון נדרש',
  projectCount: 'פרויקטים: {count}',
  viewProjects: 'צפה בפרויקטים של הארגון',
  addedOn: 'נוסף {date}',
  noOrganizations: 'לא נמצאו ארגונים',
  failedToLoad: 'טעינת הארגונים נכשלה',
  failedToCreate: 'יצירת הארגון נכשלה',
  failedToUpdate: 'עדכון הארגון נכשל',
  failedToDelete: 'מחיקת הארגון נכשלה',
  users: {
    title: 'משתמשי הארגון',
    noUsers: 'לא נמצאו משתמשים',
    noUsersCaption: 'הוסף משתמשים לארגון שלך כדי להתחיל לשתף פעולה',
    addUser: 'הוסף משתמש',
    editRole: 'ערוך תפקיד',
    remove: 'הסר',
    removeTitle: 'הסר משתמש',
    removeConfirm: 'האם אתה בטוח שברצונך להסיר את {name} מארגון זה?',
    removeWarning: 'לא ניתן לבטל פעולה זו.',
    onlyAdminsCanAdd: 'רק מנהלים יכולים להוסיף משתמשים',
    onlyAdminsCanChangeStatus: 'רק מנהלים יכולים לשנות את סטטוס הארגון',
    selectOrganization: 'בחר ארגון',
    roles: {
      administrator: 'מנהל',
      user: 'משתמש'
    },
    edit: {
      title: 'ערוך תפקיד',
      role: 'תפקיד',
      roleRequired: 'תפקיד נדרש'
    }
  }
}