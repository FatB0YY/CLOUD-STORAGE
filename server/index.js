const express = require('express')
const mongoose = require('mongoose')
const congif = require('config')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const app = express()
const PORT = congif.get('PORT')

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: congif.get('CLIENT_URL'),
  })
)
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(congif.get('MONGODB_URI'), {
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
