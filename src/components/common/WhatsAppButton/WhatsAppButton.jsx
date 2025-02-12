import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const WhatsAppIcon = styled(motion.div)`
  background-color: #25D366;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const WhatsAppButtonComponent = () => {
  const handleClick = () => {
    const phoneNumber = '+1234567890';
    const message = 'Hola, me gustaría obtener más información sobre Transformattion';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <WhatsAppContainer className="whatsapp-button">
      <WhatsAppIcon
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp />
      </WhatsAppIcon>
    </WhatsAppContainer>
  );
};

export default WhatsAppButtonComponent; 