//new file not generated with swagger waiting for new api specification

import {
    IHTTPValidationError,
    IModelInfoModel,
    IModelInfoModelResponse,
    IPatchModelInfoRequest,
    IPostModelInfoRequest
  } from './data-contracts';
  import { ContentType, HttpClient, RequestParams } from './http-client';

export class ModelInfo<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    getModelInfoDataGet = (params: RequestParams = {}) =>
        this.request<IModelInfoModelResponse, IHTTPValidationError>({
          path: `/modelInfo/`,
          method: 'GET',
          format: 'json',
          ...params,
        });

    postModelInfoDataPost = (data: IPostModelInfoRequest, params: RequestParams = {}) =>
        this.request<IModelInfoModelResponse, void | IHTTPValidationError>({
          path: `/modelInfo/`,
          method: 'POST',
          body: data,
          type: ContentType.Json,
          format: 'json',
          ...params,
        });

    patchModelInfoDataPatch = (
      modelId: number,
      data: IPatchModelInfoRequest,
      params: RequestParams = {}
      ) =>
        this.request<IModelInfoModel, void | IHTTPValidationError>({
          path: `/modelInfo/item/${modelId}`,
          method: 'PATCH',
          body: data,
          type: ContentType.Json,
          format: 'json',
          ...params,
        });
}
