import { useQuery } from 'react-query';
import { AggregateController } from '../controllers';
import {
  IGetAggregateTextResultViewsAggregateTextResultGetParams,
  IGetReviewsCountViewsReviewsCountGetParams,
} from '../generated/data-contracts';

const AGGREGATE_PREFIX = 'AGGREGATE_PREFIX';

export function useGetAggregateTextResultQuery(
  params: IGetAggregateTextResultViewsAggregateTextResultGetParams,
) {
  return useQuery(
    [AGGREGATE_PREFIX, 'textResult', params],
    () => AggregateController.getAggregateTextResultViewsAggregateTextResultGet(params),
    { enabled: false, keepPreviousData: true },
  );
}

export function useGetAggregateReviewsCountQuery(
  params: IGetReviewsCountViewsReviewsCountGetParams,
) {
  return useQuery(
    [AGGREGATE_PREFIX, 'reviewsCount', params],
    () => AggregateController.getReviewsCountViewsReviewsCountGet(params),
    { enabled: false, keepPreviousData: true },
  );
}
