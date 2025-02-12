import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaCode, 
  FaMobile, 
  FaCloud, 
  FaRobot, 
  FaShieldAlt, 
  FaDatabase, 
  FaChartLine, 
  FaCogs,
  FaDesktop,
  FaUsers,
  FaTools,
  FaBrain
} from 'react-icons/fa';

const ServicesSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: ${({ theme }) => theme.colors.shadow.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadow.lg};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.mode === 'dark' 
      ? theme.colors.background.tertiary 
      : theme.colors.background.primary};
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaCode />,
      title: t('services.web.title'),
      description: t('services.web.description')
    },
    {
      icon: <FaMobile />,
      title: t('services.mobile.title'),
      description: t('services.mobile.description')
    },
    {
      icon: <FaCloud />,
      title: t('services.cloud.title'),
      description: t('services.cloud.description')
    },
    {
      icon: <FaRobot />,
      title: t('services.ai.title'),
      description: t('services.ai.description')
    },
    {
      icon: <FaShieldAlt />,
      title: t('services.security.title'),
      description: t('services.security.description')
    },
    {
      icon: <FaDatabase />,
      title: t('services.data.title'),
      description: t('services.data.description')
    },
    {
      icon: <FaChartLine />,
      title: t('services.analytics.title'),
      description: t('services.analytics.description')
    },
    {
      icon: <FaCogs />,
      title: t('services.devops.title'),
      description: t('services.devops.description')
    },
    {
      icon: <FaDesktop />,
      title: t('services.desktop.title'),
      description: t('services.desktop.description')
    },
    {
      icon: <FaUsers />,
      title: t('services.consulting.title'),
      description: t('services.consulting.description')
    },
    {
      icon: <FaTools />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description')
    },
    {
      icon: <FaBrain />,
      title: t('services.innovation.title'),
      description: t('services.innovation.description')
    }
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <SectionTitle>
          {t('servicesTitle')}
        </SectionTitle>
        <Grid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <IconWrapper>{service.icon}</IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </Grid>
      </Container>
    </ServicesSection>
  );
};

export default Services;