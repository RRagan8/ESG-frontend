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
  ICreateSource,
  IGetSource,
  IGetSourceTypes,
  IHTTPValidationError,
  IPatchSource,
  ISourceModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Source<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags source
   * @name GetSourcesSourceGet
   * @summary Get Sources
   * @request GET:/source/
   */
  getSourcesSourceGet = (params: RequestParams = {}) =>
    this.request<IGetSource, any>({
      path: `/source/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags source
   * @name PostSourceSourcePost
   * @summary Post Source
   * @request POST:/source/
   */
  postSourceSourcePost = (data: ICreateSource, params: RequestParams = {}) =>
    this.request<ISourceModel, IHTTPValidationError>({
      path: `/source/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags source
   * @name GetSourceSourceItemSourceIdGet
   * @summary Get Source
   * @request GET:/source/item/{source_id}
   */
  getSourceSourceItemSourceIdGet = (sourceId: number, params: RequestParams = {}) =>
    this.request<ISourceModel, void | IHTTPValidationError>({
      path: `/source/item/${sourceId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags source
   * @name PatchSourceSourceItemSourceIdPatch
   * @summary Patch Source
   * @request PATCH:/source/item/{source_id}
   */
  patchSourceSourceItemSourceIdPatch = (
    sourceId: number,
    data: IPatchSource,
    params: RequestParams = {},
  ) =>
    this.request<ISourceModel, void | IHTTPValidationError>({
      path: `/source/item/${sourceId}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags source
   * @name GetSourceTypesSourceTypeGet
   * @summary Get Source Types
   * @request GET:/source/type/
   */
  getSourceTypesSourceTypeGet = (params: RequestParams = {}) =>
    this.request<IGetSourceTypes, any>({
      path: `/source/type/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
