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
  IGetModel,
  IGetModelType,
  IHTTPValidationError,
  IPostModel,
  IPostModelResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Model<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags model
   * @name GetModelsModelGet
   * @summary Get Models
   * @request GET:/model/
   */
  getModelsModelGet = (params: RequestParams = {}) =>
    this.request<IGetModel, any>({
      path: `/model/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags model
   * @name PostModelModelPost
   * @summary Post Model
   * @request POST:/model/
   */
  postModelModelPost = (data: IPostModel, params: RequestParams = {}) =>
    this.request<IPostModelResponse, IHTTPValidationError>({
      path: `/model/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags model
   * @name GetModelTypesModelTypeGet
   * @summary Get Model Types
   * @request GET:/model/type/
   */
  getModelTypesModelTypeGet = (params: RequestParams = {}) =>
    this.request<IGetModelType, any>({
      path: `/model/type/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
