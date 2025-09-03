import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.exhibitions': 'Exhibitions',
    'nav.media': 'Media',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Shakart',
    'hero.subtitle': 'Contemporary Artist & Visual Storyteller',
    'hero.description': 'Exploring the boundaries between traditional and modern art through bold expressions and innovative techniques.',
    'hero.explore': 'Explore Gallery',
    'hero.about': 'About the Artist',
    
    // About Section
    'about.title': 'About Shakart',
    'about.subtitle': 'Contemporary Artist & Visual Storyteller',
    'about.bio': 'Shakart is a contemporary artist whose work explores the intersection of traditional techniques and modern expression. With a background in fine arts and a passion for experimental media, Shakart creates pieces that challenge conventional boundaries and invite viewers to see the world through a different lens.',
    'about.education': 'Education',
    'about.education.degree': 'Master of Fine Arts',
    'about.education.school': 'National Academy of Arts',
    'about.education.year': '2018',
    'about.recognition': 'Recognition',
    'about.recognition.award': 'Contemporary Art Prize',
    'about.recognition.year': '2022',
    
    // Featured Gallery
    'gallery.title': 'Featured Artworks',
    'gallery.subtitle': 'A curated selection of recent works',
    'gallery.viewAll': 'View All Artworks',
    
    // Exhibitions Section
    'exhibitions.title': 'Recent Exhibitions',
    'exhibitions.subtitle': 'Selected shows and presentations',
    'exhibitions.viewAll': 'View All Exhibitions',
    
    // Contact Section
    'contact.title': "Let's Connect",
    'contact.subtitle': 'Ready to discuss a project or learn more about my work?',
    'contact.email': 'Email Me Directly',
    'contact.call': 'Call Me Now',
    'contact.info': 'Contact Information',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Follow My Work',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error loading content',
    'common.backHome': 'Back to Home',
  },
  am: {
    // Navigation
    'nav.home': 'Գլխավոր',
    'nav.about': 'Մասին',
    'nav.gallery': 'Պատկերասրահ',
    'nav.exhibitions': 'Ցուցահանդեսներ',
    'nav.media': 'Մեդիա',
    'nav.contact': 'Կապ',
    'nav.admin': 'Ադմին',
    
    // Hero Section
    'hero.title': 'Շակարտ',
    'hero.subtitle': 'Ժամանակակից Նկարիչ և Տեսողական Պատմաբան',
    'hero.description': 'Ուսումնասիրելով ավանդական և ժամանակակից արվեստի սահմանները՝ հաստատակամ արտահայտությունների և նորարարական տեխնիկաների միջոցով:',
    'hero.explore': 'Դիտել Պատկերասրահը',
    'hero.about': 'Նկարչի Մասին',
    
    // About Section
    'about.title': 'Շակարտի Մասին',
    'about.subtitle': 'Ժամանակակից Նկարիչ և Տեսողական Պատմաբան',
    'about.bio': 'Շակարտը ժամանակակից նկարիչ է, որի աշխատանքները ուսումնասիրում են ավանդական տեխնիկաների և ժամանակակից արտահայտության հատման կետը: Գեղարվեստական կրթության և փորձարարական մեդիայի նկատմամբ կիրքի հետ՝ Շակարտը ստեղծում է ստեղծագործություններ, որոնք մարտահրավեր են նետում ավանդական սահմաններին:',
    'about.education': 'Կրթություն',
    'about.education.degree': 'Գեղարվեստական Գիտությունների Մագիստրոս',
    'about.education.school': 'Ազգային Արվեստի Ակադեմիա',
    'about.education.year': '2018',
    'about.recognition': 'Ճանաչում',
    'about.recognition.award': 'Ժամանակակից Արվեստի Մրցանակ',
    'about.recognition.year': '2022',
    
    // Featured Gallery
    'gallery.title': 'Ընտրված Ստեղծագործություններ',
    'gallery.subtitle': 'Վերջին աշխատանքների ընտրանի',
    'gallery.viewAll': 'Դիտել Բոլոր Ստեղծագործությունները',
    
    // Exhibitions Section
    'exhibitions.title': 'Վերջին Ցուցահանդեսներ',
    'exhibitions.subtitle': 'Ընտրված ցուցադրություններ և ներկայություններ',
    'exhibitions.viewAll': 'Դիտել Բոլոր Ցուցահանդեսները',
    
    // Contact Section
    'contact.title': 'Եկեք Կապվենք',
    'contact.subtitle': 'Պատրա՞ստ եք քննարկել նախագիծ կամ իմանալ իմ աշխատանքի մասին:',
    'contact.email': 'Գրել Իմեյլ',
    'contact.call': 'Զանգահարել',
    'contact.info': 'Կապի Տվյալներ',
    'contact.phone': 'Հեռախոս',
    'contact.location': 'Գտնվելու Վայր',
    'contact.social': 'Հետևել Իմ Աշխատանքին',
    
    // Common
    'common.loading': 'Բեռնվում է...',
    'common.error': 'Բովանդակության բեռնման սխալ',
    'common.backHome': 'Վերադառնալ Գլխավոր',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.gallery': 'Галерея',
    'nav.exhibitions': 'Выставки',
    'nav.media': 'Медиа',
    'nav.contact': 'Контакты',
    'nav.admin': 'Админ',
    
    // Hero Section
    'hero.title': 'Шакарт',
    'hero.subtitle': 'Современный Художник и Визуальный Рассказчик',
    'hero.description': 'Исследуя границы между традиционным и современным искусством через смелые выражения и инновационные техники.',
    'hero.explore': 'Смотреть Галерею',
    'hero.about': 'О Художнике',
    
    // About Section
    'about.title': 'О Шакарте',
    'about.subtitle': 'Современный Художник и Визуальный Рассказчик',
    'about.bio': 'Шакарт - современный художник, чьи работы исследуют пересечение традиционных техник и современного выражения. С образованием в области изобразительного искусства и страстью к экспериментальным медиа, Шакарт создает произведения, которые бросают вызов обычным границам.',
    'about.education': 'Образование',
    'about.education.degree': 'Магистр Изобразительных Искусств',
    'about.education.school': 'Национальная Академия Искусств',
    'about.education.year': '2018',
    'about.recognition': 'Признание',
    'about.recognition.award': 'Премия Современного Искусства',
    'about.recognition.year': '2022',
    
    // Featured Gallery
    'gallery.title': 'Избранные Произведения',
    'gallery.subtitle': 'Курированная подборка недавних работ',
    'gallery.viewAll': 'Смотреть Все Произведения',
    
    // Exhibitions Section
    'exhibitions.title': 'Недавние Выставки',
    'exhibitions.subtitle': 'Избранные показы и презентации',
    'exhibitions.viewAll': 'Смотреть Все Выставки',
    
    // Contact Section
    'contact.title': 'Давайте Свяжемся',
    'contact.subtitle': 'Готовы обсудить проект или узнать больше о моей работе?',
    'contact.email': 'Написать Email',
    'contact.call': 'Позвонить',
    'contact.info': 'Контактная Информация',
    'contact.phone': 'Телефон',
    'contact.location': 'Местоположение',
    'contact.social': 'Следить за Моей Работой',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка загрузки контента',
    'common.backHome': 'Вернуться на Главную',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};