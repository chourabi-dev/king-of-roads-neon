import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import logo from "@/assets/logo.png";

import "./style/hero.css";

const HeroSection = () => {
  const { t } = useLanguageStore();

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-muted/50">
      {/* Soft gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-secondary/5" />

      <div className="relative z-10 text-center px-4">
        <motion.img
          src={logo}
          alt="King of Roads"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto h-36 w-auto sm:h-44 md:h-52 drop-shadow-lg"
        />

<motion.h1
  data-text={t.hero.title}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.15 }}
  className="glitch mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
>
  {t.hero.title}
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 text-base text-muted-foreground sm:text-lg max-w-md mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
