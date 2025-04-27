interface Timezone {
  value: string
  label: string
  offset: string
  abbr: string
}

export const timezones: Timezone[] = [
  { value: 'Pacific/Midway', label: '(GMT-11:00) Midway Island', offset: '-11:00', abbr: 'SST' },
  { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii', offset: '-10:00', abbr: 'HST' },
  { value: 'America/Anchorage', label: '(GMT-09:00) Alaska', offset: '-09:00', abbr: 'AKST' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time (US & Canada)', offset: '-08:00', abbr: 'PST' },
  { value: 'America/Denver', label: '(GMT-07:00) Mountain Time (US & Canada)', offset: '-07:00', abbr: 'MST' },
  { value: 'America/Chicago', label: '(GMT-06:00) Central Time (US & Canada)', offset: '-06:00', abbr: 'CST' },
  { value: 'America/New_York', label: '(GMT-05:00) Eastern Time (US & Canada)', offset: '-05:00', abbr: 'EST' },
  { value: 'America/Halifax', label: '(GMT-04:00) Atlantic Time (Canada)', offset: '-04:00', abbr: 'AST' },
  { value: 'America/Argentina/Buenos_Aires', label: '(GMT-03:00) Buenos Aires', offset: '-03:00', abbr: 'ART' },
  { value: 'Atlantic/South_Georgia', label: '(GMT-02:00) Mid-Atlantic', offset: '-02:00', abbr: 'GST' },
  { value: 'Atlantic/Azores', label: '(GMT-01:00) Azores', offset: '-01:00', abbr: 'AZOT' },
  { value: 'Europe/London', label: '(GMT+00:00) London', offset: '+00:00', abbr: 'GMT' },
  { value: 'Europe/Paris', label: '(GMT+01:00) Paris', offset: '+01:00', abbr: 'CET' },
  { value: 'Europe/Helsinki', label: '(GMT+02:00) Helsinki', offset: '+02:00', abbr: 'EET' },
  { value: 'Europe/Moscow', label: '(GMT+03:00) Moscow', offset: '+03:00', abbr: 'MSK' },
  { value: 'Asia/Dubai', label: '(GMT+04:00) Dubai', offset: '+04:00', abbr: 'GST' },
  { value: 'Asia/Karachi', label: '(GMT+05:00) Karachi', offset: '+05:00', abbr: 'PKT' },
  { value: 'Asia/Dhaka', label: '(GMT+06:00) Dhaka', offset: '+06:00', abbr: 'BST' },
  { value: 'Asia/Bangkok', label: '(GMT+07:00) Bangkok', offset: '+07:00', abbr: 'ICT' },
  { value: 'Asia/Shanghai', label: '(GMT+08:00) Shanghai', offset: '+08:00', abbr: 'CST' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo', offset: '+09:00', abbr: 'JST' },
  { value: 'Australia/Sydney', label: '(GMT+10:00) Sydney', offset: '+10:00', abbr: 'AEST' },
  { value: 'Pacific/Noumea', label: '(GMT+11:00) Noumea', offset: '+11:00', abbr: 'NCT' },
  { value: 'Pacific/Auckland', label: '(GMT+12:00) Auckland', offset: '+12:00', abbr: 'NZST' }
]