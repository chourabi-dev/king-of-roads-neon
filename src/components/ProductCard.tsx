import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className={`group block ${index % 2 ? "lg:translate-y-6" : ""}`}>
        <div className="overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-secondary/60">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display text-sm font-bold uppercase text-muted-foreground transition-colors group-hover:text-foreground">
              {product.name}
            </h3>
            <p className="mt-2 text-lg font-black text-foreground">
              {product.price.toFixed(3)} <span className="text-xs text-secondary">TND</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
