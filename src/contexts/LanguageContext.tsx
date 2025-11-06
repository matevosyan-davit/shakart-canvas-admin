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
    'gallery.featuredWorks': 'Featured Works',
    'gallery.featuredDescription': 'A curated selection of recent paintings that showcase my artistic journey and evolving vision, each piece telling its own story through color, texture, and emotion.',
    'gallery.noFeaturedArtworks': 'No featured artworks yet. Add some through the admin panel!',
    'gallery.viewCompleteGallery': 'View Complete Gallery',

    // Exhibitions Section
    'exhibitions.title': 'Recent Exhibitions',
    'exhibitions.subtitle': 'Selected shows and presentations',
    'exhibitions.viewAll': 'View All Exhibitions',

    // Contact Section
    'contact.title': "Let's Connect",
    'contact.subtitle': 'Ready to discuss a project or learn more about my work?',
    'contact.hero.description': 'Ready to discuss your vision? I\'d love to hear about your project and explore how we can bring your ideas to life through art.',
    'contact.email': 'Email Me Directly',
    'contact.call': 'Call Me Now',
    'contact.info': 'Get in Touch',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Follow My Work',
    'contact.socialDescription': 'Stay updated with my latest artworks, exhibitions, and creative process.',
    'contact.emailLabel': 'Email',

    // Gallery Page
    'gallery.page.title': 'Gallery',
    'gallery.page.description': 'Explore my artistic journey through paintings, sculptures, and street art. Each piece tells a story of emotion, technique, and creative expression.',
    'gallery.paintings': 'Paintings',
    'gallery.sculpture': 'Sculpture',
    'gallery.streetart': 'Street Art',
    'gallery.noArtworks': 'No artworks in this category yet.',
    'gallery.loadingArtworks': 'Loading artworks...',
    'gallery.priceOnRequest': 'Price on request',
    'gallery.noDescription': 'No description available.',
    'gallery.sold': 'Sold',
    'gallery.dimensions': 'Dimensions',
    'gallery.cm': 'cm',

    // Exhibitions Page
    'exhibitions.page.title': 'Exhibitions',
    'exhibitions.page.description': 'A journey through major exhibitions that have shaped my artistic career, featuring highlights from shows in Armenia and around the world.',
    'exhibitions.loadingExhibitions': 'Loading exhibitions...',
    'exhibitions.noExhibitions': 'No exhibitions found.',
    'exhibitions.theme': 'Theme',
    'exhibitions.mediaCoverage': 'Media Coverage',
    'exhibitions.exhibitionHighlights': 'Exhibition Highlights',
    'exhibitions.inquiries': 'Exhibition Inquiries',
    'exhibitions.inquiriesText': 'Interested in featuring my work in your gallery or collaborating on an exhibition? I\'m always open to discussing new opportunities and artistic partnerships.',
    'exhibitions.getInTouch': 'Get in Touch',
    'exhibitions.readArticle': 'Read Article',

    // Media Page
    'media.page.title': 'Media & Interviews',
    'media.page.description': 'Interviews and media coverage exploring my artistic journey and contributions to contemporary art.',
    'media.loadingMedia': 'Loading media...',
    'media.noMedia': 'No media content available at the moment.',
    'media.interview': 'Interview',
    'media.mediaLabel': 'Media',
    'media.articleLink': 'Article Link',
    'media.loadingPreview': 'Loading preview...',
    'media.readArticle': 'Read Article',

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
    'hero.subtitle': 'Հայ ժամանակակից նկարիչ',
    'hero.description': 'Ուսումնասիրելով ավանդական և ժամանակակից արվեստի սահմանները',
    'hero.explore': 'Դիտել Պատկերասրահը',
    'hero.about': 'Նկարչի Մասին',

    // About Section
    'about.title': 'Շակարտի Մասին',
    'about.subtitle': 'Հայ ժամանակակից նկարիչ',
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
    'gallery.featuredWorks': 'Ընտրված Աշխատանքներ',
    'gallery.featuredDescription': 'Վերջին նկարների ընտրանի, որոնք ցուցադրում են իմ գեղարվեստական ճանապարհորդությունը և զարգացող տեսլականը, յուրաքանչյուր ստեղծագործություն պատմում է իր պատմությունը գույների, հյուսվածքի և հույզերի միջոցով:',
    'gallery.noFeaturedArtworks': 'Ընտրված ստեղծագործություններ դեռ չկան: Ավելացրեք դրանք ադմինիստրատորի վահանակի միջոցով:',
    'gallery.viewCompleteGallery': 'Դիտել Ամբողջական Պատկերասրահը',

    // Exhibitions Section
    'exhibitions.title': 'Վերջին Ցուցահանդեսներ',
    'exhibitions.subtitle': 'Ընտրված ցուցադրություններ և ներկայություններ',
    'exhibitions.viewAll': 'Դիտել Բոլոր Ցուցահանդեսները',

    // Contact Section
    'contact.title': 'Կապ ինձ հետ',
    'contact.subtitle': 'Համագործակցության և նկարներ ձեռք բերելու համար։',
    'contact.hero.description': 'Պատրա՞ստ եք քննարկել ձեր տեսլականը: Ես կցանկանայի լսել ձեր նախագծի մասին և ուսումնասիրել, թե ինչպես կարող ենք ձեր գաղափարները կյանքի կոչել արվեստի միջոցով:',
    'contact.email': 'Էլ։ հասցե',
    'contact.call': 'Զանգահարել',
    'contact.info': 'Կապ Հաստատել',
    'contact.phone': 'Հեռախոս',
    'contact.location': 'Գտնվելու Վայր',
    'contact.social': 'Հետևել սոցիալական ցանցերում',
    'contact.socialDescription': 'Տեղեկացեք իմ վերջին ստեղծագործությունների, ցուցահանդեսների և ստեղծագործական գործընթացի մասին:',
    'contact.emailLabel': 'Էլ. Փոստ',

    // Gallery Page
    'gallery.page.title': 'Պատկերասրահ',
    'gallery.page.description': 'Ուսումնասիրեք իմ գեղարվեստական ճանապարհորդությունը կտավների, քանդակների և մուրալ արվեստի միջոցով:',
    'gallery.paintings': 'Նկարներ',
    'gallery.sculpture': 'Քանդակներ',
    'gallery.streetart': 'Փողոցային Արվեստ',
    'gallery.noArtworks': 'Այս կատեգորիայում դեռ ստեղծագործություններ չկան:',
    'gallery.loadingArtworks': 'Բեռնվում են ստեղծագործությունները...',
    'gallery.priceOnRequest': 'Գինը՝ ըստ պահանջի',
    'gallery.noDescription': 'Նկարագրությունը հասանելի չէ:',
    'gallery.sold': 'Վաճառված է',
    'gallery.dimensions': 'Չափսեր',
    'gallery.cm': 'սմ',

    // Exhibitions Page
    'exhibitions.page.title': 'Ցուցահանդեսներ',
    'exhibitions.page.description': 'Ցուցահանդեսը իմ գեղարվեստական ճամփորդությունը ներկայացնելու ձևերից մեկն է։ Այստեղ ներկայացված են միայն անհատական ցուցահանդեսները։',
    'exhibitions.loadingExhibitions': 'Բեռնվում են ցուցահանդեսները...',
    'exhibitions.noExhibitions': 'Ցուցահանդեսներ չեն գտնվել:',
    'exhibitions.theme': 'Թեմա',
    'exhibitions.mediaCoverage': 'Լրատվամիջոցներում',
    'exhibitions.exhibitionHighlights': 'Գլխավոր իրադարձությունները',
    'exhibitions.inquiries': 'Ցուցահանդեսների Վերաբերյալ Հարցումներ',
    'exhibitions.inquiriesText': 'Հետաքրքրված եք ցուցադրել իմ աշխատանքները ձեր պատկերասրահում կամ համագործակցել ցուցահանդեսի վերաբերյալ: Միշտ պատրաստ եմ քննարկել նոր հնարավորություններ և գեղարվեստական համագործակցություններ:',
    'exhibitions.getInTouch': 'Կապվել',
    'exhibitions.readArticle': 'Կարդալ Հոդվածը',

    // Media Page
    'media.page.title': 'Մեդիա և հարցազրույցներ',
    'media.page.description': '',
    'media.loadingMedia': 'Բեռնվում է մեդիան...',
    'media.noMedia': 'Այս պահին մեդիա բովանդակություն հասանելի չէ:',
    'media.interview': 'Հարցազրույց',
    'media.mediaLabel': 'Մեդիա',
    'media.articleLink': 'Հոդվածի Հղում',
    'media.loadingPreview': 'Բեռնվում է նախադիտումը...',
    'media.readArticle': 'Կարդալ Հոդվածը',

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
    'gallery.featuredWorks': 'Избранные Работы',
    'gallery.featuredDescription': 'Курированная подборка недавних картин, демонстрирующих мое художественное путешествие и развивающееся видение, каждая работа рассказывает свою историю через цвет, текстуру и эмоции.',
    'gallery.noFeaturedArtworks': 'Избранных работ пока нет. Добавьте их через панель администратора!',
    'gallery.viewCompleteGallery': 'Смотреть Полную Галерею',

    // Exhibitions Section
    'exhibitions.title': 'Недавние Выставки',
    'exhibitions.subtitle': 'Избранные показы и презентации',
    'exhibitions.viewAll': 'Смотреть Все Выставки',

    // Contact Section
    'contact.title': 'Давайте Свяжемся',
    'contact.subtitle': 'Готовы обсудить проект или узнать больше о моей работе?',
    'contact.hero.description': 'Готовы обсудить ваше видение? Я хотел бы услышать о вашем проекте и изучить, как мы можем воплотить ваши идеи в жизнь через искусство.',
    'contact.email': 'Написать Email',
    'contact.call': 'Позвонить Сейчас',
    'contact.info': 'Связаться',
    'contact.phone': 'Телефон',
    'contact.location': 'Местоположение',
    'contact.social': 'Следить за Моей Работой',
    'contact.socialDescription': 'Будьте в курсе моих последних работ, выставок и творческого процесса.',
    'contact.emailLabel': 'Email',

    // Gallery Page
    'gallery.page.title': 'Галерея',
    'gallery.page.description': 'Исследуйте мое художественное путешествие через картины, скульптуры и уличное искусство. Каждое произведение рассказывает историю эмоций, техники и творческого самовыражения.',
    'gallery.paintings': 'Картины',
    'gallery.sculpture': 'Скульптура',
    'gallery.streetart': 'Уличное Искусство',
    'gallery.noArtworks': 'В этой категории пока нет произведений.',
    'gallery.loadingArtworks': 'Загрузка произведений...',
    'gallery.priceOnRequest': 'Цена по запросу',
    'gallery.noDescription': 'Описание недоступно.',
    'gallery.sold': 'Продано',
    'gallery.dimensions': 'Размеры',
    'gallery.cm': 'см',

    // Exhibitions Page
    'exhibitions.page.title': 'Выставки',
    'exhibitions.page.description': 'Путешествие по крупным выставкам, сформировавшим мою художественную карьеру, включая основные моменты шоу в Армении и по всему миру.',
    'exhibitions.loadingExhibitions': 'Загрузка выставок...',
    'exhibitions.noExhibitions': 'Выставки не найдены.',
    'exhibitions.theme': 'Тема',
    'exhibitions.mediaCoverage': 'Освещение в СМИ',
    'exhibitions.exhibitionHighlights': 'Основные Моменты Выставки',
    'exhibitions.inquiries': 'Запросы о Выставках',
    'exhibitions.inquiriesText': 'Заинтересованы в демонстрации моих работ в вашей галерее или сотрудничестве на выставке? Я всегда открыт к обсуждению новых возможностей и художественного партнерства.',
    'exhibitions.getInTouch': 'Связаться',
    'exhibitions.readArticle': 'Читать Статью',

    // Media Page
    'media.page.title': 'Медиа и Интервью',
    'media.page.description': 'Интервью и освещение в СМИ, исследующие мое художественное путешествие и вклад в современное искусство.',
    'media.loadingMedia': 'Загрузка медиа...',
    'media.noMedia': 'Медиа контент пока недоступен.',
    'media.interview': 'Интервью',
    'media.mediaLabel': 'СМИ',
    'media.articleLink': 'Ссылка на Статью',
    'media.loadingPreview': 'Загрузка предпросмотра...',
    'media.readArticle': 'Читать Статью',

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
