import { Language } from '@/contexts/LanguageContext';

// Utility function to get the appropriate text based on current language
export const getLocalizedText = (
  item: any,
  field: string,
  currentLanguage: Language,
  fallbackLanguage: Language = 'en'
): string => {
  if (currentLanguage === 'en') {
    return item[field] || '';
  }
  
  // Try to get the localized version
  const localizedField = `${field}_${currentLanguage}`;
  const localizedValue = item[localizedField];
  
  // If localized version exists and is not empty, return it
  if (localizedValue && localizedValue.trim()) {
    return localizedValue;
  }
  
  // Fall back to English version
  return item[field] || '';
};