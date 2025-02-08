const fs = require('fs');
const path = require('path');
const { ptDir, prDir } = require('../../config/paths');
const { ERROR_MESSAGES } = require('../../config/constants');
const { handleError } = require('../lib/errorHandler');
const { writeToLog, getJSTTimestamp } = require('../lib/logger');

class FileService {
    // 出力ディレクトリの初期化
    initializeDirectories() {
        try {
            [ptDir, prDir].forEach(dir => {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            });
            return { success: true };
        } catch (error) {
            return handleError(error, ERROR_MESSAGES.DIRECTORY_INIT);
        }
    }

    // 料金データの抽出
    extractPriceData(data) {
        return {
            レコード番号: data.レコード番号,
            診療費税込: data.診療費税込,
            検査キット金額合計税込: data.検査キット金額合計税込,
            薬金額合計税込: data.薬金額合計税込,
            合計金額税込: data.合計金額税込,
            合計金額税込加算減算後: data.合計金額税込加算減算後
        };
    }

    // 患者データの抽出
    extractPatientData(data) {
        return {
            患者電話番号: data.患者電話番号,
            患者氏名: data.患者氏名,
            患者氏名カナ: data.患者氏名カナ,
            患者生年月日: data.患者生年月日,
            年齢: data.年齢,
            性別: data.性別
        };
    }

    // JSONファイルとして保存
    async saveJsonToFile(data) {
        try {
            const timestamp = getJSTTimestamp().replace(/[:.]/g, '-');
            
            // 料金データの保存
            const priceData = this.extractPriceData(data);
            const prFilepath = path.join(prDir, `PR-${timestamp}.json`);
            await fs.promises.writeFile(prFilepath, JSON.stringify(priceData, null, 2));
            
            // 患者データの保存
            const patientData = this.extractPatientData(data);
            const ptFilepath = path.join(ptDir, `PT-${timestamp}.json`);
            await fs.promises.writeFile(ptFilepath, JSON.stringify(patientData, null, 2));

            return {
                success: true,
                filepath: { price: prFilepath, patient: ptFilepath }
            };
        } catch (error) {
            return handleError(error, ERROR_MESSAGES.FILE_SAVE);
        }
    }
}

module.exports = FileService;