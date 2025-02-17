const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// JSONパーサーを追加
app.use(express.json());

// Kintone API configuration
const KINTONE_DOMAIN = process.env.KINTONE_DOMAIN;
const API_TOKEN = process.env.KINTONE_API_TOKEN;
const APP_ID = '76';

// データキャッシュ用のオブジェクト
const dataCache = new Map();

// Kintoneからデータを取得する関数
async function fetchKintoneData(phoneNumber) {
  let allRecords = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const query = `患者電話番号 = "${phoneNumber}" and 決済確認 not in ("確認済み") and 支払い方法 in ("現地（精算機）") limit ${limit} offset ${offset}`;
    const response = await axios({
      method: 'get',
      url: `https://${KINTONE_DOMAIN}/k/v1/records.json`,
      headers: {
        'X-Cybozu-API-Token': API_TOKEN
      },
      params: {
        app: APP_ID,
        query: query
      }
    });

    const records = response.data.records;
    if (records.length === 0) break;

    allRecords = allRecords.concat(records);
    offset += limit;

    if (records.length < limit) break;
  }

  return allRecords;
}

// メインのデータ取得エンドポイント
app.post('/getRecordNumbers', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({
      error: '患者電話番号が必要です'
    });
  }

  try {
    const allRecords = await fetchKintoneData(phoneNumber);

    // データをキャッシュに保存
    const processedData = {
      patient: allRecords.map(record => ({
        患者電話番号: record.患者電話番号?.value || '',
        患者氏名: record.患者氏名?.value || '',
        患者氏名カナ: record.患者氏名カナ?.value || '',
        患者生年月日: record.患者生年月日?.value || '',
        診療_性感染症_生物学的な性別: record.診療_性感染症_生物学的な性別?.value || ''
      })),
      price: allRecords.map(record => ({
        患者電話番号: record.患者電話番号?.value || '',
        患者氏名: record.患者氏名?.value || '',
        患者氏名カナ: record.患者氏名カナ?.value || '',
        レコード番号: record.$id?.value || '',
        診療実施日: record.診療実施日?.value || '',
        検査キット価格合計税込: record.検査キット価格合計税込?.value || '',
        薬価格合計税込: record.薬価格合計税込?.value || '',
        合計金額税込加算減算後: record.合計金額税込加算減算後?.value || ''
      })),
      details: allRecords.map(record => ({
        患者電話番号: record.患者電話番号?.value || '',
        患者氏名: record.患者氏名?.value || '',
        患者氏名カナ: record.患者氏名カナ?.value || '',
        薬商品名: record.薬商品名?.value || '',
        薬数量: record.薬数量?.value || '',
        検査キットプラン名: record.検査キットプラン名?.value || '',
        検査キット数量: record.検査キット数量?.value || ''
      }))
    };

    dataCache.set(phoneNumber, processedData);

    res.json({
      success: true,
      recordCount: allRecords.length
    });
  } catch (error) {
    console.error('Error fetching records:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch records from Kintone',
      details: error.response?.data || error.message
    });
  }
});

// 患者情報取得エンドポイント
app.post('/patient', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({
      error: '患者電話番号が必要です'
    });
  }

  const cachedData = dataCache.get(phoneNumber);
  if (!cachedData) {
    return res.status(404).json({
      error: 'データが見つかりません。まず /getRecordNumbers を呼び出してください。'
    });
  }

  // 患者情報の最初のレコードのみを返す（同じ電話番号の場合、患者情報は同一のはず）
  res.json(cachedData.patient[0] || {});
});

// 会計情報取得エンドポイント
app.post('/price', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({
      error: '患者電話番号が必要です'
    });
  }

  const cachedData = dataCache.get(phoneNumber);
  if (!cachedData) {
    return res.status(404).json({
      error: 'データが見つかりません。まず /getRecordNumbers を呼び出してください。'
    });
  }

  res.json(cachedData.price);
});

// 明細情報取得エンドポイント
app.post('/details', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({
      error: '患者電話番号が必要です'
    });
  }

  const cachedData = dataCache.get(phoneNumber);
  if (!cachedData) {
    return res.status(404).json({
      error: 'データが見つかりません。まず /getRecordNumbers を呼び出してください。'
    });
  }

  res.json(cachedData.details);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- POST /getRecordNumbers - Initial data fetch');
  console.log('- POST /patient - Get patient information');
  console.log('- POST /price - Get price information');
  console.log('- POST /details - Get detailed information');
});