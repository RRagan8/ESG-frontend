import { generateArrayOfYears } from './helpers';
import { ITopsisAggregateType, ITopsisCompanyType, ITopsisCompanyTypeV2 } from '../api/generated/data-contracts';

export enum FieldTypes {
  bank = 'bank',
  broker = 'broker',
  mfo = 'mfo',
  insurance = 'insurance',
}

export const fieldItems = [
  { id: FieldTypes.bank, name: 'Банки' },
  { id: FieldTypes.broker, name: 'Брокеры' },
  { id: FieldTypes.mfo, name: 'Микрофинансовые организации' },
  { id: FieldTypes.insurance, name: 'Страховые компании' },
];

export const availableYears = generateArrayOfYears();

export const topsisFieldItems = [ 
  { id: ITopsisCompanyType.Rspp, name: 'Компании' },
  { id: ITopsisCompanyType.NonRspp, name: 'Банки' },
];

export const topsisFieldItemsV2 = [ 
  { id: ITopsisCompanyTypeV2.broker, name: 'Брокеры' },
  { id: ITopsisCompanyTypeV2.bank, name: 'Банки' },
  { id: ITopsisCompanyTypeV2.mfo, name: 'Микрофинансовые организации' },
  { id: ITopsisCompanyTypeV2.insurance, name: 'Страховые компании' },
];

export const topsisIndexItems = [
  { id: ITopsisAggregateType.Average.toString(), name: 'Среднее' },
  { id: ITopsisAggregateType.AllLetters.toString(), name: 'На буквах' },
  { id: ITopsisAggregateType.AllTopics.toString(), name: 'На всех топиках' },
];

export enum DataTypes {
  review = 'review',
  report = 'report',
  webpages = 'webpages',
  audit = 'audit',
}

export const dataTypes = [
  { id: DataTypes.review, name: 'Отзывы' },
  { id: DataTypes.report, name: 'Отчеты' },
  { id: DataTypes.webpages, name: 'Веб-сайты' },
  { id: DataTypes.audit, name: 'Проверки' },
];

