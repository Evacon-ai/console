interface Timezone {
  value: string
  label: string
  offset: string
  abbr: string
  translations: {
    ar: string
    de: string
    es: string
    he: string
    pl: string
    ru: string
  }
}

export const timezones: Timezone[] = [
  {
    value: 'Pacific/Midway',
    label: '(GMT-11:00) Midway Island',
    offset: '-11:00',
    abbr: 'SST',
    translations: {
      ar: '(GMT-11:00) جزيرة ميدواي',
      de: '(GMT-11:00) Midway-Inseln',
      es: '(GMT-11:00) Isla Midway',
      he: '(GMT-11:00) אי מידוויי',
      pl: '(GMT-11:00) Wyspa Midway',
      ru: '(GMT-11:00) Остров Мидуэй'
    }
  },
  {
    value: 'Pacific/Honolulu',
    label: '(GMT-10:00) Hawaii',
    offset: '-10:00',
    abbr: 'HST',
    translations: {
      ar: '(GMT-10:00) هاواي',
      de: '(GMT-10:00) Hawaii',
      es: '(GMT-10:00) Hawái',
      he: '(GMT-10:00) הוואי',
      pl: '(GMT-10:00) Hawaje',
      ru: '(GMT-10:00) Гавайи'
    }
  },
  {
    value: 'America/Anchorage',
    label: '(GMT-09:00) Alaska',
    offset: '-09:00',
    abbr: 'AKST',
    translations: {
      ar: '(GMT-09:00) ألاسكا',
      de: '(GMT-09:00) Alaska',
      es: '(GMT-09:00) Alaska',
      he: '(GMT-09:00) אלסקה',
      pl: '(GMT-09:00) Alaska',
      ru: '(GMT-09:00) Аляска'
    }
  },
  {
    value: 'America/Los_Angeles',
    label: '(GMT-08:00) Pacific Time (US & Canada)',
    offset: '-08:00',
    abbr: 'PST',
    translations: {
      ar: '(GMT-08:00) التوقيت الباسيفيكي (الولايات المتحدة وكندا)',
      de: '(GMT-08:00) Pazifische Zeit (USA & Kanada)',
      es: '(GMT-08:00) Hora del Pacífico (EE. UU. y Canadá)',
      he: '(GMT-08:00) שעון פסיפי (ארה"ב וקנדה)',
      pl: '(GMT-08:00) Czas pacyficzny (USA i Kanada)',
      ru: '(GMT-08:00) Тихоокеанское время (США и Канада)'
    }
  },
  {
    value: 'America/Denver',
    label: '(GMT-07:00) Mountain Time (US & Canada)',
    offset: '-07:00',
    abbr: 'MST',
    translations: {
      ar: '(GMT-07:00) توقيت الجبال (الولايات المتحدة وكندا)',
      de: '(GMT-07:00) Gebirgszeit (USA & Kanada)',
      es: '(GMT-07:00) Hora de la Montaña (EE. UU. y Canadá)',
      he: '(GMT-07:00) שעון הרים (ארה"ב וקנדה)',
      pl: '(GMT-07:00) Czas górski (USA i Kanada)',
      ru: '(GMT-07:00) Горное время (США и Канада)'
    }
  },
  {
    value: 'America/Chicago',
    label: '(GMT-06:00) Central Time (US & Canada)',
    offset: '-06:00',
    abbr: 'CST',
    translations: {
      ar: '(GMT-06:00) التوقيت المركزي (الولايات المتحدة وكندا)',
      de: '(GMT-06:00) Zentrale Zeit (USA & Kanada)',
      es: '(GMT-06:00) Hora Central (EE. UU. y Canadá)',
      he: '(GMT-06:00) שעון מרכזי (ארה"ב וקנדה)',
      pl: '(GMT-06:00) Czas centralny (USA i Kanada)',
      ru: '(GMT-06:00) Центральное время (США и Канада)'
    }
  },
  {
    value: 'America/New_York',
    label: '(GMT-05:00) Eastern Time (US & Canada)',
    offset: '-05:00',
    abbr: 'EST',
    translations: {
      ar: '(GMT-05:00) التوقيت الشرقي (الولايات المتحدة وكندا)',
      de: '(GMT-05:00) Östliche Zeit (USA & Kanada)',
      es: '(GMT-05:00) Hora del Este (EE. UU. y Canadá)',
      he: '(GMT-05:00) שעון מזרחי (ארה"ב וקנדה)',
      pl: '(GMT-05:00) Czas wschodni (USA i Kanada)',
      ru: '(GMT-05:00) Восточное время (США и Канада)'
    }
  },
  {
    value: 'America/Halifax',
    label: '(GMT-04:00) Atlantic Time (Canada)',
    offset: '-04:00',
    abbr: 'AST',
    translations: {
      ar: '(GMT-04:00) التوقيت الأطلسي (كندا)',
      de: '(GMT-04:00) Atlantische Zeit (Kanada)',
      es: '(GMT-04:00) Hora del Atlántico (Canadá)',
      he: '(GMT-04:00) שעון אטלנטי (קנדה)',
      pl: '(GMT-04:00) Czas atlantycki (Kanada)',
      ru: '(GMT-04:00) Атлантическое время (Канада)'
    }
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: '(GMT-03:00) Buenos Aires',
    offset: '-03:00',
    abbr: 'ART',
    translations: {
      ar: '(GMT-03:00) بوينس آيرس',
      de: '(GMT-03:00) Buenos Aires',
      es: '(GMT-03:00) Buenos Aires',
      he: '(GMT-03:00) בואנוס איירס',
      pl: '(GMT-03:00) Buenos Aires',
      ru: '(GMT-03:00) Буэнос-Айрес'
    }
  },
  {
    value: 'Atlantic/South_Georgia',
    label: '(GMT-02:00) Mid-Atlantic',
    offset: '-02:00',
    abbr: 'GST',
    translations: {
      ar: '(GMT-02:00) وسط الأطلسي',
      de: '(GMT-02:00) Mittelatlantik',
      es: '(GMT-02:00) Atlántico Medio',
      he: '(GMT-02:00) מרכז האוקיינוס האטלנטי',
      pl: '(GMT-02:00) Środkowy Atlantyk',
      ru: '(GMT-02:00) Среднеатлантическое время'
    }
  },
  {
    value: 'Atlantic/Azores',
    label: '(GMT-01:00) Azores',
    offset: '-01:00',
    abbr: 'AZOT',
    translations: {
      ar: '(GMT-01:00) جزر الأزور',
      de: '(GMT-01:00) Azoren',
      es: '(GMT-01:00) Azores',
      he: '(GMT-01:00) האיים האזוריים',
      pl: '(GMT-01:00) Azory',
      ru: '(GMT-01:00) Азорские острова'
    }
  },
  {
    value: 'Europe/London',
    label: '(GMT+00:00) London',
    offset: '+00:00',
    abbr: 'GMT',
    translations: {
      ar: '(GMT+00:00) لندن',
      de: '(GMT+00:00) London',
      es: '(GMT+00:00) Londres',
      he: '(GMT+00:00) לונדון',
      pl: '(GMT+00:00) Londyn',
      ru: '(GMT+00:00) Лондон'
    }
  },
  {
    value: 'Europe/Paris',
    label: '(GMT+01:00) Paris',
    offset: '+01:00',
    abbr: 'CET',
    translations: {
      ar: '(GMT+01:00) باريس',
      de: '(GMT+01:00) Paris',
      es: '(GMT+01:00) París',
      he: '(GMT+01:00) פריז',
      pl: '(GMT+01:00) Paryż',
      ru: '(GMT+01:00) Париж'
    }
  },
  {
    value: 'Europe/Helsinki',
    label: '(GMT+02:00) Helsinki',
    offset: '+02:00',
    abbr: 'EET',
    translations: {
      ar: '(GMT+02:00) هلسنكي',
      de: '(GMT+02:00) Helsinki',
      es: '(GMT+02:00) Helsinki',
      he: '(GMT+02:00) הלסינקי',
      pl: '(GMT+02:00) Helsinki',
      ru: '(GMT+02:00) Хельсинки'
    }
  },
  {
    value: 'Europe/Moscow',
    label: '(GMT+03:00) Moscow',
    offset: '+03:00',
    abbr: 'MSK',
    translations: {
      ar: '(GMT+03:00) موسكو',
      de: '(GMT+03:00) Moskau',
      es: '(GMT+03:00) Moscú',
      he: '(GMT+03:00) מוסקבה',
      pl: '(GMT+03:00) Moskwa',
      ru: '(GMT+03:00) Москва'
    }
  },
  {
    value: 'Asia/Dubai',
    label: '(GMT+04:00) Dubai',
    offset: '+04:00',
    abbr: 'GST',
    translations: {
      ar: '(GMT+04:00) دبي',
      de: '(GMT+04:00) Dubai',
      es: '(GMT+04:00) Dubái',
      he: '(GMT+04:00) דובאי',
      pl: '(GMT+04:00) Dubaj',
      ru: '(GMT+04:00) Дубай'
    }
  },
  {
    value: 'Asia/Karachi',
    label: '(GMT+05:00) Karachi',
    offset: '+05:00',
    abbr: 'PKT',
    translations: {
      ar: '(GMT+05:00) كراتشي',
      de: '(GMT+05:00) Karachi',
      es: '(GMT+05:00) Karachi',
      he: '(GMT+05:00) קראצ\'י',
      pl: '(GMT+05:00) Karaczi',
      ru: '(GMT+05:00) Карачи'
    }
  },
  {
    value: 'Asia/Dhaka',
    label: '(GMT+06:00) Dhaka',
    offset: '+06:00',
    abbr: 'BST',
    translations: {
      ar: '(GMT+06:00) دكا',
      de: '(GMT+06:00) Dhaka',
      es: '(GMT+06:00) Daca',
      he: '(GMT+06:00) דאקה',
      pl: '(GMT+06:00) Dhaka',
      ru: '(GMT+06:00) Дакка'
    }
  },
  {
    value: 'Asia/Bangkok',
    label: '(GMT+07:00) Bangkok',
    offset: '+07:00',
    abbr: 'ICT',
    translations: {
      ar: '(GMT+07:00) بانكوك',
      de: '(GMT+07:00) Bangkok',
      es: '(GMT+07:00) Bangkok',
      he: '(GMT+07:00) בנגקוק',
      pl: '(GMT+07:00) Bangkok',
      ru: '(GMT+07:00) Бангкок'
    }
  },
  {
    value: 'Asia/Shanghai',
    label: '(GMT+08:00) Shanghai',
    offset: '+08:00',
    abbr: 'CST',
    translations: {
      ar: '(GMT+08:00) شنغهاي',
      de: '(GMT+08:00) Shanghai',
      es: '(GMT+08:00) Shanghái',
      he: '(GMT+08:00) שנחאי',
      pl: '(GMT+08:00) Szanghaj',
      ru: '(GMT+08:00) Шанхай'
    }
  },
  {
    value: 'Asia/Tokyo',
    label: '(GMT+09:00) Tokyo',
    offset: '+09:00',
    abbr: 'JST',
    translations: {
      ar: '(GMT+09:00) طوكيو',
      de: '(GMT+09:00) Tokio',
      es: '(GMT+09:00) Tokio',
      he: '(GMT+09:00) טוקיו',
      pl: '(GMT+09:00) Tokio',
      ru: '(GMT+09:00) Токио'
    }
  },
  {
    value: 'Australia/Sydney',
    label: '(GMT+10:00) Sydney',
    offset: '+10:00',
    abbr: 'AEST',
    translations: {
      ar: '(GMT+10:00) سيدني',
      de: '(GMT+10:00) Sydney',
      es: '(GMT+10:00) Sídney',
      he: '(GMT+10:00) סידני',
      pl: '(GMT+10:00) Sydney',
      ru: '(GMT+10:00) Сидней'
    }
  },
  {
    value: 'Pacific/Noumea',
    label: '(GMT+11:00) Noumea',
    offset: '+11:00',
    abbr: 'NCT',
    translations: {
      ar: '(GMT+11:00) نوميا',
      de: '(GMT+11:00) Nouméa',
      es: '(GMT+11:00) Numea',
      he: '(GMT+11:00) נומאה',
      pl: '(GMT+11:00) Numea',
      ru: '(GMT+11:00) Нумеа'
    }
  },
  {
    value: 'Pacific/Auckland',
    label: '(GMT+12:00) Auckland',
    offset: '+12:00',
    abbr: 'NZST',
    translations: {
      ar: '(GMT+12:00) أوكلاند',
      de: '(GMT+12:00) Auckland',
      es: '(GMT+12:00) Auckland',
      he: '(GMT+12:00) אוקלנד',
      pl: '(GMT+12:00) Auckland',
      ru: '(GMT+12:00) Окленд'
    }
  }
]