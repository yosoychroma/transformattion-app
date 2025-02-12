import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaYoutube, FaAward, FaHandshake, FaShieldAlt, FaNewspaper } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: 4rem 5% 2rem;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 768px) {
    padding: 3rem 5% 1.5rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1200px) {
    &:first-child {
      grid-column: 1 / -1;
      text-align: center;
      align-items: center;
    }
  }

  @media (max-width: 640px) {
    text-align: center;
    align-items: center;
  }
`;

const Logo = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 400px;
  text-align: center;
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  white-space: nowrap;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.3rem 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }

  @media (max-width: 640px) {
    &:hover {
      transform: none;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.3rem 0;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    min-width: 1.2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: 640px) {
    justify-content: center;
    text-align: center;
  }
`;

const ScheduleItem = styled(ContactItem)`
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: 0.5rem 0;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 0.95rem;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: 768px) {
    margin-top: 3rem;
    padding-top: 1.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const CertificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CertificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const LegalLinks = styled(LinkList)`
  font-size: 0.9rem;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>Transformattion</Logo>
          <Description>{t('footer.description')}</Description>
          <CertificationsList>
            <CertificationItem>
              <FaAward />
              <span>ISO 27001 Certified</span>
            </CertificationItem>
            <CertificationItem>
              <FaHandshake />
              <span>Microsoft Gold Partner</span>
            </CertificationItem>
            <CertificationItem>
              <FaShieldAlt />
              <span>GDPR Compliant</span>
            </CertificationItem>
          </CertificationsList>
          <SocialLinks>
            <SocialIcon 
              href="https://linkedin.com/company/transformattion" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="https://github.com/transformattion" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
            >
              <FaGithub />
            </SocialIcon>
            <SocialIcon 
              href="https://instagram.com/transformattion.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon 
              href="https://youtube.com/@transformattion" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
            >
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>{t('footer.quickLinks.title')}</SectionTitle>
          <LinkList>
            <FooterLink href="#about">{t('footer.quickLinks.about')}</FooterLink>
            <FooterLink href="#services">{t('footer.quickLinks.services')}</FooterLink>
            <FooterLink href="#portfolio">{t('footer.quickLinks.portfolio')}</FooterLink>
            <FooterLink href="#contact">{t('footer.quickLinks.contact')}</FooterLink>
          </LinkList>
          <SectionTitle style={{ marginTop: '1.5rem' }}>Resources</SectionTitle>
          <LinkList>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/case-studies">Case Studies</FooterLink>
            <FooterLink href="/documentation">Documentation</FooterLink>
            <FooterLink href="/api">API</FooterLink>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>{t('footer.contact')}</SectionTitle>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>{t('footer.address')}</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <a href="mailto:contact@transformattion.com">
                contact@transformattion.com
              </a>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <a href="tel:+12345678901">
                +1 (234) 567-8901
              </a>
            </ContactItem>
            <ContactItem>
              <FaWhatsapp />
              <a href="https://wa.me/12345678901" target="_blank" rel="noopener noreferrer">
                WhatsApp Business
              </a>
            </ContactItem>
          </ContactInfo>
          <SectionTitle style={{ marginTop: '1.5rem' }}>Legal</SectionTitle>
          <LegalLinks>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
            <FooterLink href="/compliance">Compliance</FooterLink>
          </LegalLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Horario de Atención</SectionTitle>
          <ContactInfo>
            <ScheduleItem>
              <span>Lunes a Viernes</span>
              <span>9:00 AM - 6:00 PM</span>
            </ScheduleItem>
            <ScheduleItem>
              <span>Sábados</span>
              <span>9:00 AM - 1:00 PM</span>
            </ScheduleItem>
          </ContactInfo>
          <SectionTitle style={{ marginTop: '1.5rem' }}>Oficinas</SectionTitle>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Silicon Valley, USA</span>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Madrid, España</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} Transformattion. {t('footer.rights')}
          <br />
          <small style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            All trademarks and registered trademarks are the property of their respective owners.
          </small>
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 