import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, Percent, Zap, ShoppingBag, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "../types";

interface PromotionsPageProps {
  allProducts: Product[];
  favorites: number[];
  onToggleFavorite: (e: React.MouseEvent, id: number) => void;
  onQuickView: (prod: Product) => void;
  onAddToCartDirect: (prod: Product) => void;
  onBackToHome: () => void;
  triggerToast: (msg: string) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({
  allProducts,
  favorites,
  onToggleFavorite,
  onQuickView,
  onAddToCartDirect,
  onBackToHome,
  triggerToast,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    86400 * 2 + 3600 * 5 + 60 * 23 + 12
  ); // ~2 days 5 hours 23 mins 12 secs

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const d = Math.floor(timeLeft / 86400);
  const h = Math.floor((timeLeft % 86400) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const promoProducts = allProducts.slice(0, 8); // Just grab some for the promo display

  return (
    <div className="bg-[#FAF9F8] min-h-screen pb-20 animate-[fade-in_0.5s_ease-out]">
      {/* Marquee Header */}
      <div className="bg-ana-primary text-white overflow-hidden py-3 relative">
        <div className="whitespace-nowrap flex font-black tracking-widest text-[11px] uppercase">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-16 p-0 m-0"
          >
            <span>✨ LIVRAISON GRATUITE DÈS 80€ ✨</span>
            <span>🔥 VENTES FLASH JUSQU'À -50% 🔥</span>
            <span>🌿 ARTISANAT PÉI EN PROMO 🌿</span>
            <span>✨ LIVRAISON GRATUITE DÈS 80€ ✨</span>
            <span>🔥 VENTES FLASH JUSQU'À -50% 🔥</span>
            <span>🌿 ARTISANAT PÉI EN PROMO 🌿</span>
            <span>✨ LIVRAISON GRATUITE DÈS 80€ ✨</span>
            <span>🔥 VENTES FLASH JUSQU'À -50% 🔥</span>
            <span>🌿 ARTISANAT PÉI EN PROMO 🌿</span>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-ana-primary transition-colors hover:translate-x-1"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </button>
      </div>

      {/* Hero Promo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#E8D5D3] rounded-3xl overflow-hidden relative shadow-lg flex flex-col md:flex-row items-stretch border border-white/50">
          <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 z-10 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 bg-ana-primary text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 self-start">
              <Zap size={10} className="fill-current" /> Offre Limitée
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-ana-dark mb-4 leading-tight">
              L'Atelier <br /> <span className="text-ana-primary italic font-light">à petit prix.</span>
            </h1>
            <p className="text-ana-dark/70 mb-8 max-w-sm font-sans text-xs sm:text-sm">
              Découvrez nos lots et nos réductions exceptionnelles sur une sélection de nos plus belles créations artisanales.
            </p>

            <div className="flex gap-1.5 sm:gap-4 items-center">
              <div className="flex flex-col items-center bg-white p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-sm">
                <span className="font-serif text-lg sm:text-2xl font-bold text-ana-primary">{d}</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400">Jours</span>
              </div>
              <span className="text-sm sm:text-xl font-serif text-ana-dark/30">:</span>
              <div className="flex flex-col items-center bg-white p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-sm">
                <span className="font-serif text-lg sm:text-2xl font-bold text-ana-dark">{h}</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400">Heures</span>
              </div>
              <span className="text-sm sm:text-xl font-serif text-ana-dark/30">:</span>
              <div className="flex flex-col items-center bg-white p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-sm">
                <span className="font-serif text-lg sm:text-2xl font-bold text-ana-dark">{m}</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400">Min</span>
              </div>
              <span className="text-sm sm:text-xl font-serif text-ana-dark/30">:</span>
              <div className="flex flex-col items-center bg-ana-primary p-2 sm:p-3 rounded-xl min-w-[55px] sm:min-w-[70px] shadow-lg">
                <span className="font-serif text-lg sm:text-2xl font-bold text-white">{s}</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-bold text-white/80">Sec</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[240px] md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0 relative opacity-100 flex-1">
            <img 
              src="/offrepromo.jpg" 
              alt="Promotions" 
              className="w-full h-full object-cover rounded-b-3xl md:rounded-b-none md:rounded-r-3xl"
              onError={(e) => { e.currentTarget.src = "/Pancarte%20naissance%2040%E2%82%AC.jpeg" }}
            />
            {/* Gradient mask for smooth blend */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#E8D5D3] via-[#E8D5D3]/40 md:w-32 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Offers Banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-dashed border-[#C9A96E] p-8 rounded-2xl flex flex-col justify-center relative hover:shadow-lg transition-shadow">
          <span className="absolute -top-4 right-8 bg-[#C9A96E] text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full shadow-md">
            Code: BIENVENUE
          </span>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
              <Percent size={28} className="text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-ana-dark">-10% sur la boutique</h3>
              <p className="text-xs text-gray-500 mt-1">Pour votre première commande, applicable immédiatement.</p>
            </div>
          </div>
        </div>

        <div className="bg-ana-primary/5 border-2 border-solid border-ana-primary/20 p-8 rounded-2xl flex flex-col justify-center relative hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-ana-primary flex items-center justify-center">
              <ShoppingBag size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-ana-dark">Livraison Gratuite</h3>
              <p className="text-xs text-gray-500 mt-1">Valable pour La Réunion et la Métropole, dès 80€ d'achats.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16">
        <div className="flex justify-between items-end border-b border-ana-pale/60 pb-4 mb-8">
          <div>
            <span className="text-[10px] font-black text-ana-primary uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} /> Ne perdez pas une seconde
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ana-dark">Flash Deals</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {promoProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const promoPrice = (product.price * 0.8).toFixed(2); // Mock 20% off

            return (
              <div 
                key={product.id} 
                className="group relative flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent overflow-hidden"
              >
                {/* Sale Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    -20%
                  </span>
                </div>
                
                {/* Favorite toggle */}
                <button 
                  onClick={(e) => onToggleFavorite(e, product.id)}
                  className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isFav ? "bg-white text-rose-500" : "bg-white/70 backdrop-blur-md text-gray-400 hover:text-rose-400 hover:bg-white"}`}
                >
                  <Heart size={14} className={isFav ? "fill-current" : ""} />
                </button>

                {/* Overlays / Quickview for desktop */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F8F6]">
                  <img src={product.image || "/api/placeholder/400/500"} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  
                  <div className="absolute inset-0 bg-ana-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:block"></div>
                  
                  <button 
                    onClick={() => onQuickView(product)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-ana-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hidden md:flex scale-90 group-hover:scale-100"
                  >
                    <Eye size={20} />
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-20 bg-white">
                  <div className="flex-1 cursor-pointer" onClick={() => onQuickView(product)}>
                    <h3 className="font-serif text-sm font-bold text-gray-900 leading-tight mb-2 group-hover:text-ana-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-3 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 line-through mb-0.5">{product.price.toFixed(2)} €</span>
                      <span className="text-base text-red-500 font-mono font-black">{promoPrice} €</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCartDirect(product); }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 bg-ana-bg border-ana-pale/60 text-ana-dark hover:bg-ana-primary hover:text-white"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
