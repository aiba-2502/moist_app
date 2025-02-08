# Project: MoistMediChart

```plaintext
OS: nt
Directory: C:\Users\aiba\Downloads\MoistMediChart

├── app/
│   ├── config/
│   │   ├── constants.js
│   │   └── paths.js
│   ├── public/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── styles.css
│   ├── src/
│   │   ├── lib/
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── server.js
│   │   ├── routes/
│   │   │   ├── dataRoutes.js
│   │   │   └── logRoutes.js
│   │   ├── services/
│   │   │   ├── dataService.js
│   │   │   ├── fileService.js
│   │   │   └── logService.js
│   │   └── main.js
│   ├── package.json
│   └── README.md
├── .SourceSageignore
```

## 📊 プロジェクト統計

- 📅 作成日時: 2025-02-08 20:48:43
- 📁 総ディレクトリ数: 7
- 📄 総ファイル数: 17
- 📏 最大深度: 3
- 📦 最大ディレクトリ:  (24 エントリ)

### 📊 ファイルサイズと行数

| ファイル | サイズ | 行数 | 言語 |
|----------|--------|------|------|
| app\README.md | 5.1 KB | 158 | markdown |
| app\public\script.js | 2.6 KB | 71 | javascript |
| app\src\services\fileService.js | 2.5 KB | 72 | javascript |
| app\src\lib\server.js | 2.0 KB | 62 | javascript |
| app\src\lib\logger.js | 2.0 KB | 66 | javascript |
| app\public\styles.css | 1.4 KB | 95 | css |
| app\src\routes\dataRoutes.js | 1.4 KB | 40 | javascript |
| app\src\services\dataService.js | 1.2 KB | 44 | javascript |
| app\public\index.html | 1.2 KB | 34 | html |
| app\src\lib\errorHandler.js | 825.0 B | 31 | javascript |
| .SourceSageignore | 745.0 B | 54 | plaintext |
| app\src\routes\logRoutes.js | 741.0 B | 22 | javascript |
| app\config\constants.js | 626.0 B | 22 | javascript |
| app\config\paths.js | 370.0 B | 15 | javascript |
| app\src\services\logService.js | 305.0 B | 13 | javascript |
| app\package.json | 290.0 B | 14 | json |
| app\src\main.js | 81.0 B | 4 | javascript |
| **合計** |  | **817** |  |

### 📈 言語別統計

| 言語 | ファイル数 | 総行数 | 合計サイズ |
|------|------------|--------|------------|
| javascript | 12 | 462 | 14.5 KB |
| markdown | 1 | 158 | 5.1 KB |
| css | 1 | 95 | 1.4 KB |
| plaintext | 1 | 54 | 745.0 B |
| html | 1 | 34 | 1.2 KB |
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

`app\README.md`

**サイズ**: 5.1 KB | **行数**: 158 行
```markdown
# JSONデータ受信・管理システム（初学者向けガイド）

## 1. アプリケーションの概要
患者データと料金データを受け取り、それぞれ別々のJSONファイルとして保存します。
また、操作ログを記録し、Webインターフェースで確認できます。

### 主な機能
- 患者データと料金データの受信と保存
- データの分類と整理（患者情報と料金情報を分離）
- システムログの記録と表示
- Webインターフェースでのデータ確認

## 2. アプリケーションの動作フロー

1. **サーバー起動時**
   - 必要なディレクトリの作成確認
   - Webサーバーの起動（ポート3000）
   - 起動ログの記録

2. **データ受信時**
   - JSONデータを受信
   - データを患者情報と料金情報に分離
   - タイムスタンプ付きのファイル名で保存
   - 処理結果をログに記録

3. **データ表示時**
   - 最新データの表示
   - システムログの表示
   - 5秒ごとの自動更新

## 3. フォルダ構成

```
src/
├── lib/              # 共通ライブラリ
│   ├── errorHandler.js  # エラー処理
│   ├── logger.js       # ログ機能
│   └── server.js       # サーバー設定
├── routes/           # ルーティング（URLと処理の対応付け）
│   ├── dataRoutes.js   # データ関連のURL処理
│   └── logRoutes.js    # ログ関連のURL処理
├── services/         # ビジネスロジック
│   ├── dataService.js  # データ処理
│   ├── fileService.js  # ファイル操作
│   └── logService.js   # ログ処理
└── main.js          # アプリケーション起動

