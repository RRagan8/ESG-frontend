/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import { Select } from '../../components/Select';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { availableYears, topsisFieldItemsV2, dataTypes, DataTypes } from '../../lib/const';
import { Autocomplete } from '../../components/Autocomplete';
import { noop } from '../../lib/helpers';
import {
  IGetDataCompaniesResponseItem,
  ITopsisCompanyTypeV2,
  IGetDataResponse
} from '../../api/generated/data-contracts';
import {
  useGetDataQuery,
  useGetDataInsuranceQuery,
  useGetDataBanksQuery,
  useGetDataBrokerQuery,
  useGetDataMfoQuery
} from '../../api/queries/data';

export const DataPage = () => {
  const [selectedDataTypes, setSelectedDataTypes] = useState<DataTypes[]>([]);
  const [selectedFields, setSelectedFields] = useState<ITopsisCompanyTypeV2[]>([]);
  const [selectedBroker, setSelectedBroker] = useState<IGetDataCompaniesResponseItem[]>([]);
  const [selectedBank, setSelectedBank] = useState<IGetDataCompaniesResponseItem[]>([]);
  const [selectedMfo, setSelectedMfo] = useState<IGetDataCompaniesResponseItem[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<IGetDataCompaniesResponseItem[]>([]);
  const [selectedStartYear, setSelectedStartYear] = useState<string[]>([]);
  const [selectedEndYear, setSelectedEndYear] = useState<string[]>([]);

  const {data: brokerData, isLoading: loadingBroker} = useGetDataBanksQuery();
  const {data: bankData, isLoading: loadingBank} = useGetDataBrokerQuery();
  const {data: mfoData, isLoading: loadingMfo} = useGetDataMfoQuery();
  const {data: insuranceData, isLoading: loadingInsurance} = useGetDataInsuranceQuery();

  const {
    data: dataResponse,
    isLoading: isLoadingTopsisData,
    refetch: refetchData,
  } = useGetDataQuery({
    company_ids: [
      ...(selectedFields[0] === ITopsisCompanyTypeV2.broker ? selectedBroker.map(({ id }) => id) : []),
      ...(selectedFields[0] === ITopsisCompanyTypeV2.bank ? selectedBank.map(({ id }) => id) : []),
      ...(selectedFields[0] === ITopsisCompanyTypeV2.mfo ? selectedMfo.map(({ id }) => id) : []),
      ...(selectedFields[0] === ITopsisCompanyTypeV2.insurance ? selectedInsurance.map(({ id }) => id) : []),
    ],
    report_type: selectedDataTypes,
    year_start: selectedStartYear[0] ? Number(selectedStartYear[0]) : undefined,
    year_end: selectedEndYear[0] ? Number(selectedEndYear[0]) : undefined,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'company_id', headerName: 'Company ID', width: 70 },
    { field: 'report_type', headerName: 'Report Type', width: 150 },
    { field: 'company_type', headerName: 'Company Type', width: 150 },
    { field: 'company_name', headerName: 'Company Name', width: 150 },
    { field: 'record_year', headerName: 'Record Year', width: 110 },
    { field: 'record_time', headerName: 'Record Time', width: 120 },
    { field: 'entry', headerName: 'Entry', flex: 1, renderCell: (params: GridRenderCellParams<IGetDataResponse, string>) => (
      <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', display: 'block' }}>
        {params.value}
      </div>
    ) },
  ];
  
  const loading =
    loadingBroker ||
    loadingBank ||
    loadingInsurance ||
    loadingMfo ||
    isLoadingTopsisData;

  const buttonDisabled =
    loading ||
    (selectedFields[0] === ITopsisCompanyTypeV2.bank && selectedBank.length === 0) ||
    (selectedFields[0] === ITopsisCompanyTypeV2.broker && selectedBroker.length === 0) ||
    (selectedFields[0] === ITopsisCompanyTypeV2.mfo && selectedMfo.length === 0) ||
    (selectedFields[0] === ITopsisCompanyTypeV2.insurance && selectedInsurance.length === 0);

  return (
    <div className="full-height">
      <div className="text-4xl mt-4 font-semibold">Исходные данные проекта</div>
      <div className="flex mt-8 gap-4">
        <Select
          selectedValue={selectedDataTypes}
          onChange={setSelectedDataTypes as any}
          label="Тип отчетов"
          labelId="fields"
          items={dataTypes}
          itemToString={(item) => item.name}
          itemToValue={(item) => item.id}
        />
        <Select
          disabled={selectedDataTypes.length === 0}
          selectedValue={selectedFields}
          onChange={setSelectedFields as any}
          label="Тип компании"
          labelId="fields"
          items={topsisFieldItemsV2}
          itemToString={(item) => item.name}
          itemToValue={(item) => item.id}
        />
        {selectedFields.length === 0 && (
          <Autocomplete
            disabled
            multiple={false}
            id="no"
            label="Компании"
            selectedValue={[]}
            items={[]}
            itemToString={() => ''}
            onChange={noop}
          />
        )}
        {selectedFields[0] === ITopsisCompanyTypeV2.bank && ( //rspp
          <Autocomplete
            multiple={false}
            id="rspp"
            label="Банк"
            selectedValue={selectedBank}
            items={bankData?.data ?? []}
            itemToString={(bankData) => bankData.name}
            onChange={setSelectedBank}
          />
        )}
        {selectedFields[0] === ITopsisCompanyTypeV2.broker && ( //nonrspp
          <Autocomplete
            multiple={false}
            id="not_rspp"
            label="Брокер"
            selectedValue={selectedBroker}
            items={brokerData?.data ?? []}
            itemToString={(brokerData) => brokerData.name}
            onChange={setSelectedBroker}
          />
        )}
        {selectedFields[0] === ITopsisCompanyTypeV2.mfo && (
          <Autocomplete
            multiple={false}
            id="mfo"
            label="МФО"
            selectedValue={selectedMfo}
            items={mfoData?.data ?? []}
            itemToString={(mfoData) => mfoData.name}
            onChange={setSelectedMfo}
          />
        )}
        {selectedFields[0] === ITopsisCompanyTypeV2.insurance && (
          <Autocomplete
            multiple={false}
            id="insurance"
            label="Страховая"
            selectedValue={selectedInsurance}
            items={insuranceData?.data ?? []}
            itemToString={(insuranceData) => insuranceData.name}
            onChange={setSelectedInsurance}
          />
        )}
        <Select
          selectedValue={selectedStartYear}
          onChange={setSelectedStartYear}
          label="Первый год"
          labelId="startYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
        <Select
          selectedValue={selectedEndYear}
          onChange={setSelectedEndYear}
          label="Последний год"
          labelId="endYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
      </div>
      <div className="mt-4">
        <Button
          disabled={buttonDisabled}
          variant="contained"
          onClick={() => refetchData()}
        >
          Отобразить данные
        </Button>
      </div>
      {loading && (
        <div className="mt-[100px] flex justify-center">
          <CircularProgress />
        </div>
      )}
      {dataResponse && dataResponse.data && dataResponse.data.length > 0 && (
      <div className="data-grid-container">
        <DataGrid 
          rows={dataResponse.data} 
          columns={columns} 
          checkboxSelection 
          density="compact"
          sortModel={[{ field: 'id', sort: 'asc' }]} // Сортировка по id
          getRowHeight={() => 'auto'} 
          className="data-grid"
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          />
      </div>
      )}
    </div>
  );
};
