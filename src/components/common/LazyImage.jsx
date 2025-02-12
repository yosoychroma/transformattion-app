import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  background: ${({ theme }) => theme.colors.background.secondary};
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isLoaded ? 1 : 0};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const LazyImage = ({ src, alt, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <ImageWrapper height={height}>
      {!isLoaded && <Placeholder />}
      {currentSrc && (
        <StyledImage
          src={currentSrc}
          alt={alt}
          isLoaded={isLoaded}
          {...props}
        />
      )}
    </ImageWrapper>
  );
};

export default LazyImage; 