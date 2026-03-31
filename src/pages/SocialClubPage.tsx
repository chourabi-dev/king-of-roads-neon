import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";
import { motion } from "framer-motion";

const SocialClubPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <Construction className="h-16 w-16 text-primary" />
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          The Social Club
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Club under construction. Something exclusive is coming soon.
        </p>
        <Link
          to="/"
          className="mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
    <Footer />
  </div>
);

export default SocialClubPage;
