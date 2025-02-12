import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaBars } from 'react-icons/fa';
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: ${({ theme }) => theme.colors.background.primary};
  box-shadow: ${({ theme }) => theme.colors.shadow.sm};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled(motion.input)`
  padding: 0.5rem 1rem;
  padding-left: 2.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' 
    ? theme.colors.background.secondary 
    : theme.colors.background.purple.light};
  color: ${({ theme }) => theme.colors.text.primary};
  width: ${props => props.isExpanded ? '200px' : '40px'};
  opacity: ${props => props.isExpanded ? 1 : 0.7};
  transition: all 0.3s ease;
  
  &:focus {
    width: 200px;
    opacity: 1;
    outline: none;
    background: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.background.tertiary
      : theme.colors.background.purple.medium};
  }

  @media (max-width: 768px) {
    width: ${props => props.isExpanded ? '150px' : '40px'};
    &:focus {
      width: 150px;
    }
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: 0 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background.purple.light};
  }
`;

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' }
];

const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { t } = useTranslation();
  
  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo onClick={() => window.scrollTo(0, 0)}>
        Transformattion
      </Logo>
      <RightSection>
        <NavGroup>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              href={item.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </NavGroup>
        <MobileControls>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder={isSearchExpanded ? t('search.placeholder') : ''}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
              isExpanded={isSearchExpanded}
            />
          </SearchContainer>
          <Divider />
          <LanguageSelector />
          <MobileMenuButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBars />
          </MobileMenuButton>
        </MobileControls>
      </RightSection>
    </Nav>
  );
};

export default Navbar;