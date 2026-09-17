import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const CartFab = () => {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <Link
            to="/cart"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/50 bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 transition-transform hover:scale-110"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartFab;
