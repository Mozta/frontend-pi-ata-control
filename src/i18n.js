import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../locales/en/translation.json';
import translationES from '../locales/es/translation.json';
import translationPT from '../locales/pt/translation.json';
import translationJA from '../locales/ja/translation.json';
import translationHI from '../locales/hi/translation.json';

// Configuración de i18next
i18n
    .use(LanguageDetector) // Detecta el idioma del navegador
    .use(initReactI18next) // Enlace con react-i18next
    .init({
        resources: {
            en: {
                translation: translationEN
            },
            es: {
                translation: translationES
            },
            pt: {
                translation: translationPT
            },
            ja: {
                translation: translationJA
            },
            hi: {
                translation: translationHI
            }
        },
        fallbackLng: 'en', // Idioma por defecto
        interpolation: {
            escapeValue: false // React ya se encarga de esto
        }
    });

export default i18n;
