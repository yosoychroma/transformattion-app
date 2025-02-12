import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout; 