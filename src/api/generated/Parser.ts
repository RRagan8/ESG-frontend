//new file not generated with swagger waiting for new api specification

import {
    IHTTPValidationError,
    IParserModel,
    IPatchParserRequest,
    IGetParsersResponse,
    IPostParserRequest,
  } from './data-contracts';
  import { ContentType, HttpClient, RequestParams } from './http-client';

export class Parser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    getParsersDataGet = (params: RequestParams = {}) =>
        this.request<IGetParsersResponse, IHTTPValidationError>({
          path: `/parser/`,
          method: 'GET',
          format: 'json',
          ...params,
        });

    postParsersDataPost = (data: IPostParserRequest, params: RequestParams = {}) =>
        this.request<IGetParsersResponse, void | IHTTPValidationError>({
          path: `/parser/`,
          method: 'POST',
          body: data,
          type: ContentType.Json,
          format: 'json',
          ...params,
        });

    patchParsersDataPatch = (
      parserId: number,
      data: IPatchParserRequest,
      params: RequestParams = {}
      ) =>
        this.request<IParserModel, void | IHTTPValidationError>({
          path: `/parser/item/${parserId}`,
          method: 'PATCH',
          body: data,
          type: ContentType.Json,
          format: 'json',
          ...params,
        });
}
