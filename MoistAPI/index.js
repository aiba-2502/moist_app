require('dotenv').config();
const express = require('express');
const KintoneService = require('./src/services/KintoneService');
const CacheService = require('./src/services/CacheService');
const AppController = require('./src/controllers/appController');
const setupRoutes = require('./src/routes/appRoutes');
const logger = require('./src/utils/logger');
const path = require('path');
const fs = require('fs');

class App {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.setupLogsDirectory();
    this.setupMiddleware();
    this.setupServices();
    this.setupRoutes();
  }

  setupLogsDirectory() {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`, {
        query: req.query,
        body: req.body
      });
      next();
    });
  }

  setupServices() {
    this.kintoneService = new KintoneService();
    this.cacheService = new CacheService();
    this.appController = new AppController(
      this.kintoneService,
      this.cacheService
    );
  }

  setupRoutes() {
    const appController = this.appController;
    const routes = setupRoutes(appController);
    this.app.use('/', routes);
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server running at http://localhost:${this.port}`);
      logger.info('Available endpoints:');
      logger.info('- POST /getRecordNumbers - Initial data fetch with patient info');
      logger.info('- GET /price - Get price information');
      logger.info('- GET /details - Get detailed information');
      logger.info('- POST /updatePaymentStatus - Update payment confirmation status');
    });
  }
}

const app = new App();
app.start();