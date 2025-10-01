import { Language } from '@/contexts/LanguageContext';

// Get field name based on language
export const getLanguageField = (baseField: string, language: Language): string => {
  if (language === 'en') {
    return baseField;
  }
  return `${baseField}_${language}`;
};

// Get value for specific language from an object
export const getLanguageValue = (
  item: any,
  baseField: string,
  language: Language
): string => {
  const field = getLanguageField(baseField, language);
  return item[field] || '';
};

// Create artwork update object for specific language
export const createArtworkUpdate = (
  data: { title: string; description: string },
  language: Language,
  price: number,
  category: string
) => {
  const update: any = {
    price,
    category,
    language,
  };

  if (language === 'en') {
    update.title = data.title;
    update.description = data.description;
  } else {
    // For non-English languages, store the translation in language-specific field
    // and also store it in the base field as fallback (required by database)
    update.title = data.title;
    update.description = data.description;
    update[`title_${language}`] = data.title;
    update[`description_${language}`] = data.description;
  }

  return update;
};

// Create exhibition update object for specific language
export const createExhibitionUpdate = (
  data: { title: string; location: string; theme: string | null; description: string },
  language: Language,
  date: string
) => {
  console.log('Creating exhibition update for language:', language, 'with data:', data);

  const update: any = {
    date,
    language,
  };

  if (language === 'en') {
    update.title = data.title;
    update.location = data.location;
    update.theme = data.theme;
    update.description = data.description;
  } else {
    // For non-English languages, store the translation in language-specific field
    // and also store it in the base field as fallback (required by database)
    update.title = data.title;
    update.location = data.location;
    update.theme = data.theme;
    update.description = data.description;
    update[`title_${language}`] = data.title;
    update[`location_${language}`] = data.location;
    update[`theme_${language}`] = data.theme;
    update[`description_${language}`] = data.description;
  }

  console.log('Final update object:', update);
  return update;
};

// Create media update object for specific language
export const createMediaUpdate = (
  data: { title: string; media_name: string },
  language: Language,
  embed_link: string
) => {
  const update: any = {
    embed_link,
    language,
  };

  if (language === 'en') {
    update.title = data.title;
    update.media_name = data.media_name;
  } else {
    // For non-English languages, store the translation in language-specific field
    // and also store it in the base field as fallback (required by database)
    update.title = data.title;
    update.media_name = data.media_name;
    update[`title_${language}`] = data.title;
    update[`media_name_${language}`] = data.media_name;
  }

  return update;
};