const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="font-display text-sm font-semibold tracking-tight text-foreground">
          KING OF ROADS
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          © {new Date().getFullYear()} King of Roads. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
