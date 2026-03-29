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

  const apiURL = import.meta.env.VITE_API_URL;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        customer: form,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
        })),
        total: totalPrice(),
      };

      const res = await fetch(`${apiURL}/api/v1/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      await res.json();

      clearCart();
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SUCCESS PAGE ----------------
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <CheckCircle className="mx-auto h-20 w-20 text-secondary" />
          </motion.div>

          <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
            {t.checkout.success}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {t.checkout.successSub}
          </p>

          <Link
            to="/"
            className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
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
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t.checkout.title}
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* ---------------- FORM ---------------- */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

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
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3"
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
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {loading ? "Processing..." : t.checkout.submit}
            </button>
          </motion.form>

          {/* ---------------- SUMMARY ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="font-display text-lg font-bold text-foreground">
              {t.cart.title}
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {item.product.name} × {item.quantity} ({item.size})
                  </span>

                  <span className="font-semibold">
                    {(item.product.price * item.quantity).toFixed(2)} TND
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between">
              <span className="font-bold">{t.cart.total}</span>
              <span className="text-xl font-bold text-primary">
                {totalPrice().toFixed(2)} TND
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;