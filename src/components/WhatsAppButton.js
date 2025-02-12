import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const WhatsAppIcon = styled.div`
  background-color: #25D366;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const WhatsAppButton = () => {
  const handleClick = () => {
    // Reemplaza este número con el número de WhatsApp de tu empresa
    const phoneNumber = '+1234567890';
    const message = 'Hola, me gustaría obtener más información sobre Transformattion';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <WhatsAppContainer>
      <WhatsAppIcon onClick={handleClick}>
        <FaWhatsapp />
      </WhatsAppIcon>
    </WhatsAppContainer>
  );
};

export default WhatsAppButton; 