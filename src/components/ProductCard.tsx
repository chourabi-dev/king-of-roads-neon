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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="overflow-hidden rounded-2xl bg-muted transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display text-sm font-semibold text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-base font-bold text-primary">
              {product.price.toFixed(2)} €
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
