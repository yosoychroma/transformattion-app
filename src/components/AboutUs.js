import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = styled.section`
  padding: 100px 5%;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 3rem;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #007bff;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    &::after {
      left: 31px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.position === 'left' ? '0' : '50%'};

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: #007bff;
    border-radius: 50%;
    right: ${props => props.position === 'left' ? '-62px' : 'auto'};
    left: ${props => props.position === 'right' ? '-62px' : 'auto'};
    top: 15px;

    @media (max-width: 768px) {
      left: -45px;
      right: auto;
    }
  }
`;

const Year = styled.h3`
  color: #007bff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const AboutUs = () => {
  const { t } = useTranslation();

  const milestones = [
    {
      year: '2016',
      description: 'Fundación de Transformattion con un equipo de 3 desarrolladores'
    },
    {
      year: '2018',
      description: 'Expansión a desarrollo móvil y primeros proyectos internacionales'
    },
    {
      year: '2020',
      description: 'Integración de servicios cloud y soluciones de IA'
    },
    {
      year: '2024',
      description: 'Más de 100 proyectos exitosos y presencia global'
    }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('about')}
        </SectionTitle>
        <Timeline>
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.year}
              position={index % 2 === 0 ? 'left' : 'right'}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent position={index % 2 === 0 ? 'left' : 'right'}>
                <Year>{milestone.year}</Year>
                <Description>{milestone.description}</Description>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </AboutSection>
  );
};

export default AboutUs; 