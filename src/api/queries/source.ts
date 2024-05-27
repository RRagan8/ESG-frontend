import { useQuery } from 'react-query';
import { SourceController } from '../controllers';

const SOURCE_PREFIX = 'SOURCE_PREFIX';

export function useGetSourcesQuery() {
  return useQuery([SOURCE_PREFIX, 'all'], () => SourceController.getSourcesSourceGet());
}

export function useGetSourceByIdQuery(sourceId: number) {
  return useQuery([SOURCE_PREFIX, sourceId], () =>
    SourceController.getSourceSourceItemSourceIdGet(sourceId),
  );
}

export function useGetSourceTypesQuery() {
  return useQuery([SOURCE_PREFIX, 'sourceTypes'], () =>
    SourceController.getSourceTypesSourceTypeGet(),
  );
}
