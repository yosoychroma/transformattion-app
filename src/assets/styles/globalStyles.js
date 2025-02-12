import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-top: 80px; /* Altura del Navbar */
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Altura del Navbar */
  }

  section:not(:first-child) {
    padding: 3rem 5%; /* Padding estándar para todas las secciones excepto el Hero */
  }

  /* Mejora el scroll suave para Safari */
  @supports (-webkit-overflow-scrolling: touch) {
    html {
      scroll-behavior: auto;
    }
  }

  // Ocultar el botón de WhatsApp
  .whatsapp-button,
  [class*="whatsapp-button"],
  [id*="whatsapp-button"],
  [class*="whatsapp"],
  [id*="whatsapp"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;

export default GlobalStyles; 