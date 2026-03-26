import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/languageStore";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLanguageStore();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl font-black tracking-widest text-primary neon-glow-pink sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg text-secondary neon-glow-cyan sm:text-xl md:text-2xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/shop"
            className="inline-block rounded-lg border border-primary bg-primary/10 px-8 py-4 font-display text-sm font-semibold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground neon-box-pink hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.6)]"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
