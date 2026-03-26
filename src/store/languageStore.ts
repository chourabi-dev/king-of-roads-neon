import { create } from "zustand";
import { Language } from "@/types/product";
import { translations } from "@/data/translations";

type Translations = typeof translations.fr | typeof translations.en;

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "fr",
  t: translations.fr,
  setLang: (lang) => set({ lang, t: translations[lang] }),
}));
