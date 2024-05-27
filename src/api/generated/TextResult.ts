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

import { IGetTextResult, IHTTPValidationError, IPostTextResult } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class TextResult<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags text_result
   * @name GetTextResultsTextResultItemTextIdGet
   * @summary Get Text Results
   * @request GET:/text_result/item/{text_id}
   */
  getTextResultsTextResultItemTextIdGet = (textId: number, params: RequestParams = {}) =>
    this.request<IGetTextResult, IHTTPValidationError>({
      path: `/text_result/item/${textId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags text_result
   * @name PostTextResultTextResultPost
   * @summary Post Text Result
   * @request POST:/text_result/
   */
  postTextResultTextResultPost = (data: IPostTextResult, params: RequestParams = {}) =>
    this.request<Record<string, string>, void | IHTTPValidationError>({
      path: `/text_result/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
