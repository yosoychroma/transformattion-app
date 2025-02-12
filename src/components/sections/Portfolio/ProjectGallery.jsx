import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaMobileAlt, FaCloud, FaCode, FaGithub, FaExternalLinkAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { SiFirebase, SiMongodb, SiReact, SiNodedotjs } from 'react-icons/si';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GallerySection = styled.section`
  padding: 3rem 5%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  svg {
    font-size: 1.1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  margin: 0 40px;  // Espacio para las flechas
  padding: 20px 0;
  
  .slick-slide {
    padding: 0 15px;  // Espacio entre slides
  }

  .slick-list {
    margin: 0 -15px;  // Compensar el padding de los slides
  }

  .slick-dots {
    bottom: -40px;  // Ajustar posición de los dots
    
    li button:before {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.primary};
    }
    
    li.slick-active button:before {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
  margin: 10px 0;  // Espacio vertical
  height: calc(100% - 20px);  // Ajustar altura considerando el margin
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectImage}:hover & {
    opacity: 1;
  }
`;

const ProjectLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const TechIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SliderArrow = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    color: white;
    font-size: 1.2rem;
  }
`;

const NextArrow = styled(SliderArrow)`
  right: -20px;
`;

const PrevArrow = styled(SliderArrow)`
  left: -20px;
`;

const CustomNextArrow = ({ onClick }) => (
  <NextArrow onClick={onClick}>
    <FaChevronRight />
  </NextArrow>
);

const CustomPrevArrow = ({ onClick }) => (
  <PrevArrow onClick={onClick}>
    <FaChevronLeft />
  </PrevArrow>
);

const ProjectGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping platform with modern UI/UX',
      image: '/images/projects/ecommerce.jpg',
      category: 'web',
      tags: ['React', 'Node.js', 'MongoDB'],
      links: {
        github: 'https://github.com/project1',
        live: 'https://project1.com'
      }
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure and user-friendly mobile banking solution',
      image: '/images/projects/banking.jpg',
      category: 'mobile',
      tags: ['React Native', 'Firebase'],
      links: {
        github: 'https://github.com/project2',
        live: 'https://project2.com'
      }
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Dashboard',
      description: 'Real-time monitoring and management of cloud resources',
      image: '/images/projects/cloud.jpg',
      category: 'cloud',
      tags: ['React', 'AWS', 'Node.js'],
      links: {
        github: 'https://github.com/project3',
        live: 'https://project3.com'
      }
    },
    // ... más proyectos aquí
  ];

  const filters = [
    { id: 'all', label: 'All', icon: <FaCode /> },
    { id: 'web', label: 'Web Development', icon: <FaGlobe /> },
    { id: 'mobile', label: 'Mobile Apps', icon: <FaMobileAlt /> },
    { id: 'cloud', label: 'Cloud Solutions', icon: <FaCloud /> }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  useEffect(() => {
    setFilteredProjects(
      selectedFilter === 'all'
        ? projects
        : projects.filter(project => project.category === selectedFilter)
    );
  }, [selectedFilter]);

  const getTechIcon = (tech) => {
    switch (tech) {
      case 'React':
      case 'React Native':
        return <SiReact />;
      case 'Node.js':
        return <SiNodedotjs />;
      case 'MongoDB':
        return <SiMongodb />;
      case 'Firebase':
        return <SiFirebase />;
      default:
        return <FaCode />;
    }
  };

  return (
    <GallerySection id="project-gallery">
      <SectionTitle>{t('projectGallery.title')}</SectionTitle>
      <FilterContainer>
        {filters.map(filter => (
          <FilterButton
            key={filter.id}
            active={selectedFilter === filter.id}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.icon}
            {filter.label}
          </FilterButton>
        ))}
      </FilterContainer>

      <SliderContainer>
        <Slider {...settings}>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ y: -10 }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
                <ProjectOverlay>
                  {project.links?.github && (
                    <ProjectLink href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </ProjectLink>
                  )}
                  {project.links?.live && (
                    <ProjectLink href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt />
                    </ProjectLink>
                  )}
                </ProjectOverlay>
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.tags.map(tag => (
                    <TechIcon key={tag}>{getTechIcon(tag)}</TechIcon>
                  ))}
                </TechStack>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </Slider>
      </SliderContainer>
    </GallerySection>
  );
};

export default ProjectGallery; 