import { useI18n } from 'vue-i18n'

export function useTimeFormatter() {
  const { t } = useI18n()

  const formatTime = (timestamp: string | Date | { _seconds: number; _nanoseconds: number }) => {
    const now = new Date()
    let date: Date
    
    if (typeof timestamp === 'object' && '_seconds' in timestamp) {
      date = new Date(timestamp._seconds * 1000)
    } else {
      date = new Date(timestamp)
    }

    if (isNaN(date.getTime())) {
      return ''
    }

    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    const minutes = Math.floor(diff / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)

    let value: number
    let unit: string

    if (months > 0) {
      value = months
      unit = t('time.month', value)
    } else if (weeks > 0) {
      value = weeks
      unit = t('time.week', value)
    } else if (days > 0) {
      value = days
      unit = t('time.day', value)
    } else if (hours > 0) {
      value = hours
      unit = t('time.hour', value)
    } else {
      value = Math.max(1, minutes)
      unit = t('time.minute', value)
    }

    return t('time.ago', { 
      time: `${value} ${unit}`
    })
  }

  return { formatTime }
}