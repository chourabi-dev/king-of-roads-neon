import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <img src={logo} alt="King of Roads" className="h-24 w-auto opacity-50" />
      <h1 className="mt-6 font-display text-7xl font-extrabold text-primary">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">Page introuvable</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.02]"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
