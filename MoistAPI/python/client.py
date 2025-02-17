import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

# .envファイルから環境変数を読み込み
load_dotenv()

KINTONE_DOMAIN = os.getenv('KINTONE_DOMAIN')
API_TOKEN = os.getenv('KINTONE_API_TOKEN')
APP_ID = '76'

def get_records(phone_number):
    all_records = []
    offset = 0
    limit = 100

    while True:
        query = f'患者電話番号 = "{phone_number}" and 支払い確認 not in ("確認済み") and 支払い方法 = "現地（精算機）" limit {limit} offset {offset}'
        
        headers = {
            'X-Cybozu-API-Token': API_TOKEN
        }
        
        params = {
            'app': APP_ID,
            'query': query
        }

        response = requests.get(
            f'https://{KINTONE_DOMAIN}/k/v1/records.json',
            headers=headers,
            params=params
        )

        if response.status_code != 200:
            print('Error:', response.json())
            break

        records = response.json()['records']
        if not records:
            break

        all_records.extend(records)
        offset += limit

        if len(records) < limit:
            break

    return all_records

if __name__ == '__main__':
    try:
        # 出力ディレクトリの作成
        output_dir = 'D:\\json'
        os.makedirs(output_dir, exist_ok=True)

        # テスト用の電話番号
        test_phone_number = "09027328888"
        records = get_records(test_phone_number)
        
        # タイムスタンプを含むファイル名の生成
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_path = os.path.join(output_dir, f'kintone_response_{timestamp}.json')
        
        # JSONファイルの出力
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
        
        print(f'Response saved to: {output_path}')
        print('Records count:', len(records))
    except Exception as e:
        print('Error:', str(e))