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
          className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t.products.title}
        </motion.h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

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
