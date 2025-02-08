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