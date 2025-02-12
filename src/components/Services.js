import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaMobile, FaCloud, FaRobot } from 'react-icons/fa';

const ServicesSection = styled.section`
  padding: 100px 5%;
  background: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #1a365d;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 3rem;
`;

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaCode />,
      title: "Custom Software Development",
      description: "Desarrollo de software personalizado para satisfacer tus necesidades específicas"
    },
    {
      icon: <FaMobile />,
      title: "Mobile Development",
      description: "Aplicaciones móviles nativas y multiplataforma"
    },
    {
      icon: <FaCloud />,
      title: "Cloud Solutions",
      description: "Soluciones en la nube escalables y seguras"
    },
    {
      icon: <FaRobot />,
      title: "AI Integration",
      description: "Integración de inteligencia artificial en tus sistemas"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ServicesSection id="services">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('services')}
      </SectionTitle>
      <Grid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <IconWrapper>{service.icon}</IconWrapper>
            <Title>{service.title}</Title>
            <Description>{service.description}</Description>
          </ServiceCard>
        ))}
      </Grid>
    </ServicesSection>
  );
};

export default Services; 