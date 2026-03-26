import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useLanguageStore();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    toast({ title: t.toast.added, description: `${product.name} (${selectedSize})` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-lg border border-border"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-display text-3xl font-bold tracking-wider text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-3xl font-bold text-primary neon-glow-pink">
              {product.price.toFixed(2)} €
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-foreground">
                {t.products.sizes}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-secondary bg-secondary/20 text-secondary neon-box-cyan"
                        : "border-border text-muted-foreground hover:border-secondary/50 hover:text-secondary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="mt-10 flex items-center justify-center gap-3 rounded-lg border border-primary bg-primary/10 px-8 py-4 font-display text-sm uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground neon-box-pink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary/10 disabled:hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {!selectedSize ? t.products.selectSize : t.products.addToCart}
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
