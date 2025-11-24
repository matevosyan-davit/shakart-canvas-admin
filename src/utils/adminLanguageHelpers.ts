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
// STRICT LANGUAGE SEPARATION: Only updates fields for the selected language
export const createArtworkUpdate = (
  data: { title: string; description: string },
  language: Language,
  price: number,
  category: string,
  is_sold: boolean = false,
  dimensions?: { width_cm?: number | null; height_cm?: number | null; depth_cm?: number | null },
  year_painted?: number | null,
  isNewArtwork: boolean = false
) => {
  const update: any = {
    price,
    category,
    language,
    is_sold,
  };

  // Add dimensions if provided
  if (dimensions) {
    if (dimensions.width_cm !== undefined) update.width_cm = dimensions.width_cm;
    if (dimensions.height_cm !== undefined) update.height_cm = dimensions.height_cm;
    if (dimensions.depth_cm !== undefined) update.depth_cm = dimensions.depth_cm;
  }

  // Add year_painted if provided
  if (year_painted !== undefined) {
    update.year_painted = year_painted;
  }

  // STRICT SEPARATION: Only update the fields for the selected language
  if (language === 'en') {
    // English: update base fields only
    update.title = data.title;
    update.description = data.description;
  } else {
    // Other languages: update ONLY language-specific fields
    update[`title_${language}`] = data.title;
    update[`description_${language}`] = data.description;

    // For NEW artworks in non-English languages, we need to provide a placeholder
    // for the required 'title' field (database constraint)
    if (isNewArtwork) {
      update.title = `[${language.toUpperCase()}] ${data.title}`;
      update.description = `[${language.toUpperCase()}] ${data.description}`;
    }
  }

  return update;
};

// Create exhibition update object for specific language
// STRICT LANGUAGE SEPARATION: Only updates fields for the selected language
export const createExhibitionUpdate = (
  data: { title: string; location: string; theme: string | null; description: string },
  language: Language,
  date: string
) => {
  const update: any = {
    date,
    language,
  };

  // STRICT SEPARATION: Only update the fields for the selected language
  if (language === 'en') {
    // English: update base fields only
    update.title = data.title;
    update.location = data.location;
    update.theme = data.theme;
    update.description = data.description;
  } else {
    // Other languages: update ONLY language-specific fields
    update[`title_${language}`] = data.title;
    update[`location_${language}`] = data.location;
    update[`theme_${language}`] = data.theme;
    update[`description_${language}`] = data.description;
  }

  return update;
};

// Create media update object for specific language
// STRICT LANGUAGE SEPARATION: Only updates fields for the selected language
export const createMediaUpdate = (
  data: { title: string; media_name: string },
  language: Language,
  video_url?: string | null,
  article_url?: string | null
) => {
  const update: any = {
    language,
    video_url: video_url || null,
    article_url: article_url || null,
  };

  // STRICT SEPARATION: Only update the fields for the selected language
  if (language === 'en') {
    // English: update base fields only
    update.title = data.title;
    update.media_name = data.media_name;
  } else {
    // Other languages: update ONLY language-specific fields
    update[`title_${language}`] = data.title;
    update[`media_name_${language}`] = data.media_name;
  }

  return update;
};