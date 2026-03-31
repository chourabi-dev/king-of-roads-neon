import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, ZoomIn, X } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const imgRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const isMobile = useIsMobile();
  const { t } = useLanguageStore();
  const { toast } = useToast();

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${apiURL}/api/v1/shop/data/product/details/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to load product");
        }

        const data = await res.json();

        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiURL]);

  // ---------------- ZOOM ----------------
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setZoomPos({ x, y });
    },
    []
  );

  // ---------------- ADD TO CART ----------------
  const handleAdd = () => {
    if (!product || !selectedSize) return;

    addItem(product, selectedSize);

    toast({
      title: t.toast.added,
      description: `${product.name} (${selectedSize})`,
    });
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>

        <div className="grid gap-12 md:grid-cols-2">
          {/* ---------------- IMAGE GALLERY ---------------- */}
          <div className="relative">
            {/* MAIN IMAGE */}
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`relative overflow-hidden rounded-2xl bg-muted ${
                zoomEnabled && !isMobile ? "cursor-zoom-in" : ""
              }`}
              onMouseEnter={() => zoomEnabled && !isMobile && setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={zoomEnabled && !isMobile ? handleMouseMove : undefined}
            >
              <img
                src={product.images?.[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />
            </motion.div>

            {/* ZOOM BUTTON */}
            {!isMobile && (
              <button
                onClick={() => {
                  setZoomEnabled((v) => !v);
                  setIsZoomed(false);
                }}
                className="absolute top-3 right-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-sm hover:text-foreground"
              >
                {zoomEnabled ? (
                  <X className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </button>
            )}

            {/* THUMBNAILS */}
            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${index}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------------- DETAILS ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-3 text-3xl font-bold text-primary">
              {product.price?.toFixed(2)} TND
            </p>

            <p
              className="mt-6 leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
            />

            {/* SIZES */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-foreground">
                {t.products.sizes}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="mt-10 flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              <ShoppingBag className="h-5 w-5" />
              {!selectedSize
                ? t.products.selectSize
                : t.products.addToCart}
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;