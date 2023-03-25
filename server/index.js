require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./router/auth.routes')
const fileRouter = require('./router/file.routes')
const apiErrorHandler = require('./error/api-error-handler')
const formData = require('express-form-data')

const app = express()
const PORT = process.env.PORT

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use(express.json())
app.use(formData.parse())
app.use(express.static('static'))
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)
// обработка ошибок
app.use(apiErrorHandler)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error) {
    console.log('error:', error.message)
    process.exit(1)
  }
}
start()
