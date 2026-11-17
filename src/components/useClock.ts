import { useEffect, useState } from 'react'

const formatters = new Map<string, Intl.DateTimeFormat>()
const fmt = (tz: string) => {
  if (!formatters.has(tz)) formatters.set(tz, new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }))
  return formatters.get(tz)!
}

/* Current time in a city's time zone (New Delhi by default), updated every 20 seconds. */
export function useClock(tz = 'Asia/Kolkata') {
  const [now, setNow] = useState(() => fmt(tz).format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(fmt(tz).format(new Date())), 20_000)
    return () => clearInterval(id)
  }, [tz])
  return now
}
