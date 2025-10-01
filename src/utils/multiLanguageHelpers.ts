import { Language } from '@/contexts/LanguageContext';

// Helper function to get language-specific value from database objects
export const getTranslatedField = <T extends Record<string, any>>(
  item: T,
  fieldName: keyof T,
  language: Language
): string => {
  // For English, return the base field
  if (language === 'en') {
    return (item[fieldName] as string) || '';
  }

  // For other languages, try language-specific field first, fallback to English
  const langField = `${String(fieldName)}_${language}` as keyof T;
  return (item[langField] as string) || (item[fieldName] as string) || '';
};
