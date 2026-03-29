import HeroSection from "@/components/HeroSection";
import PromoCarousel from "@/components/PromoCarousel";
import ProductCard from "@/components/ProductCard";
import WorkflowProcess from "@/components/WorkflowProcess";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useLanguageStore } from "@/store/languageStore";

const Index = () => {
  const { t } = useLanguageStore();
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Promo Carousel */}
      <section className="container mx-auto px-4 py-16">
        <PromoCarousel />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
          {t.products.title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Workflow Process */}
      <WorkflowProcess />

      <Footer />
    </div>
  );
};

export default Index;
