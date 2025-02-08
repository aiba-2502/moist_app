const fs = require('fs');
const path = require('path');
const { logDir } = require('../../config/paths');
const { LOG_TYPES } = require('../../config/constants');

// 日本時間のタイムスタンプを生成
function getJSTTimestamp() {
    const date = new Date();
    date.setHours(date.getHours() + 9); // UTC+9 (日本時間)
    return date.toISOString();
}

// 日本時間の日付を取得
function getJSTDate() {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    return date.toISOString().split('T')[0];
}

// ログファイルに書き込み
function writeToLog(message, type = LOG_TYPES.INFO) {
    try {
        const timestamp = getJSTTimestamp();
        const logMessage = `[${timestamp}] [${type}] ${message}\n`;
        const logFile = path.join(logDir, `server_${getJSTDate()}.log`);
        
        // ログディレクトリが存在しない場合は作成
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        fs.appendFileSync(logFile, logMessage, 'utf8');
        return { success: true, message: logMessage };
    } catch (error) {
        console.error('ログ書き込みエラー:', error);
        return { success: false, error: error.message };
    }
}

// 最新のログを取得
function getRecentLogs(lines = 100) {
    try {
        const today = getJSTDate();
        const logFile = path.join(logDir, `server_${today}.log`);
        
        if (!fs.existsSync(logFile)) {
            return { success: true, logs: [] };
        }

        const data = fs.readFileSync(logFile, 'utf8');
        const logs = data.split('\n')
            .filter(line => line.trim())
            .slice(-lines);
        
        return { success: true, logs };
    } catch (error) {
        console.error('ログ取得エラー:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    writeToLog,
    getRecentLogs,
    getJSTTimestamp
};