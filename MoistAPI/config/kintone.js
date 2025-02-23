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