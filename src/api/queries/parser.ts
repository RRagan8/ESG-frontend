import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ParserController } from '../controllers';
import { IGetParsersResponse, IPatchParserRequest, IPostParserRequest } from '../generated/data-contracts';

const PARSER_PREFIX = 'PARSER_PREFIX';

//modified for getting from mock
export function useGetDataParserQuery() {
  return useQuery([PARSER_PREFIX], () => ParserController.getParsersDataGet(), 
  { keepPreviousData: true, enabled: true });
}

export function usePostDataParserMutation() {
  return useMutation((newData: IPostParserRequest) => ParserController.postParsersDataPost(newData));
}

export function usePatchDataParserMutation() {
  return useMutation(({ parserId, params }: { parserId: number; params: IPatchParserRequest }) => 
    ParserController.patchParsersDataPatch(parserId, params)
  );
}
