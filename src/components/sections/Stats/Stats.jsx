import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FaRocket, FaHandshake, FaGlobe, FaUsers } from 'react-icons/fa';

const StatsSection = styled.section`
  padding: 3rem 5%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary}66;
  margin-bottom: 1rem;
`;

const Stats = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      number: 100,
      label: t('about.stats.projects'),
      suffix: '+',
      icon: <FaRocket />
    },
    {
      number: 50,
      label: t('about.stats.clients'),
      suffix: '+',
      icon: <FaHandshake />
    },
    {
      number: 12,
      label: t('about.stats.countries'),
      icon: <FaGlobe />
    },
    {
      number: 30,
      label: t('about.stats.team'),
      suffix: '+',
      icon: <FaUsers />
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <StatsSection>
      <StatsGrid
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <StatCard key={index} variants={itemVariants}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatNumber>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { 
                  opacity: 1,
                  scale: 1,
                } : {}}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2
                }}
              >
                {stat.number}{stat.suffix}
              </motion.span>
            </StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsSection>
  );
};

export default Stats; 