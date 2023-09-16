import { config } from 'dotenv'
import httpStatus from 'http-status'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import { jwtStrategy } from './utils/password.js'
import { router } from './routes/index.js'
import { ApiError } from './utils/ApiError.js'
import { errorConverter, errorHandler, errorNotFound } from './utils/error.js'
import helmet from 'helmet'

config({ quiet: true })

const app = express()

const API_PATH = '/api/v1/'

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(API_PATH, router)

app.use(errorNotFound)

app.use(errorConverter)

app.use(errorHandler)

export const start = async () => {
  const PORT = process.env.PORT || 6000

  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log('Database connection successful')
    app.listen(PORT, () => console.log(`⚡️ Started at port ${PORT}`))
  } catch (e: any) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

