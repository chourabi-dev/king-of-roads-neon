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
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          {t.cart.title}
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground">{t.cart.empty}</p>
            <Link
              to="/shop"
              className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              {t.nav.shop}
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-xl object-cover"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-semibold text-foreground truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Taille: {item.size}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {item.product.price.toFixed(2)} €
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                    className="rounded-lg bg-muted p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    className="rounded-lg bg-muted p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.product.id, item.size, item.product.name)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-muted p-6">
              <span className="font-display text-lg font-bold text-foreground">{t.cart.total}</span>
              <span className="font-display text-2xl font-bold text-primary">
                {totalPrice().toFixed(2)} €
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-4 block w-full rounded-full bg-primary py-4 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.01]"
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
