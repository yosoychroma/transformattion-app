import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LanguageButton = styled(motion.button)`
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.background.purple.light};
  color: ${({ active, theme }) => 
    active ? theme.colors.text.inverse : theme.colors.primary};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.secondary : theme.colors.background.purple.medium};
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Container>
      {languages.map(({ code, label }) => (
        <LanguageButton
          key={code}
          active={i18n.language === code}
          onClick={() => i18n.changeLanguage(code)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </LanguageButton>
      ))}
    </Container>
  );
};

export default LanguageSelector; 