config/              # 設定ファイル
├── constants.js     # 定数定義
└── paths.js         # パス設定

public/             # 静的ファイル
├── index.html      # Webページ
├── styles.css      # スタイル設定
└── script.js       # フロントエンド処理
```

## 4. 各ファイルの役割

### メインファイル
- **main.js**: アプリケーションのエントリーポイント。サーバーを起動します。

### 共通ライブラリ（lib/）
- **server.js**: Expressサーバーの設定と起動を管理
- **logger.js**: ログの書き込みと読み取りを担当
- **errorHandler.js**: エラー処理の共通機能を提供

### ルーティング（routes/）
- **dataRoutes.js**: データの受信・取得APIを定義
- **logRoutes.js**: ログ取得APIを定義

### サービス（services/）
- **dataService.js**: データの処理ロジックを実装
- **fileService.js**: ファイル操作を担当
- **logService.js**: ログ関連の処理を実装

### 設定（config/）
- **constants.js**: エラーメッセージなどの定数を定義
- **paths.js**: ファイル出力先のパスを設定

## 5. APIエンドポイント

### データ関連
1. **POST /api/data**
   - 機能：新しいデータの受信と保存
   - リクエスト例：
     ```json
     {
       "患者氏名": "山田太郎",
       "患者氏名カナ": "ヤマダタロウ",
       "患者生年月日": "1990-01-01",
       "年齢": 33,
       "性別": "男性",
       "診療費税込": 5000,
       "検査キット金額合計税込": 2000,
       "薬金額合計税込": 3000,
       "合計金額税込": 10000,
       "合計金額税込加算減算後": 10000
     }
     ```
   - レスポンス例：
     ```json
     {
       "success": true,
       "message": "データを正常に受信し、ファイルに保存しました",
       "savedFiles": {
         "price": "PR-2025-02-08T12-30-45.json",
         "patient": "PT-2025-02-08T12-30-45.json"
       }
     }
     ```

2. **GET /api/latest**
   - 機能：最後に受信したデータの取得
   - レスポンス例：最後に受信したJSONデータ

3. **GET /api/logs**
   - 機能：システムログの取得
   - レスポンス例：
     ```json
     {
       "logs": [
         "[2025-02-08T03:52:36.609Z] [INFO] サーバーが起動しました",
         "[2025-02-08T03:53:15.132Z] [INFO] 新しいデータを受信しました"
       ]
     }
     ```

## 6. 使い方

1. **サーバーの起動**
   ```bash
   npm install    # 初回のみ
   npm start      # サーバー起動
   ```

2. **動作確認**
   - ブラウザで http://localhost:3000 にアクセス
   - データタブとログタブで情報を確認可能

3. **データの送信テスト（Postmanなどを使用）**
   - URL: http://localhost:3000/api/data
   - Method: POST
   - Header: Content-Type: application/json
   - Body: 上記のリクエスト例のJSONを使用

## 7. エラー処理

システムは以下のような場合にエラーを返します：
- 不正なJSONフォーマット
- ファイル保存の失敗
- ディレクトリ作成の失敗
- ログ操作の失敗

エラーが発生した場合は：
1. エラーログが記録されます
2. クライアントにエラー情報が返されます
3. Webインターフェースにエラーが表示されます
```

`app\package.json`

**サイズ**: 290.0 B | **行数**: 14 行
```json
{
  "name": "json-endpoint-server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5"
  }
}
```

`app\config\constants.js`

