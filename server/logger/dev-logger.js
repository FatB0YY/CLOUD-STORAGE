const winston = require('winston')
const { combine, timestamp, printf, colorize, errors } = winston.format

function buildDevLogger() {
  const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message || stack}`
  })

  return winston.createLogger({
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }, errors({ stack: true })),
      myFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error-dev.log' }),
    ],
  })
}

module.exports = buildDevLogger
