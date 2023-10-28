import { createCronTask } from './createNewJob.js'
import { status_cron_task_model as CronTask } from '../models/status_cron_task.js'
import { makeStatusRequest } from '../utils/makeStatusRequest.js'

export const makeRequest = async () => {
  try {
    const tasks = await CronTask.find({ active: true }).populate('request_options')
    tasks.forEach((task) => {
      const request = makeStatusRequest(task.request_options)
      const putToQueue = createCronTask(task.interval, request)
      putToQueue.start()
    })
  } catch (error) {
    console.log(error)
  }
}