**サイズ**: 626.0 B | **行数**: 22 行
```javascript
// エラーメッセージの定義
const ERROR_MESSAGES = {
    DIRECTORY_INIT: 'ディレクトリの初期化に失敗しました',
    FILE_SAVE: 'ファイルの保存に失敗しました',
    LOG_WRITE: 'ログの書き込みに失敗しました',
    LOG_READ: 'ログの読み込みに失敗しました',
    DATA_FETCH: 'データの取得に失敗しました',
    INVALID_JSON: '不正なJSONフォーマットです'
};

// ログタイプの定義
const LOG_TYPES = {
    INFO: 'INFO',
    ERROR: 'ERROR',
    DATA: 'DATA',
    WARNING: 'WARNING'
};

module.exports = {
    ERROR_MESSAGES,
    LOG_TYPES
};
```

`app\config\paths.js`

**サイズ**: 370.0 B | **行数**: 15 行
```javascript
const path = require('path');

// 出力先ディレクトリの設定
const paths = {
    // 患者データ（PT-XXX.json）の出力先
    ptDir: 'D:\\json\\patient',
    
    // 料金データ（PR-XXX.json）の出力先
    prDir: 'D:\\json\\price',
    
    // ログファイル（XXX.log）の出力先
    logDir: 'D:\\json\\logs'
};

module.exports = paths;
```

`app\public\index.html`

**サイズ**: 1.2 KB | **行数**: 34 行
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON データ表示</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="tab-container">
        <button class="tab-button active" onclick="switchTab('data')">データ表示</button>
        <button class="tab-button" onclick="switchTab('logs')">ログ表示</button>
    </div>

    <div id="data-tab" class="tab-content active">
        <div class="container">
            <h1>受信したJSONデータ</h1>
            <button class="refresh-button" onclick="fetchLatestData()">最新データを取得</button>
            <div class="timestamp" id="timestamp"></div>
            <pre id="jsonDisplay">データを取得中...</pre>
        </div>
    </div>

    <div id="logs-tab" class="tab-content">
        <div class="container">
            <h1>サーバーログ</h1>
            <button class="refresh-button" onclick="fetchLogs()">ログを更新</button>
            <div class="log-container" id="logDisplay">ログを取得中...</div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

`app\public\script.js`

**サイズ**: 2.6 KB | **行数**: 71 行
```javascript
function switchTab(tabName) {
    // タブボタンの状態を更新
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');

    // タブコンテンツの表示を切り替え
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // タブに応じてデータを更新
    if (tabName === 'data') {
        fetchLatestData();
    } else if (tabName === 'logs') {
        fetchLogs();
    }
}

function fetchLatestData() {
    fetch('/api/latest')
        .then(response => response.json())
        .then(data => {
            const timestamp = new Date().toLocaleString('ja-JP');
            document.getElementById('timestamp').textContent = `最終更新: ${timestamp}`;
            document.getElementById('jsonDisplay').textContent = 
                JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('エラー:', error);
            document.getElementById('jsonDisplay').textContent = 
                'データの取得中にエラーが発生しました。';
        });
}

function fetchLogs() {
    fetch('/api/logs')
        .then(response => response.json())
        .then(data => {
            const logDisplay = document.getElementById('logDisplay');
            logDisplay.innerHTML = data.logs.map(log => {
                const logClass = log.includes('[ERROR]') ? 'log-error' : 
                               log.includes('[DATA]') ? 'log-data' : 'log-info';
                return `<div class="log-entry ${logClass}">${log}</div>`;
            }).join('');
            logDisplay.scrollTop = logDisplay.scrollHeight;
        })
        .catch(error => {
            console.error('エラー:', error);
            document.getElementById('logDisplay').innerHTML = 
                '<div class="log-entry log-error">ログの取得中にエラーが発生しました。</div>';
        });
}

// ページ読み込み時に最初のデータを取得
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestData();
    fetchLogs();

    // 5秒ごとに自動更新
    setInterval(() => {
        const activeTab = document.querySelector('.tab-content.active').id;
        if (activeTab === 'data-tab') {
            fetchLatestData();
        } else if (activeTab === 'logs-tab') {
            fetchLogs();
        }
    }, 5000);
});
```

