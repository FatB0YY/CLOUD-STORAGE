require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./router/auth.routes')
const fileRouter = require('./router/file.routes')
const apiErrorHandler = require('./error/api-error-handler')

const app = express()
const PORT = process.env.PORT

app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('static'))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
)
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)
app.use(apiErrorHandler)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI , {
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
