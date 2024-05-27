import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarBrand } from 'reactstrap';

// Определение интерфейса для свойств StyledLink
interface StyledLinkProps {
  to: string;
  text: string;
}

const StyledLink: React.FC<StyledLinkProps> = ({ to, text }) => {
  return (
    <NavLink to={to} className="nav-link text-white">
      {text}
    </NavLink>
  );
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="mb-4">
      <NavbarBrand href="/" className="mr-auto">
        <div onClick={toggle} style={{ cursor: 'pointer' }}>
          <Logo version="minimized" size={60} />
        </div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ml-auto">
          <NavItem>
            <StyledLink to='../' text='Общая статистика' />
          </NavItem>
          <NavItem>
            <StyledLink to="../companies/" text="Компании" />
          </NavItem>
          <NavItem>
            <StyledLink to="../one_company/" text="Рейтинги и индекс компании" />
          </NavItem>
          <NavItem>
            <StyledLink to="../comparison/" text="Ethical index Сравнение компаний" />
          </NavItem>
          <NavItem>
            <StyledLink to="../company/" text="Ethical index Анализ компании" />
          </NavItem>
          <NavItem>
            <StyledLink to='../topsis_company/' text='ESG Анализ компании' />
          </NavItem>
          <NavItem>
            <StyledLink to='../topsis_comparison/' text='ESG Сравнение компаний' />
          </NavItem>
          <NavItem>
            <StyledLink to='../data/' text='Данные' />
          </NavItem>
          <NavItem>
            <StyledLink to='../parsers/' text='Парсеры' />
          </NavItem>
          <NavItem>
            <StyledLink to='../models/' text='Модели' />
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