`app\public\styles.css`

**サイズ**: 1.4 KB | **行数**: 95 行
```css
body {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

pre {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
}

.refresh-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
}

.refresh-button:hover {
    background-color: #45a049;
}

.timestamp {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 10px;
}

.log-container {
    background-color: #2b2b2b;
    color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    font-family: monospace;
    height: 300px;
    overflow-y: auto;
}

.log-entry {
    margin: 5px 0;
    padding: 3px 0;
    border-bottom: 1px solid #3a3a3a;
}

.log-error {
    color: #ff6b6b;
}

.log-info {
    color: #69f0ae;
}

.log-data {
    color: #64b5f6;
}

.tab-container {
    margin-bottom: 20px;
}

.tab-button {
    background-color: #ddd;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 5px;
}

.tab-button.active {
    background-color: #4CAF50;
    color: white;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}
```

`app\src\main.js`

**サイズ**: 81.0 B | **行数**: 4 行
```javascript
const server = require('./lib/server');

// サーバーの起動
server.start();
```

`app\src\lib\errorHandler.js`

**サイズ**: 825.0 B | **行数**: 31 行
```javascript
const { LOG_TYPES } = require('../../config/constants');
const { writeToLog, getJSTTimestamp } = require('./logger');

// エラー処理の共通関数
function handleError(error, context) {
    const errorMessage = `${context}: ${error.message}`;
    
    // エラーをログに記録
    writeToLog(errorMessage, LOG_TYPES.ERROR);
    
    // エラーオブジェクトを返す
    return {
        success: false,
        error: errorMessage,
        timestamp: getJSTTimestamp()
    };
}

// APIレスポンス用のエラーオブジェクトを生成
function createErrorResponse(error, statusCode = 500) {
    return {
        status: statusCode,
        error: error.message || 'Internal Server Error',
        timestamp: getJSTTimestamp()
    };
}

module.exports = {
    handleError,
    createErrorResponse
};
```

`app\src\lib\logger.js`

**サイズ**: 2.0 KB | **行数**: 66 行
```javascript
const fs = require('fs');
const path = require('path');
const { logDir } = require('../../config/paths');
const { LOG_TYPES } = require('../../config/constants');

// 日本時間のタイムスタンプを生成
function getJSTTimestamp() {
    const date = new Date();
    date.setHours(date.getHours() + 9); // UTC+9 (日本時間)
    return date.toISOString();
}

// 日本時間の日付を取得
function getJSTDate() {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    return date.toISOString().split('T')[0];
}

// ログファイルに書き込み
function writeToLog(message, type = LOG_TYPES.INFO) {
    try {
        const timestamp = getJSTTimestamp();
        const logMessage = `[${timestamp}] [${type}] ${message}\n`;
        const logFile = path.join(logDir, `server_${getJSTDate()}.log`);
        
        // ログディレクトリが存在しない場合は作成
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        fs.appendFileSync(logFile, logMessage, 'utf8');
        return { success: true, message: logMessage };
    } catch (error) {
        console.error('ログ書き込みエラー:', error);
        return { success: false, error: error.message };
    }
}

// 最新のログを取得
function getRecentLogs(lines = 100) {
    try {
        const today = getJSTDate();
        const logFile = path.join(logDir, `server_${today}.log`);
        
        if (!fs.existsSync(logFile)) {
            return { success: true, logs: [] };
        }

        const data = fs.readFileSync(logFile, 'utf8');
        const logs = data.split('\n')
            .filter(line => line.trim())
            .slice(-lines);
        
        return { success: true, logs };
    } catch (error) {
        console.error('ログ取得エラー:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    writeToLog,
    getRecentLogs,
    getJSTTimestamp
};
```

`app\src\lib\server.js`

