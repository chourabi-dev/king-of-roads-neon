import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/store/languageStore";

const slides = [
  {
    id: 1,
    image: "/images/product-6.jpg",
    titleFr: "Nouvelle Collection",
    titleEn: "New Collection",
    subtitleFr: "Découvrez nos dernières créations streetwear",
    subtitleEn: "Discover our latest streetwear creations",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/product-2.jpg",
    titleFr: "Hoodies Premium",
    titleEn: "Premium Hoodies",
    subtitleFr: "Confort et style pour chaque saison",
    subtitleEn: "Comfort and style for every season",
    link: "/shop",
  },
  {
    id: 3,
    image: "/images/product-8.jpg",
    titleFr: "Livraison Partout en Tunisie",
    titleEn: "Delivery Across Tunisia",
    subtitleFr: "Recevez vos articles chez vous rapidement",
    subtitleEn: "Get your items delivered fast",
    link: "/shop",
  },
];

const PromoCarousel = () => {
  const { lang } = useLanguageStore();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative mx-auto aspect-[16/11] w-full overflow-hidden border border-border sm:aspect-[21/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={lang === "fr" ? slide.titleFr : slide.titleEn}
            className="h-full w-full object-cover grayscale-[25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-16">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-3xl font-black uppercase text-foreground sm:text-5xl"
              >
                {lang === "fr" ? slide.titleFr : slide.titleEn}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2 text-sm text-muted-foreground sm:text-base max-w-md"
              >
                {lang === "fr" ? slide.subtitleFr : slide.subtitleEn}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={slide.link}
                  className="mt-6 inline-block rounded-sm bg-secondary px-6 py-3 text-sm font-bold uppercase text-secondary-foreground transition-all hover:-translate-y-1"
                >
                  {lang === "fr" ? "Voir plus" : "See more"}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoCarousel;
