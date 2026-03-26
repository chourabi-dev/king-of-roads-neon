import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { t } = useLanguageStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle className="mx-auto h-20 w-20 text-secondary" />
          </motion.div>
          <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
            {t.checkout.success}
          </h1>
          <p className="mt-2 text-muted-foreground">{t.checkout.successSub}</p>
          <Link
            to="/"
            className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg"
          >
            {t.checkout.backHome}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          {t.checkout.title}
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              { label: t.checkout.name, key: "name", type: "text" },
              { label: t.checkout.phone, key: "phone", type: "tel" },
              { label: t.checkout.address, key: "address", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t.checkout.notes}
              </label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.01]"
            >
              {t.checkout.submit}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="font-display text-lg font-bold text-foreground">{t.cart.title}</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    {item.product.name} × {item.quantity}{" "}
                    <span className="text-muted-foreground">({item.size})</span>
                  </span>
                  <span className="font-semibold text-foreground">{(item.product.price * item.quantity).toFixed(2)} TND</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-foreground">{t.cart.total}</span>
                <span className="font-display text-xl font-bold text-primary">
                  {totalPrice().toFixed(2)} TND
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