**サイズ**: 2.0 KB | **行数**: 62 行
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ptDir, prDir, logDir } = require('../../config/paths');
const { writeToLog } = require('./logger');
const { LOG_TYPES } = require('../../config/constants');
const FileService = require('../services/fileService');
const dataRoutes = require('../routes/dataRoutes');
const logRoutes = require('../routes/logRoutes');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.fileService = new FileService();
    }

    // サーバーの設定
    setup() {
        // CORSの設定
        this.app.use(cors({
            origin: 'https://8ue38.cybozu.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            optionsSuccessStatus: 204
        }));

        // ミドルウェアの設定
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));

        // ルーティングの設定
        this.app.use('/api', dataRoutes);
        this.app.use('/api', logRoutes);
    }

    // サーバーの起動
    start() {
        // 出力ディレクトリの初期化
        const initResult = this.fileService.initializeDirectories();
        if (!initResult.success) {
            console.error('初期化エラー:', initResult.error);
            process.exit(1);
        }

        this.setup();

        // サーバーの起動
        this.app.listen(this.port, () => {
            const startMessage = `サーバーが起動しました - http://localhost:${this.port}`;
            console.log(startMessage);
            writeToLog(startMessage, LOG_TYPES.INFO);
            console.log('出力先ディレクトリ:');
            console.log(`  患者データ(PT): ${ptDir}`);
            console.log(`  料金データ(PR): ${prDir}`);
            console.log(`  ログファイル  : ${logDir}`);
        });
    }
}

module.exports = new Server();
```

`app\src\routes\dataRoutes.js`

**サイズ**: 1.4 KB | **行数**: 40 行
```javascript
const express = require('express');
const router = express.Router();
const DataService = require('../services/dataService');
const { writeToLog } = require('../lib/logger');
const { createErrorResponse } = require('../lib/errorHandler');
const { LOG_TYPES } = require('../../config/constants');

// データサービスのインスタンスを作成
const dataService = new DataService();

// POSTエンドポイント: データの受信と保存
router.post('/data', async (req, res) => {
    try {
        writeToLog('新しいデータを受信しました', LOG_TYPES.INFO);
        
        const result = await dataService.processAndSaveData(req.body);
        
        res.status(200).json({
            success: true,
            message: 'データを正常に受信し、ファイルに保存しました',
            savedFiles: result.savedFiles
        });
    } catch (error) {
        const errorResponse = createErrorResponse(error);
        writeToLog(error.message, LOG_TYPES.ERROR);
        res.status(errorResponse.status).json(errorResponse);
    }
});

// GETエンドポイント: 最新データの取得
router.get('/latest', (req, res) => {
    const latestData = dataService.getLatestData();
    if (!latestData) {
        res.json({ message: 'データはまだ受信されていません' });
        return;
    }
    res.json(latestData);
});

module.exports = router;
```

`app\src\routes\logRoutes.js`

**サイズ**: 741.0 B | **行数**: 22 行
```javascript
const express = require('express');
const router = express.Router();
const LogService = require('../services/logService');
const { writeToLog } = require('../lib/logger');
const { createErrorResponse } = require('../lib/errorHandler');
const { LOG_TYPES } = require('../../config/constants');

const logService = new LogService();

// GETエンドポイント: ログの取得
router.get('/logs', async (req, res) => {
    try {
        const logs = await logService.getRecentLogs();
        res.json({ logs });
    } catch (error) {
        const errorResponse = createErrorResponse(error);
        writeToLog(error.message, LOG_TYPES.ERROR);
        res.status(errorResponse.status).json(errorResponse);
    }
});

module.exports = router;
```

`app\src\services\dataService.js`

**サイズ**: 1.2 KB | **行数**: 44 行
```javascript
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
```

`app\src\services\fileService.js`

**サイズ**: 2.5 KB | **行数**: 72 行
```javascript
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
```

`app\src\services\logService.js`

**サイズ**: 305.0 B | **行数**: 13 行
```javascript
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
```

