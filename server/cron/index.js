import { CronJob } from 'cron'
import { checkChangeEmailRequests } from '../utils/checkChangeEmailRequests'

export const cronJob = new CronJob('* * * * *', async () => {
  await checkChangeEmailRequests()
})
