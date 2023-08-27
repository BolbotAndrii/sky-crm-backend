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
import { errorConverter, errorHandler } from './utils/error.js'

config({ quiet: true })

const app = express()

const API_PATH = '/api/v1/'

app.use(API_PATH, router)

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

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
