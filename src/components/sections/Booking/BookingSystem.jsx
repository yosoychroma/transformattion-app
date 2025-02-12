import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const BookingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.colors.shadow.md};
`;

const BookingForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.border.medium};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:focus {
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
    opacity: 0.7;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 2px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.border.medium};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:focus {
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
    opacity: 0.7;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 100px;
  resize: vertical;
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.success};
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledButton = styled(motion.button)`
  padding: 0.8rem 1.2rem;
  background: ${({ theme }) => theme.colors.background.purple.light};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.purple.medium};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  padding-left: 2.8rem;
  border: 2px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.border.medium};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  
  &:focus {
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    background: transparent;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const CalendarIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
`;

const TimeSlot = styled(motion.button)`
  padding: 0.8rem;
  background: ${({ selected, theme }) => 
    selected ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ selected, theme }) => 
    selected ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 2px solid ${({ selected, theme }) => 
    selected ? theme.colors.primary : theme.colors.border.medium};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${({ selected, theme }) => 
      selected 
        ? theme.colors.primary 
        : theme.colors.background.purple.light};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

const TimeSlotPeriod = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: 1rem;
`;

const TimeSlotPeriodTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 4px;
`;

const LabelInfo = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.light};
  margin-left: 8px;
`;

const BookingSystem = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    notes: ''
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = {
    morning: ['09:00', '10:00', '11:00'],
    afternoon: ['14:00', '15:00', '16:00', '17:00']
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = t('booking.errors.nameRequired');
    } else if (formData.name.length < 2) {
      newErrors.name = t('booking.errors.nameLength');
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t('booking.errors.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('booking.errors.emailInvalid');
    }

    // Validación del servicio
    if (!formData.service) {
      newErrors.service = t('booking.errors.serviceRequired');
    }

    // Validación de la fecha
    if (!selectedDate) {
      newErrors.date = t('booking.errors.dateRequired');
    } else {
      const today = new Date();
      const selectedDateObj = new Date(selectedDate);
      if (selectedDateObj < today) {
        newErrors.date = t('booking.errors.datePast');
      }
    }

    // Validación de la hora
    if (!selectedTime) {
      newErrors.time = t('booking.errors.timeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Aquí iría la lógica para enviar los datos al servidor
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de envío
        
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', notes: '' });
        setSelectedDate('');
        setSelectedTime('');
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        setErrors({ submit: t('booking.errors.submitError') });
      }
    }
  };

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <BookingSection id="booking">
      <BookingContainer>
        <h2>{t('booking.title')}</h2>
        
        {isSubmitted && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('booking.success')}
          </SuccessMessage>
        )}

        <BookingForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              {t('booking.name')}
              <RequiredMark>*</RequiredMark>
              <LabelInfo>{t('booking.nameInfo')}</LabelInfo>
            </Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) setErrors({...errors, name: ''});
              }}
              placeholder={t('booking.namePlaceholder')}
              error={errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t('booking.email')}
              <RequiredMark>*</RequiredMark>
              <LabelInfo>{t('booking.emailInfo')}</LabelInfo>
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) setErrors({...errors, email: ''});
              }}
              placeholder={t('booking.emailPlaceholder')}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t('booking.service')}
              <RequiredMark>*</RequiredMark>
            </Label>
            <Select
              value={formData.service}
              onChange={(e) => {
                setFormData({...formData, service: e.target.value});
                if (errors.service) setErrors({...errors, service: ''});
              }}
              error={errors.service}
            >
              <option value="">{t('booking.selectService')}</option>
              {Object.keys(t('services', { returnObjects: true })).map(service => (
                <option key={service} value={service}>
                  {t(`services.${service}.title`)}
                </option>
              ))}
            </Select>
            {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t('booking.date')}
              <RequiredMark>*</RequiredMark>
              <LabelInfo>{t('booking.dateInfo')}</LabelInfo>
            </Label>
            <DatePickerWrapper>
              <CalendarIcon>
                <FaCalendarAlt />
              </CalendarIcon>
              <DateInput
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  if (errors.date) setErrors({...errors, date: ''});
                }}
                min={today}
                error={errors.date}
              />
            </DatePickerWrapper>
            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t('booking.time')}
              <RequiredMark>*</RequiredMark>
              <LabelInfo>{t('booking.timeInfo')}</LabelInfo>
            </Label>
            
            <TimeSlotPeriod>
              <TimeSlotPeriodTitle>{t('booking.timePeriods.morning')}</TimeSlotPeriodTitle>
              <TimeSlotGrid>
                {timeSlots.morning.map(time => (
                  <TimeSlot
                    key={time}
                    selected={selectedTime === time}
                    onClick={() => {
                      setSelectedTime(time);
                      if (errors.time) setErrors({...errors, time: ''});
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedDate}
                  >
                    {time}
                  </TimeSlot>
                ))}
              </TimeSlotGrid>
            </TimeSlotPeriod>

            <TimeSlotPeriod>
              <TimeSlotPeriodTitle>{t('booking.timePeriods.afternoon')}</TimeSlotPeriodTitle>
              <TimeSlotGrid>
                {timeSlots.afternoon.map(time => (
                  <TimeSlot
                    key={time}
                    selected={selectedTime === time}
                    onClick={() => {
                      setSelectedTime(time);
                      if (errors.time) setErrors({...errors, time: ''});
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedDate}
                  >
                    {time}
                  </TimeSlot>
                ))}
              </TimeSlotGrid>
            </TimeSlotPeriod>
            
            {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t('booking.notes')}
              <LabelInfo>{t('booking.notesInfo')}</LabelInfo>
            </Label>
            <TextArea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder={t('booking.notesPlaceholder')}
            />
          </FormGroup>

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitted}
          >
            {t('booking.submit')}
          </SubmitButton>
        </BookingForm>
      </BookingContainer>
    </BookingSection>
  );
};

export default BookingSystem; 