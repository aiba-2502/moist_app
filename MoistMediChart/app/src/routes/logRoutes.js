const express = require('express');
const router = express.Router();
const LogService = require('../services/logService');
const { writeToLog } = require('../lib/logger');
const { createErrorResponse } = require('../lib/errorHandler');
const { LOG_TYPES } = require('../../config/constants');

const logService = new LogService();

// GETエンドポイント: ログの取得
router.get('/logs', async (req, res) => {
    try {
        const logs = await logService.getRecentLogs();
        res.json({ logs });
    } catch (error) {
        const errorResponse = createErrorResponse(error);
        writeToLog(error.message, LOG_TYPES.ERROR);
        res.status(errorResponse.status).json(errorResponse);
    }
});

module.exports = router;