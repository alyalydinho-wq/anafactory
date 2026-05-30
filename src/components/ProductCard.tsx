import React from "react";
import { Product } from "../types";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onQuickView: () => void;
  onAddToCartDirect: () => void;
}

export const ProductSVG: React.FC<{ type: string; className?: string }> = ({ type, className = "w-16 h-16" }) => {
  // Collection of handmade style SVGs
  switch (type) {
    case "gift": // Boîte à dragées
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="35" width="50" height="45" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          <path d="M20 35H80V25C80 22.2 77.8 20 75 20H25C22.2 20 20 22.2 20 25V35Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20V80" stroke="currentColor" strokeWidth="2.5" strokeDasharray="2 2" />
          <path d="M50 20C45 10 30 12 35 20C40 28 50 20 50 20Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 20C55 10 70 12 65 20C60 28 50 20 50 20Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 48C30 48 35 44 42 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 58C30 58 38 54 44 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "sign": // Panneau de bienvenue
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="70" height="50" rx="3" fill="#D2B48C" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          <path d="M30 65L20 90" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M70 65L80 90" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M50 15V8" stroke="currentColor" strokeWidth="2" />
          <path d="M35 15C35 15 42 22 50 22C58 22 65 15 65 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="50" y="38" fill="currentColor" fontSize="8" fontFamily="Georgia" textAnchor="middle" fontStyle="italic">Bienvenue</text>
          <text x="50" y="48" fill="currentColor" fontSize="6" fontFamily="sans-serif" letterSpacing="1" textAnchor="middle">Chloé & Marc</text>
          <path d="M25 55C35 52 65 52 75 55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );
    case "crown": // Cake topper
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M50 40 L50 90" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 40C32 40 40 33 50 45C60 33 68 40 68 40" stroke="currentColor" strokeWidth="2" />
          <text x="50" y="32" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="Georgia" textAnchor="middle">Love</text>
          <path d="M25 45C22 30 12 35 20 48" stroke="currentColor" strokeWidth="1" />
          <path d="M75 45C78 30 88 35 80 48" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "mail": // Faire-part
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="25" width="70" height="50" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M15 25L50 50L85 25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M15 75L40 50" stroke="currentColor" strokeWidth="1.5" />
          <path d="M85 75L60 50" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="48" r="8" fill="#F7F5F2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M48 48C48 45 52 45 52 48C52 51 48 51 48 48Z" fill="currentColor" />
          <path d="M47 52C49 50 51 50 53 52" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "circle": // Marque-place en tranche de bois
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="38" fill="#F4E8C1" fillOpacity="0.4" stroke="#8B5A2B" strokeWidth="4" />
          <circle cx="50" cy="50" r="34" stroke="#8B5A2B" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.5" />
          <circle cx="50" cy="50" r="28" stroke="#8B5A2B" strokeWidth="0.5" strokeDasharray="1 3" strokeOpacity="0.3" />
          <text x="50" y="54" fill="currentColor" fontSize="11" fontFamily="Georgia" fontStyle="italic" textAnchor="middle">Aurélie</text>
          <path d="M28 65C38 68 62 68 72 65" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "flame": // Bougie artisanale
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="28" y="40" width="44" height="45" rx="5" fill="#B5473C" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" />
          <rect x="34" y="50" width="32" height="25" rx="1" fill="white" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="40" x2="50" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 28C54 20 50 12 50 12C50 12 46 20 50 28Z" fill="#C9A96E" stroke="#B5473C" strokeWidth="1" />
          <text x="50" y="65" fill="#1C1C1C" fontSize="5" letterSpacing="0.5" fontWeight="bold" textAnchor="middle">COTTON</text>
        </svg>
      );
    case "star": // Kit déco anniversaire
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 12 L62 38 L90 38 L68 54 L76 82 L50 65 L24 82 L32 54 L10 38 L38 38 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="48" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M30 38C40 30 60 30 70 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "heart": // Magnet coeur
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 40 C12 20, 38 15, 50 35 C62 15, 88 20, 88 40 C88 68, 50 88, 50 88 C50 88, 12 68, 12 40 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
          <text x="50" y="48" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="Georgia" textAnchor="middle">M & A</text>
          <text x="50" y="58" fill="currentColor" fontSize="6" fontFamily="sans-serif" textAnchor="middle">12.09.2026</text>
        </svg>
      );
    case "smile": // Couronne florale
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" strokeOpacity="0.7" />
          {/* Floral Buds */}
          <circle cx="50" cy="15" r="5" fill="#C9A96E" />
          <circle cx="50" cy="85" r="5" fill="#C9A96E" />
          <circle cx="15" cy="50" r="5" fill="#B5473C" />
          <circle cx="85" cy="50" r="5" fill="#B5473C" />
          <path d="M26 26C30 20 40 22 40 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M74 74C70 80 60 78 60 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "book": // Album photo
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="60" height="70" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M28 15V85" stroke="currentColor" strokeWidth="3" />
          <path d="M38 35H68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 43H58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="43" cy="62" r="6" stroke="currentColor" strokeWidth="1" fill="#C9A96E" fillOpacity="0.3" />
        </svg>
      );
    case "pocket": // Sachet organza
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 30L35 85H65L70 30" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
          <path d="M25 30C35 32 65 32 75 30" stroke="currentColor" strokeWidth="2.5" />
          <path d="M35 30C35 30 42 15 50 15C58 15 65 30 65 30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M47 55L50 58L55 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "key": // Porte clés
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="32" width="24" height="52" rx="4" fill="#D2B48C" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="42" r="3" fill="currentColor" />
          <circle cx="50" cy="18" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M50 28V32" stroke="currentColor" strokeWidth="2" />
          <text x="50" y="62" fill="currentColor" fontSize="7" transform="rotate(-90 50 62)" fontWeight="bold" textAnchor="middle">AMOUR</text>
        </svg>
      );
    case "coffee": // Tasse personnalisée
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 30H65V70C65 78.3 58.3 85 50 85H40C31.7 85 25 78.3 25 70V30Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M65 42C74 42 78 48 78 54C78 60 74 66 65 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="55" r="10" fill="#E8D5D3" stroke="currentColor" strokeWidth="1" />
          <path d="M45 50V60" stroke="currentColor" strokeWidth="1" />
          <path d="M40 55H50" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "clipboard": // Carton invitation
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="15" width="50" height="70" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="35" y="10" width="30" height="10" rx="1" fill="#C9A96E" stroke="currentColor" strokeWidth="1.5" />
          <line x1="33" y1="35" x2="67" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="48" x2="67" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="61" x2="55" y2="61" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "image": // Cadre fleur pressée
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="3" fill="none" />
          <rect x="15" y="15" width="70" height="70" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
          {/* Leaf outline */}
          <path d="M50 30 C40 45, 45 65, 50 70 C55 65, 60 45, 50 30" fill="#B5473C" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "scissors": // Ruban personnalisé
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="28" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="10" fill="#F7F5F2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 74 C 40 82, 60 82, 70 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="86" fill="currentColor" fontSize="6" fontWeight="bold" textAnchor="middle">✨ ATELIER ✨</text>
        </svg>
      );
    case "cookie": // Biscuits sablés
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          {/* Small decorative points of a sweet sablé biscuit */}
          <circle cx="50" cy="30" r="2" fill="currentColor" />
          <circle cx="50" cy="70" r="2" fill="currentColor" />
          <circle cx="30" cy="50" r="2" fill="currentColor" />
          <circle cx="70" cy="50" r="2" fill="currentColor" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
          <circle cx="62" cy="38" r="2" fill="currentColor" />
          <circle cx="38" cy="62" r="2" fill="currentColor" />
          <path d="M42 45C42 45 46 41 50 45C54 41 58 45 58 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="50" y="58" fill="currentColor" fontSize="7" fontWeight="black" fontFamily="Georgia" textAnchor="middle">MERCI</text>
        </svg>
      );
    case "book": // Protège Carnet de Santé
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="24" y="20" width="52" height="60" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <path d="M50 20V80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Cute teddy bear head emblem or heart on the cover */}
          <circle cx="37" cy="45" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
          <path d="M37 54C41 54 43 51 43 51" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          {/* Decorative stitching */}
          <rect x="27" y="23" width="46" height="54" rx="2" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1.5" />
          <circle cx="34" cy="42" r="1" fill="currentColor" />
          <circle cx="40" cy="42" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onQuickView,
  onAddToCartDirect
}) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-[16px] p-4 flex flex-col justify-between border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(181,71,60,0.06)] hover:border-ana-pale transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Upper Badges & Heart */}
      <div className="flex justify-between items-center absolute top-4 left-4 right-4 z-10">
        <span className="bg-ana-primary text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm select-none">
          {product.badge.toUpperCase()}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="bg-white/90 backdrop-blur-xs text-ana-primary hover:text-white hover:bg-ana-primary p-2 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={16} fill={isFavorite ? "#B5473C" : "transparent"} strokeWidth={isFavorite ? 0 : 2} className="transition-transform duration-200 hover:scale-110" />
        </button>
      </div>

      {/* Visual Product Representation Placeholder */}
      <div 
        onClick={onQuickView}
        className="w-full aspect-square bg-ana-bg rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group-hover:bg-ana-pale/40 transition-colors duration-300 cursor-pointer"
      >
        <div className="w-full h-full text-ana-primary transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <ProductSVG type={product.icon} className="w-24 h-24" />
          )}
        </div>
        {/* Hover zoom cover effect details */}
        <div className="absolute inset-0 bg-ana-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 text-ana-primary text-xs font-bold py-2 px-3.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye size={12} /> Aperçu rapide
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col">
        <h4 
          onClick={onQuickView}
          className="font-sans font-semibold text-sm leading-tight text-ana-accent hover:text-ana-primary transition-colors cursor-pointer mb-1 line-clamp-2 min-h-[2.5rem]"
        >
          {product.name}
        </h4>

        {/* Note et Compteur */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex text-ana-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#B87B84" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[10px] text-ana-dark/40 font-bold tracking-wide">
            ({product.salesCount} ventes)
          </span>
        </div>

        {/* Prix */}
        <div className="flex items-baseline justify-between mt-auto">
          <p className="text-base font-bold text-ana-primary">
            {product.price.toFixed(2)} €
          </p>
          <span className="text-[10px] text-ana-dark/40 italic">
            Fait Réunion 🇷🇪
          </span>
        </div>
      </div>

      {/* Bottom sliding add to cart button */}
      <div className="mt-4">
        <button 
          onClick={onAddToCartDirect}
          className="w-full bg-ana-primary hover:bg-ana-dark text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 tracking-widest transition-all duration-300 active:scale-95 shadow-[0_2px_8px_rgba(181,71,60,0.15)] hover:shadow-lg cursor-pointer"
        >
          <ShoppingBag size={14} />
          AJOUTER AU PANIER
        </button>
      </div>
    </div>
  );
};
