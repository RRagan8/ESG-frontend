import { useQuery } from 'react-query';
import { DataController } from '../controllers';
import {
    IGetData, 
    ITopsisCompanyTypeV2,
} from '../generated/data-contracts'; 

const DATA_PREFIX = 'DATA_PREFIX';

//modified for getting from mock
export function useGetDataQuery(params: IGetData) {
  return useQuery([DATA_PREFIX, params], () => DataController.getDataGet(params), 
  { keepPreviousData: true, enabled: true });
}

export function useGetDataBanksQuery() {
    return useQuery([DATA_PREFIX, 'bank_companies'], () => DataController.getDataCompanyGet({
      company_type_name: ITopsisCompanyTypeV2.bank,
    }));
  }
  
export function useGetDataBrokerQuery() {
return useQuery([DATA_PREFIX, 'broker_companies'], () => DataController.getDataCompanyGet({
    company_type_name: ITopsisCompanyTypeV2.broker,
}));
}

export function useGetDataMfoQuery() {
return useQuery([DATA_PREFIX, 'mfo_companies'], () => DataController.getDataCompanyGet({
    company_type_name: ITopsisCompanyTypeV2.mfo,
}));
}

export function useGetDataInsuranceQuery() {
return useQuery([DATA_PREFIX, 'insurance_companies'], () => DataController.getDataCompanyGet({
    company_type_name: ITopsisCompanyTypeV2.insurance,
}));
}
