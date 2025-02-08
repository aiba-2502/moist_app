# Windows 11での本番デプロイ手順書（初心者向け）

## 1. 必要なソフトウェアのインストール

### Node.jsのインストール
1. [Node.js公式サイト](https://nodejs.org/)にアクセス
2. 「LTS」と書かれているバージョンをダウンロード
3. ダウンロードしたファイルを実行し、「Next」を押していってインストール
4. インストールが完了したら、コマンドプロンプトを開いて以下のコマンドを実行し、インストールを確認
   ```bash
   node --version
   npm --version
   ```
   ※バージョン番号が表示されればOK

## 2. アプリケーションのセットアップ

### アプリケーションフォルダの作成
1. Cドライブ直下に`medical-data-server`フォルダを作成
2. コマンドプロンプトを開き、以下のコマンドを実行
   ```bash
   cd C:\medical-data-server
   ```

### アプリケーションファイルの配置
1. すべてのソースコードを`C:\medical-data-server`にコピー
2. 以下のフォルダ構成になっていることを確認
   ```
   C:\medical-data-server
   ├── config/
   ├── public/
   ├── src/
   ├── package.json
   └── README.md
   ```

### 依存パッケージのインストール
1. コマンドプロンプトで以下のコマンドを実行（`C:\medical-data-server`で実行すること）
   ```bash
   npm install
   ```

## 3. データ保存先の設定

1. `config/paths.js`を開き、以下のように変更
   ```javascript
   const path = require('path');

   const paths = {
       // 患者データの出力先
       ptDir: 'C:\\medical-data\\patient',
       
       // 料金データの出力先
       prDir: 'C:\\medical-data\\price',
       
       // ログファイルの出力先
       logDir: 'C:\\medical-data\\logs'
   };

   module.exports = paths;
   ```

2. 上記で指定したフォルダを作成
   ```bash
   mkdir C:\medical-data
   mkdir C:\medical-data\patient
   mkdir C:\medical-data\price
   mkdir C:\medical-data\logs
   ```

## 4. ファイアウォールの設定

1. Windowsの検索バーで「ファイアウォール」と入力し、「Windows Defender ファイアウォール」を開く
2. 左側の「受信の規則」をクリック
3. 右側の「新しい規則」をクリック
4. 以下の手順で設定：
   - 規則の種類：「ポート」を選択
   - プロトコルとポート：「TCP」と「特定のローカルポート」を選択し、「3000」を入力
   - 操作：「接続を許可する」を選択
   - プロファイル：すべてにチェック
   - 名前：「Medical Data Server」と入力
   
## 4. SSL証明書の取得と設定

### Let's Encryptの証明書取得
1. [Win-Acme](https://www.win-acme.com/)をダウンロード
   - [公式サイト](https://github.com/win-acme/win-acme/releases)から最新版の`win-acme.v2.x.x.x.x86.trimmed.zip`をダウンロード
   - ダウンロードしたZIPを`C:\win-acme`に展開

2. 証明書の取得
   ```bash
   cd C:\win-acme
   wacs.exe
   ```
   - 「N」を押して新規作成
   - 「1」を押してシンプルHTTP証明書を選択
   - ドメイン名を入力（例：example.com）
   - 証明書の保存先を確認

3. 証明書ファイルの配置
   - `C:\medical-data-server`に`ssl`フォルダを作成
   ```bash
   mkdir C:\medical-data-server\ssl
   ```
   - 取得した証明書を`ssl`フォルダにコピー
   ```bash
   copy "C:\ProgramData\win-acme\{証明書フォルダ}\privkey.pem" "C:\medical-data-server\ssl\"
   copy "C:\ProgramData\win-acme\{証明書フォルダ}\fullchain.pem" "C:\medical-data-server\ssl\"
   ```

### ファイアウォールの設定
1. 手順4のファイアウォール設定に加えて、HTTPS用のポート443も開放
   - 新しい受信の規則を作成
   - プロトコル：TCP
   - ポート：443
   - 名前：「Medical Data Server HTTPS」
## 5. サーバーの起動

1. コマンドプロンプトで以下のコマンドを実行（`C:\medical-data-server`で実行すること）
   ```bash
   npm start
   ```

2. 以下のような表示が出ることを確認
   ```
   サーバーが起動しました - http://192.168.xxx.xxx:3000
   出力先ディレクトリ:
     患者データ(PT): C:\medical-data\patient
     料金データ(PR): C:\medical-data\price
     ログファイル  : C:\medical-data\logs
   ```
   ※`192.168.xxx.xxx`の部分は、実際のPCのIPアドレスが表示されます

## 6. 動作確認

1. 同じネットワーク内の別のPCから、ブラウザで`http://192.168.xxx.xxx:3000`にアクセス
   （`192.168.xxx.xxx`は、起動時に表示されたIPアドレスに置き換えてください）

2. Webページが表示されることを確認

## トラブルシューティング

### サーバーが起動しない場合
1. コマンドプロンプトで`C:\medical-data-server`にいることを確認
   ```bash
   cd C:\medical-data-server
   ```

2. `npm install`を再実行
   ```bash
   npm install
   ```

### アクセスできない場合
1. ファイアウォールの設定を確認
2. コマンドプロンプトで以下のコマンドを実行し、ポート3000が使用中でないことを確認
   ```bash
   netstat -ano | findstr :3000
   ```

### ファイル保存エラーが出る場合
1. `C:\medical-data`フォルダとそのサブフォルダが存在することを確認
2. フォルダのアクセス権限を確認（右クリック→プロパティ→セキュリティ）