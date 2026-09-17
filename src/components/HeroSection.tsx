import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import logo from "@/assets/logo-kor.png.asset.json";
import hero2 from "@/assets/hero-1.jpg";


import "./style/hero.css";

const HeroSection = () => {
  const { t } = useLanguageStore();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-background pt-20">
      
      {/* Hero Image Background */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${hero2})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto grid items-center gap-8 px-4 py-16 md:grid-cols-[1.1fr_.9fr]">
        <div className="text-left">
        <motion.img
          src={logo.url}
          alt="King of Roads"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-7 h-24 w-auto sm:h-32 md:hidden"
        />

        <motion.h1
          data-text={t.hero.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display text-5xl font-black uppercase leading-[0.92] tracking-normal text-foreground sm:text-7xl lg:text-8xl"
        >
          <span className="text-secondary">THE ULTIMATE</span><br /><span className="text-primary">HOOLIGAN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 max-w-md text-base font-medium leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 rounded-sm bg-highlight px-8 py-4 text-sm font-black uppercase tracking-normal text-highlight-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-foreground"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .86, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8, delay: .2 }} className="relative hidden md:block">
          <div className="absolute inset-12 bg-primary/15 blur-3xl" />
          <img src={logo.url} alt="King of Roads — The Ultimate Hooligan" className="relative mx-auto w-full max-w-[520px] drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;