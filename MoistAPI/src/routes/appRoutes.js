const express = require('express');
const router = express.Router();

function setupRoutes(appController) {
  router.post('/getRecordNumbers', (req, res) => appController.getRecordNumbers(req, res));
  router.post('/updatePaymentStatus', (req, res) => appController.updatePaymentStatus(req, res));
  router.get('/price', (req, res) => appController.getPrice(req, res));
  router.get('/details', (req, res) => appController.getDetails(req, res));

  return router;
}

module.exports = setupRoutes;