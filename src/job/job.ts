import cron from 'node-cron'
import { io } from '../sockets/socket_service.js'
import { GETTING_LEAD_STATUS } from '../sockets/constants.js'
import { makeRequest } from './combainStatusRequest.js'

// const gettingLeadStatus = cron.schedule('* * * * *', () => {
//   io.emit(GETTING_LEAD_STATUS, { message: 'Lead status was gettings successfully' })
// })

export const initJob = () => {
  makeRequest()
  // gettingLeadStatus.start()
}
