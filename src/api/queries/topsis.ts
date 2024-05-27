import { useQuery } from 'react-query';
import { TopsisController } from '../controllers';
import {
  IGetTopsisTopsisTopsisGetParams, ITopsisCompanyType,
} from '../generated/data-contracts';

const TOPSIS_PREFIX = 'TOPSIS_PREFIX';

export function useGetTopsisQuery(params: IGetTopsisTopsisTopsisGetParams) {
  return useQuery([TOPSIS_PREFIX, params], () => TopsisController.getTopsisTopsisTopsisGet(params), { keepPreviousData: true, enabled: true });
}

export function useGetTopsisRsppCompaniesQuery() {
  return useQuery([TOPSIS_PREFIX, 'rspp_companies'], () => TopsisController.getTopsisCompaniesTopsisCompaniesGet({
    company_type_name: ITopsisCompanyType.Rspp,
  }));
}

export function useGetTopsisNotRsppCompaniesQuery() {
  return useQuery([TOPSIS_PREFIX, 'nonrspp_companies'], () => TopsisController.getTopsisCompaniesTopsisCompaniesGet({
    company_type_name: ITopsisCompanyType.NonRspp,
  }));
}

export function useGetTopsisCompaniesTypesQuery() {
  return useQuery([TOPSIS_PREFIX, 'companiesTypes'], () => TopsisController.getTopsisCompanyTypeTopsisCompanyTypeGet(), { keepPreviousData: true, enabled: true });
}