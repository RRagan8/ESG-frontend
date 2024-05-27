import { useQuery } from 'react-query';
import { ModelController } from '../controllers';

const MODEL_PREFIX = 'MODEL_PREFIX';

export function useGetModelsQuery() {
  return useQuery([MODEL_PREFIX, 'all'], () => ModelController.getModelsModelGet());
}

export function useGetModelTypesQuery() {
  return useQuery([MODEL_PREFIX, 'modelTypes'], () =>
    ModelController.getModelTypesModelTypeGet(),
  );
}
