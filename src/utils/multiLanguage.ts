import { Language } from '@/contexts/LanguageContext';

// Utility function to get the appropriate text based on current language
export const getLocalizedText = (
  item: any,
  field: string,
  currentLanguage: Language,
  fallbackLanguage: Language = 'en'
): string => {
  console.log('Getting localized text for field:', field, 'language:', currentLanguage, 'from item:', item);
  
  if (currentLanguage === 'en') {
    const result = item[field] || '';
    console.log('English result:', result);
    return result;
  }
  
  // Try to get the localized version
  const localizedField = `${field}_${currentLanguage}`;
  const localizedValue = item[localizedField];
  
  console.log('Localized field:', localizedField, 'value:', localizedValue);
  
  // If localized version exists and is not empty, return it
  if (localizedValue && localizedValue.trim()) {
    console.log('Using localized value:', localizedValue);
    return localizedValue;
  }
  
  // Fall back to English version
  const fallback = item[field] || '';
  console.log('Falling back to English:', fallback);
  return fallback;
};