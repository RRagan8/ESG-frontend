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

import { IGetBankList } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Bank<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags bank
   * @name GetBanksBankGet
   * @summary Get Banks
   * @request GET:/bank/
   */
  getBanksBankGet = (params: RequestParams = {}) =>
    this.request<IGetBankList, any>({
      path: `/bank/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags bank
   * @name GetBrokerBankBrokerGet
   * @summary Get Broker
   * @request GET:/bank/broker
   */
  getBrokerBankBrokerGet = (params: RequestParams = {}) =>
    this.request<IGetBankList, any>({
      path: `/bank/broker`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags bank
   * @name GetInsuranceBankInsuranceGet
   * @summary Get Insurance
   * @request GET:/bank/insurance
   */
  getInsuranceBankInsuranceGet = (params: RequestParams = {}) =>
    this.request<IGetBankList, any>({
      path: `/bank/insurance`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags bank
   * @name GetMfoBankMfoGet
   * @summary Get Mfo
   * @request GET:/bank/mfo
   */
  getMfoBankMfoGet = (params: RequestParams = {}) =>
    this.request<IGetBankList, any>({
      path: `/bank/mfo`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
