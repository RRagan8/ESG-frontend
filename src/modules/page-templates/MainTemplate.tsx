import React, { FC, ReactNode } from 'react';
import { Header } from './Header';

type MainTemplateProps = {
  children: ReactNode;
};

export const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
  return (
    <main className="w-full h-full">
      <Header />
      <div className="py-1 px-2 bodymain">{children}</div>
    </main>
  );
};
