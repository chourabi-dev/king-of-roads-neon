export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export type Language = "fr" | "en";
