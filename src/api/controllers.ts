import { Bank } from './generated/Bank';
import { Model } from './generated/Model';
import { Source } from './generated/Source';
import { Text } from './generated/Text';
import { TextResult } from './generated/TextResult';
import { Views } from './generated/Views';
import { Topsis } from './generated/Topsis';
import { Data } from './generated/Data';
import { Parser } from './generated/Parser';
import { ModelInfo } from './generated/ModelInfo';

const configuration = {
  baseUrl: 'http://localhost:3000/api',
};

export const AggregateController = new Views(configuration);
export const BankController = new Bank(configuration);
export const ModelController = new Model(configuration);
export const SourceController = new Source(configuration);
export const TextController = new Text(configuration);
export const TextResultController = new TextResult(configuration);
export const TopsisController = new Topsis(configuration);
export const ParserController = new Parser(configuration);
export const DataController = new Data(configuration);
export const ModelInfoController = new ModelInfo(configuration);
