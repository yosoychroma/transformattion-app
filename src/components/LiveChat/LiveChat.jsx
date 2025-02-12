import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaCircle, FaPaperPlane, FaRobot, FaRegLightbulb, FaFile, FaImage, FaSmile, FaBell, FaVolumeMute } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import EmojiPicker from 'emoji-picker-react';
import { find } from 'linkifyjs';
import useSound from 'use-sound';
import { SOUNDS } from './sounds';

const ChatWidget = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: 480px) {
    bottom: 1rem;
    right: 1rem;
  }
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1001;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;

    @media (max-width: 768px) {
      display: none; // Ocultar tooltip en móviles
    }
  }

  &:hover::before {
    opacity: 1;
    top: -45px;
  }
`;

const OnlineIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4CAF50;
  border: 2px solid white;
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 4.5rem;
    right: 1.5rem;
    width: calc(100vw - 3rem);
    max-width: 350px;
    height: 450px;
  }

  @media (max-width: 480px) {
    bottom: 4rem;
    right: 1rem;
    width: calc(100vw - 2rem);
    height: 400px;
  }

  @media (max-height: 600px) {
    height: calc(100vh - 7rem);
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  small {
    font-size: 0.9rem;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const Message = styled.div`
  margin: 0.5rem 0;
  padding: 0.8rem;
  background: ${props => props.isUser ? props.theme.colors.primary : 'white'};
  color: ${props => props.isUser ? 'white' : props.theme.colors.text.primary};
  border-radius: 8px;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-break: break-word;

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
    max-width: 85%;
  }
`;

const QuickSuggestions = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const SuggestionChip = styled(motion.button)`
  background: ${({ theme }) => theme.colors.background.primary}22;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}22;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AIIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  gap: 0.3rem;
  padding: 0.5rem;
  
  span {
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }
`;

const AttachmentPreview = styled.div`
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.background.primary}11;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    max-width: 100px;
    border-radius: 4px;
  }
`;

const ChatControls = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.primary}22;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmojiPickerContainer = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1000;
`;

const LinkPreview = styled.a`
  display: block;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.background.primary}11;
  border-radius: 8px;
  margin-top: 0.5rem;
  text-decoration: none;
  color: inherit;

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ReadIndicator = styled.span`
  font-size: 0.7rem;
  margin-left: auto;
  opacity: 0.7;
