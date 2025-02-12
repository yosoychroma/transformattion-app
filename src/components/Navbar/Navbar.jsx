import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle/ThemeToggle';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Navbar = ({ toggleTheme, isDark }) => {
  const { t } = useTranslation();

  return (
    <Nav>
      <Logo>Transformattion</Logo>
      <NavLinks>
        <NavLink href="#about">{t('nav.about')}</NavLink>
        <NavLink href="#services">{t('nav.services')}</NavLink>
        <NavLink href="#project-gallery">{t('nav.portfolio')}</NavLink>
        <NavLink href="#booking">{t('nav.contact')}</NavLink>
      </NavLinks>
      <Controls>
        <LanguageSelector />
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
      </Controls>
    </Nav>
  );
};

export default Navbar; 