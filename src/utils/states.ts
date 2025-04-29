interface State {
  label: string
  value: string
  code: string
  country_code: string
  translations: {
    ar: string
    de: string
    es: string
    he: string
    pl: string
    ru: string
  }
}

export const states: State[] = [
  // United States
  { 
    label: 'Alabama',
    value: 'Alabama',
    code: 'AL',
    country_code: 'US',
    translations: {
      ar: 'ألاباما',
      de: 'Alabama',
      es: 'Alabama',
      he: 'אלבמה',
      pl: 'Alabama',
      ru: 'Алабама'
    }
  },
  {
    label: 'Alaska',
    value: 'Alaska',
    code: 'AK',
    country_code: 'US',
    translations: {
      ar: 'ألاسكا',
      de: 'Alaska',
      es: 'Alaska',
      he: 'אלסקה',
      pl: 'Alaska',
      ru: 'Аляска'
    }
  },
  {
    label: 'Arizona',
    value: 'Arizona',
    code: 'AZ',
    country_code: 'US',
    translations: {
      ar: 'أريزونا',
      de: 'Arizona',
      es: 'Arizona',
      he: 'אריזונה',
      pl: 'Arizona',
      ru: 'Аризона'
    }
  },
  {
    label: 'Arkansas', value: 'Arkansas', code: 'AR', country_code: 'US',
    translations: {
      ar: 'أركنساس',
      de: 'Arkansas',
      es: 'Arkansas',
      he: 'ארקנסו',
      pl: 'Arkansas',
      ru: 'Арканзас'
    }
  },
  {
    label: 'California',
    value: 'California',
    code: 'CA',
    country_code: 'US',
    translations: {
      ar: 'كاليفورنيا',
      de: 'Kalifornien',
      es: 'California',
      he: 'קליפורניה',
      pl: 'Kalifornia',
      ru: 'Калифорния'
    }
  },
  {
    label: 'Colorado', value: 'Colorado', code: 'CO', country_code: 'US',
    translations: {
      ar: 'كولورادو',
      de: 'Colorado',
      es: 'Colorado',
      he: 'קולורדו',
      pl: 'Kolorado',
      ru: 'Колорадо'
    }
  },
  {
    label: 'Connecticut', value: 'Connecticut', code: 'CT', country_code: 'US',
    translations: {
      ar: 'كونيتيكت',
      de: 'Connecticut',
      es: 'Connecticut',
      he: 'קונטיקט',
      pl: 'Connecticut',
      ru: 'Коннектикут'
    }
  },
  {
    label: 'Delaware', value: 'Delaware', code: 'DE', country_code: 'US',
    translations: {
      ar: 'ديلاوير',
      de: 'Delaware',
      es: 'Delaware',
      he: 'דלאוור',
      pl: 'Delaware',
      ru: 'Делавэр'
    }
  },

  {
    label: 'Florida',
    value: 'Florida',
    code: 'FL',
    country_code: 'US',
    translations: {
      ar: 'فلوريدا',
      de: 'Florida',
      es: 'Florida',
      he: 'פלורידה',
      pl: 'Floryda',
      ru: 'Флорида'
    }
  },
  { 
    label: 'Georgia', value: 'Georgia', code: 'GA', country_code: 'US',
    translations: {
      ar: 'جورجيا',
      de: 'Georgia',
      es: 'Georgia',
      he: 'ג\'ורג\'יה',
      pl: 'Georgia',
      ru: 'Джорджия'
    }
  },
  { 
    label: 'Hawaii', value: 'Hawaii', code: 'HI', country_code: 'US',
    translations: {
      ar: 'هاواي',
      de: 'Hawaii',
      es: 'Hawái',
      he: 'הוואי',
      pl: 'Hawaje',
      ru: 'Гавайи'
    }
  },
  { 
    label: 'Idaho', value: 'Idaho', code: 'ID', country_code: 'US',
    translations: {
      ar: 'أيداهو',
      de: 'Idaho',
      es: 'Idaho',
      he: 'איידהו',
      pl: 'Idaho',
      ru: 'Айдахо'
    }
  },
  { 
    label: 'Illinois', value: 'Illinois', code: 'IL', country_code: 'US',
    translations: {
      ar: 'إلينوي',
      de: 'Illinois',
      es: 'Illinois',
      he: 'אילינוי',
      pl: 'Illinois',
      ru: 'Иллинойс'
    }
  },
  { 
    label: 'Indiana', value: 'Indiana', code: 'IN', country_code: 'US',
    translations: {
      ar: 'إنديانا',
      de: 'Indiana',
      es: 'Indiana',
      he: 'אינדיאנה',
      pl: 'Indiana',
      ru: 'Индиана'
    }
  },
  { 
    label: 'Iowa', value: 'Iowa', code: 'IA', country_code: 'US',
    translations: {
      ar: 'آيوا',
      de: 'Iowa',
      es: 'Iowa',
      he: 'איווה',
      pl: 'Iowa',
      ru: 'Айова'
    }
  },
  { 
    label: 'Kansas', value: 'Kansas', code: 'KS', country_code: 'US',
    translations: {
      ar: 'كانساس',
      de: 'Kansas',
      es: 'Kansas',
      he: 'קנזס',
      pl: 'Kansas',
      ru: 'Канзас'
    }
  },
  { 
    label: 'Kentucky', value: 'Kentucky', code: 'KY', country_code: 'US',
    translations: {
      ar: 'كنتاكي',
      de: 'Kentucky',
      es: 'Kentucky',
      he: 'קנטקי',
      pl: 'Kentucky',
      ru: 'Кентукки'
    }
  },
  { 
    label: 'Louisiana', value: 'Louisiana', code: 'LA', country_code: 'US',
    translations: {
      ar: 'لويزيانا',
      de: 'Louisiana',
      es: 'Luisiana',
      he: 'לואיזיאנה',
      pl: 'Luizjana',
      ru: 'Луизиана'
    }
  },
  { 
    label: 'Maine', value: 'Maine', code: 'ME', country_code: 'US',
    translations: {
      ar: 'مين',
      de: 'Maine',
      es: 'Maine',
      he: 'מיין',
      pl: 'Maine',
      ru: 'Мэн'
    }
  },
  { 
    label: 'Maryland', value: 'Maryland', code: 'MD', country_code: 'US',
    translations: {
      ar: 'ماريلاند',
      de: 'Maryland',
      es: 'Maryland',
      he: 'מרילנד',
      pl: 'Maryland',
      ru: 'Мэриленд'
    }
  },
  { 
    label: 'Massachusetts', value: 'Massachusetts', code: 'MA', country_code: 'US',
    translations: {
      ar: 'ماساتشوستس',
      de: 'Massachusetts',
      es: 'Massachusetts',
      he: 'מסצ\'וסטס',
      pl: 'Massachusetts',
      ru: 'Массачусетс'
    }
  },
  { 
    label: 'Michigan', value: 'Michigan', code: 'MI', country_code: 'US',
    translations: {
      ar: 'ميشيغان',
      de: 'Michigan',
      es: 'Míchigan',
      he: 'מישיגן',
      pl: 'Michigan',
      ru: 'Мичиган'
    }
  },
  { 
    label: 'Minnesota', value: 'Minnesota', code: 'MN', country_code: 'US',
    translations: {
      ar: 'مينيسوتا',
      de: 'Minnesota',
      es: 'Minnesota',
      he: 'מינסוטה',
      pl: 'Minnesota',
      ru: 'Миннесота'
    }
  },
  { 
    label: 'Mississippi', value: 'Mississippi', code: 'MS', country_code: 'US',
    translations: {
      ar: 'مسيسيبي',
      de: 'Mississippi',
      es: 'Misisipi',
      he: 'מיסיסיפי',
      pl: 'Missisipi',
      ru: 'Миссисипи'
    }
  },
  { 
    label: 'Missouri', value: 'Missouri', code: 'MO', country_code: 'US',
    translations: {
      ar: 'ميزوري',
      de: 'Missouri',
      es: 'Misuri',
      he: 'מיזורי',
      pl: 'Missouri',
      ru: 'Миссури'
    }
  },
  { 
    label: 'Montana', value: 'Montana', code: 'MT', country_code: 'US',
    translations: {
      ar: 'مونتانا',
      de: 'Montana',
      es: 'Montana',
      he: 'מונטנה',
      pl: 'Montana',
      ru: 'Монтана'
    }
  },
  { 
    label: 'Nebraska', value: 'Nebraska', code: 'NE', country_code: 'US',
    translations: {
      ar: 'نبراسكا',
      de: 'Nebraska',
      es: 'Nebraska',
      he: 'נברסקה',
      pl: 'Nebraska',
      ru: 'Небраска'
    }
  },
  { 
    label: 'Nevada', value: 'Nevada', code: 'NV', country_code: 'US',
    translations: {
      ar: 'نيفادا',
      de: 'Nevada',
      es: 'Nevada',
      he: 'נבדה',
      pl: 'Nevada',
      ru: 'Невада'
    }
  },
  { 
    label: 'New Hampshire', value: 'New Hampshire', code: 'NH', country_code: 'US',
    translations: {
      ar: 'نيوهامبشير',
      de: 'New Hampshire',
      es: 'Nuevo Hampshire',
      he: 'ניו המפשייר',
      pl: 'New Hampshire',
      ru: 'Нью-Гэмпшир'
    }
  },
  { 
    label: 'New Jersey', value: 'New Jersey', code: 'NJ', country_code: 'US',
    translations: {
      ar: 'نيوجيرسي',
      de: 'New Jersey',
      es: 'Nueva Jersey',
      he: 'ניו ג\'רזי',
      pl: 'New Jersey',
      ru: 'Нью-Джерси'
    }
  },
  { 
    label: 'New Mexico', value: 'New Mexico', code: 'NM', country_code: 'US',
    translations: {
      ar: 'نيومكسيكو',
      de: 'New Mexico',
      es: 'Nuevo México',
      he: 'ניו מקסיקו',
      pl: 'Nowy Meksyk',
      ru: 'Нью-Мексико'
    }
  },

  {
    label: 'New York',
    value: 'New York',
    code: 'NY',
    country_code: 'US',
    translations: {
      ar: 'نيويورك',
      de: 'New York',
      es: 'Nueva York',
      he: 'ניו יורק',
      pl: 'Nowy Jork',
      ru: 'Нью-Йорк'
    }
  },
  {
    label: 'North Carolina', value: 'North Carolina', code: 'NC', country_code: 'US',
    translations: {
      ar: 'كارولاينا الشمالية',
      de: 'North Carolina',
      es: 'Carolina del Norte',
      he: 'קרוליינה הצפונית',
      pl: 'Karolina Północna',
      ru: 'Северная Каролина'
    }
  },
  {
    label: 'North Dakota', value: 'North Dakota', code: 'ND', country_code: 'US',
    translations: {
      ar: 'داكوتا الشمالية',
      de: 'North Dakota',
      es: 'Dakota del Norte',
      he: 'דקוטה הצפונית',
      pl: 'Dakota Północna',
      ru: 'Северная Дакота'
    }
  },
  {
    label: 'Ohio', value: 'Ohio', code: 'OH', country_code: 'US',
    translations: {
      ar: 'أوهايو',
      de: 'Ohio',
      es: 'Ohio',
      he: 'אוהיו',
      pl: 'Ohio',
      ru: 'Огайо'
    }
  },
  {
    label: 'Oklahoma', value: 'Oklahoma', code: 'OK', country_code: 'US',
    translations: {
      ar: 'أوكلاهوما',
      de: 'Oklahoma',
      es: 'Oklahoma',
      he: 'אוקלהומה',
      pl: 'Oklahoma',
      ru: 'Оклахома'
    }
  },
  {
    label: 'Oregon', value: 'Oregon', code: 'OR', country_code: 'US',
    translations: {
      ar: 'أوريغون',
      de: 'Oregon',
      es: 'Oregón',
      he: 'אורגון',
      pl: 'Oregon',
      ru: 'Орегон'
    }
  },
  {
    label: 'Pennsylvania', value: 'Pennsylvania', code: 'PA', country_code: 'US',
    translations: {
      ar: 'بنسلفانيا',
      de: 'Pennsylvania',
      es: 'Pensilvania',
      he: 'פנסילבניה',
      pl: 'Pensylwania',
      ru: 'Пенсильвания'
    }
  },
  {
    label: 'Rhode Island', value: 'Rhode Island', code: 'RI', country_code: 'US',
    translations: {
      ar: 'رود آيلاند',
      de: 'Rhode Island',
      es: 'Rhode Island',
      he: 'רוד איילנד',
      pl: 'Rhode Island',
      ru: 'Род-Айленд'
    }
  },
  {
    label: 'South Carolina', value: 'South Carolina', code: 'SC', country_code: 'US',
    translations: {
      ar: 'كارولاينا الجنوبية',
      de: 'South Carolina',
      es: 'Carolina del Sur',
      he: 'קרוליינה הדרומית',
      pl: 'Karolina Południowa',
      ru: 'Южная Каролина'
    }
  },
  {
    label: 'South Dakota', value: 'South Dakota', code: 'SD', country_code: 'US',
    translations: {
      ar: 'داكوتا الجنوبية',
      de: 'South Dakota',
      es: 'Dakota del Sur',
      he: 'דקוטה הדרומית',
      pl: 'Dakota Południowa',
      ru: 'Южная Дакота'
    }
  },
  {
    label: 'Tennessee', value: 'Tennessee', code: 'TN', country_code: 'US',
    translations: {
      ar: 'تينيسي',
      de: 'Tennessee',
      es: 'Tennessee',
      he: 'טנסי',
      pl: 'Tennessee',
      ru: 'Теннесси'
    }
  },

  {
    label: 'Texas',
    value: 'Texas',
    code: 'TX',
    country_code: 'US',
    translations: {
      ar: 'تكساس',
      de: 'Texas',
      es: 'Texas',
      he: 'טקסס',
      pl: 'Teksas',
      ru: 'Техас'
    }
  },
  {
    label: 'Utah', value: 'Utah', code: 'UT', country_code: 'US',
    translations: {
      ar: 'يوتا',
      de: 'Utah',
      es: 'Utah',
      he: 'יוטה',
      pl: 'Utah',
      ru: 'Юта'
    }
  },
  {
    label: 'Vermont', value: 'Vermont', code: 'VT', country_code: 'US',
    translations: {
      ar: 'فيرمونت',
      de: 'Vermont',
      es: 'Vermont',
      he: 'ורמונט',
      pl: 'Vermont',
      ru: 'Вермонт'
    }
  },
  {
    label: 'Virginia', value: 'Virginia', code: 'VA', country_code: 'US',
    translations: {
      ar: 'فرجينيا',
      de: 'Virginia',
      es: 'Virginia',
      he: 'וירג\'יניה',
      pl: 'Wirginia',
      ru: 'Виргиния'
    }
  },
  {
    label: 'Washington', value: 'Washington', code: 'WA', country_code: 'US',
    translations: {
      ar: 'واشنطن',
      de: 'Washington',
      es: 'Washington',
      he: 'וושינגטון',
      pl: 'Waszyngton',
      ru: 'Вашингтон'
    }
  },
  {
    label: 'West Virginia', value: 'West Virginia', code: 'WV', country_code: 'US',
    translations: {
      ar: 'فرجينيا الغربية',
      de: 'West Virginia',
      es: 'Virginia Occidental',
      he: 'וירג\'יניה המערבית',
      pl: 'Wirginia Zachodnia',
      ru: 'Западная Виргиния'
    }
  },
  {
    label: 'Wisconsin', value: 'Wisconsin', code: 'WI', country_code: 'US',
    translations: {
      ar: 'ويسكونسن',
      de: 'Wisconsin',
      es: 'Wisconsin',
      he: 'ויסקונסין',
      pl: 'Wisconsin',
      ru: 'Висконсин'
    }
  },
  {
    label: 'Wyoming', value: 'Wyoming', code: 'WY', country_code: 'US',
    translations: {
      ar: 'وايومنغ',
      de: 'Wyoming',
      es: 'Wyoming',
      he: 'וויומינג',
      pl: 'Wyoming',
      ru: 'Вайоминг'
    }
  },


  // Canada
  {
    label: 'Alberta', value: 'Alberta', code: 'AB', country_code: 'CA',
    translations: {
      ar: 'ألبرتا',
      de: 'Alberta',
      es: 'Alberta',
      he: 'אלברטה',
      pl: 'Alberta',
      ru: 'Альберта'
    }
  },
  {
    label: 'British Columbia', value: 'British Columbia', code: 'BC', country_code: 'CA',
    translations: {
      ar: 'كولومبيا البريطانية',
      de: 'Britisch-Kolumbien',
      es: 'Columbia Británica',
      he: 'קולומביה הבריטית',
      pl: 'Kolumbia Brytyjska',
      ru: 'Британская Колумбия'
    }
  },
  {
    label: 'Manitoba', value: 'Manitoba', code: 'MB', country_code: 'CA',
    translations: {
      ar: 'مانيتوبا',
      de: 'Manitoba',
      es: 'Manitoba',
      he: 'מניטובה',
      pl: 'Manitoba',
      ru: 'Манитоба'
    }
  },
  {
    label: 'New Brunswick', value: 'New Brunswick', code: 'NB', country_code: 'CA',
    translations: {
      ar: 'نيو برونزويك',
      de: 'New Brunswick',
      es: 'Nuevo Brunswick',
      he: 'ניו ברונזוויק',
      pl: 'Nowy Brunszwik',
      ru: 'Нью-Брансуик'
    }
  },
  {
    label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador', code: 'NL', country_code: 'CA',
    translations: {
      ar: 'نيوفاوندلاند ولابرادور',
      de: 'Neufundland und Labrador',
      es: 'Terranova y Labrador',
      he: 'ניופאונדלנד ולברדור',
      pl: 'Nowa Fundlandia i Labrador',
      ru: 'Ньюфаундленд и Лабрадор'
    }
  },
  {
    label: 'Northwest Territories', value: 'Northwest Territories', code: 'NT', country_code: 'CA',
    translations: {
      ar: 'الأقاليم الشمالية الغربية',
      de: 'Nordwest-Territorien',
      es: 'Territorios del Noroeste',
      he: 'הטריטוריות הצפון-מערביות',
      pl: 'Terytoria Północno-Zachodnie',
      ru: 'Северо-Западные территории'
    }
  },
  {
    label: 'Nova Scotia', value: 'Nova Scotia', code: 'NS', country_code: 'CA',
    translations: {
      ar: 'نوفا سكوشا',
      de: 'Nova Scotia',
      es: 'Nueva Escocia',
      he: 'נובה סקוטיה',
      pl: 'Nowa Szkocja',
      ru: 'Новая Шотландия'
    }
  },
  {
    label: 'Nunavut', value: 'Nunavut', code: 'NU', country_code: 'CA',
    translations: {
      ar: 'نونافوت',
      de: 'Nunavut',
      es: 'Nunavut',
      he: 'נונאווט',
      pl: 'Nunavut',
      ru: 'Нунавут'
    }
  },
  {
    label: 'Prince Edward Island', value: 'Prince Edward Island', code: 'PE', country_code: 'CA',
    translations: {
      ar: 'جزيرة الأمير إدوارد',
      de: 'Prince Edward Island',
      es: 'Isla del Príncipe Eduardo',
      he: 'אי הנסיך אדוארד',
      pl: 'Wyspa Księcia Edwarda',
      ru: 'Остров Принца Эдуарда'
    }
  },
  {
    label: 'Ontario',
    value: 'Ontario',
    code: 'ON',
    country_code: 'CA',
    translations: {
      ar: 'أونتاريو',
      de: 'Ontario',
      es: 'Ontario',
      he: 'אונטריו',
      pl: 'Ontario',
      ru: 'Онтарио'
    }
  },
  {
    label: 'Quebec',
    value: 'Quebec',
    code: 'QC',
    country_code: 'CA',
    translations: {
      ar: 'كيبيك',
      de: 'Québec',
      es: 'Quebec',
      he: 'קוויבק',
      pl: 'Quebec',
      ru: 'Квебек'
    }
  },
  {
    label: 'Saskatchewan', value: 'Saskatchewan', code: 'SK', country_code: 'CA',
    translations: {
      ar: 'ساسكاتشوان',
      de: 'Saskatchewan',
      es: 'Saskatchewan',
      he: 'ססקצ\'ואן',
      pl: 'Saskatchewan',
      ru: 'Саскачеван'
    }
  },
  {
    label: 'Yukon', value: 'Yukon', code: 'YT', country_code: 'CA',
    translations: {
      ar: 'يوكون',
      de: 'Yukon',
      es: 'Yukón',
      he: 'יוקון',
      pl: 'Jukon',
      ru: 'Юкон'
    }
  },


  // Australia
  {
    label: 'Australian Capital Territory', value: 'Australian Capital Territory', code: 'ACT', country_code: 'AU',
    translations: {
      ar: 'إقليم العاصمة الأسترالية',
      de: 'Australian Capital Territory',
      es: 'Territorio de la Capital Australiana',
      he: 'טריטוריית הבירה האוסטרלית',
      pl: 'Terytorium Stołeczne Australii',
      ru: 'Австралийская столичная территория'
    }
  },
  {
    label: 'Northern Territory', value: 'Northern Territory', code: 'NT', country_code: 'AU',
    translations: {
      ar: 'الإقليم الشمالي',
      de: 'Northern Territory',
      es: 'Territorio del Norte',
      he: 'הטריטוריה הצפונית',
      pl: 'Terytorium Północne',
      ru: 'Северная территория'
    }
  },
  {
    label: 'Queensland', value: 'Queensland', code: 'QLD', country_code: 'AU',
    translations: {
      ar: 'كوينزلاند',
      de: 'Queensland',
      es: 'Queensland',
      he: 'קווינסלנד',
      pl: 'Queensland',
      ru: 'Квинсленд'
    }
  },
  {
    label: 'South Australia', value: 'South Australia', code: 'SA', country_code: 'AU',
    translations: {
      ar: 'جنوب أستراليا',
      de: 'South Australia',
      es: 'Australia Meridional',
      he: 'דרום אוסטרליה',
      pl: 'Australia Południowa',
      ru: 'Южная Австралия'
    }
  },
  {
    label: 'Tasmania', value: 'Tasmania', code: 'TAS', country_code: 'AU',
    translations: {
      ar: 'تسمانيا',
      de: 'Tasmanien',
      es: 'Tasmania',
      he: 'טסמניה',
      pl: 'Tasmania',
      ru: 'Тасмания'
    }
  },

  {
    label: 'New South Wales',
    value: 'New South Wales',
    code: 'NSW',
    country_code: 'AU',
    translations: {
      ar: 'نيو ساوث ويلز',
      de: 'Neusüdwales',
      es: 'Nueva Gales del Sur',
      he: 'ניו סאות\' ויילס',
      pl: 'Nowa Południowa Walia',
      ru: 'Новый Южный Уэльс'
    }
  },
  {
    label: 'Victoria',
    value: 'Victoria',
    code: 'VIC',
    country_code: 'AU',
    translations: {
      ar: 'فيكتوريا',
      de: 'Victoria',
      es: 'Victoria',
      he: 'ויקטוריה',
      pl: 'Wiktoria',
      ru: 'Виктория'
    }
  },
  {
    label: 'Western Australia', value: 'Western Australia', code: 'WA', country_code: 'AU',
    translations: {
      ar: 'أستراليا الغربية',
      de: 'Western Australia',
      es: 'Australia Occidental',
      he: 'מערב אוסטרליה',
      pl: 'Australia Zachodnia',
      ru: 'Западная Австралия'
    }
  },


  // India
  {
    label: 'Andhra Pradesh', value: 'Andhra Pradesh', code: 'AP', country_code: 'IN',
    translations: {
      ar: 'أندرا براديش',
      de: 'Andhra Pradesh',
      es: 'Andhra Pradesh',
      he: 'אנדרה פראדש',
      pl: 'Andhra Pradesh',
      ru: 'Андхра-Прадеш'
    }
  },
  {
    label: 'Arunachal Pradesh', value: 'Arunachal Pradesh', code: 'AR', country_code: 'IN',
    translations: {
      ar: 'أروناجل براديش',
      de: 'Arunachal Pradesh',
      es: 'Arunachal Pradesh',
      he: 'ארונצ\'ל פראדש',
      pl: 'Arunachal Pradesh',
      ru: 'Аруначал-Прадеш'
    }
  },
  {
    label: 'Assam', value: 'Assam', code: 'AS', country_code: 'IN',
    translations: {
      ar: 'آسام',
      de: 'Assam',
      es: 'Assam',
      he: 'אסאם',
      pl: 'Asam',
      ru: 'Ассам'
    }
  },
  {
    label: 'Bihar', value: 'Bihar', code: 'BR', country_code: 'IN',
    translations: {
      ar: 'بيهار',
      de: 'Bihar',
      es: 'Bihar',
      he: 'ביהר',
      pl: 'Bihar',
      ru: 'Бихар'
    }
  },
  {
    label: 'Chhattisgarh', value: 'Chhattisgarh', code: 'CT', country_code: 'IN',
    translations: {
      ar: 'تشاتيسغار',
      de: 'Chhattisgarh',
      es: 'Chhattisgarh',
      he: 'צ\'האטיסגרה',
      pl: 'Chhattisgarh',
      ru: 'Чхаттисгарх'
    }
  },
  {
    label: 'Goa', value: 'Goa', code: 'GA', country_code: 'IN',
    translations: {
      ar: 'جوا',
      de: 'Goa',
      es: 'Goa',
      he: 'גואה',
      pl: 'Goa',
      ru: 'Гоа'
    }
  },
  {
    label: 'Gujarat', value: 'Gujarat', code: 'GJ', country_code: 'IN',
    translations: {
      ar: 'غوجارات',
      de: 'Gujarat',
      es: 'Guyarat',
      he: 'גוג\'ראט',
      pl: 'Gudżarat',
      ru: 'Гуджарат'
    }
  },
  {
    label: 'Haryana', value: 'Haryana', code: 'HR', country_code: 'IN',
    translations: {
      ar: 'هاريانا',
      de: 'Haryana',
      es: 'Haryana',
      he: 'הריאנה',
      pl: 'Haryana',
      ru: 'Харьяна'
    }
  },
  {
    label: 'Himachal Pradesh', value: 'Himachal Pradesh', code: 'HP', country_code: 'IN',
    translations: {
      ar: 'هيماشال براديش',
      de: 'Himachal Pradesh',
      es: 'Himachal Pradesh',
      he: 'הימאצ\'ל פראדש',
      pl: 'Himachal Pradesh',
      ru: 'Химачал-Прадеш'
    }
  },
  {
    label: 'Jharkhand', value: 'Jharkhand', code: 'JH', country_code: 'IN',
    translations: {
      ar: 'جهارخاند',
      de: 'Jharkhand',
      es: 'Jharkhand',
      he: 'ג\'הרקאנד',
      pl: 'Jharkhand',
      ru: 'Джаркханд'
    }
  },
  {
    label: 'Karnataka', value: 'Karnataka', code: 'KA', country_code: 'IN',
    translations: {
      ar: 'كارناتاكا',
      de: 'Karnataka',
      es: 'Karnataka',
      he: 'קרנטקה',
      pl: 'Karnataka',
      ru: 'Карнатака'
    }
  },
  {
    label: 'Kerala', value: 'Kerala', code: 'KL', country_code: 'IN',
    translations: {
      ar: 'كيرالا',
      de: 'Kerala',
      es: 'Kerala',
      he: 'קרלה',
      pl: 'Kerala',
      ru: 'Керала'
    }
  },
  {
    label: 'Madhya Pradesh', value: 'Madhya Pradesh', code: 'MP', country_code: 'IN',
    translations: {
      ar: 'مدهيا براديش',
      de: 'Madhya Pradesh',
      es: 'Madhya Pradesh',
      he: 'מדיה פראדש',
      pl: 'Madhya Pradesh',
      ru: 'Мадхья-Прадеш'
    }
  },
  {
    label: 'Maharashtra', value: 'Maharashtra', code: 'MH', country_code: 'IN',
    translations: {
      ar: 'ماهاراشترا',
      de: 'Maharashtra',
      es: 'Maharashtra',
      he: 'מהרשטרה',
      pl: 'Maharasztra',
      ru: 'Махараштра'
    }
  },
  {
    label: 'Manipur', value: 'Manipur', code: 'MN', country_code: 'IN',
    translations: {
      ar: 'مانيبور',
      de: 'Manipur',
      es: 'Manipur',
      he: 'מניפור',
      pl: 'Manipur',
      ru: 'Манипур'
    }
  },
  {
    label: 'Meghalaya', value: 'Meghalaya', code: 'ML', country_code: 'IN',
    translations: {
      ar: 'ميغالايا',
      de: 'Meghalaya',
      es: 'Meghalaya',
      he: 'מגהאליה',
      pl: 'Meghalaya',
      ru: 'Мегхалая'
    }
  },
  {
    label: 'Mizoram', value: 'Mizoram', code: 'MZ', country_code: 'IN',
    translations: {
      ar: 'ميزورام',
      de: 'Mizoram',
      es: 'Mizoram',
      he: 'מיזוראם',
      pl: 'Mizoram',
      ru: 'Мизорам'
    }
  },
  {
    label: 'Nagaland', value: 'Nagaland', code: 'NL', country_code: 'IN',
    translations: {
      ar: 'ناغالاند',
      de: 'Nagaland',
      es: 'Nagaland',
      he: 'נאגאלנד',
      pl: 'Nagaland',
      ru: 'Нагаленд'
    }
  },
  {
    label: 'Odisha', value: 'Odisha', code: 'OR', country_code: 'IN',
    translations: {
      ar: 'أوديشا',
      de: 'Odisha',
      es: 'Odisha',
      he: 'אודישה',
      pl: 'Odisha',
      ru: 'Одиша'
    }
  },
  {
    label: 'Punjab', value: 'Punjab', code: 'PB', country_code: 'IN',
    translations: {
      ar: 'البنجاب',
      de: 'Punjab',
      es: 'Punyab',
      he: 'פנג\'אב',
      pl: 'Pendżab',
      ru: 'Пенджаб'
    }
  },
  {
    label: 'Rajasthan', value: 'Rajasthan', code: 'RJ', country_code: 'IN',
    translations: {
      ar: 'راجستان',
      de: 'Rajasthan',
      es: 'Rajastán',
      he: 'ראג\'סטאן',
      pl: 'Radżastan',
      ru: 'Раджастхан'
    }
  },
  {
    label: 'Sikkim', value: 'Sikkim', code: 'SK', country_code: 'IN',
    translations: {
      ar: 'سيكيم',
      de: 'Sikkim',
      es: 'Sikkim',
      he: 'סיקים',
      pl: 'Sikkim',
      ru: 'Сикким'
    }
  },
  {
    label: 'Tamil Nadu', value: 'Tamil Nadu', code: 'TN', country_code: 'IN',
    translations: {
      ar: 'تاميل نادو',
      de: 'Tamil Nadu',
      es: 'Tamil Nadu',
      he: 'טאמיל נאדו',
      pl: 'Tamil Nadu',
      ru: 'Тамилнад'
    }
  },
  {
    label: 'Telangana', value: 'Telangana', code: 'TG', country_code: 'IN',
    translations: {
      ar: 'تيلانجانا',
      de: 'Telangana',
      es: 'Telangana',
      he: 'טלנגאנה',
      pl: 'Telangana',
      ru: 'Тelangana'
    }
  },
  {
    label: 'Tripura', value: 'Tripura', code: 'TR', country_code: 'IN',
    translations: {
      ar: 'تريبورا',
      de: 'Tripura',
      es: 'Tripura',
      he: 'טריפורה',
      pl: 'Tripura',
      ru: 'Трипура'
    }
  },
  {
    label: 'Uttar Pradesh', value: 'Uttar Pradesh', code: 'UP', country_code: 'IN',
    translations: {
      ar: 'أوتار براديش',
      de: 'Uttar Pradesh',
      es: 'Uttar Pradesh',
      he: 'אוטר פראדש',
      pl: 'Uttar Pradesh',
      ru: 'Уттар-Прадеш'
    }
  },
  {
    label: 'Uttarakhand', value: 'Uttarakhand', code: 'UT', country_code: 'IN',
    translations: {
      ar: 'أوتاراخند',
      de: 'Uttarakhand',
      es: 'Uttarakhand',
      he: 'אוטרקהאנד',
      pl: 'Uttarakhand',
      ru: 'Уттаракханд'
    }
  },
  {
    label: 'West Bengal', value: 'West Bengal', code: 'WB', country_code: 'IN',
    translations: {
      ar: 'البنغال الغربية',
      de: 'Westbengalen',
      es: 'Bengala Occidental',
      he: 'בנגל המערבית',
      pl: 'Bengal Zachodni',
      ru: 'Западная Бенгалия'
    }
  },

  // Brazil
  {
    label: 'Acre', value: 'Acre', code: 'AC', country_code: 'BR',
    translations: {
      ar: 'Acre',
      de: 'Acre',
      es: 'Acre',
      he: 'Acre',
      pl: 'Acre',
      ru: 'Acre'
    }
  },
  {
    label: 'Alagoas', value: 'Alagoas', code: 'AL', country_code: 'BR',
    translations: {
      ar: 'Alagoas',
      de: 'Alagoas',
      es: 'Alagoas',
      he: 'Alagoas',
      pl: 'Alagoas',
      ru: 'Alagoas'
    }
  },
  {
    label: 'Amapá', value: 'Amapá', code: 'AP', country_code: 'BR',
    translations: {
      ar: 'Amapá',
      de: 'Amapá',
      es: 'Amapá',
      he: 'Amapá',
      pl: 'Amapá',
      ru: 'Amapá'
    }
  },
  {
    label: 'Amazonas', value: 'Amazonas', code: 'AM', country_code: 'BR',
    translations: {
      ar: 'Amazonas',
      de: 'Amazonas',
      es: 'Amazonas',
      he: 'Amazonas',
      pl: 'Amazonas',
      ru: 'Amazonas'
    }
  },
  {
    label: 'Bahia', value: 'Bahia', code: 'BA', country_code: 'BR',
    translations: {
      ar: 'Bahia',
      de: 'Bahia',
      es: 'Bahia',
      he: 'Bahia',
      pl: 'Bahia',
      ru: 'Bahia'
    }
  },
  {
    label: 'Ceará', value: 'Ceará', code: 'CE', country_code: 'BR',
    translations: {
      ar: 'Ceará',
      de: 'Ceará',
      es: 'Ceará',
      he: 'Ceará',
      pl: 'Ceará',
      ru: 'Ceará'
    }
  },
  {
    label: 'Distrito Federal', value: 'Distrito Federal', code: 'DF', country_code: 'BR',
    translations: {
      ar: 'Distrito Federal',
      de: 'Distrito Federal',
      es: 'Distrito Federal',
      he: 'Distrito Federal',
      pl: 'Distrito Federal',
      ru: 'Distrito Federal'
    }
  },
  {
    label: 'Espírito Santo', value: 'Espírito Santo', code: 'ES', country_code: 'BR',
    translations: {
      ar: 'Espírito Santo',
      de: 'Espírito Santo',
      es: 'Espírito Santo',
      he: 'Espírito Santo',
      pl: 'Espírito Santo',
      ru: 'Espírito Santo'
    }
  },
  {
    label: 'Goiás', value: 'Goiás', code: 'GO', country_code: 'BR',
    translations: {
      ar: 'Goiás',
      de: 'Goiás',
      es: 'Goiás',
      he: 'Goiás',
      pl: 'Goiás',
      ru: 'Goiás'
    }
  },
  {
    label: 'Maranhão', value: 'Maranhão', code: 'MA', country_code: 'BR',
    translations: {
      ar: 'Maranhão',
      de: 'Maranhão',
      es: 'Maranhão',
      he: 'Maranhão',
      pl: 'Maranhão',
      ru: 'Maranhão'
    }
  },
  {
    label: 'Mato Grosso', value: 'Mato Grosso', code: 'MT', country_code: 'BR',
    translations: {
      ar: 'Mato Grosso',
      de: 'Mato Grosso',
      es: 'Mato Grosso',
      he: 'Mato Grosso',
      pl: 'Mato Grosso',
      ru: 'Mato Grosso'
    }
  },
  {
    label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul', code: 'MS', country_code: 'BR',
    translations: {
      ar: 'Mato Grosso do Sul',
      de: 'Mato Grosso do Sul',
      es: 'Mato Grosso do Sul',
      he: 'Mato Grosso do Sul',
      pl: 'Mato Grosso do Sul',
      ru: 'Mato Grosso do Sul'
    }
  },
  {
    label: 'Minas Gerais', value: 'Minas Gerais', code: 'MG', country_code: 'BR',
    translations: {
      ar: 'Minas Gerais',
      de: 'Minas Gerais',
      es: 'Minas Gerais',
      he: 'Minas Gerais',
      pl: 'Minas Gerais',
      ru: 'Minas Gerais'
    }
  },
  {
    label: 'Pará', value: 'Pará', code: 'PA', country_code: 'BR',
    translations: {
      ar: 'Pará',
      de: 'Pará',
      es: 'Pará',
      he: 'Pará',
      pl: 'Pará',
      ru: 'Pará'
    }
  },
  {
    label: 'Paraíba', value: 'Paraíba', code: 'PB', country_code: 'BR',
    translations: {
      ar: 'Paraíba',
      de: 'Paraíba',
      es: 'Paraíba',
      he: 'Paraíba',
      pl: 'Paraíba',
      ru: 'Paraíba'
    }
  },
  {
    label: 'Paraná', value: 'Paraná', code: 'PR', country_code: 'BR',
    translations: {
      ar: 'Paraná',
      de: 'Paraná',
      es: 'Paraná',
      he: 'Paraná',
      pl: 'Paraná',
      ru: 'Paraná'
    }
  },
  {
    label: 'Pernambuco', value: 'Pernambuco', code: 'PE', country_code: 'BR',
    translations: {
      ar: 'Pernambuco',
      de: 'Pernambuco',
      es: 'Pernambuco',
      he: 'Pernambuco',
      pl: 'Pernambuco',
      ru: 'Pernambuco'
    }
  },
  {
    label: 'Piauí', value: 'Piauí', code: 'PI', country_code: 'BR',
    translations: {
      ar: 'Piauí',
      de: 'Piauí',
      es: 'Piauí',
      he: 'Piauí',
      pl: 'Piauí',
      ru: 'Piauí'
    }
  },
  {
    label: 'Rio de Janeiro', value: 'Rio de Janeiro', code: 'RJ', country_code: 'BR',
    translations: {
      ar: 'Rio de Janeiro',
      de: 'Rio de Janeiro',
      es: 'Rio de Janeiro',
      he: 'Rio de Janeiro',
      pl: 'Rio de Janeiro',
      ru: 'Rio de Janeiro'
    }
  },
  {
    label: 'Rio Grande do Norte', value: 'Rio Grande do Norte', code: 'RN', country_code: 'BR',
    translations: {
      ar: 'Rio Grande do Norte',
      de: 'Rio Grande do Norte',
      es: 'Rio Grande do Norte',
      he: 'Rio Grande do Norte',
      pl: 'Rio Grande do Norte',
      ru: 'Rio Grande do Norte'
    }
  },
  {
    label: 'Rio Grande do Sul', value: 'Rio Grande do Sul', code: 'RS', country_code: 'BR',
    translations: {
      ar: 'Rio Grande do Sul',
      de: 'Rio Grande do Sul',
      es: 'Rio Grande do Sul',
      he: 'Rio Grande do Sul',
      pl: 'Rio Grande do Sul',
      ru: 'Rio Grande do Sul'
    }
  },
  {
    label: 'Rondônia', value: 'Rondônia', code: 'RO', country_code: 'BR',
    translations: {
      ar: 'Rondônia',
      de: 'Rondônia',
      es: 'Rondônia',
      he: 'Rondônia',
      pl: 'Rondônia',
      ru: 'Rondônia'
    }
  },
  {
    label: 'Roraima', value: 'Roraima', code: 'RR', country_code: 'BR',
    translations: {
      ar: 'Roraima',
      de: 'Roraima',
      es: 'Roraima',
      he: 'Roraima',
      pl: 'Roraima',
      ru: 'Roraima'
    }
  },
  {
    label: 'Santa Catarina', value: 'Santa Catarina', code: 'SC', country_code: 'BR',
    translations: {
      ar: 'Santa Catarina',
      de: 'Santa Catarina',
      es: 'Santa Catarina',
      he: 'Santa Catarina',
      pl: 'Santa Catarina',
      ru: 'Santa Catarina'
    }
  },
  {
    label: 'São Paulo', value: 'São Paulo', code: 'SP', country_code: 'BR',
    translations: {
      ar: 'São Paulo',
      de: 'São Paulo',
      es: 'São Paulo',
      he: 'São Paulo',
      pl: 'São Paulo',
      ru: 'São Paulo'
    }
  },
  {
    label: 'Sergipe', value: 'Sergipe', code: 'SE', country_code: 'BR',
    translations: {
      ar: 'Sergipe',
      de: 'Sergipe',
      es: 'Sergipe',
      he: 'Sergipe',
      pl: 'Sergipe',
      ru: 'Sergipe'
    }
  },
  {
    label: 'Tocantins', value: 'Tocantins', code: 'TO', country_code: 'BR',
    translations: {
      ar: 'Tocantins',
      de: 'Tocantins',
      es: 'Tocantins',
      he: 'Tocantins',
      pl: 'Tocantins',
      ru: 'Tocantins'
    }
  },

  // Mexico
  {
    label: 'Aguascalientes', value: 'Aguascalientes', code: 'AG', country_code: 'MX',
    translations: {
      ar: 'Aguascalientes',
      de: 'Aguascalientes',
      es: 'Aguascalientes',
      he: 'Aguascalientes',
      pl: 'Aguascalientes',
      ru: 'Aguascalientes'
    }
  },
  {
    label: 'Baja California', value: 'Baja California', code: 'BC', country_code: 'MX',
    translations: {
      ar: 'Baja California',
      de: 'Baja California',
      es: 'Baja California',
      he: 'Baja California',
      pl: 'Baja California',
      ru: 'Baja California'
    }
  },
  {
    label: 'Baja California Sur', value: 'Baja California Sur', code: 'BS', country_code: 'MX',
    translations: {
      ar: 'Baja California Sur',
      de: 'Baja California Sur',
      es: 'Baja California Sur',
      he: 'Baja California Sur',
      pl: 'Baja California Sur',
      ru: 'Baja California Sur'
    }
  },
  {
    label: 'Campeche', value: 'Campeche', code: 'CM', country_code: 'MX',
    translations: {
      ar: 'Campeche',
      de: 'Campeche',
      es: 'Campeche',
      he: 'Campeche',
      pl: 'Campeche',
      ru: 'Campeche'
    }
  },
  {
    label: 'Chiapas', value: 'Chiapas', code: 'CS', country_code: 'MX',
    translations: {
      ar: 'Chiapas',
      de: 'Chiapas',
      es: 'Chiapas',
      he: 'Chiapas',
      pl: 'Chiapas',
      ru: 'Chiapas'
    }
  },
  {
    label: 'Chihuahua', value: 'Chihuahua', code: 'CH', country_code: 'MX',
    translations: {
      ar: 'Chihuahua',
      de: 'Chihuahua',
      es: 'Chihuahua',
      he: 'Chihuahua',
      pl: 'Chihuahua',
      ru: 'Chihuahua'
    }
  },
  {
    label: 'Coahuila', value: 'Coahuila', code: 'CO', country_code: 'MX',
    translations: {
      ar: 'Coahuila',
      de: 'Coahuila',
      es: 'Coahuila',
      he: 'Coahuila',
      pl: 'Coahuila',
      ru: 'Coahuila'
    }
  },
  {
    label: 'Colima', value: 'Colima', code: 'CL', country_code: 'MX',
    translations: {
      ar: 'Colima',
      de: 'Colima',
      es: 'Colima',
      he: 'Colima',
      pl: 'Colima',
      ru: 'Colima'
    }
  },
  {
    label: 'Durango', value: 'Durango', code: 'DG', country_code: 'MX',
    translations: {
      ar: 'Durango',
      de: 'Durango',
      es: 'Durango',
      he: 'Durango',
      pl: 'Durango',
      ru: 'Durango'
    }
  },
  {
    label: 'Guanajuato', value: 'Guanajuato', code: 'GT', country_code: 'MX',
    translations: {
      ar: 'Guanajuato',
      de: 'Guanajuato',
      es: 'Guanajuato',
      he: 'Guanajuato',
      pl: 'Guanajuato',
      ru: 'Guanajuato'
    }
  },
  {
    label: 'Guerrero', value: 'Guerrero', code: 'GR', country_code: 'MX',
    translations: {
      ar: 'Guerrero',
      de: 'Guerrero',
      es: 'Guerrero',
      he: 'Guerrero',
      pl: 'Guerrero',
      ru: 'Guerrero'
    }
  },
  {
    label: 'Hidalgo', value: 'Hidalgo', code: 'HG', country_code: 'MX',
    translations: {
      ar: 'Hidalgo',
      de: 'Hidalgo',
      es: 'Hidalgo',
      he: 'Hidalgo',
      pl: 'Hidalgo',
      ru: 'Hidalgo'
    }
  },
  {
    label: 'Jalisco', value: 'Jalisco', code: 'JA', country_code: 'MX',
    translations: {
      ar: 'Jalisco',
      de: 'Jalisco',
      es: 'Jalisco',
      he: 'Jalisco',
      pl: 'Jalisco',
      ru: 'Jalisco'
    }
  },
  {
    label: 'México', value: 'México', code: 'ME', country_code: 'MX',
    translations: {
      ar: 'México',
      de: 'México',
      es: 'México',
      he: 'México',
      pl: 'México',
      ru: 'México'
    }
  },
  {
    label: 'Michoacán', value: 'Michoacán', code: 'MI', country_code: 'MX',
    translations: {
      ar: 'Michoacán',
      de: 'Michoacán',
      es: 'Michoacán',
      he: 'Michoacán',
      pl: 'Michoacán',
      ru: 'Michoacán'
    }
  },
  {
    label: 'Morelos', value: 'Morelos', code: 'MO', country_code: 'MX',
    translations: {
      ar: 'Morelos',
      de: 'Morelos',
      es: 'Morelos',
      he: 'Morelos',
      pl: 'Morelos',
      ru: 'Morelos'
    }
  },
  {
    label: 'Nayarit', value: 'Nayarit', code: 'NA', country_code: 'MX',
    translations: {
      ar: 'Nayarit',
      de: 'Nayarit',
      es: 'Nayarit',
      he: 'Nayarit',
      pl: 'Nayarit',
      ru: 'Nayarit'
    }
  },
  {
    label: 'Nuevo León', value: 'Nuevo León', code: 'NL', country_code: 'MX',
    translations: {
      ar: 'Nuevo León',
      de: 'Nuevo León',
      es: 'Nuevo León',
      he: 'Nuevo León',
      pl: 'Nuevo León',
      ru: 'Nuevo León'
    }
  },
  {
    label: 'Oaxaca', value: 'Oaxaca', code: 'OA', country_code: 'MX',
    translations: {
      ar: 'Oaxaca',
      de: 'Oaxaca',
      es: 'Oaxaca',
      he: 'Oaxaca',
      pl: 'Oaxaca',
      ru: 'Oaxaca'
    }
  },
  {
    label: 'Puebla', value: 'Puebla', code: 'PU', country_code: 'MX',
    translations: {
      ar: 'Puebla',
      de: 'Puebla',
      es: 'Puebla',
      he: 'Puebla',
      pl: 'Puebla',
      ru: 'Puebla'
    }
  },
  {
    label: 'Querétaro', value: 'Querétaro', code: 'QE', country_code: 'MX',
    translations: {
      ar: 'Querétaro',
      de: 'Querétaro',
      es: 'Querétaro',
      he: 'Querétaro',
      pl: 'Querétaro',
      ru: 'Querétaro'
    }
  },
  {
    label: 'Quintana Roo', value: 'Quintana Roo', code: 'QR', country_code: 'MX',
    translations: {
      ar: 'Quintana Roo',
      de: 'Quintana Roo',
      es: 'Quintana Roo',
      he: 'Quintana Roo',
      pl: 'Quintana Roo',
      ru: 'Quintana Roo'
    }
  },
  {
    label: 'San Luis Potosí', value: 'San Luis Potosí', code: 'SL', country_code: 'MX',
    translations: {
      ar: 'San Luis Potosí',
      de: 'San Luis Potosí',
      es: 'San Luis Potosí',
      he: 'San Luis Potosí',
      pl: 'San Luis Potosí',
      ru: 'San Luis Potosí'
    }
  },
  {
    label: 'Sinaloa', value: 'Sinaloa', code: 'SI', country_code: 'MX',
    translations: {
      ar: 'Sinaloa',
      de: 'Sinaloa',
      es: 'Sinaloa',
      he: 'Sinaloa',
      pl: 'Sinaloa',
      ru: 'Sinaloa'
    }
  },
  {
    label: 'Sonora', value: 'Sonora', code: 'SO', country_code: 'MX',
    translations: {
      ar: 'Sonora',
      de: 'Sonora',
      es: 'Sonora',
      he: 'Sonora',
      pl: 'Sonora',
      ru: 'Sonora'
    }
  },
  {
    label: 'Tabasco', value: 'Tabasco', code: 'TB', country_code: 'MX',
    translations: {
      ar: 'Tabasco',
      de: 'Tabasco',
      es: 'Tabasco',
      he: 'Tabasco',
      pl: 'Tabasco',
      ru: 'Tabasco'
    }
  },
  {
    label: 'Tamaulipas', value: 'Tamaulipas', code: 'TM', country_code: 'MX',
    translations: {
      ar: 'Tamaulipas',
      de: 'Tamaulipas',
      es: 'Tamaulipas',
      he: 'Tamaulipas',
      pl: 'Tamaulipas',
      ru: 'Tamaulipas'
    }
  },
  {
    label: 'Tlaxcala', value: 'Tlaxcala', code: 'TL', country_code: 'MX',
    translations: {
      ar: 'Tlaxcala',
      de: 'Tlaxcala',
      es: 'Tlaxcala',
      he: 'Tlaxcala',
      pl: 'Tlaxcala',
      ru: 'Tlaxcala'
    }
  },
  {
    label: 'Veracruz', value: 'Veracruz', code: 'VE', country_code: 'MX',
    translations: {
      ar: 'Veracruz',
      de: 'Veracruz',
      es: 'Veracruz',
      he: 'Veracruz',
      pl: 'Veracruz',
      ru: 'Veracruz'
    }
  },
  {
    label: 'Yucatán', value: 'Yucatán', code: 'YU', country_code: 'MX',
    translations: {
      ar: 'Yucatán',
      de: 'Yucatán',
      es: 'Yucatán',
      he: 'Yucatán',
      pl: 'Yucatán',
      ru: 'Yucatán'
    }
  },
  {
    label: 'Zacatecas', value: 'Zacatecas', code: 'ZA', country_code: 'MX',
    translations: {
      ar: 'Zacatecas',
      de: 'Zacatecas',
      es: 'Zacatecas',
      he: 'Zacatecas',
      pl: 'Zacatecas',
      ru: 'Zacatecas'
    }
  },

  // China
  {
  label: 'Anhui', value: 'Anhui', code: 'AH', country_code: 'CN',
  translations: {
    ar: 'Anhui',
    de: 'Anhui',
    es: 'Anhui',
    he: 'Anhui',
    pl: 'Anhui',
    ru: 'Anhui'
  }
  },
  {
    label: 'Beijing', value: 'Beijing', code: 'BJ', country_code: 'CN',
    translations: {
      ar: 'Beijing',
      de: 'Beijing',
      es: 'Beijing',
      he: 'Beijing',
      pl: 'Beijing',
      ru: 'Beijing'
    }
  },
  {
    label: 'Chongqing', value: 'Chongqing', code: 'CQ', country_code: 'CN',
    translations: {
      ar: 'Chongqing',
      de: 'Chongqing',
      es: 'Chongqing',
      he: 'Chongqing',
      pl: 'Chongqing',
      ru: 'Chongqing'
    }
  },
  {
    label: 'Fujian', value: 'Fujian', code: 'FJ', country_code: 'CN',
    translations: {
      ar: 'Fujian',
      de: 'Fujian',
      es: 'Fujian',
      he: 'Fujian',
      pl: 'Fujian',
      ru: 'Fujian'
    }
  },
  {
    label: 'Gansu', value: 'Gansu', code: 'GS', country_code: 'CN',
    translations: {
      ar: 'Gansu',
      de: 'Gansu',
      es: 'Gansu',
      he: 'Gansu',
      pl: 'Gansu',
      ru: 'Gansu'
    }
  },
  {
    label: 'Guangdong', value: 'Guangdong', code: 'GD', country_code: 'CN',
    translations: {
      ar: 'Guangdong',
      de: 'Guangdong',
      es: 'Guangdong',
      he: 'Guangdong',
      pl: 'Guangdong',
      ru: 'Guangdong'
    }
  },
  {
    label: 'Guangxi', value: 'Guangxi', code: 'GX', country_code: 'CN',
    translations: {
      ar: 'Guangxi',
      de: 'Guangxi',
      es: 'Guangxi',
      he: 'Guangxi',
      pl: 'Guangxi',
      ru: 'Guangxi'
    }
  },
  {
    label: 'Guizhou', value: 'Guizhou', code: 'GZ', country_code: 'CN',
    translations: {
      ar: 'Guizhou',
      de: 'Guizhou',
      es: 'Guizhou',
      he: 'Guizhou',
      pl: 'Guizhou',
      ru: 'Guizhou'
    }
  },
  {
    label: 'Hainan', value: 'Hainan', code: 'HI', country_code: 'CN',
    translations: {
      ar: 'Hainan',
      de: 'Hainan',
      es: 'Hainan',
      he: 'Hainan',
      pl: 'Hainan',
      ru: 'Hainan'
    }
  },
  {
    label: 'Hebei', value: 'Hebei', code: 'HE', country_code: 'CN',
    translations: {
      ar: 'Hebei',
      de: 'Hebei',
      es: 'Hebei',
      he: 'Hebei',
      pl: 'Hebei',
      ru: 'Hebei'
    }
  },
  {
    label: 'Heilongjiang', value: 'Heilongjiang', code: 'HL', country_code: 'CN',
    translations: {
      ar: 'Heilongjiang',
      de: 'Heilongjiang',
      es: 'Heilongjiang',
      he: 'Heilongjiang',
      pl: 'Heilongjiang',
      ru: 'Heilongjiang'
    }
  },
  {
    label: 'Henan', value: 'Henan', code: 'HA', country_code: 'CN',
    translations: {
      ar: 'Henan',
      de: 'Henan',
      es: 'Henan',
      he: 'Henan',
      pl: 'Henan',
      ru: 'Henan'
    }
  },
  {
    label: 'Hong Kong', value: 'Hong Kong', code: 'HK', country_code: 'CN',
    translations: {
      ar: 'Hong Kong',
      de: 'Hong Kong',
      es: 'Hong Kong',
      he: 'Hong Kong',
      pl: 'Hong Kong',
      ru: 'Hong Kong'
    }
  },
  {
    label: 'Hubei', value: 'Hubei', code: 'HB', country_code: 'CN',
    translations: {
      ar: 'Hubei',
      de: 'Hubei',
      es: 'Hubei',
      he: 'Hubei',
      pl: 'Hubei',
      ru: 'Hubei'
    }
  },
  {
    label: 'Hunan', value: 'Hunan', code: 'HN', country_code: 'CN',
    translations: {
      ar: 'Hunan',
      de: 'Hunan',
      es: 'Hunan',
      he: 'Hunan',
      pl: 'Hunan',
      ru: 'Hunan'
    }
  },
  {
    label: 'Inner Mongolia', value: 'Inner Mongolia', code: 'NM', country_code: 'CN',
    translations: {
      ar: 'Inner Mongolia',
      de: 'Inner Mongolia',
      es: 'Inner Mongolia',
      he: 'Inner Mongolia',
      pl: 'Inner Mongolia',
      ru: 'Inner Mongolia'
    }
  },
  {
    label: 'Jiangsu', value: 'Jiangsu', code: 'JS', country_code: 'CN',
    translations: {
      ar: 'Jiangsu',
      de: 'Jiangsu',
      es: 'Jiangsu',
      he: 'Jiangsu',
      pl: 'Jiangsu',
      ru: 'Jiangsu'
    }
  },
  {
    label: 'Jiangxi', value: 'Jiangxi', code: 'JX', country_code: 'CN',
    translations: {
      ar: 'Jiangxi',
      de: 'Jiangxi',
      es: 'Jiangxi',
      he: 'Jiangxi',
      pl: 'Jiangxi',
      ru: 'Jiangxi'
    }
  },
  {
    label: 'Jilin', value: 'Jilin', code: 'JL', country_code: 'CN',
    translations: {
      ar: 'Jilin',
      de: 'Jilin',
      es: 'Jilin',
      he: 'Jilin',
      pl: 'Jilin',
      ru: 'Jilin'
    }
  },
  {
    label: 'Liaoning', value: 'Liaoning', code: 'LN', country_code: 'CN',
    translations: {
      ar: 'Liaoning',
      de: 'Liaoning',
      es: 'Liaoning',
      he: 'Liaoning',
      pl: 'Liaoning',
      ru: 'Liaoning'
    }
  },
  {
    label: 'Macau', value: 'Macau', code: 'MO', country_code: 'CN',
    translations: {
      ar: 'Macau',
      de: 'Macau',
      es: 'Macau',
      he: 'Macau',
      pl: 'Macau',
      ru: 'Macau'
    }
  },
  {
    label: 'Ningxia', value: 'Ningxia', code: 'NX', country_code: 'CN',
    translations: {
      ar: 'Ningxia',
      de: 'Ningxia',
      es: 'Ningxia',
      he: 'Ningxia',
      pl: 'Ningxia',
      ru: 'Ningxia'
    }
  },
  {
    label: 'Qinghai', value: 'Qinghai', code: 'QH', country_code: 'CN',
    translations: {
      ar: 'Qinghai',
      de: 'Qinghai',
      es: 'Qinghai',
      he: 'Qinghai',
      pl: 'Qinghai',
      ru: 'Qinghai'
    }
  },
  {
    label: 'Shaanxi', value: 'Shaanxi', code: 'SN', country_code: 'CN',
    translations: {
      ar: 'Shaanxi',
      de: 'Shaanxi',
      es: 'Shaanxi',
      he: 'Shaanxi',
      pl: 'Shaanxi',
      ru: 'Shaanxi'
    }
  },
  {
    label: 'Shandong', value: 'Shandong', code: 'SD', country_code: 'CN',
    translations: {
      ar: 'Shandong',
      de: 'Shandong',
      es: 'Shandong',
      he: 'Shandong',
      pl: 'Shandong',
      ru: 'Shandong'
    }
  },
  {
    label: 'Shanghai', value: 'Shanghai', code: 'SH', country_code: 'CN',
    translations: {
      ar: 'Shanghai',
      de: 'Shanghai',
      es: 'Shanghai',
      he: 'Shanghai',
      pl: 'Shanghai',
      ru: 'Shanghai'
    }
  },
  {
    label: 'Shanxi', value: 'Shanxi', code: 'SX', country_code: 'CN',
    translations: {
      ar: 'Shanxi',
      de: 'Shanxi',
      es: 'Shanxi',
      he: 'Shanxi',
      pl: 'Shanxi',
      ru: 'Shanxi'
    }
  },
  {
    label: 'Sichuan', value: 'Sichuan', code: 'SC', country_code: 'CN',
    translations: {
      ar: 'Sichuan',
      de: 'Sichuan',
      es: 'Sichuan',
      he: 'Sichuan',
      pl: 'Sichuan',
      ru: 'Sichuan'
    }
  },
  {
    label: 'Taiwan', value: 'Taiwan', code: 'TW', country_code: 'CN',
    translations: {
      ar: 'Taiwan',
      de: 'Taiwan',
      es: 'Taiwan',
      he: 'Taiwan',
      pl: 'Taiwan',
      ru: 'Taiwan'
    }
  },
  {
    label: 'Tianjin', value: 'Tianjin', code: 'TJ', country_code: 'CN',
    translations: {
      ar: 'Tianjin',
      de: 'Tianjin',
      es: 'Tianjin',
      he: 'Tianjin',
      pl: 'Tianjin',
      ru: 'Tianjin'
    }
  },
  {
    label: 'Tibet', value: 'Tibet', code: 'XZ', country_code: 'CN',
    translations: {
      ar: 'Tibet',
      de: 'Tibet',
      es: 'Tibet',
      he: 'Tibet',
      pl: 'Tibet',
      ru: 'Tibet'
    }
  },
  {
    label: 'Xinjiang', value: 'Xinjiang', code: 'XJ', country_code: 'CN',
    translations: {
      ar: 'Xinjiang',
      de: 'Xinjiang',
      es: 'Xinjiang',
      he: 'Xinjiang',
      pl: 'Xinjiang',
      ru: 'Xinjiang'
    }
  },
  {
    label: 'Yunnan', value: 'Yunnan', code: 'YN', country_code: 'CN',
    translations: {
      ar: 'Yunnan',
      de: 'Yunnan',
      es: 'Yunnan',
      he: 'Yunnan',
      pl: 'Yunnan',
      ru: 'Yunnan'
    }
  },
  {
    label: 'Zhejiang', value: 'Zhejiang', code: 'ZJ', country_code: 'CN',
    translations: {
      ar: 'Zhejiang',
      de: 'Zhejiang',
      es: 'Zhejiang',
      he: 'Zhejiang',
      pl: 'Zhejiang',
      ru: 'Zhejiang'
    }
  }
]

// Helper function to get states/provinces for a specific country
export function getStatesByCountry(countryCode: string): State[] {
  return states.filter(state => state.country_code === countryCode)
}