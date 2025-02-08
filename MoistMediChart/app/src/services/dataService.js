const path = require('path');
const { writeToLog } = require('../lib/logger');
const { LOG_TYPES } = require('../../config/constants');
const FileService = require('./fileService');

class DataService {
    constructor() {
        this.fileService = new FileService();
        this.lastReceivedData = null;
    }

    // データの処理と保存
    async processAndSaveData(data) {
        try {
            this.lastReceivedData = data;
            writeToLog(`受信データ: ${JSON.stringify(data)}`, LOG_TYPES.DATA);

            const saveResult = await this.fileService.saveJsonToFile(data);
            
            if (!saveResult.success) {
                throw new Error(saveResult.error);
            }

            writeToLog('データの保存が完了しました', LOG_TYPES.INFO);

            return {
                success: true,
                savedFiles: {
                    price: path.basename(saveResult.filepath.price),
                    patient: path.basename(saveResult.filepath.patient)
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // 最新データの取得
    getLatestData() {
        return this.lastReceivedData;
    }
}

module.exports = DataService;