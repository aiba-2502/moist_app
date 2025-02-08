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