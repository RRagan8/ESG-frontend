import React, { useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import { useGetBanksQuery, useGetBrokersQuery, useGetInsurancesQuery, useGetMfoQuery } from '../../api/queries/bank';
import CompaniesTable from '../../components/CompaniesTable';  // Import the new component

export const CompaniesPage = () => {
  const { data: banksData, isLoading: loadingBanks } = useGetBanksQuery();
  const { data: brokersData, isLoading: loadingBrokers } = useGetBrokersQuery();
  const { data: mfoData, isLoading: loadingMfo } = useGetMfoQuery();
  const { data: insurancesData, isLoading: loadingInsurances } = useGetInsurancesQuery();

  const isLoading = loadingBanks || loadingBrokers || loadingMfo || loadingInsurances;

  const companies = useMemo(() => {
    const banks = banksData?.items.map(bank => ({ name: bank.bank_name, type: 'Банк' })) || [];
    const brokers = brokersData?.items.map(broker => ({ name: broker.bank_name, type: 'Брокерская компания' })) || [];
    const mfos = mfoData?.items.map(mfo => ({ name: mfo.bank_name, type: 'Микрофинансовая организация' })) || [];
    const insurances = insurancesData?.items.map(insurance => ({ name: insurance.bank_name, type: 'Страховая компания' })) || [];
    return [...banks, ...brokers, ...mfos, ...insurances];
  }, [banksData, brokersData, mfoData, insurancesData]);

  const allTypes = ['Страховая компания', 'Микрофинансовая организация', 'Брокерская компания', 'Банк'];

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Список компаний</div>
      <CompaniesTable companies={companies} allTypes={allTypes} />
    </div>
  );
};
