import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CounterContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  }
`;

const Icon = styled(motion.div)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Number = styled(motion.span)`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary || theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
  display: inline-block;
`;

const Label = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  font-weight: 500;
`;

const CountUp = ({ end, duration = 4, label, icon }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const startAnimation = useCallback(() => {
    let startTime;
    let animationFrame;
    const startValue = 0;

    const easeOutQuint = t => 1 + (--t) * t * t * t * t;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easedProgress = easeOutQuint(percentage);
      
      const steps = Math.min(end, 100);
      const currentValue = Math.floor(startValue + (end - startValue) * easedProgress);
      
      setCount(currentValue);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  useEffect(() => {
    if (inView) {
      setCount(0);
      
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      });

      controls.start("iconVisible");

      const cleanup = startAnimation();
      return cleanup;
    } else {
      setCount(0);
      controls.start({
        opacity: 0,
        y: 20
      });
    }
  }, [inView, controls, startAnimation]);

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    iconVisible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <CounterContainer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <Icon
        initial="hidden"
        animate={controls}
        variants={iconVariants}
      >
        {icon}
      </Icon>
      <Number
        initial="hidden"
        animate="visible"
        variants={numberVariants}
      >
        {count}{end > 1 ? '+' : ''}
      </Number>
      <Label>{label}</Label>
    </CounterContainer>
  );
};

export default CountUp; 