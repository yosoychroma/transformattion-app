import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SearchOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 1000;
`;

const SearchContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.5rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ResultItem = styled(motion.div)`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.secondary};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { t } = useTranslation();

  // Simular búsqueda
  useEffect(() => {
    if (searchTerm) {
      // Aquí irían las llamadas a tu API de búsqueda
      const mockResults = [
        { id: 1, title: 'Desarrollo Web', type: 'service' },
        { id: 2, title: 'Aplicaciones Móviles', type: 'service' },
        { id: 3, title: 'Cloud Computing', type: 'service' },
      ].filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  // Manejar teclas
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <FaSearch />
      </button>

      <AnimatePresence>
        {isOpen && (
          <SearchOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchContainer
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <SearchInput
                autoFocus
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchResults>
                {results.map((result) => (
                  <ResultItem
                    key={result.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h4>{result.title}</h4>
                    <p>{result.type}</p>
                  </ResultItem>
                ))}
              </SearchResults>
            </SearchContainer>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </SearchOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch; 