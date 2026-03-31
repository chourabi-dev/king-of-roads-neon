import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, Truck } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

const WorkflowProcess = () => {
  const { lang } = useLanguageStore();

  const steps = [
    {
      icon: ShoppingCart,
      titleFr: "Commande",
      titleEn: "Order",
      descFr: "Choisissez vos articles et passez votre commande en ligne facilement.",
      descEn: "Choose your items and place your order online easily.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: CheckCircle,
      titleFr: "Validation",
      titleEn: "Confirmation",
      descFr: "Nous validons votre commande et vous contactons pour confirmer.",
      descEn: "We validate your order and contact you to confirm.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Truck,
      titleFr: "Livraison",
      titleEn: "Delivery",
      descFr: "Votre commande est livrée chez vous. Les frais de livraison sont séparés.",
      descEn: "Your order is delivered to you. Delivery fees are separate.",
      color: "text-accent-foreground",
      bg: "bg-accent",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-center font-display text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
        {lang === "fr" ? "Comment ça marche ?" : "How it works?"}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
        {lang === "fr"
          ? "Un processus simple en 3 étapes pour recevoir vos articles."
          : "A simple 3-step process to receive your items."}
      </p>

      <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Connecting line */}
        <div className="absolute top-12 left-[16.67%] right-[16.67%] hidden h-px bg-border md:block" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="relative flex flex-col items-center text-center"
          >
            <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.bg} relative z-10`}>
              <step.icon className={`h-9 w-9 ${step.color}`} />
            </div>
            <span className="mt-1 text-xs font-bold text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              {lang === "fr" ? step.titleFr : step.titleEn}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {lang === "fr" ? step.descFr : step.descEn}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Delivery fees note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-10 flex max-w-md items-center gap-3 rounded-xl border border-border bg-card p-4"
      >
        <Truck className="h-5 w-5 shrink-0 text-secondary" />
        <p className="text-sm text-muted-foreground">
          {lang === "fr"
            ? "Les frais de livraison sont calculés séparément et ajoutés lors de la validation de votre commande."
            : "Delivery fees are calculated separately and added during order confirmation."}
        </p>
      </motion.div>
    </section>
  );
};

export default WorkflowProcess;
