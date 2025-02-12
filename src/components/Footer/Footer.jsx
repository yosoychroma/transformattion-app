import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 4rem 5%;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>Transformattion</h3>
          <p>{t('footer.description')}</p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.quickLinks.title')}</h3>
          <ul>
            <li><a href="#about">{t('footer.quickLinks.about')}</a></li>
            <li><a href="#services">{t('footer.quickLinks.services')}</a></li>
            <li><a href="#portfolio">{t('footer.quickLinks.portfolio')}</a></li>
            <li><a href="#contact">{t('footer.quickLinks.contact')}</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>{t('servicesTitle')}</h3>
          <ul>
            <li><a href="#web">{t('services.web.title')}</a></li>
            <li><a href="#mobile">{t('services.mobile.title')}</a></li>
            <li><a href="#cloud">{t('services.cloud.title')}</a></li>
            <li><a href="#ai">{t('services.ai.title')}</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.contact')}</h3>
          <p>{t('footer.address')}</p>
          <p>Email: info@transformattion.com</p>
          <p>Tel: +1 234 567 890</p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Transformattion. {t('footer.rights')}</p>
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer; 