`;

const WelcomeVideo = styled.video`
  width: 100%;
  border-radius: 8px;
  margin: 0.5rem 0;
  max-height: 200px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.primary}11;
  border-radius: 8px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [playNotification] = useSound(SOUNDS.notification, { volume: 0.3 });
  const [playMessageSent] = useSound(SOUNDS.messageSent, { volume: 0.2 });
  const [playPop] = useSound(SOUNDS.pop, { volume: 0.1 });
  const [playConnect] = useSound(SOUNDS.connect, { volume: 0.2 });
  const [playDisconnect] = useSound(SOUNDS.disconnect, { volume: 0.2 });

  const contextualSuggestions = {
    initial: [
      "¿Qué servicios ofrecen?",
      "¿Tienen experiencia en mi industria?",
      "¿Cuál es su proceso de trabajo?",
    ],
    services: [
      "¿Cuánto tiempo toma un proyecto típico?",
      "¿Qué tecnologías utilizan?",
      "¿Pueden mostrarme ejemplos similares?",
    ],
    pricing: [
      "¿Cómo estructuran sus precios?",
      "¿Ofrecen planes de mantenimiento?",
      "¿Tienen paquetes para startups?",
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setSuggestions(contextualSuggestions.initial);
      setMessages([{
        text: t('chat.startMessage'),
        isUser: false,
        isAI: true,
        hasVideo: true
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (soundEnabled) {
      if (isOpen) {
        playConnect();
      } else {
        playDisconnect();
      }
    }
  }, [isOpen, soundEnabled]);

  const handleSuggestionClick = (suggestion) => {
    if (soundEnabled) {
      playPop();
    }
    setInputValue(suggestion);
    handleSend(suggestion);
    // Actualizar sugerencias basadas en el contexto
    if (suggestion.toLowerCase().includes('servicio')) {
      setSuggestions(contextualSuggestions.services);
    } else if (suggestion.toLowerCase().includes('precio')) {
      setSuggestions(contextualSuggestions.pricing);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachment({
            type: 'image',
            url: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      } else {
        setAttachment({
          type: 'file',
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)}KB`
        });
      }
    }
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim() && !attachment) return;
    
    const newMessage = {
      text,
      isUser: true,
      attachment,
      timestamp: new Date(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setAttachment(null);
    setIsTyping(true);

    if (soundEnabled) {
      playMessageSent();
    }

    setTimeout(() => {
      setIsTyping(false);
      const response = {
        text: t('chat.autoResponse'),
        isUser: false,
        isAI: true,
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, response]);
      
      if (soundEnabled) {
        playNotification();
      }

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg === response ? {...msg, read: true} : msg)
        );
      }, 1000);
    }, 2000);
  };

  const renderMessageContent = (message) => {
    let content = message.text;
    
    if (content) {
      const links = find(content);
      links.forEach(link => {
        content = content.replace(
          link.value,
          `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.value}</a>`
        );
      });
    }

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {message.hasVideo && (
          <VideoContainer>
            <WelcomeVideo
              autoPlay
              muted
              loop
              playsInline
              src="/videos/banner.mp4"
              poster="/images/welcome-poster.jpg"
            />
          </VideoContainer>
        )}
        {message.attachment && (
          <AttachmentPreview>
            {message.attachment.type === 'image' ? (
              <img src={message.attachment.url} alt="attachment" />
            ) : (
              <>
                <FaFile />
                <span>{message.attachment.name} ({message.attachment.size})</span>
              </>
            )}
          </AttachmentPreview>
        )}
        {message.timestamp && (
          <ReadIndicator>
            {new Date(message.timestamp).toLocaleTimeString()} 
            {message.read && '✓✓'}
          </ReadIndicator>
        )}
      </>
    );
  };

  return (
    <ChatWidget>
      <ChatButton
        isOpen={isOpen}
        data-tooltip={isOpen ? '' : t('chat.helpText')}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        <OnlineIndicator />
      </ChatButton>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <div>
                <h3>{t('chat.title')}</h3>
                <small>
                  <FaCircle style={{ color: '#4CAF50', marginRight: '5px' }} />
                  {t('chat.online')}
                </small>
              </div>
              <FaTimes 
                style={{ cursor: 'pointer' }} 
                onClick={() => setIsOpen(false)} 
              />
            </ChatHeader>

            <ChatBody>
              {messages.map((msg, index) => (
                <>
                  {msg.isAI && (
                    <AIIndicator>
                      <FaRobot /> AI Assistant
                    </AIIndicator>
                  )}
                  <Message key={index} isUser={msg.isUser}>
                    {renderMessageContent(msg)}
                  </Message>
                </>
              ))}

              {suggestions.length > 0 && !isTyping && (
                <QuickSuggestions
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {suggestions.map((suggestion, index) => (
                    <SuggestionChip
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaRegLightbulb />
                      {suggestion}
                    </SuggestionChip>
                  ))}
                </QuickSuggestions>
              )}

              {isTyping && (
                <TypingIndicator
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                  />
                </TypingIndicator>
              )}
            </ChatBody>

            <ChatControls>
              <input
                type="file"
                id="file-upload"
                hidden
                onChange={handleFileUpload}
              />
              <ControlButton as="label" htmlFor="file-upload">
                <FaImage />
              </ControlButton>
              <ControlButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <FaSmile />
              </ControlButton>
              <ControlButton onClick={() => setSoundEnabled(!soundEnabled)}>
                {soundEnabled ? <FaBell /> : <FaVolumeMute />}
              </ControlButton>
            </ChatControls>

            {showEmojiPicker && (
              <EmojiPickerContainer
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setInputValue(prev => prev + emojiData.emoji);
                    setShowEmojiPicker(false);
                  }}
                />
              </EmojiPickerContainer>
            )}

            <ChatInput>
              <Input
                type="text"
                placeholder={t('chat.placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <SendButton onClick={handleSend}>
                <FaPaperPlane />
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </ChatWidget>
  );
};

export default LiveChat; 