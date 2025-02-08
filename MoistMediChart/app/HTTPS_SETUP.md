# HTTPSセットアップ手順書

## 1. 自己証明書の作成

### OpenSSLのインストール（まだの場合）
1. [OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html)をダウンロード
   - 「Win64 OpenSSL v3.x.x」の最新版をダウンロード
2. ダウンロードしたインストーラーを実行
3. インストール完了後、コマンドプロンプトで動作確認
   ```bash
   openssl version
   ```

### 証明書の作成
1. `C:\medical-data-server`に`ssl`フォルダを作成
   ```bash
   cd C:\medical-data-server
   mkdir ssl
   cd ssl
   ```

2. 秘密鍵の生成
   ```bash
   openssl genrsa -out private.key 2048
   ```

3. 証明書署名要求（CSR）の生成
   ```bash
   openssl req -new -key private.key -out certificate.csr
   ```
   以下の情報を入力（例）：
   - Country Name: JP
   - State: Tokyo
   - Locality: Tokyo
   - Organization Name: Your Company
   - Organizational Unit: IT
   - Common Name: localhost
   - Email Address: your@email.com

4. 自己署名証明書の生成
   ```bash
   openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.crt
   ```

## 2. HTTPSサーバーの設定

1. 必要なパッケージのインストール
   ```bash
   cd C:\medical-data-server
   npm install https fs
   ```

2. `src/lib/server.js`を以下のように更新
   ```javascript
   const express = require('express');
   const https = require('https');
   const fs = require('fs');
   const path = require('path');
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
           this.port = process.env.PORT || 3000;
           this.host = process.env.HOST || '0.0.0.0';
           this.fileService = new FileService();
           
           // SSL証明書の読み込み
           this.sslOptions = {
               key: fs.readFileSync(path.join(__dirname, '../../ssl/private.key')),
               cert: fs.readFileSync(path.join(__dirname, '../../ssl/certificate.crt'))
           };
       }

       setup() {
           // 既存のCORS設定など
           this.app.use(cors({
               origin: 'https://8ue38.cybozu.com',
               methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
               allowedHeaders: ['Content-Type', 'Authorization'],
               credentials: true,
               optionsSuccessStatus: 204
           }));

           // 他のミドルウェアとルーティング設定
           this.app.use(express.json());
           this.app.use(express.static('public'));
           this.app.use('/api', dataRoutes);
           this.app.use('/api', logRoutes);
       }

       start() {
           const initResult = this.fileService.initializeDirectories();
           if (!initResult.success) {
               console.error('初期化エラー:', initResult.error);
               process.exit(1);
           }

           this.setup();

           // HTTPSサーバーの起動
           https.createServer(this.sslOptions, this.app).listen(this.port, this.host, () => {
               const serverIP = require('os').networkInterfaces()['イーサネット']
                   ?.find(ip => ip.family === 'IPv4')?.address || 'localhost';
               const startMessage = `サーバーが起動しました - https://${serverIP}:${this.port}`;
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

## 3. ファイアウォールの設定更新

1. Windowsの「Windows Defender ファイアウォール」を開く
2. 「受信の規則」で新しい規則を追加
   - 規則の種類：「ポート」
   - プロトコル：「TCP」
   - ポート：「3000」（HTTPSポート）
   - 接続を許可
   - すべてのプロファイルを選択
   - 名前：「Medical Data Server HTTPS」

## 4. サーバーの起動

1. コマンドプロンプトで以下のコマンドを実行
   ```bash
   cd C:\medical-data-server
   npm start
   ```

2. 以下のような表示が出ることを確認
   ```
   サーバーが起動しました - https://192.168.xxx.xxx:3000
   ```

## 5. 動作確認

1. ブラウザで`https://192.168.xxx.xxx:3000`にアクセス
   - 自己証明書の警告が表示されますが、「詳細設定」→「安全でないサイトに進む」を選択
2. Webページが表示されることを確認

## 注意事項

- 自己証明書はテスト環境用です。本番環境では信頼できる認証局から取得した証明書を使用してください。
- 証明書と秘密鍵は安全に保管し、Gitなどでの共有は避けてください。
- 証明書の有効期限（365日）を管理し、期限切れ前に更新してください。