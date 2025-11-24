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

// Helper function to check if an item has a title in a specific language
export const hasTranslation = <T extends Record<string, any>>(
  item: T,
  fieldName: keyof T,
  language: Language
): boolean => {
  // For English, check the base field
  if (language === 'en') {
    const value = item[fieldName] as string;
    return !!value && value.trim().length > 0;
  }

  // For other languages, check the language-specific field
  const langField = `${String(fieldName)}_${language}` as keyof T;
  const value = item[langField] as string;
  return !!value && value.trim().length > 0;
};

// Filter items that have a title in the specified language
export const filterByLanguage = <T extends Record<string, any>>(
  items: T[],
  language: Language
): T[] => {
  return items.filter(item => hasTranslation(item, 'title', language));
};
