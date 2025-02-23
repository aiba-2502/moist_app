const { mapRecordToPrice, mapRecordToDetails, mapRecordToPatientInfo } = require('../../config/kintone');
const logger = require('../utils/logger');

class CacheService {
  constructor() {
    this.cache = new Map();
  }

  setCacheData(phoneNumber, records) {
    this.cache.set(phoneNumber, {
      rawRecords: records,
      price: records.map(mapRecordToPrice),
      details: records.map(mapRecordToDetails),
      recordIds: records.map(record => record.$id.value)
    });
    logger.info(`Cache updated for phone number: ${phoneNumber}`);
  }

  getCacheData(phoneNumber) {
    const data = this.cache.get(phoneNumber);
    logger.info(`Cache ${data ? 'hit' : 'miss'} for phone number: ${phoneNumber}`);
    return data;
  }

  removeCacheData(phoneNumber) {
    this.cache.delete(phoneNumber);
    logger.info(`Cache removed for phone number: ${phoneNumber}`);
  }

  getPatientInfo(records) {
    return records.length > 0 ? mapRecordToPatientInfo(records[0]) : {};
  }

  validateRecordId(phoneNumber, recordId) {
    const data = this.getCacheData(phoneNumber);
    if (!data) {
      return false;
    }
    return data.recordIds.includes(recordId);
  }
}

module.exports = CacheService;