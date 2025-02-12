import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const NotificationWrapper = styled(motion.div)`
  position: fixed;
  top: ${({ index }) => `${index * 80 + 20}px`};
  right: 20px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
  z-index: 1000;
  border-left: 4px solid ${({ type, theme }) => {
    switch(type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.info;
    }
  }};
`;

const IconWrapper = styled.div`
  color: ${({ type, theme }) => {
    switch(type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.info;
    }
  }};
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const getIcon = (type) => {
  switch(type) {
    case 'success': return <FaCheckCircle />;
    case 'error': return <FaTimesCircle />;
    case 'warning': return <FaExclamationCircle />;
    default: return <FaInfoCircle />;
  }
};

const Notification = ({ message, type, onClose, index }) => {
  return (
    <NotificationWrapper
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      type={type}
      index={index}
    >
      <IconWrapper type={type}>
        {getIcon(type)}
      </IconWrapper>
      <div>
        <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        <p>{message}</p>
      </div>
      <CloseButton onClick={onClose}>×</CloseButton>
    </NotificationWrapper>
  );
};

export default Notification; 