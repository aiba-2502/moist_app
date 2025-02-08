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