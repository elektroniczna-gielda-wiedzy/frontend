export enum Language {
    pl = 1,
    en = 2,
}

export function stringToLanguage(lang: string): Language {
    switch (lang.toLowerCase()) {
        case 'pl':
            return Language.pl;
        case 'en':
            return Language.en;
    }
    throw new Error(`Unknown language: ${lang}`);
}