import { create } from "zustand";
import { Language } from "@/types/product";
import { translations } from "@/data/translations";

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.fr;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "fr",
  t: translations.fr,
  setLang: (lang) => set({ lang, t: translations[lang] }),
}));
