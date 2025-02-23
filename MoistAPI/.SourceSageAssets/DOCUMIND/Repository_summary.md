# Project: project

```plaintext
OS: nt
Directory: C:\Users\aiba\Downloads\project-bolt-sb1-4erkckre (2)\project

├── config/
│   └── kintone.js
├── logs/
├── src/
│   ├── controllers/
│   │   └── appController.js
│   ├── routes/
│   │   └── appRoutes.js
│   ├── services/
│   │   ├── CacheService.js
│   │   └── KintoneService.js
│   └── utils/
│       └── logger.js
├── .env
├── .SourceSageignore
├── api-spec.md
├── index.js
└── package.json
```

## 📊 プロジェクト統計

- 📅 作成日時: 2025-02-23 22:14:10
- 📁 総ディレクトリ数: 7
- 📄 総ファイル数: 11
- 📏 最大深度: 2
- 📦 最大ディレクトリ:  (18 エントリ)

### 📊 ファイルサイズと行数

| ファイル | サイズ | 行数 | 言語 |
|----------|--------|------|------|
| api-spec.md | 5.4 KB | 149 | markdown |
| src\controllers\appController.js | 4.2 KB | 133 | javascript |
| config\kintone.js | 3.0 KB | 64 | javascript |
| src\services\KintoneService.js | 2.3 KB | 88 | javascript |
| index.js | 1.8 KB | 67 | javascript |
| src\utils\logger.js | 1.4 KB | 53 | javascript |
| src\services\CacheService.js | 1.2 KB | 43 | javascript |
| .SourceSageignore | 745.0 B | 54 | plaintext |
| src\routes\appRoutes.js | 496.0 B | 13 | javascript |
| package.json | 290.0 B | 14 | json |
| .env | 108.0 B | 3 | plaintext |
| **合計** |  | **681** |  |

### 📈 言語別統計

| 言語 | ファイル数 | 総行数 | 合計サイズ |
|------|------------|--------|------------|
| javascript | 7 | 461 | 14.4 KB |
| markdown | 1 | 149 | 5.4 KB |
| plaintext | 2 | 57 | 853.0 B |
| json | 1 | 14 | 290.0 B |

`.SourceSageignore`

**サイズ**: 745.0 B | **行数**: 54 行
```plaintext
# バージョン管理システム関連
.git/
.gitignore

# キャッシュファイル
__pycache__/
.pytest_cache/
**/__pycache__/**
*.pyc

# ビルド・配布関連
build/
dist/
*.egg-info/

# 一時ファイル・出力
output/
output.md
test_output/
.SourceSageAssets/
.SourceSageAssetsDemo/

# アセット
*.png
*.svg
*.jpg
*.jepg
assets/

# その他
LICENSE
example/
package-lock.json
.DS_Store

# 特定のディレクトリを除外
tests/temp/
docs/drafts/

# パターンの例外（除外対象から除外）
!docs/important.md
!.github/workflows/
repository_summary.md

# Terraform関連
.terraform
*.terraform.lock.hcl
*.backup
*.tfstate

# Python仮想環境
venv
.venv
```

`.env`

**サイズ**: 108.0 B | **行数**: 3 行
```plaintext
KINTONE_DOMAIN=8ue38.cybozu.com
KINTONE_API_TOKEN=0a0W6WHEQsu36WUrchgLvavgAR3WQWB9UlPV9FzM
KINTONE_APP_ID=76
```

`api-spec.md`

