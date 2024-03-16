import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locals/en.json";
import hiTranslation from "./locals/hi.json";
// Import translations for other languages

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		hi: {
			translation: hiTranslation,
		},
		// Add resources for other languages
	},
	lng: "en", // Default language
	fallbackLng: "en", // Fallback language if translation is missing
	interpolation: {
		escapeValue: false, // React already escapes the string
	},
});

export default i18n;
