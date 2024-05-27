import { useQuery } from 'react-query';
import { TextResultController } from '../controllers';

const TEXT_RESULT_PREFIX = 'TEXT_RESULT_PREFIX';

export function useGetTextResultByTextIdQuery(textId: number) {
  return useQuery([TEXT_RESULT_PREFIX, textId], () =>
    TextResultController.getTextResultsTextResultItemTextIdGet(textId),
  );
}
