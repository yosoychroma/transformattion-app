import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LogosSection = styled.section`
  padding: 4rem 5%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const LogosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  img {
    max-width: 150px;
    height: auto;
    filter: grayscale(100%);
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0,0,0,0.1);
    
    img {
      filter: grayscale(0%);
    }
  }
`;

const ClientLogos = () => {
  const { t } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = t('clients.industries', { returnObjects: true }) || {};
  const logos = t('clients.logos', { returnObjects: true }) || [];

  return (
    <LogosSection>
      <Title>{t('clients.title')}</Title>
      <FilterContainer>
        {Object.entries(industries).map(([key, label]) => (
          <FilterButton
            key={key}
            active={selectedIndustry === key}
            onClick={() => setSelectedIndustry(key)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterContainer>
      <LogosGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
      >
        {Array.isArray(logos) && logos
          .filter(logo => selectedIndustry === 'all' || logo.industry === selectedIndustry)
          .map((logo, index) => (
            <LogoCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={logo.image} alt={logo.name} />
            </LogoCard>
          ))}
      </LogosGrid>
    </LogosSection>
  );
};

export default ClientLogos; 