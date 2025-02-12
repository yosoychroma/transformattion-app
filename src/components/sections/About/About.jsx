import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: ${({ theme }) => theme.colors.primary};
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

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 3rem;
`;

const JourneySection = styled.div`
  margin-bottom: 3rem;
`;

const JourneyTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const Year = styled.h3`
  text-align: ${props => props.position === 'left' ? 'right' : 'left'};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const MilestoneContent = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.colors.shadow.md};
  position: relative;
  text-align: ${props => props.position === 'left' ? 'right' : 'left'};

  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    right: ${props => props.position === 'left' ? '-62px' : 'auto'};
    left: ${props => props.position === 'right' ? '-62px' : 'auto'};
    top: 15px;
    border: 4px solid ${({ theme }) => theme.colors.background.primary};
    box-shadow: ${({ theme }) => theme.colors.shadow.md};

    @media (max-width: 768px) {
      left: -45px;
      right: auto;
    }
  }

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    top: 15px;
    ${props => props.position === 'left' 
      ? `
        right: -10px;
        border-width: 10px 0 10px 10px;
        border-color: transparent transparent transparent ${props.theme.colors.background.primary};
      `
      : `
        left: -10px;
        border-width: 10px 10px 10px 0;
        border-color: transparent ${props.theme.colors.background.primary} transparent transparent;
      `
    }
  }

  @media (max-width: 768px) {
    text-align: left;
    &::before {
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-color: transparent ${props => props.theme.colors.background.primary} transparent transparent;
    }
  }
`;

const MilestoneTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const MilestoneDescription = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const About = () => {
  const { t } = useTranslation();

  return (
    <AboutSection id="about">
      <Container>
        <Title>{t('about.title')}</Title>
        <Subtitle>{t('about.subtitle')}</Subtitle>
        <Description>{t('about.description')}</Description>

        <JourneySection>
          <JourneyTitle>{t('about.journey.title')}</JourneyTitle>
          <Timeline>
            {Object.entries(t('about.journey.milestones', { returnObjects: true }))
              .map(([year, milestone], index) => (
                <TimelineItem
                  key={year}
                  position={index % 2 === 0 ? 'left' : 'right'}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Year position={index % 2 === 0 ? 'left' : 'right'}>
                    {year}
                  </Year>
                  <MilestoneContent position={index % 2 === 0 ? 'left' : 'right'}>
                    <MilestoneTitle>{milestone.title}</MilestoneTitle>
                    <MilestoneDescription>{milestone.description}</MilestoneDescription>
                  </MilestoneContent>
                </TimelineItem>
              ))}
          </Timeline>
        </JourneySection>
      </Container>
    </AboutSection>
  );
};

export default About; 