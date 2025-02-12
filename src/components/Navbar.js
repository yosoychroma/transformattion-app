import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'};
  z-index: 100;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a365d;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: #1a365d;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 }
  };

  return (
    <Nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <Logo>Transformattion</Logo>
      <NavLinks>
        {['about', 'services', 'contact'].map((item) => (
          <NavLink
            key={item}
            href={`#${item}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {t(item)}
          </NavLink>
        ))}
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 