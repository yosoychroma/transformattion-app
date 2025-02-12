import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LangContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LangContainer>
      <LanguageButton
        active={i18n.language === 'es'}
        onClick={() => changeLanguage('es')}
      >
        ES
      </LanguageButton>
      <LanguageButton
        active={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
    </LangContainer>
  );
};

export default LanguageSelector; 