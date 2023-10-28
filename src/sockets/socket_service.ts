import { config } from 'dotenv'
import express from 'express'

import helmet from 'helmet'
import { Server } from 'socket.io'
import http from 'http'

import { CREATE_PUBLIC_LEAD, GETTING_LEAD_STATUS } from './constants.js'

config({ quiet: true })

const app = express()

const ws_server = http.createServer(app)

export const io = new Server(ws_server)

export const start_sockets = async () => {
  const WS_PORT = process.env.WS_PORT || 6001

  try {
    ws_server.listen(WS_PORT, () => console.log(`⚡️ WS started at port ${WS_PORT}`))

    io.on('connection', function (socket) {
      socket.on(CREATE_PUBLIC_LEAD, (data) => {
        console.log(data)
      })
      socket.on(GETTING_LEAD_STATUS, (data) => {
        console.log(data)
      })
    })
  } catch (e: any) {
    console.log('WS server Error', e.message)
    process.exit(1)
  }
}
