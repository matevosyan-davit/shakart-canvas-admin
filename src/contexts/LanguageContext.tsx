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
    'hero.subtitle': 'Armenian Contemporary Artist',
    'hero.description': 'Exploring the boundaries of traditional and contemporary art',
    'hero.explore': 'View Gallery',
    'hero.about': 'About the Artist',

    // About Section
    'about.title': 'About Shakart',
    'about.subtitle': 'Contemporary Artist & Physician',
    'about.bio': 'I am Shakart (Shant Karapetyan) - an artist and a physician.\n\nBorn on October 10, 1994, in Yerevan. Since childhood, two equally powerful worlds have coexisted for me - the world of science and the world of art. One taught me to understand life by analyzing it, the other - to feel it without explanation. My creative and human path runs between these two.\n\nI graduated from Yerevan State Medical University named after Mkhitar Heratsi. Medicine opened up to me the precise structure of the human body, the logic of movements, the perfect harmony of forms. But the deeper I delved into the material, the more I felt that true beauty is hidden in the invisible. Science became the foundation, and art became the path.\n\nI work in the directions of photorealism and classicism, simultaneously introducing elements of dark romanticism, symbolism, and surrealism. For me, color is not just material, but emotional energy. Light and shadow are my language - with them I construct the inner silence of characters.\n\nAt the heart of each of my canvases lies a human story, a psychological state compressed into form and line. Sometimes I paint war without weapons, sometimes a crown without a king. This symbolic language is my way of speaking about what cannot be said in words.\n\nMedical education taught me plastic anatomy - the body\'s structure with the finest detail. But over the years, I realized there is also a psychic anatomy, which I work on as an artist.\n\nFor me, art is philosophy - questioning, experimenting, transforming.\n\nMy art is incurable.',
    'about.bio.short': 'I am Shakart (Shant Karapetyan) - an artist and a physician. Since childhood, two worlds have coexisted for me: science and art. Medicine taught me the precision of the human body, while art became my path to express what cannot be explained. I work in photorealism and classicism, infused with dark romanticism and symbolism. For me, color is emotional energy, and light and shadow are my language. Each canvas tells a human story, a psychological state compressed into form. My art is incurable.',
    'about.education': 'Education',
    'about.education.degree': 'Medical Doctor',
    'about.education.school': 'Yerevan State Medical University named after Mkhitar Heratsi',
    'about.education.year': 'Graduate',
    'about.recognition': 'Artistic Approach',
    'about.recognition.award': 'Photorealism, Classicism, Dark Romanticism',
    'about.recognition.year': 'Symbolism & Surrealism',

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
    'contact.title': 'Contact Me',
    'contact.subtitle': 'For collaboration and purchasing artworks',
    'contact.hero.description': 'Ready to discuss your vision? I would like to hear about your project and explore how we can bring your ideas to life through art.',
    'contact.email': 'Email',
    'contact.call': 'Call',
    'contact.info': 'Get in Touch',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Follow My Work',
    'contact.socialDescription': 'Stay updated with my latest artworks, exhibitions, and creative process.',
    'contact.emailLabel': 'Email',

    // Gallery Page
    'gallery.page.title': 'Gallery',
    'gallery.page.description': 'Explore my artistic journey through canvases, sculptures, and mural art.',
    'gallery.paintings': 'Paintings',
    'gallery.sculpture': 'Sculptures',
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
    'exhibitions.page.description': 'Exhibitions are one of the ways to present my artistic journey. Only solo exhibitions are presented here.',
    'exhibitions.loadingExhibitions': 'Loading exhibitions...',
    'exhibitions.noExhibitions': 'No exhibitions found.',
    'exhibitions.theme': 'Theme',
    'exhibitions.mediaCoverage': 'In the Media',
    'exhibitions.exhibitionHighlights': 'Main Events',
    'exhibitions.inquiries': 'Exhibition Inquiries',
    'exhibitions.inquiriesText': 'Interested in showcasing my work in your gallery or collaborating on an exhibition? I am always ready to discuss new opportunities and artistic collaborations.',
    'exhibitions.getInTouch': 'Contact',
    'exhibitions.readArticle': 'Read Article',

    // Media Page
    'media.page.title': 'Media and Interviews',
    'media.page.description': '',
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
    'about.title': 'Շակարտի մասին',
    'about.subtitle': 'Ժամանակակից Նկարիչ և Բժիշկ',
    'about.bio': 'Ես Շակարտն (Շանթ Կարապետյան) եմ՝ նկարիչ և բժիշկ։\n\nԾնվել եմ 1994 թվականի հոկտեմբերի 10-ին, Երևանում։ Մանկության տարիներից ինձ համար գոյություն ուներ երկու հավասարապես հզոր աշխարհ՝ գիտության և արվեստի աշխարհը։ Մեկը սովորեցնում էր հասկանալ կյանքը՝ վերլուծելով, մյուսը՝ զգալ այն՝ առանց բացատրելու։ Այդ երկուսի միջև անցնում է իմ ստեղծագործական և մարդկային ուղին։\n\nԱվարտել եմ Երևանի Մխիթար Հերացու անվան պետական բժշկական համալսարանը։ Բժշկությունն ինձ բացեց մարդկային մարմնի ճշգրիտ կառուցվածքը, շարժումների տրամաբանությունը, ձևերի կատարյալ ներդաշնակությունը։ Բայց որքան խորանում էի նյութականում, այնքան ավելի էի զգում՝ իրական գեղեցկությունը թաքնված է անտեսանելիի մեջ։ Գիտությունը դարձավ հիմք, իսկ արվեստը՝ ճանապարհ։\n\nԱշխատում եմ ֆոտոռեալիզմի և կլասիցիզմի ուղղություններով՝ միաժամանակ ներմուծելով մութ ռոմանտիզմի, սիմվոլիզմի և սյուրռեալիզմի տարրեր։ Ինձ համար գույնը ոչ թե պարզապես նյութ է, այլ հուզական էներգիա։ Լույսն ու ստվերը իմ լեզուն են․ դրանցով եմ կառուցում կերպարների ներքին լռությունը։\n\nՀամար յուրաքանչյուր կտավի հիմքում կա մի մարդկային պատմություն, մի հոգեբանական վիճակ՝ սեղմված ձևի և գծի մեջ։ Երբեմն նկարում եմ պատերազմ՝ առանց զենքի, երբեմն թագ՝ առանց թագավորի։ Այդ խորհրդանշական լեզուն իմ ձևն է խոսելու այն բանի մասին, ինչ խոսքերով չես ասի։\n\nԲժշկական կրթությունը ինձ սովորեցրել է պլաստիկ անատոմիա՝ մարմնի կառուցվածքի ամենափոքր նրբությամբ։ Բայց տարիների ընթացքում ես հասկացա՝ կա նաև հոգեկան անատոմիա, որի վրա եմ աշխատում որպես նկարիչ։\n\nԻնձ համար արվեստը փիլիսոփայություն է՝ հարցադրում, փորձարկում, փոխակերպում։\n\nԻմ արվեստն անբուժելի է:',
    'about.bio.short': 'Ես Շակարտն (Շանթ Կարապետյան) եմ՝ նկարիչ և բժիշկ։ Մանկությունից ինձ համար գոյություն ուներ երկու աշխարհ՝ գիտությունը և արվեստը։ Բժշկությունը սովորեցրեց մարդկային մարմնի ճշգրտությունը, իսկ արվեստը դարձավ իմ ճանապարհը արտահայտելու այն, ինչ բացատրել չես կարող։ Աշխատում եմ ֆոտոռեալիզմի և կլասիցիզմի ուղղություններով՝ ներմուծելով մութ ռոմանտիզմի և սիմվոլիզմի տարրեր։ Ինձ համար գույնը հուզական էներգիա է, իսկ լույսն ու ստվերը՝ իմ լեզուն։ Յուրաքանչյուր կտավ պատմում է մարդկային պատմություն։ Իմ արվեստն անբուժելի է:',
    'about.education': 'Կրթություն',
    'about.education.degree': 'Բժիշկ',
    'about.education.school': 'Երևանի Մխիթար Հերացու անվան պետական բժշկական համալսարան',
    'about.education.year': 'Շրջանավարտ',
    'about.recognition': 'Գեղարվեստական Ուղղություն',
    'about.recognition.award': 'Ֆոտոռեալիզմ, Կլասիցիզմ, Մութ Ռոմանտիզմ',
    'about.recognition.year': 'Սիմվոլիզմ և Սյուրռեալիզմ',

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
    'hero.subtitle': 'Армянский современный художник',
    'hero.description': 'Исследуя границы традиционного и современного искусства',
    'hero.explore': 'Посмотреть Галерею',
    'hero.about': 'О Художнике',

    // About Section
    'about.title': 'О Шакарте',
    'about.subtitle': 'Современный Художник и Врач',
    'about.bio': 'Я Шакарт (Шант Карапетян) - художник и врач.\n\nРодился 10 октября 1994 года в Ереване. С детства для меня существовало два одинаково мощных мира - мир науки и мир искусства. Один учил понимать жизнь, анализируя её, другой - чувствовать её без объяснений. Мой творческий и человеческий путь проходит между этими двумя мирами.\n\nЯ окончил Ереванский государственный медицинский университет имени Мхитара Гераци. Медицина открыла мне точную структуру человеческого тела, логику движений, совершенную гармонию форм. Но чем глубже я погружался в материальное, тем больше чувствовал, что истинная красота скрыта в невидимом. Наука стала фундаментом, а искусство - путём.\n\nЯ работаю в направлениях фотореализма и классицизма, одновременно внедряя элементы тёмного романтизма, символизма и сюрреализма. Для меня цвет - это не просто материал, а эмоциональная энергия. Свет и тень - мой язык: с их помощью я выстраиваю внутреннюю тишину персонажей.\n\nВ основе каждого моего холста лежит человеческая история, психологическое состояние, сжатое в форму и линию. Иногда я рисую войну без оружия, иногда корону без короля. Этот символический язык - мой способ говорить о том, что словами не выразить.\n\nМедицинское образование научило меня пластической анатомии - структуре тела с мельчайшими деталями. Но за годы я понял, что существует и психическая анатомия, над которой я работаю как художник.\n\nДля меня искусство - это философия: вопрошание, экспериментирование, преобразование.\n\nМоё искусство неизлечимо.',
    'about.bio.short': 'Я Шакарт (Шант Карапетян) - художник и врач. С детства для меня существовало два мира: наука и искусство. Медицина научила меня точности человеческого тела, а искусство стало моим путём выразить то, что невозможно объяснить. Я работаю в фотореализме и классицизме, пропитанных тёмным романтизмом и символизмом. Для меня цвет - это эмоциональная энергия, а свет и тень - мой язык. Каждый холст рассказывает человеческую историю. Моё искусство неизлечимо.',
    'about.education': 'Образование',
    'about.education.degree': 'Врач',
    'about.education.school': 'Ереванский государственный медицинский университет им. Мхитара Гераци',
    'about.education.year': 'Выпускник',
    'about.recognition': 'Художественный Подход',
    'about.recognition.award': 'Фотореализм, Классицизм, Тёмный Романтизм',
    'about.recognition.year': 'Символизм и Сюрреализм',

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
    'contact.title': 'Связаться со мной',
    'contact.subtitle': 'Для сотрудничества и приобретения картин',
    'contact.hero.description': 'Готовы обсудить ваше видение? Я хотел бы услышать о вашем проекте и изучить, как мы можем воплотить ваши идеи в жизнь через искусство.',
    'contact.email': 'Email',
    'contact.call': 'Позвонить',
    'contact.info': 'Связаться',
    'contact.phone': 'Телефон',
    'contact.location': 'Местоположение',
    'contact.social': 'Следить за Моей Работой',
    'contact.socialDescription': 'Будьте в курсе моих последних работ, выставок и творческого процесса.',
    'contact.emailLabel': 'Email',

    // Gallery Page
    'gallery.page.title': 'Галерея',
    'gallery.page.description': 'Исследуйте мое художественное путешествие через холсты, скульптуры и настенное искусство.',
    'gallery.paintings': 'Картины',
    'gallery.sculpture': 'Скульптуры',
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
    'exhibitions.page.description': 'Выставки - один из способов представления моего художественного пути. Здесь представлены только персональные выставки.',
    'exhibitions.loadingExhibitions': 'Загрузка выставок...',
    'exhibitions.noExhibitions': 'Выставки не найдены.',
    'exhibitions.theme': 'Тема',
    'exhibitions.mediaCoverage': 'В СМИ',
    'exhibitions.exhibitionHighlights': 'Главные События',
    'exhibitions.inquiries': 'Запросы Касательно Выставок',
    'exhibitions.inquiriesText': 'Заинтересованы в демонстрации моих работ в вашей галерее или сотрудничестве на выставке? Я всегда готов обсудить новые возможности и художественные сотрудничества.',
    'exhibitions.getInTouch': 'Связаться',
    'exhibitions.readArticle': 'Читать Статью',

    // Media Page
    'media.page.title': 'Медиа и интервью',
    'media.page.description': '',
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
