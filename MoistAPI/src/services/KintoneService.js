const axios = require('axios');
const { FIELD_CODES, generateQuery } = require('../../config/kintone');
const logger = require('../utils/logger');

class KintoneService {
  constructor() {
    this.domain = process.env.KINTONE_DOMAIN;
    this.apiToken = process.env.KINTONE_API_TOKEN;
    this.appId = process.env.KINTONE_APP_ID;

    if (!this.domain || !this.apiToken || !this.appId) {
      logger.error('Missing required Kintone configuration');
      throw new Error('Missing required Kintone configuration');
    }
  }

  async fetchRecords(phoneNumber) {
    let allRecords = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      try {
        const query = generateQuery(phoneNumber, limit, offset);
        const response = await axios({
          method: 'get',
          url: `https://${this.domain}/k/v1/records.json`,
          headers: {
            'X-Cybozu-API-Token': this.apiToken,
          },
          params: {
            app: this.appId,
            query: query,
          },
        });

        const records = response.data.records;
        if (records.length === 0) break;

        allRecords = allRecords.concat(records);
        offset += limit;

        if (records.length < limit) break;
      } catch (error) {
        logger.error('Error fetching records from Kintone:', {
          phoneNumber,
          offset,
          error: error.response?.data || error.message
        });
        throw error;
      }
    }

    return allRecords;
  }

  async updatePaymentStatus(recordId) {
    try {
      const response = await axios({
        method: 'put',
        url: `https://${this.domain}/k/v1/record.json`,
        headers: {
          'X-Cybozu-API-Token': this.apiToken,
          'Content-Type': 'application/json'
        },
        data: {
          app: this.appId,
          id: recordId,
          record: {
            [FIELD_CODES.PAYMENT_STATUS]: {
              value: ["確認済み"]
            }
          }
        }
      });
      logger.info(`Successfully updated payment status for record: ${recordId}`);
      return response.data;
    } catch (error) {
      logger.error('Error updating payment status in Kintone:', {
        recordId,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }
}

module.exports = KintoneService;