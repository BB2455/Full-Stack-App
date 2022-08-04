import { CronJob } from 'cron'
import { checkChangeEmailRequests } from '../utils/checkChangeEmailRequests'

export const cronJob = new CronJob('*/30 * * * *', async () => {
  await checkChangeEmailRequests()
})
