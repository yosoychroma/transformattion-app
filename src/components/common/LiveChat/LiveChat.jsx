import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComment, FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ChatButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  z-index: 1000;
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  padding: 0.8rem;
  border-radius: 10px;
  max-width: 80%;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  background: ${({ isUser, theme }) => 
    isUser ? theme.colors.primary : theme.colors.background.secondary};
  color: ${({ isUser }) => isUser ? 'white' : 'inherit'};
`;

const ChatInput = styled.form`
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.background.secondary};
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  border-radius: 25px;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setInputValue('');

    // Simular respuesta automática
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Gracias por tu mensaje. Nuestro equipo te responderá pronto.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaComment />
      </ChatButton>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ChatHeader>
              <h3>{t('chat.title')}</h3>
            </ChatHeader>
            
            <ChatMessages>
              {messages.map((message, index) => (
                <Message key={index} isUser={message.isUser}>
                  {message.text}
                </Message>
              ))}
              <div ref={messagesEndRef} />
            </ChatMessages>

            <ChatInput onSubmit={handleSubmit}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chat.placeholder')}
              />
              <SendButton type="submit">
                <FaPaperPlane />
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat; 