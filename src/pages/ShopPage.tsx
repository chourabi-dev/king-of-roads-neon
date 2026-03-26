import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/store/languageStore";

const categories = ["all", "t-shirts", "hoodies", "streetwear"] as const;

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { t } = useLanguageStore();

  const categoryLabels: Record<string, string> = {
    all: t.products.all,
    "t-shirts": t.products.tshirts,
    hoodies: t.products.hoodies,
    streetwear: t.products.streetwear,
  };

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold tracking-wider text-primary neon-glow-pink sm:text-4xl"
        >
          {t.products.title}
        </motion.h1>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-md border px-4 py-2 font-display text-xs uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "border-primary bg-primary/20 text-primary neon-box-pink"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