**サイズ**: 5.4 KB | **行数**: 149 行
```markdown
# Kintone API 連携仕様書

## **1. 概要**
Kintone API を利用して、患者情報、会計情報、明細情報の取得を行うためのエンドポイントを提供します。
本 API は JSON 形式でのリクエスト・レスポンスを採用し、データ取得のパフォーマンス向上のためキャッシュを利用しています。

## **2. API一覧**

| メソッド | エンドポイント           | 機能 |
|----------|------------------|----------------------|
| POST     | /getRecordNumbers | Kintoneから患者情報を取得する（キャッシュに保存） |
| GET      | /price            | 会計情報を取得する（キャッシュ利用） |
| GET      | /details          | 明細情報を取得する（キャッシュ利用） |
| POST     | /updatePaymentStatus | 決済確認ステータスを更新する |


## **3. API仕様**

### **3.1. Kintoneデータ取得API**
#### **エンドポイント**
`POST /getRecordNumbers`

#### **リクエストパラメータ（JSON形式）**
| 項目名 | データ型 | 必須 | 説明 |
|--------|--------|------|------|
| phoneNumber | str | ○ | 患者電話番号 |

#### **レスポンス（JSON形式）**
| 項目名 | データ型 | 説明 |
|--------|--------|------|
| success | bool | 処理成功時は `true` |
| recordCount | int | 取得したレコード数 |
| error | str | エラー発生時のメッセージ |
| details | object | エラー発生時の詳細情報（Kintone APIからのエラーレスポンス） |

---

### **3.2. 会計情報取得API**
#### **エンドポイント**
`GET /price`

#### **クエリパラメータ**
| 項目名 | データ型 | 必須 | 説明 |
|--------|--------|------|------|
| phoneNumber | str | ○ | 患者電話番号 |

#### **レスポンス（JSON形式）**
| 項目名 | データ型 | 説明 |
|--------|--------|------|
| 患者電話番号 | str | 患者の電話番号 |
| 患者氏名 | str | 患者の名前 |
| 患者氏名カナ | str | 患者のフリガナ |
| レコード番号 | str | 診療のレコードID |
| 診療実施日 | str | 診療が行われた日付 |
| 検査キット価格合計税込 | str | 検査キットの税込価格 |
| 薬価格合計税込 | str | 薬の税込価格 |
| 合計金額税込加算減算後 | str | 最終的な税込価格 |

---

### **3.3. 明細情報取得API**
#### **エンドポイント**
`GET /details`

#### **クエリパラメータ**
| 項目名 | データ型 | 必須 | 説明 |
|--------|--------|------|------|
| phoneNumber | str | ○ | 患者電話番号 |

#### **レスポンス（JSON形式）**
| 項目名 | データ型 | 説明 |
|--------|--------|------|
| 患者電話番号 | str | 患者の電話番号 |
| 患者氏名 | str | 患者の名前 |
| 患者氏名カナ | str | 患者のフリガナ |
| 薬商品名 | str | 薬の名称 |
| 薬数量 | str | 薬の数量 |
| 検査キットプラン名 | str | 検査キットのプラン名 |
| 検査キット数量 | str | 検査キットの数量 |

---

### **3.4. 決済確認更新API**
#### **エンドポイント**
`POST /updatePaymentStatus`

#### **リクエストパラメータ（JSON形式）**
| 項目名 | データ型 | 必須 | 説明 |
|--------|--------|------|------|
| phoneNumber | str | ○ | 患者電話番号 |
| recordId | str | ○ | 更新対象のレコード番号 |

#### **レスポンス（JSON形式）**
| 項目名 | データ型 | 説明 |
|--------|--------|------|
| success | bool | 処理成功時は `true` |
| message | str | 処理結果のメッセージ |
| error | str | エラー発生時のメッセージ |
| details | object | エラー発生時の詳細情報 |

---

## **4. エラーレスポンス**

### **4.1. エラー時のステータスコード**
| ステータスコード | 説明 |
|---------------|------|
| 400 | 不正なリクエスト（必須パラメータが不足しています） |
| 404 | データが見つかりません（まず /getRecordNumbers を呼び出してください） |
| 500 | Kintoneからのデータ取得に失敗しました |

### **4.2. エラーレスポンス例**
```json
{
  "error": "データが見つかりません。まず /getRecordNumbers を呼び出してください。"
}
```

```json
{
  "error": "Failed to fetch records from Kintone",
  "details": {
    // Kintone APIからのエラーレスポンス
  }
}
```

## **5. 使用上の注意**

1. APIの使用順序
   - 必ず最初に `/getRecordNumbers` を呼び出してください
   - その後、他のエンドポイントを呼び出すことができます
   - `/getRecordNumbers` を呼び出さずに他のエンドポイントを呼び出すと404エラーが返されます

2. データのキャッシュ
   - データはサーバーメモリ上にキャッシュされます
   - キャッシュは電話番号をキーとして保存されます
   - サーバー再起動時にキャッシュはクリアされます

3. エラーハンドリング
   - すべてのリクエストで電話番号は必須です
   - 電話番号が指定されていない場合は400エラー
   - キャッシュにデータが存在しない場合は404エラー
   - Kintone APIでエラーが発生した場合は500エラー

4. データ形式
   - すべてのリクエスト・レスポンスはJSON形式
   - 数値データも文字列として返されます
   - 日付はKintoneの形式のまま文字列として返されます
```

`index.js`

**サイズ**: 1.8 KB | **行数**: 67 行
```javascript
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
```

`package.json`

**サイズ**: 290.0 B | **行数**: 14 行
```json
{
  "name": "kintone-api-integration",
  "private": true,
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0"
  }
}
```

`config\kintone.js`

