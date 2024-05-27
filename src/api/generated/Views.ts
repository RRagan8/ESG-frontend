/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  IAggregateTetResultResponse,
  IGetAggregateTextResultViewsAggregateTextResultGetParams,
  IGetReviewsCountViewsReviewsCountGetParams,
  IHTTPValidationError,
  IReviewsCountResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Views<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags aggregate
   * @name GetAggregateTextResultViewsAggregateTextResultGet
   * @summary Get Aggregate Text Result
   * @request GET:/views/aggregate_text_result
   */
  getAggregateTextResultViewsAggregateTextResultGet = (
    query: IGetAggregateTextResultViewsAggregateTextResultGetParams,
    params: RequestParams = {},
  ) =>
    this.request<IAggregateTetResultResponse, void | IHTTPValidationError>({
      path: `/views/aggregate_text_result`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags aggregate
   * @name GetReviewsCountViewsReviewsCountGet
   * @summary Get Reviews Count
   * @request GET:/views/reviews_count
   */
  getReviewsCountViewsReviewsCountGet = (
    query: IGetReviewsCountViewsReviewsCountGetParams,
    params: RequestParams = {},
  ) =>
    this.request<IReviewsCountResponse, void | IHTTPValidationError>({
      path: `/views/reviews_count`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
