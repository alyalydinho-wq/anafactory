import React, { useState } from "react";
import { Product, CartItem } from "../types";
import { X, Check, ShoppingBag, Leaf, Gift, Star } from "lucide-react";
import { ProductSVG } from "./ProductCard";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  // Customization state
  const [customName, setCustomName] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Bois Naturel de Bouleau");
  const [selectedRibbon, setSelectedRibbon] = useState<string>("Cordon de Lin Brut");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccessAnimated, setIsSuccessAnimated] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  // Materials and pricing adjustments
  const MATERIALS = [
    { name: "Bois Naturel de Bouleau", extra: 0 },
    { name: "Bois de Goyavier Précieux (974)", extra: 1.5 },
    { name: "Plexiglas Miroir Or Rose", extra: 2.5 },
    { name: "Précieux Noyer Doré", extra: 2.0 }
  ];

  const RIBBONS = [
    "Cordon de Lin Brut",
    "Satin Terracotta Sauvage",
    "Satin Rose Poudré",
    "Ruban de Dentelle Fine",
    "Dentelle Écru"
  ];

  const basePrice = product.price;
  const materialExtra = MATERIALS.find(m => m.name === selectedMaterial)?.extra || 0;
  const itemPrice = basePrice + materialExtra;
  const totalPrice = itemPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessAnimated(true);

    const item: CartItem = {
      product: {
        ...product,
        price: itemPrice // update price to include customization extra
      },
      quantity: quantity,
      customizationName: customName || undefined,
      customizationDate: customDate || undefined,
      customizationColor: `Matière: ${selectedMaterial} / Attache: ${selectedRibbon}`
    };

    setTimeout(() => {
      onAddToCart(item);
      setIsSuccessAnimated(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      id="quick-view-overlay"
      className="fixed inset-0 bg-ana-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-ana-bg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_24px_48px_rgba(0,0,0,0.15)] relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 text-ana-primary hover:bg-ana-primary hover:text-white p-2 rounded-full shadow-md z-10 transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Column Left: Beautiful visual preview panel */}
        <div className="md:w-1/2 p-6 md:p-8 bg-white flex flex-col justify-between border-r border-ana-pale">
          <div>
            <span className="bg-ana-pale text-ana-primary text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
              Création {product.badge}
            </span>
            <h2 className="font-serif text-2xl font-bold mt-3 text-ana-dark leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-ana-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#B87B84" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs text-ana-dark/60 font-medium">
                {product.salesCount} avis clients
              </span>
            </div>
            
            <p className="text-xs text-ana-dark/70 mt-4 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="my-6 p-4 bg-ana-bg rounded-xl border border-dashed border-ana-pale relative flex flex-col items-center justify-center min-h-[220px]">
            <span className="absolute top-2 left-3 text-[10px] text-ana-primary font-black tracking-wider uppercase flex items-center gap-1">
              <Leaf size={10} /> Aperçu de votre personnalisation
            </span>
            
            {/* Render vector SVG or image in real-time with cursor-zoom-in trigger */}
            <div 
              onClick={() => setIsImageZoomed(true)}
              className="text-ana-primary/80 relative scale-110 drop-shadow-md py-4 cursor-zoom-in hover:scale-115 transition-all duration-300 group/zoom-preview"
              title="Cliquez pour agrandir l'image et l'inspecter"
            >
              {product.image ? (
                <div className="relative mt-2">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-32 h-32 object-cover rounded-xl shadow-xs transition-brightness duration-300 group-hover/zoom-preview:brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating zoom indicator on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/zoom-preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-white text-[9px] font-black tracking-widest uppercase bg-ana-primary/95 px-2.5 py-1 rounded shadow-md pointer-events-none">Agrandir 🔍</span>
                  </div>
                </div>
              ) : (
                <div className="relative mt-2">
                  <ProductSVG type={product.icon} className="w-32 h-32" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/zoom-preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-ana-primary text-[9px] font-black tracking-widest uppercase bg-white/95 px-2.5 py-1 rounded shadow-md pointer-events-none">Agrandir 🔍</span>
                  </div>
                </div>
              )}
              
              {/* Overlay dynamic user personalization tags */}
              {customName && (
                <div 
                  className="absolute bottom-5 inset-x-0 text-center font-serif text-[11px] font-bold text-ana-primary leading-none bg-white/80 rounded px-1.5 py-0.5 mx-auto max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis shadow-xs pointer-events-none select-none"
                  style={{ top: "45%", transform: "translateY(-50%)" }}
                >
                  {customName}
                </div>
              )}
              {customDate && (
                <div 
                  className="absolute bottom-1 inset-x-0 text-center font-sans font-medium text-[7px] text-ana-dark/70 bg-white/60 py-0.5 max-w-[65%] mx-auto rounded pointer-events-none select-none"
                  style={{ top: "62%", height: "fit-content" }}
                >
                  {customDate}
                </div>
              )}
            </div>

            <div className="text-[10px] text-ana-dark/40 text-center mt-2 font-mono italic">
              * Rendu virtuel indicatif (cliquez sur l'image pour l'agrandir).
            </div>
          </div>

          <div className="hidden md:block">
            <h4 className="text-xs font-bold text-ana-dark mb-1">🌿 Caractéristiques & Finitions :</h4>
            <ul className="text-[11px] text-ana-dark/70 grid grid-cols-2 gap-x-4 gap-y-1 font-sans">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                  <Check size={10} className="text-ana-accent shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column Right: Interactive customizing parameters */}
        <form onSubmit={handleSubmit} className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="font-serif text-sm font-black uppercase text-ana-primary tracking-wider border-b border-ana-pale pb-2">
              Configuration de l'Article
            </h3>

            {/* Support Wood or Material Selection */}
            <div>
              <label className="block text-xs font-bold text-ana-dark mb-1.5 uppercase tracking-wider">
                1. Support / Matière
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.name}
                    type="button"
                    onClick={() => setSelectedMaterial(mat.name)}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedMaterial === mat.name
                        ? "border-ana-primary bg-ana-pale/20 text-ana-primary font-bold shadow-xs"
                        : "border-gray-200 bg-white hover:border-ana-pale text-ana-dark"
                    }`}
                  >
                    <div className="truncate">{mat.name}</div>
                    <div className="text-[9px] text-ana-accent font-bold mt-0.5">
                      {mat.extra === 0 ? "Inclus" : `+${mat.extra.toFixed(2)} €`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving Name Field */}
            <div>
              <label htmlFor="input-custom-name" className="block text-xs font-bold text-ana-dark mb-1.5 uppercase tracking-wider">
                2. Texte personnalisé (Prénom, Message, Mot)
              </label>
              <input
                id="input-custom-name"
                type="text"
                placeholder="Ex: Sophie, Joyeux Anniversaire, Baptême Marc"
                maxLength={40}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-ana-primary focus:ring-1 focus:ring-ana-primary rounded-lg py-2 px-3 text-xs text-ana-dark outline-hidden shadow-xs"
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">
                Saisissez précisément le texte. Majuscules/Minuscules respectées (max 40 cars).
              </p>
            </div>

            {/* Custom Engraving Date Field */}
            <div>
              <label htmlFor="input-custom-date" className="block text-xs font-bold text-ana-dark mb-1.5 uppercase tracking-wider">
                3. Date personnalisée (optionnel)
              </label>
              <input
                id="input-custom-date"
                type="text"
                placeholder="Ex: 12.09.2025 ou 15 Mai 2026"
                maxLength={20}
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-ana-primary focus:ring-1 focus:ring-ana-primary rounded-lg py-2 px-3 text-xs text-ana-dark outline-hidden shadow-xs"
              />
            </div>

            {/* Ribbon Attach color */}
            <div>
              <label className="block text-xs font-bold text-ana-dark mb-1.5 uppercase tracking-wider">
                4. Attache / Ruban
              </label>
              <select
                value={selectedRibbon}
                onChange={(e) => setSelectedRibbon(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-ana-primary focus:ring-ana-primary rounded-lg py-2 px-3 text-xs text-ana-dark outline-hidden cursor-pointer"
              >
                {RIBBONS.map((ribbon) => (
                  <option key={ribbon} value={ribbon}>
                    {ribbon}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantités */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-ana-dark uppercase tracking-wider">Quantité</span>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-ana-dark hover:bg-ana-pale/20 transition-all font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold text-xs text-ana-dark font-mono text-center min-w-[36px]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 text-ana-dark hover:bg-ana-pale/20 transition-all font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Box and Action CTA Buttons */}
          <div className="border-t border-ana-pale pt-6 mt-6 space-y-4">
            <div className="flex justify-between items-end bg-ana-pale/10 p-3.5 rounded-xl border border-ana-pale/35">
              <div>
                <span className="text-[10px] text-ana-dark/60 font-black tracking-widest uppercase block">Prix Unitaire</span>
                <span className="text-xs text-ana-dark/50 font-sans block">
                  {basePrice.toFixed(2)}€Base + {materialExtra.toFixed(2)}€Opt
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-ana-dark/60 font-black tracking-widest uppercase block">Total TTC</span>
                <span className="text-xl font-black text-ana-primary font-mono block">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSuccessAnimated}
              className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all outline-hidden cursor-pointer ${
                isSuccessAnimated
                  ? "bg-green-600 text-white animate-pulse"
                  : "bg-ana-primary hover:bg-ana-dark text-white shadow-md active:scale-95"
              }`}
            >
              {isSuccessAnimated ? (
                <>
                  <Check size={16} /> PRODUIT AJOUTÉ !
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> VALIDER & AJOUTER AU PANIER
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lightbox / Zoom-in Modal Overlay */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-4 transition-all duration-300"
          onClick={() => setIsImageZoomed(false)}
        >
          {/* Close zoom button */}
          <button 
            type="button"
            onClick={() => setIsImageZoomed(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-all cursor-pointer backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95"
            title="Fermer le zoom (Échap)"
          >
            <X size={20} />
          </button>

          <div 
            className="max-w-2xl w-full flex flex-col items-center justify-center p-2 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-ana-bg p-1.5 border border-white/10 flex items-center justify-center select-none">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-inner cursor-zoom-out"
                  onClick={() => setIsImageZoomed(false)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div 
                  className="p-16 bg-white rounded-xl flex items-center justify-center min-w-[280px] sm:min-w-[350px] aspect-square cursor-zoom-out"
                  onClick={() => setIsImageZoomed(false)}
                >
                  <ProductSVG type={product.icon} className="w-48 h-48 text-ana-primary" />
                </div>
              )}

              {/* Dynamic live personalization overlays scaled proportionally for high fidelity! */}
              {customName && (
                <div 
                  className="absolute inset-x-0 text-center font-serif text-base sm:text-2xl font-bold text-ana-primary leading-none bg-white/85 rounded-lg px-4 py-1.5 mx-auto max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis shadow-md select-none pointer-events-none animate-pulse"
                  style={{ top: "45%", transform: "translateY(-50%)" }}
                >
                  {customName}
                </div>
              )}
              {customDate && (
                <div 
                  className="absolute inset-x-0 text-center font-sans font-medium text-[10px] sm:text-xs text-ana-dark/80 bg-white/70 py-1.5 max-w-[65%] mx-auto rounded-md shadow-sm select-none pointer-events-none"
                  style={{ top: "62%", height: "fit-content" }}
                >
                  {customDate}
                </div>
              )}
            </div>

            {/* Helper Caption */}
            <div className="mt-4 text-center max-w-md bg-black/60 text-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg text-xs leading-relaxed select-none">
              <span className="font-bold text-ana-accent block mb-0.5">🔍 Inspection de la Gravure</span>
              Ajustez vos textes à droite dans la configuration tout en observant l'aperçu précis.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
