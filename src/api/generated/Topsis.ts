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
  IGetTopsisCompaniesResponse,
  IGetTopsisCompaniesTopsisCompaniesGetParams,
  IGetTopsisCompanyTypeResponse,
  IGetTopsisResponse,
  IGetTopsisTopsisTopsisGetParams,
  IHTTPValidationError,
  IPostTopsisCompanyRequest,
  IPostTopsisCompanyRequestResponse,
  IPostTopsisRequest,
  IPostTopsisResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Topsis<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags topsis
   * @name GetTopsisTopsisTopsisEsgGet
   * @summary Get Topsis
   * @request GET:/topsis/topsis
   */
  getTopsisTopsisTopsisGet = (query: IGetTopsisTopsisTopsisGetParams, params: RequestParams = {}) =>
    this.request<IGetTopsisResponse, IHTTPValidationError>({
      path: `/topsis/topsis/esg`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags topsis
   * @name PostTopsisTopsisTopsisPost
   * @summary Post Topsis
   * @request POST:/topsis/topsis
   */
  postTopsisTopsisTopsisPost = (data: IPostTopsisRequest, params: RequestParams = {}) =>
    this.request<IPostTopsisResponse, IHTTPValidationError>({
      path: `/topsis/topsis/esg`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags topsis
   * @name GetTopsisCompanyTypeTopsisCompanyTypeGet
   * @summary Get Topsis Company Type
   * @request GET:/topsis/company_type
   */
  getTopsisCompanyTypeTopsisCompanyTypeGet = (params: RequestParams = {}) =>
    this.request<IGetTopsisCompanyTypeResponse, any>({
      path: `/topsis/company_type`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags topsis
   * @name GetTopsisCompaniesTopsisCompaniesGet
   * @summary Get Topsis Companies
   * @request GET:/topsis/companies
   */
  getTopsisCompaniesTopsisCompaniesGet = (
    query: IGetTopsisCompaniesTopsisCompaniesGetParams,
    params: RequestParams = {},
  ) =>
    this.request<IGetTopsisCompaniesResponse, IHTTPValidationError>({
      path: `/topsis/companies`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags topsis
   * @name PostCompanyTopsisCompanyPost
   * @summary Post Company
   * @request POST:/topsis/company
   */
  postCompanyTopsisCompanyPost = (data: IPostTopsisCompanyRequest, params: RequestParams = {}) =>
    this.request<IPostTopsisCompanyRequestResponse, IHTTPValidationError>({
      path: `/topsis/company`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
