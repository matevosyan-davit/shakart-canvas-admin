import React from 'react';
import { Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AdminLanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  am: { name: 'Հայերեն', flag: '🇦🇲' },
  ru: { name: 'Русский', flag: '🇷🇺' },
};

export const AdminLanguageSwitcher: React.FC<AdminLanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Editing Language:</h3>
      </div>
      <div className="flex gap-2">
        {Object.entries(languages).map(([code, lang]) => (
          <Button
            key={code}
            variant={currentLanguage === code ? "default" : "outline"}
            onClick={() => onLanguageChange(code as Language)}
            className="flex items-center gap-2 text-sm"
            size="sm"
          >
            <span className="text-lg">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Content will be shown and edited for <strong>{languages[currentLanguage].name}</strong> language
      </p>
    </Card>
  );
};