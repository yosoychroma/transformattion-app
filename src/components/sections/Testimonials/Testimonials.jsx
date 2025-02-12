import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsSection = styled.section`
  padding: 4rem 5%;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: ${({ theme }) => theme.colors.primary}40;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const AuthorPosition = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
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

const Testimonials = () => {
  const { t } = useTranslation();

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const testimonials = Object.entries(t('testimonialsData', { returnObjects: true }));

  return (
    <TestimonialsSection id="testimonials">
      <Title>{t('testimonials')}</Title>
      <Slider {...settings}>
        {testimonials.map(([key, testimonial]) => (
          <div key={key}>
            <TestimonialCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <QuoteIcon />
                <TestimonialText>{testimonial.text}</TestimonialText>
              </div>
              <AuthorInfo>
                <AuthorImage 
                  src={`/images/testimonials/${key}.jpg`} 
                  alt={testimonial.author}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/testimonials/default-avatar.jpg';
                  }}
                />
                <AuthorDetails>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorPosition>{testimonial.position}</AuthorPosition>
                </AuthorDetails>
              </AuthorInfo>
            </TestimonialCard>
          </div>
        ))}
      </Slider>
    </TestimonialsSection>
  );
};

export default Testimonials; 