**サイズ**: 3.0 KB | **行数**: 64 行
```javascript
// Kintoneのフィールド名の定義
const FIELD_CODES = {
  PHONE_NUMBER: '患者電話番号',
  PATIENT_NAME: '患者氏名',
  PATIENT_NAME_KANA: '患者氏名カナ',
  RECORD_NUMBER: '$id',
  TREATMENT_DATE: '診療実施日',
  KIT_PRICE_WITH_TAX: '検査キット価格合計税込',
  MEDICINE_PRICE_WITH_TAX: '薬価格合計税込',
  TOTAL_PRICE_WITH_TAX: '合計金額税込加算減算後',
  MEDICINE_NAME: '薬商品名',
  MEDICINE_QUANTITY: '薬数量',
  KIT_PLAN_NAME: '検査キットプラン名',
  KIT_QUANTITY: '検査キット数量',
  PAYMENT_STATUS: '決済確認',
  PAYMENT_METHOD: '支払い方法',
  BIRTH_DATE: '患者生年月日',
  BIOLOGICAL_SEX: '診療_性感染症_生物学的な性別'
};

// クエリ生成関数
const generateQuery = (phoneNumber, limit, offset) => {
  return `${FIELD_CODES.PHONE_NUMBER} = "${phoneNumber}" and ${FIELD_CODES.PAYMENT_STATUS} not in ("確認済み") and ${FIELD_CODES.PAYMENT_METHOD} in ("現地（精算機）") limit ${limit} offset ${offset}`;
};

// レコードマッピング関数
const mapRecordToPrice = (record) => ({
  [FIELD_CODES.PHONE_NUMBER]: record[FIELD_CODES.PHONE_NUMBER]?.value || '',
  [FIELD_CODES.PATIENT_NAME]: record[FIELD_CODES.PATIENT_NAME]?.value || '',
  [FIELD_CODES.PATIENT_NAME_KANA]: record[FIELD_CODES.PATIENT_NAME_KANA]?.value || '',
  レコード番号: record[FIELD_CODES.RECORD_NUMBER]?.value || '',
  [FIELD_CODES.TREATMENT_DATE]: record[FIELD_CODES.TREATMENT_DATE]?.value || '',
  [FIELD_CODES.KIT_PRICE_WITH_TAX]: record[FIELD_CODES.KIT_PRICE_WITH_TAX]?.value || '',
  [FIELD_CODES.MEDICINE_PRICE_WITH_TAX]: record[FIELD_CODES.MEDICINE_PRICE_WITH_TAX]?.value || '',
  [FIELD_CODES.TOTAL_PRICE_WITH_TAX]: record[FIELD_CODES.TOTAL_PRICE_WITH_TAX]?.value || ''
});

const mapRecordToDetails = (record) => ({
  [FIELD_CODES.PHONE_NUMBER]: record[FIELD_CODES.PHONE_NUMBER]?.value || '',
  [FIELD_CODES.PATIENT_NAME]: record[FIELD_CODES.PATIENT_NAME]?.value || '',
  [FIELD_CODES.PATIENT_NAME_KANA]: record[FIELD_CODES.PATIENT_NAME_KANA]?.value || '',
  レコード番号: record[FIELD_CODES.RECORD_NUMBER]?.value || '',
  [FIELD_CODES.TREATMENT_DATE]: record[FIELD_CODES.TREATMENT_DATE]?.value || '',
  [FIELD_CODES.MEDICINE_NAME]: record[FIELD_CODES.MEDICINE_NAME]?.value || '',
  [FIELD_CODES.MEDICINE_QUANTITY]: record[FIELD_CODES.MEDICINE_QUANTITY]?.value || '',
  [FIELD_CODES.KIT_PLAN_NAME]: record[FIELD_CODES.KIT_PLAN_NAME]?.value || '',
  [FIELD_CODES.KIT_QUANTITY]: record[FIELD_CODES.KIT_QUANTITY]?.value || ''
});

const mapRecordToPatientInfo = (record) => ({
  [FIELD_CODES.PHONE_NUMBER]: record[FIELD_CODES.PHONE_NUMBER]?.value || '',
  [FIELD_CODES.PATIENT_NAME]: record[FIELD_CODES.PATIENT_NAME]?.value || '',
  [FIELD_CODES.PATIENT_NAME_KANA]: record[FIELD_CODES.PATIENT_NAME_KANA]?.value || '',
  [FIELD_CODES.BIRTH_DATE]: record[FIELD_CODES.BIRTH_DATE]?.value || '',
  [FIELD_CODES.BIOLOGICAL_SEX]: record[FIELD_CODES.BIOLOGICAL_SEX]?.value || ''
});

module.exports = {
  FIELD_CODES,
  generateQuery,
  mapRecordToPrice,
  mapRecordToDetails,
  mapRecordToPatientInfo
};
```

`src\controllers\appController.js`

**サイズ**: 4.2 KB | **行数**: 133 行
```javascript
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
```

`src\routes\appRoutes.js`

**サイズ**: 496.0 B | **行数**: 13 行
```javascript
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
```

`src\services\CacheService.js`

**サイズ**: 1.2 KB | **行数**: 43 行
```javascript
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
```

`src\services\KintoneService.js`

**サイズ**: 2.3 KB | **行数**: 88 行
```javascript
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
```

`src\utils\logger.js`

**サイズ**: 1.4 KB | **行数**: 53 行
```javascript
const winston = require('winston');
const path = require('path');

// 日本時刻のフォーマット関数
const japanTimeFormat = winston.format((info) => {
  const japanTime = new Date(info.timestamp || Date.now()).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  info.timestamp = japanTime;
  return info;
});

// シンプルな一行フォーマット
const singleLineFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level.toUpperCase()}] ${message}${metaStr}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    japanTimeFormat(),
    singleLineFormat
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/combined.log')
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      japanTimeFormat(),
      singleLineFormat
    )
  }));
}

module.exports = logger;
```

