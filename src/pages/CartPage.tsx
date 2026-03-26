import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { t } = useLanguageStore();
  const { toast } = useToast();

  const handleRemove = (productId: string, size: string, name: string) => {
    removeItem(productId, size);
    toast({ title: t.toast.removed, description: name });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold tracking-wider text-primary neon-glow-pink">
          {t.cart.title}
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">{t.cart.empty}</p>
            <Link
              to="/shop"
              className="mt-4 rounded-lg border border-primary bg-primary/10 px-6 py-3 font-display text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground neon-box-pink"
            >
              {t.nav.shop}
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-md object-cover"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Taille: {item.size}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {item.product.price.toFixed(2)} €
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                    className="rounded border border-border p-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    className="rounded border border-border p-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.product.id, item.size, item.product.name)}
                  className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}

            {/* Total */}
            <div className="mt-8 flex items-center justify-between rounded-lg border border-primary/30 bg-card p-6">
              <span className="font-display text-lg font-bold text-foreground">{t.cart.total}</span>
              <span className="font-display text-2xl font-bold text-primary neon-glow-pink">
                {totalPrice().toFixed(2)} €
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-4 block w-full rounded-lg border border-primary bg-primary/10 py-4 text-center font-display text-sm uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground neon-box-pink"
            >
              {t.cart.checkout}
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
