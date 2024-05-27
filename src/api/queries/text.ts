import { useQuery } from 'react-query';
import { TextController } from '../controllers';
import { IGetSentencesTextSentencesGetParams } from '../generated/data-contracts';

const TEXT_PREFIX = 'TEXT_PREFIX';

export function useGetSentencesQuery(params: IGetSentencesTextSentencesGetParams) {
  return useQuery([TEXT_PREFIX, params], () => TextController.getSentencesTextSentencesGet(params));
}
