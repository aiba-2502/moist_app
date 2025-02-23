const logger = require('../utils/logger');

class AppController {
  constructor(kintoneService, cacheService) {
    this.kintoneService = kintoneService;
    this.cacheService = cacheService;
  }

  async getRecordNumbers(req, res) {
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber) {
      logger.error('Missing phone number in request');
      return res.status(400).json({
        error: '患者電話番号が必要です',
      });
    }

    try {
      logger.info(`Fetching records for phone number: ${phoneNumber}`);
      const allRecords = await this.kintoneService.fetchRecords(phoneNumber);
      this.cacheService.setCacheData(phoneNumber, allRecords);
      const patientInfo = this.cacheService.getPatientInfo(allRecords);

      logger.info(`Successfully fetched ${allRecords.length} records for ${phoneNumber}`);
      res.json({
        success: true,
        recordCount: allRecords.length,
        patient: patientInfo,
      });
    } catch (error) {
      logger.error('Error fetching records:', {
        phoneNumber,
        error: error.response?.data || error.message,
        stack: error.stack
      });
      res.status(500).json({
        error: 'Failed to fetch records from Kintone',
        details: error.response?.data || error.message,
      });
    }
  }

  async updatePaymentStatus(req, res) {
    const { phoneNumber, recordId } = req.body;

    if (!phoneNumber || !recordId) {
      logger.error('Missing required parameters', { phoneNumber, recordId });
      return res.status(400).json({
        error: '患者電話番号とレコード番号が必要です',
      });
    }

    // レコード番号の検証
    if (!this.cacheService.validateRecordId(phoneNumber, recordId)) {
      logger.error('Invalid record ID or cache not found', { phoneNumber, recordId });
      return res.status(400).json({
        error: 'このレコード番号は無効です。まず /getRecordNumbers を呼び出して有効なレコード番号を取得してください。',
      });
    }

    try {
      logger.info(`Updating payment status for record: ${recordId}`);
      await this.kintoneService.updatePaymentStatus(recordId);
      
      // 更新が成功したら、キャッシュから該当患者のデータを削除
      this.cacheService.removeCacheData(phoneNumber);
      logger.info(`Successfully updated payment status and removed cache for ${phoneNumber}`);

      res.json({
        success: true,
        message: '決済確認を更新しました',
      });
    } catch (error) {
      logger.error('Error updating payment status:', {
        phoneNumber,
        recordId,
        error: error.response?.data || error.message,
        stack: error.stack
      });
      res.status(500).json({
        error: 'Failed to update record in Kintone',
        details: error.response?.data || error.message,
      });
    }
  }

  getPrice(req, res) {
    const phoneNumber = req.query.phoneNumber;

    if (!phoneNumber) {
      logger.error('Missing phone number in price request');
      return res.status(400).json({
        error: '患者電話番号が必要です',
      });
    }

    const cachedData = this.cacheService.getCacheData(phoneNumber);
    if (!cachedData) {
      logger.error(`Cache miss for phone number: ${phoneNumber}`);
      return res.status(404).json({
        error: 'データが見つかりません。まず /getRecordNumbers を呼び出してください。',
      });
    }

    logger.info(`Successfully retrieved price data for ${phoneNumber}`);
    res.json(cachedData.price);
  }

  getDetails(req, res) {
    const phoneNumber = req.query.phoneNumber;

    if (!phoneNumber) {
      logger.error('Missing phone number in details request');
      return res.status(400).json({
        error: '患者電話番号が必要です',
      });
    }

    const cachedData = this.cacheService.getCacheData(phoneNumber);
    if (!cachedData) {
      logger.error(`Cache miss for phone number: ${phoneNumber}`);
      return res.status(404).json({
        error: 'データが見つかりません。まず /getRecordNumbers を呼び出してください。',
      });
    }

    logger.info(`Successfully retrieved details data for ${phoneNumber}`);
    res.json(cachedData.details);
  }
}

module.exports = AppController;