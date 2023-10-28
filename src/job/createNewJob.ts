import cron from 'node-cron'

const minutesToCron = (minutes) => {
  if (minutes === 1) {
    return '* * * * *'
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `*/${minutes} * * * *`
  } else {
    return `*/${remainingMinutes} ${hours} * * *`
  }
}

export const createCronTask = (minutes, callback) => {
  const schedule = minutesToCron(minutes) || `* * * * *`
  return cron.schedule(schedule, callback)
}
