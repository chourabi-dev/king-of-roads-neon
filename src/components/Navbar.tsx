import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const { t, lang, setLang } = useLanguageStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          KING OF ROADS
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.home}
          </Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.shop}
          </Link>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            {lang.toUpperCase()}
          </button>
          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative text-muted-foreground">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                {t.nav.home}
              </Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                {t.nav.shop}
              </Link>
              <button
                onClick={() => { setLang(lang === "fr" ? "en" : "fr"); setMobileOpen(false); }}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
                {lang === "fr" ? "English" : "Français"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
