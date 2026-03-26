import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50 py-10">
      <div className="container mx-auto px-4 text-center">
        <img src={logo} alt="King of Roads" className="mx-auto h-10 w-auto" />
        <p className="mt-3 font-display text-sm font-semibold tracking-tight text-foreground">
          KING OF ROADS — FULL SEND
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          © {new Date().getFullYear()} King of Roads. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
