const express = require('express');
const router = express.Router();
const DataService = require('../services/dataService');
const { writeToLog } = require('../lib/logger');
const { createErrorResponse } = require('../lib/errorHandler');
const { LOG_TYPES } = require('../../config/constants');

// データサービスのインスタンスを作成
const dataService = new DataService();

// POSTエンドポイント: データの受信と保存
router.post('/data', async (req, res) => {
    try {
        writeToLog('新しいデータを受信しました', LOG_TYPES.INFO);
        
        const result = await dataService.processAndSaveData(req.body);
        
        res.status(200).json({
            success: true,
            message: 'データを正常に受信し、ファイルに保存しました',
            savedFiles: result.savedFiles
        });
    } catch (error) {
        const errorResponse = createErrorResponse(error);
        writeToLog(error.message, LOG_TYPES.ERROR);
        res.status(errorResponse.status).json(errorResponse);
    }
});

// GETエンドポイント: 最新データの取得
router.get('/latest', (req, res) => {
    const latestData = dataService.getLatestData();
    if (!latestData) {
        res.json({ message: 'データはまだ受信されていません' });
        return;
    }
    res.json(latestData);
});

module.exports = router;