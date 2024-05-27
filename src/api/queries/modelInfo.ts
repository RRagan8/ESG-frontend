import { useQuery, useMutation } from 'react-query';
import { ModelInfoController } from '../controllers';
import { IPatchModelInfoRequest, IPostModelInfoRequest } from '../generated/data-contracts';

const MODEL_INFO_PREFIX = 'MODEL_INFO_PREFIX';

//modified for getting from mock
export function useGetDataModelInfoQuery() {
  return useQuery([MODEL_INFO_PREFIX], () => ModelInfoController.getModelInfoDataGet(), 
  { keepPreviousData: true, enabled: true });
}

export function usePostDataModelInfoMutation() {
  return useMutation((newData: IPostModelInfoRequest) => ModelInfoController.postModelInfoDataPost(newData));
}

export function usePatchDataModelInfoMutation() {
  return useMutation(({ modelId, params }: { modelId: number; params: IPatchModelInfoRequest }) => 
    ModelInfoController.patchModelInfoDataPatch(modelId, params)
  );
}
