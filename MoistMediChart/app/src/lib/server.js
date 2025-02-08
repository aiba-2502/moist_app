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