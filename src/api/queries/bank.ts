import { useQuery } from 'react-query';
import { BankController } from '../controllers';

const BANK_PREFIX = 'BANK_PREFIX';

export function useGetBanksQuery() {
  return useQuery([BANK_PREFIX, 'banks'], () => BankController.getBanksBankGet());
}

export function useGetBrokersQuery() {
  return useQuery([BANK_PREFIX, 'brokers'], () => BankController.getBrokerBankBrokerGet());
}

export function useGetInsurancesQuery() {
  return useQuery([BANK_PREFIX, 'insurances'], () =>
    BankController.getInsuranceBankInsuranceGet(),
  );
}

export function useGetMfoQuery() {
  return useQuery([BANK_PREFIX, 'mfo'], () => BankController.getMfoBankMfoGet());
}
