import { initJob } from './src/job/job.js'
import { start_sockets } from './src/sockets/socket_service.js'
import { start as initApp } from './src/app.js'

initApp()
start_sockets()
initJob()
