import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/store/languageStore";

const ShopPage = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLanguageStore();

  useEffect(() => {
    fetchShopData();
  }, []);

  async function fetchShopData() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${apiURL}/api/v1/shop/data`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setCategories(data.categories || []);
      setProducts(data.products || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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

        {/* ✅ LOADING */}
        {loading && (
          <div className="mt-10 text-center text-muted-foreground">
            Loading products...
          </div>
        )}

        {/* ❌ ERROR */}
        {error && !loading && (
          <div className="mt-10 text-center text-red-500">
            {error}
          </div>
        )}

        {/* ✅ CONTENT */}
        {!loading && !error && (
          <>
            {/* Categories */}
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
                  {cat}
                </button>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="mt-10 text-center text-muted-foreground">
                No products found.
              </div>
            )}

            {/* Products */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;