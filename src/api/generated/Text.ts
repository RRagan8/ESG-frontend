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
  IGetSentencesTextSentencesGetParams,
  IGetTextSentences,
  IHTTPValidationError,
  IPostTextItem,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Text<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags text
   * @name GetSentencesTextSentencesGet
   * @summary Get Sentences
   * @request GET:/text/sentences
   */
  getSentencesTextSentencesGet = (
    query: IGetSentencesTextSentencesGetParams,
    params: RequestParams = {},
  ) =>
    this.request<IGetTextSentences, void | IHTTPValidationError>({
      path: `/text/sentences`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags text
   * @name PostTextTextPost
   * @summary Post Text
   * @request POST:/text/
   */
  postTextTextPost = (data: IPostTextItem, params: RequestParams = {}) =>
    this.request<any, void | IHTTPValidationError>({
      path: `/text/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
