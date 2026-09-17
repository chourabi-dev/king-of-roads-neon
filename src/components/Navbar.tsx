import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguageStore } from "@/store/languageStore";
import logo from "@/assets/logo-kor.png.asset.json";

const NavItem = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-foreground" : "text-muted-foreground"}`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { t, lang, setLang } = useLanguageStore();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo.url} alt="King of Roads" className="h-14 w-auto transition-transform duration-300 hover:rotate-3 hover:scale-105" />
          <span className="hidden font-display text-sm font-bold uppercase tracking-normal text-foreground sm:block">
            KING OF ROADS
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavItem to="/">{t.nav.home}</NavItem>
          <NavItem to="/shop">{t.nav.shop}</NavItem>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            {lang.toUpperCase()}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
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
              <NavItem to="/" onClick={() => setMobileOpen(false)}>{t.nav.home}</NavItem>
              <NavItem to="/shop" onClick={() => setMobileOpen(false)}>{t.nav.shop}</NavItem>
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
