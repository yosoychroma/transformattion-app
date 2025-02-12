const lightTheme = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    tertiary: '#A78BFA',
    accent: '#C4B5FD',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#60A5FA',
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
      light: '#6B7280',
      inverse: '#F9FAFB'
    },
    background: {
      primary: '#F9FAFB',
      secondary: '#F3F4F6',
      tertiary: '#E5E7EB',
      purple: {
        light: '#EDE9FE',
        medium: '#DDD6FE',
        dark: '#C4B5FD'
      },
      gradient: 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)'
    },
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF'
    },
    shadow: {
      sm: '0 2px 4px rgba(139, 92, 246, 0.1)',
      md: '0 4px 6px rgba(139, 92, 246, 0.1), 0 2px 4px rgba(139, 92, 246, 0.06)',
      lg: '0 10px 15px rgba(139, 92, 246, 0.1), 0 4px 6px rgba(139, 92, 246, 0.05)',
      xl: '0 20px 25px rgba(139, 92, 246, 0.1), 0 10px 10px rgba(139, 92, 246, 0.04)'
    }
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  spacing: {
    s: '0.5rem',
    m: '1rem',
    l: '2rem',
    xl: '3rem'
  }
};

const darkTheme = {
  colors: {
    primary: '#A78BFA',
    secondary: '#8B5CF6',
    tertiary: '#C4B5FD',
    accent: '#DDD6FE',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#60A5FA',
    text: {
      primary: '#F3F4F6',
      secondary: '#E5E7EB',
      light: '#D1D5DB',
      inverse: '#111827'
    },
    background: {
      primary: '#111827',
      secondary: '#1F2937',
      tertiary: '#374151',
      purple: {
        light: '#2D2A4A',
        medium: '#312E81',
        dark: '#4C1D95'
      },
      gradient: 'linear-gradient(135deg, #312E81 0%, #4C1D95 100%)'
    },
    border: {
      light: '#374151',
      medium: '#1F2937',
      dark: '#111827'
    },
    shadow: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.5)',
      md: '0 4px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.5)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5)'
    }
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  spacing: {
    s: '0.5rem',
    m: '1rem',
    l: '2rem',
    xl: '3rem'
  },
  components: {
    card: {
      background: '#1F2937',
      borderColor: '#374151',
      hoverBorder: '#A78BFA',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
    },
    button: {
      primary: {
        background: '#A78BFA',
        hover: '#8B5CF6',
        active: '#7C3AED'
      },
      secondary: {
        background: '#2D2A4A',
        hover: '#312E81',
        active: '#4C1D95'
      }
    },
    input: {
      background: '#1F2937',
      border: '#374151',
      focus: '#A78BFA',
      placeholder: '#9CA3AF'
    },
    navbar: {
      background: '#111827',
      border: '#1F2937'
    }
  }
};

const commonStyles = {
  button: {
    primary: {
      background: 'primary',
      color: 'text.inverse',
      hover: 'secondary'
    },
    secondary: {
      background: 'background.purple.light',
      color: 'primary',
      hover: 'background.purple.medium'
    }
  },
  card: {
    background: 'background.primary',
    border: 'border.light',
    shadow: 'shadow.md'
  },
  input: {
    background: 'background.primary',
    border: 'border.medium',
    focus: 'primary'
  }
};

export const getTheme = mode => ({
  ...(mode === 'light' ? lightTheme : darkTheme),
  ...commonStyles,
  mode
}); 