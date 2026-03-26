const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="font-display text-sm tracking-widest text-primary neon-glow-pink">
          KING OF ROADS
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} King of Roads. Miami vibes since '95.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
