const { LOG_TYPES } = require('../../config/constants');
const { writeToLog, getJSTTimestamp } = require('./logger');

// エラー処理の共通関数
function handleError(error, context) {
    const errorMessage = `${context}: ${error.message}`;
    
    // エラーをログに記録
    writeToLog(errorMessage, LOG_TYPES.ERROR);
    
    // エラーオブジェクトを返す
    return {
        success: false,
        error: errorMessage,
        timestamp: getJSTTimestamp()
    };
}

// APIレスポンス用のエラーオブジェクトを生成
function createErrorResponse(error, statusCode = 500) {
    return {
        status: statusCode,
        error: error.message || 'Internal Server Error',
        timestamp: getJSTTimestamp()
    };
}

module.exports = {
    handleError,
    createErrorResponse
};