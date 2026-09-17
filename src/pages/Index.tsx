import { useEffect, useState } from "react";

import HeroSection from "@/components/HeroSection";
import PromoCarousel from "@/components/PromoCarousel";
import ProductCard from "@/components/ProductCard";
import WorkflowProcess from "@/components/WorkflowProcess";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useLanguageStore } from "@/store/languageStore";

const Index = () => {
  const { t } = useLanguageStore();

  const apiURL = import.meta.env.VITE_API_URL;

  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${apiURL}/api/v1/products/featured`);

      if (!res.ok) {
        throw new Error("Failed to load featured products");
      }

      const data = await res.json();

      setFeatured(data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      

      {/** <PromoCarousel />  */}

      {/* Promo Carousel (optional) */}
      {/* <s<<<<<<< HEAD
      {/* Promo Carousel (optional) */}
      {/* <section className="container mx-auto px-4 py-16">
        <PromoCarousel />
      </section> */}

      {/* FEATURED PRODUCTS */}
 
      {/* Promo Carousel 
      <section className="container mx-auto px-4 py-16">
        <PromoCarousel />
      </section>*/}
 
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
          {t.products.title}
        </h2>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 text-center text-muted-foreground">
            Loading featured products...
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="mt-10 text-center text-red-500">
            {error}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && (
          <>
            {featured.length === 0 ? (
              <div className="mt-10 text-center text-muted-foreground">
                No featured products available.
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <WorkflowProcess />



        <Footer />
    </div>
  )
}


export default Index;
