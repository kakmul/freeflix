'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/lib/tmdb';

interface LanguageSelectorProps {
  onLanguageChange: (language: LanguageCode) => void;
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en-US');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as LanguageCode;

    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  const handleLanguageChange = (language: LanguageCode) => {
    setSelectedLanguage(language);
    localStorage.setItem('preferred-language', language);
    onLanguageChange(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <span className="text-sm hidden sm:inline-block">
            {SUPPORTED_LANGUAGES[selectedLanguage]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] max-h-[400px] overflow-y-auto">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            className="cursor-pointer"
            onClick={() => handleLanguageChange(code as LanguageCode)}
          >
            <span className={selectedLanguage === code ? 'font-bold' : ''}>
              {name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}