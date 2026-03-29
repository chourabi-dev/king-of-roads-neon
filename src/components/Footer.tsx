import { Instagram, Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/store/languageStore";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { lang } = useLanguageStore();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="King of Roads" className="h-10 w-auto" />
              <span className="font-display text-base font-bold tracking-tight text-foreground">
                KING OF ROADS
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {lang === "fr"
                ? "Marque streetwear tunisienne inspirée par la route et la liberté. Style unique, qualité premium."
                : "Tunisian streetwear brand inspired by the road and freedom. Unique style, premium quality."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              {lang === "fr" ? "Navigation" : "Navigation"}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {lang === "fr" ? "Accueil" : "Home"}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {lang === "fr" ? "Boutique" : "Shop"}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {lang === "fr" ? "Panier" : "Cart"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +216 93 863 732
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contact@kingofroads.store
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {lang === "fr" ? "Tunisie" : "Tunisia"}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              {lang === "fr" ? "Suivez-nous" : "Follow us"}
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "fr"
                ? "Rejoignez notre communauté sur les réseaux sociaux pour découvrir les nouveautés."
                : "Join our community on social media to discover new drops."}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/kingofroads_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@kingofroads_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} King of Roads. {lang === "fr" ? "Tous droits réservés." : "All rights reserved."} 
          </p>
          <p className="font-display text-xs font-semibold tracking-widest text-muted-foreground">

            <a href="https://www.chourabi-e-business-solutions.com/" target="_blank">
              <img src="https://www.chourabi-e-business-solutions.com/assets/logo-dark-CpmJpX4-.png" width={90} />
          
            </a>
          
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
