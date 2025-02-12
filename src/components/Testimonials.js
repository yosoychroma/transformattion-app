import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = styled.section`
  padding: 100px 5%;
  background: white;
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  background: #f8fafc;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
`;

const QuoteIcon = styled.div`
  color: #007bff;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  h4 {
    color: #1a365d;
    margin: 0;
  }
  
  p {
    color: #64748b;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      text: "Transformattion ha superado todas nuestras expectativas. Su equipo no solo entregó un producto excepcional, sino que también nos guió durante todo el proceso.",
      author: "María González",
      position: "CEO, TechStart",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      text: "La capacidad de innovación y la atención al detalle de Transformattion son incomparables. Han sido fundamentales en nuestra transformación digital.",
      author: "John Smith",
      position: "CTO, InnovateNow",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      text: "Trabajar con Transformattion ha sido una experiencia extraordinaria. Su enfoque en la calidad y la satisfacción del cliente es ejemplar.",
      author: "Ana Martínez",
      position: "Product Manager, FutureVision",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Testimonios
        </SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <QuoteIcon>
                <FaQuoteLeft />
              </QuoteIcon>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <Author>
                <AuthorImage src={testimonial.image} alt={testimonial.author} />
                <AuthorInfo>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials; 