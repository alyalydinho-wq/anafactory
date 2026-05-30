export interface Product {
  id: number;
  name: string;
  price: number;
  badge: "Populaire" | "Fait main" | "Personnalisable" | "Nouveau";
  category: string;
  rating: number;
  salesCount: number;
  icon: string;
  color: string;
  description: string;
  details: string[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizationName?: string;
  customizationDate?: string;
  customizationColor?: string;
}

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  initials: string;
}
