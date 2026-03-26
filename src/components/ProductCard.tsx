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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:neon-box-pink">
          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-lg font-bold text-primary">
              {product.price.toFixed(2)} €
            </p>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-md border border-primary bg-primary/20 px-4 py-2 font-display text-xs uppercase tracking-widest text-primary">
              Voir
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
