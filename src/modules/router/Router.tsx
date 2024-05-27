import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompaniesPage } from '../../pages/CompaniesPage'
import { CompanyPage } from '../../pages/CompanyPage';
import { ComparisonPage } from '../../pages/ComparisonPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { OneCompanyPage } from '../../pages/OneCompanyPage';
import { MainTemplate } from '../page-templates';
import { TopsisCompanyPage } from '../../pages/TopsisCompanyPage';
import { TopsisComparisonPage } from '../../pages/TopsisComparisonPage';
import { DataPage } from '../../pages/DataPage';
import { ParsersPage } from '../../pages/ParsersPage';
import { ModelsPage } from '../../pages/ModelsPage';

const routes = [
  { path: '/one_company', name: 'Анализ одной компании', element: <OneCompanyPage /> },
  { path: '/companies', name: 'Компании', element: <CompaniesPage /> },
  { path: '/', name: 'Общая статистика', index: true, element: <StatisticsPage /> },
  { path: '/comparison', name: 'Сравнение компаний', element: <ComparisonPage /> },
  { path: '/company', name: 'Анализ компании', element: <CompanyPage /> },
  { path: '/topsis_company', name: 'Анализ компании по методу ТОПСИС', element: <TopsisCompanyPage /> },
  { path: '/topsis_comparison', name: 'Сравнение компаний по методу ТОПСИС', element: <TopsisComparisonPage /> },
  { path: '/data', name: 'Используемые данные', element: <DataPage /> },
  { path: '/parsers', name: 'Каталог используемых парсеров', element: <ParsersPage /> },
  { path: '/models', name: 'Каталог используемых моделей', element: <ModelsPage /> },
];

export const Router = () => {
  return (
    <Routes>
      {routes.map(({ element, ...rest }) => {
        return <Route key={rest.path} element={<MainTemplate>{element}</MainTemplate>} {...rest} />;
      })}
    </Routes>
  );
};
