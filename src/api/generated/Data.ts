//new file not generated with swagger waiting for new api specification

import {
    IHTTPValidationError,
    IGetData,
    IGetDataResponse,
    IGetDataGetParams,
    IGetDataCompaniesResponse,
  } from './data-contracts';
  import { HttpClient, RequestParams } from './http-client';

export class Data<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    getDataGet = (query: IGetData, params: RequestParams = {}) =>
        this.request<IGetDataResponse, IHTTPValidationError>({
          path: `/data/`,
          method: 'GET',
          query: query,
          format: 'json',
          ...params,
        });

    getDataCompanyGet = (
        query: IGetDataGetParams,
        params: RequestParams = {},
        ) =>
        this.request<IGetDataCompaniesResponse, IHTTPValidationError>({
            path: `/topsis/companies`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params,
        });
}
