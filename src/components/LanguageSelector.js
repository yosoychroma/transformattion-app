import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
  ];

  return (
    <Container>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          active={i18n.language === lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.name}
        </LanguageButton>
      ))}
    </Container>
  );
};

export default LanguageSelector; 