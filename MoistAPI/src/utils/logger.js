const winston = require('winston');
const path = require('path');

// 日本時刻のフォーマット関数
const japanTimeFormat = winston.format((info) => {
  const japanTime = new Date(info.timestamp || Date.now()).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  info.timestamp = japanTime;
  return info;
});

// シンプルな一行フォーマット
const singleLineFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level.toUpperCase()}] ${message}${metaStr}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    japanTimeFormat(),
    singleLineFormat
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/combined.log')
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      japanTimeFormat(),
      singleLineFormat
    )
  }));
}

module.exports = logger;