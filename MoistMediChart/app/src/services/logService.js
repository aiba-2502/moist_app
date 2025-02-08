const { getRecentLogs } = require('../lib/logger');

class LogService {
    async getRecentLogs(lines = 100) {
        const result = getRecentLogs(lines);
        if (!result.success) {
            throw new Error(result.error);
        }
        return result.logs;
    }
}

module.exports = LogService;