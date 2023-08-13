import dotenv from 'dotenv'

dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import usersRoutes from './modules/routes/usersRoutes.js'

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/users', usersRoutes)
const start = async () => {
  const PORT = process.env.PORT || 6000

  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)

    app.listen(PORT, () => console.log(`⚡️ Started at port ${PORT}`))
  } catch (e: any) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
