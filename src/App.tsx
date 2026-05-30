import React, { useState, useEffect, useRef } from "react";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Check, 
  Mail, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Gift, 
  Clock, 
  Sparkles, 
  Trash2, 
  Plus, 
  Minus, 
  Send,
  SlidersHorizontal,
  ThumbsUp,
  HeartCrack,
  Info
} from "lucide-react";
import { CATEGORIES, COUPS_DE_COEUR, NOUVEAUTES, REVIEWS } from "./data";
import { Product, CartItem } from "./types";
import { ProductCard, ProductSVG } from "./components/ProductCard";
import { QuickViewModal } from "./components/QuickViewModal";
import { CategoryPages } from "./components/CategoryPages";
import { PromotionsPage } from "./components/PromotionsPage";
// @ts-ignore
import happyCustomerImg from "./assets/images/happy_customer_product_1779965456517.png";

export default function App() {
  // --- States ---
  const [activePage, setActivePage] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("ana_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("ana_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Custom Reviews State to let users write theirs!
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [reviewName, setReviewName] = useState("");
  const [reviewCity, setReviewCity] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Login Account Forms State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Contact Message form state
  const [contactName, setContactName] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);

  // Filter lists & custom product data
  const allProducts = [...COUPS_DE_COEUR, ...NOUVEAUTES];
  
  // Mega Menu Toggle state on Mobile
  const [isMobileOccasionsOpen, setIsMobileOccasionsOpen] = useState(false);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Countdown timer calculations
  const [countdown, setCountdown] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });

  // Floating Toasts / Notifications state
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" }[]>([]);

  // Ref to sticky header shadow
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Checkout address form state
  const [checkoutStreet, setCheckoutStreet] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("Saint-Denis");
  const [checkoutZip, setCheckoutZip] = useState("97400");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  // --- Effects ---
  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("ana_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("ana_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Dynamic Countdown (Target is J+3)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sticky Header scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero Slider Auto-Advance
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [activeHeroSlide]);

  // --- Functions ---
  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleAddToCartDirect = (product: Product) => {
    // Check if customizable - if so, we prefer sliding open QuickView modal to let users personalized
    if (product.badge === "Personnalisable") {
      setSelectedProduct(product);
      triggerToast(`Faites briller votre imagination ✨ Personnalisez "${product.name}" !`, "info");
    } else {
      const idx = cart.findIndex((item) => item.product.id === product.id && !item.customizationName);
      if (idx > -1) {
        const updated = [...cart];
        updated[idx].quantity += 1;
        setCart(updated);
      } else {
        setCart((prev) => [...prev, { product, quantity: 1 }]);
      }
      triggerToast(`✓ "${product.name}" ajouté avec succès au panier.`);
    }
  };

  const handleAddCustomizedItem = (item: CartItem) => {
    // Add custom item configured with customized options inside modal
    setCart((prev) => [...prev, item]);
    triggerToast(`✓ "${item.product.name}" personnalisé ajouté au panier.`);
  };

  const handleRemoveFromCart = (index: number) => {
    const removedName = cart[index].product.name;
    setCart((prev) => prev.filter((_, idx) => idx !== index));
    triggerToast(`"${removedName}" retiré du panier.`, "info");
  };

  const updateCartQuantity = (index: number, change: number) => {
    const updated = [...cart];
    const newQty = updated[index].quantity + change;
    if (newQty <= 0) {
      handleRemoveFromCart(index);
    } else {
      updated[index].quantity = newQty;
      setCart(updated);
    }
  };

  const toggleFavorite = (productId: number) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    if (favorites.includes(productId)) {
      setFavorites((prev) => prev.filter((id) => id !== productId));
      triggerToast(`Retiré de vos favoris: ${product.name}`, "info");
    } else {
      setFavorites((prev) => [...prev, productId]);
      triggerToast(`Ajouté à vos coups de cœur ♡: ${product.name}`, "success");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      triggerToast("Veuillez saisir une adresse email valide ✉️", "info");
      return;
    }
    setNewsletterSubscribed(true);
    triggerToast("✓ Merci de votre fidélité ! Bienvenue dans la famille AnaFactory ✨");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMail || !contactMessage) {
      triggerToast("Veuillez remplir tous les champs du formulaire ✍️", "info");
      return;
    }
    setContactSent(true);
    triggerToast("✓ Message de l'atelier envoyé avec succès ! Nous vous répondrons sous 24-48h.");
    setContactMessage("");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      triggerToast("Veuillez remplir votre nom et votre gentil avis 🌺", "info");
      return;
    }

    const initials = reviewName.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "AM";
    const newRevObj = {
      id: Math.random(),
      name: reviewName,
      location: reviewCity || "La Réunion",
      rating: reviewRating,
      comment: reviewComment,
      initials
    };

    setReviewsList((prev) => [newRevObj, ...prev]);
    setReviewSuccess(true);
    setReviewName("");
    setReviewCity("");
    setReviewComment("");
    triggerToast("❤️ Merci beaucoup pour votre splendide avis déposé !");
    setTimeout(() => setReviewSuccess(false), 5000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.includes("@") || userPassword.length < 4) {
      setLoginError("Identifiants incorrects ou mot de passe trop court.");
      return;
    }
    setIsLoggedIn(true);
    setLoginError("");
    setIsAccountOpen(false);
    triggerToast(`Bonjour et bienvenue, ${userEmail.split("@")[0]} ! 🌿`);
  };

  const triggerCheckout = () => {
    if (cart.length === 0) {
      triggerToast("Votre panier est vide.", "info");
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProcessCheckoutOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutStreet || !checkoutPhone) {
      triggerToast("Veuillez saisir votre adresse de livraison complète 🚚", "info");
      return;
    }
    setOrderCompleted(true);
    setCart([]);
    triggerToast("🎉 Félicitations, commande reçue ! Préparation sous 10 jours en cours.");
  };

  // Calculations for pricing
  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const deliveryCost = subtotal >= 80 ? 0 : subtotal === 0 ? 0 : 5.90;
  const grandTotal = subtotal + deliveryCost;

  // Real-time search filter and Category filtering
  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Hot Occasion Menu Items
  const OCCASION_COL_1 = ["Baptême/Communion", "EVJF", "Fête des Mères", "Fête des Pères", "Fête des Mamies", "Fête des Papis"];
  const OCCASION_COL_2 = ["Noël & Fêtes", "Saint-Valentin", "Halloween", "Pâques", "Ramadan", "Nouvel An", "Rentrée"];

  // Helper function to navigate to custom category sub-pages or change filters
  const scrollToShopAndFilter = (catId: string) => {
    if (catId === "all") {
      setActiveCategory("all");
      setActivePage("home");
      const element = document.getElementById("annonce-banner");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
      return;
    }

    const availablePages = ["marriage", "birthdays", "anniversaries", "parties", "gifts", "invitations", "crafts", "promotions", "naissance"];
    
    // Normalize string representation to map to subpages
    let targetPage = catId;
    if (catId === "mariage" || catId === "wedding") targetPage = "marriage";
    if (catId === "anniv-adulte" || catId === "anniv-enfant") targetPage = "birthdays";
    if (catId === "valentin") targetPage = "anniversaries";
    if (catId === "naissance") targetPage = "naissance";
    if (catId === "bapteme" || catId === "fetes") targetPage = "parties";
    if (catId === "cadeaux") targetPage = "gifts";
    if (catId === "papeterie") targetPage = "invitations";

    if (availablePages.includes(targetPage)) {
      setActiveCategory(catId);
      setActivePage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveCategory("all");
      setActivePage("home");
      const element = document.getElementById("shop-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-ana-bg text-ana-dark relative font-sans overflow-x-hidden">
      
      {/* --- 1. BARRE D'ANNONCE (Marquee) --- */}
      <div 
        id="annonce-banner"
        className="w-full bg-ana-gradient text-white py-2 overflow-hidden relative border-b border-ana-primary/30 z-50 select-none shadow-sm"
      >
        <div className="animate-marquee whitespace-nowrap text-xs font-bold tracking-widest uppercase flex items-center">
          <span className="mx-8 flex items-center gap-1">🌿 Livraison offerte dès 80€ en France & Réunion</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">✨ Créations 100% faites main avec amour</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">✏️ Personnalisation sur mesure gravée laser</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">🚚 Expédition soignée sous 10 jours</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">🌿 Livraison offerte dès 80€ en France & Réunion</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">✨ Créations 100% faites main avec amour</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">✏️ Personnalisation sur mesure gravée laser</span>
          <span className="mx-8 font-serif italic text-white/60">·</span>
          <span className="mx-8 flex items-center gap-1">🚚 Expédition soignée sous 10 jours</span>
        </div>
      </div>

      {/* --- 2. HEADER --- */}
      <header 
        id="main-header"
        className={`bg-ana-gradient backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/20 transition-all duration-300 z-40 ${
          isHeaderSticky ? "sticky top-0 shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "relative"
        }`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-ana-gold/20 rounded-full blur-3xl"></div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {/* Burger Menu for Mobile */}
          <button 
            id="burger-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
            title="Menu catégories mobile"
          >
            <Menu size={20} />
          </button>

          {/* Logo AnaFactory with botanical ring ornament */}
          <div 
            onClick={() => scrollToShopAndFilter("all")}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="relative flex items-center justify-center">
              {/* SVG botanical ring around logo */}
              <svg className="w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] text-white group-hover:text-white/85 transition-colors duration-300 animate-[spin_50s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
                <path d="M50 10 C53 18, 47 18, 50 10" fill="currentColor" />
                <path d="M10 50 C18 53, 18 47, 10 50" fill="currentColor" />
                <path d="M50 90 C53 82, 47 82, 50 90" fill="currentColor" />
                <path d="M90 50 C82 53, 82 47, 90 50" fill="currentColor" />
              </svg>
              <img 
                src="/logo.jpeg"
                alt="Logo"
                className="absolute w-[60px] h-[60px] sm:w-[74px] sm:h-[74px] rounded-full object-cover shadow-inner group-hover:scale-110 transition-transform duration-300 bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col">
              <h1 className="font-serif text-lg sm:text-2xl font-black text-white tracking-tight leading-none group-hover:text-white/90 transition-colors">
                ANA FACTORY
              </h1>
              <span className="text-[7.5px] font-black tracking-[0.3em] text-[#F3F2F0] uppercase leading-none mt-1">
                Atelier Réunionnais
              </span>
            </div>
          </div>
        </div>

        {/* Search bar with instant autocomplete listings */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 lg:mx-12 relative z-10">
          <div className="relative w-full">
            <input 
              id="search-input"
              type="text" 
              placeholder="Rechercher une boîte à dragées, un panneau, un anniversaire..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-full bg-white text-xs text-ana-dark placeholder:text-gray-400 focus:outline-[#B5473C] focus:ring-1 focus:ring-ana-primary shadow-inner transition-all font-sans"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-ana-primary" />
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-2.5 hover:text-ana-primary text-gray-400 transition-all font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Instant Search Results Box dropdown */}
          {searchQuery && (
            <div className="absolute top-[105%] left-0 right-0 bg-white rounded-xl shadow-2xl border border-ana-pale/60 p-3 z-50 max-h-[300px] overflow-y-auto">
              <h4 className="text-[10px] uppercase font-bold text-ana-primary tracking-widest mb-2 border-b border-ana-bg pb-1.5 flex items-center justify-between">
                <span>🔍 Produits correspondants ({filteredProducts.length})</span>
                <span className="text-[9px] text-ana-accent font-medium leading-none">instantané</span>
              </h4>
              {filteredProducts.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-400 italic">
                  Aucun article ne correspond à "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredProducts.slice(0, 5).map((prod) => (
                    <div 
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between p-1.5 rounded-lg hover:bg-ana-pale/20 transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-ana-bg text-ana-primary flex items-center justify-center shrink-0">
                          <ProductSVG type={prod.icon} className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ana-dark line-clamp-1">{prod.name}</div>
                          <div className="text-[9.5px] text-ana-accent font-bold uppercase">{prod.badge}</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-ana-primary shrink-0">{prod.price.toFixed(2)} €</span>
                    </div>
                  ))}
                  {filteredProducts.length > 5 && (
                    <button 
                      onClick={() => {
                        const el = document.getElementById("shop-section");
                        el?.scrollIntoView({ behavior: "smooth" });
                        setSearchQuery("");
                      }}
                      className="w-full text-center text-[10px] text-ana-primary font-bold py-1 bg-ana-bg/50 rounded-md hover:bg-ana-pale/30 block mt-2"
                    >
                      Afficher tous les {filteredProducts.length} résultats
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3 sm:gap-6 text-white font-sans select-none relative z-10">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/anafactory974/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center cursor-pointer hover:text-white/80 transition-colors text-center shrink-0 relative py-1"
            title="Suivez-nous sur Instagram"
          >
            <Instagram size={18} className="text-white hover:scale-110 duration-250 transition-transform" />
            <span className="text-[8px] uppercase font-semibold mt-1 hidden sm:block tracking-widest">Instagram</span>
          </a>

          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/anafactory974"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center cursor-pointer hover:text-white/80 transition-colors text-center shrink-0 relative py-1"
            title="Suivez-nous sur Facebook"
          >
            <Facebook size={18} className="text-white hover:scale-110 duration-250 transition-transform" />
            <span className="text-[8px] uppercase font-semibold mt-1 hidden sm:block tracking-widest">Facebook</span>
          </a>

          {/* Profile login button */}
          <button 
            id="account-btn"
            onClick={() => {
              if (isLoggedIn) {
                setIsLoggedIn(false);
                triggerToast("Déconnexion réussie. À bientôt !", "info");
              } else {
                setIsAccountOpen(true);
              }
            }}
            className="flex flex-col items-center cursor-pointer hover:text-white/80 transition-colors text-center shrink-0 relative py-1"
          >
            <User size={18} className="text-white" />
            <span className="text-[8px] uppercase font-semibold mt-1 hidden sm:block tracking-widest">
              {isLoggedIn ? "Déconnexion" : "Mon Compte"}
            </span>
            {isLoggedIn && (
              <span className="absolute top-1 -right-1.5 w-2 h-2 rounded-full bg-green-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Favorites List button trigger */}
          <button 
            id="favorites-btn"
            onClick={() => setIsFavoritesOpen(true)}
            className="flex flex-col items-center cursor-pointer hover:text-white/80 transition-colors shrink-0 relative py-1"
            title="Mes favoris"
          >
            <Heart size={18} className="text-white hover:scale-110 duration-250 transition-transform" />
            <span className="text-[8px] uppercase font-semibold mt-1 hidden sm:block tracking-widest">Favoris</span>
            {favorites.length > 0 && (
              <span className="absolute top-0 -right-1 bg-white text-ana-primary text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center scale-90">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart triggers */}
          <button 
            id="cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center cursor-pointer hover:text-white/80 transition-colors shrink-0 relative py-1"
            title="Mon panier"
          >
            <ShoppingBag size={18} className="text-white hover:scale-110 duration-250 transition-transform" />
            <span className="text-[8px] uppercase font-bold mt-1 tracking-widest hidden sm:block">Panier</span>
            <span className="absolute top-0 -right-1 bg-white text-ana-primary text-[9.5px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {cart.reduce((ct, i) => ct + i.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* --- 3. MEGA-MENU BAR --- */}
      <nav 
        id="mega-menu-bar"
        className="hidden md:flex bg-ana-primary border-b border-white/10 relative justify-center py-2 z-30 select-none shadow-[0_1px_3px_rgba(0,0,0,0.05)] text-white"
      >
        <ul className="flex items-center gap-7 lg:gap-10 text-[11px] font-black uppercase tracking-widest text-white/90">
          <li 
            onClick={() => scrollToShopAndFilter("mariage")}
            className="hover:text-white cursor-pointer border-b-2 border-transparent hover:border-white pb-1 transition-all"
          >
            Mariage
          </li>
          <li 
            onClick={() => scrollToShopAndFilter("naissance")}
            className="hover:text-white cursor-pointer border-b-2 border-transparent hover:border-white pb-1 transition-all"
          >
            Naissance
          </li>
          <li 
            onClick={() => scrollToShopAndFilter("anniv-adulte")}
            className="hover:text-white cursor-pointer border-b-2 border-transparent hover:border-white pb-1 transition-all"
          >
            Anniversaire
          </li>

          {/* MEGA-MENU DROPDOWN AT "LES OCCASIONS" */}
          <li className="relative group/mega pb-1 cursor-pointer">
            <span className="text-white hover:text-white/85 transition-all border-b-2 border-white pb-1 flex items-center gap-1.5 font-bold">
              Les Occasions <span className="text-[7px]">▼</span>
            </span>

            {/* Mega menu popover dropdown container on Hover */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1.5 w-[460px] bg-ana-neutral rounded-xl shadow-2xl border border-ana-pale p-5 grid grid-cols-2 gap-6 z-50 pointer-events-none group-hover/mega:pointer-events-auto opacity-0 group-hover/mega:opacity-100 translate-y-2 group-hover/mega:translate-y-0 transition-all duration-300">
              {/* Botanical leaves light watermark ornament inside the dropdown */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 text-ana-primary">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 10C 60 40, 90 40, 90 50C 90 60, 60 60, 50 90C 40 60, 10 60, 10 50C 10 40, 40 40, 50 10Z"/>
                </svg>
              </div>

              <div>
                <h3 className="text-[10px] font-black tracking-widest text-ana-accent border-b border-ana-pale pb-2 mb-2 uppercase flex items-center gap-1">
                  🌿 Célébrations & Fêtes
                </h3>
                <ul className="space-y-1.5 text-xs text-left">
                  {OCCASION_COL_1.map((item) => (
                    <li 
                      key={item} 
                      onClick={() => scrollToShopAndFilter(item.includes("Baptême") ? "bapteme" : "mariage")}
                      className="hover:text-ana-primary text-ana-dark transition-colors py-0.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] font-black tracking-widest text-ana-primary border-b border-ana-pale pb-2 mb-2 uppercase flex items-center gap-1">
                  🎁 Événements Calendrier
                </h3>
                <ul className="space-y-1.5 text-xs text-left">
                  {OCCASION_COL_2.map((item) => (
                    <li 
                      key={item} 
                      onClick={() => scrollToShopAndFilter(item.includes("Noël") ? "fetes" : item.includes("Valentin") ? "valentin" : "all")}
                      className="hover:text-ana-primary text-ana-dark/80 transition-colors py-0.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 bg-white/40 p-2 rounded-lg text-center text-[9.5px] text-ana-primary font-bold">
                🌟 Offrez du sens : gravures sur mesure 100% personnalisables à la demande
              </div>
            </div>
          </li>

          <li 
            onClick={() => scrollToShopAndFilter("bapteme")}
            className="hover:text-ana-primary cursor-pointer border-b-2 border-transparent hover:border-ana-primary pb-1 transition-all"
          >
            Cadeaux Invités
          </li>
          <li 
            onClick={() => scrollToShopAndFilter("papeterie")}
            className="hover:text-ana-primary cursor-pointer border-b-2 border-transparent hover:border-ana-primary pb-1 transition-all"
          >
            Papeterie
          </li>
          <li 
            onClick={() => scrollToShopAndFilter("promotions")}
            className="text-ana-gold hover:text-ana-primary cursor-pointer border-b-2 border-transparent hover:border-ana-primary pb-1 transition-all font-black"
          >
            ★ Promotions
          </li>
        </ul>
      </nav>

      {activePage === "home" ? (
        <>
          {/* --- 4. HERO SLIDER --- */}
      <section 
        id="hero-slider-section"
        className="relative h-[280px] sm:h-[420px] md:h-[500px] w-full bg-white overflow-hidden select-none border-b border-ana-pale shadow-xs"
      >
        {/* Slides Content Container */}
        <div className="w-full h-full relative">
          
          {/* Slide 1 */}
          <div 
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center transition-all duration-700 ease-in-out transform ${
              activeHeroSlide === 0 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
            }`}
            style={{ backgroundColor: "#E8D5D3" }}
          >
            <div className="w-full md:w-1/2 p-6 sm:p-12 md:pl-20 flex flex-col justify-center text-left h-full group">
              <span className="text-[10px] uppercase font-black text-ana-primary tracking-[0.4em] mb-3 inline-block">
                🌿 ATELIER ARTISANAL
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-ana-dark leading-tight mb-4">
                Des créations uniques,<br />faites avec amour
              </h2>
              <p className="font-cormorant text-sm sm:text-xl italic text-ana-dark/70 mb-6 sm:mb-8 font-medium">
                Cadeaux personnalisés pour toutes vos occasions d'exception de la vie.
              </p>
              <div>
                <button 
                  onClick={() => scrollToShopAndFilter("all")}
                  className="bg-ana-primary hover:bg-ana-dark text-white text-xs font-black tracking-widest px-6 sm:px-8 py-3.5 rounded-lg uppercase shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  Découvrir l'Atelier
                </button>
              </div>
            </div>
            
            <div 
              className="hidden md:flex w-1/2 h-full relative items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/prenom%20plexi%2040%E2%82%AC.jpeg')" }}
            >
              {/* Soft overlay to ensure great legibility for text overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none"></div>

              {/* Botanical Vector Background circles */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              <div className="opacity-15 scale-150 absolute animate-[spin_120s_linear_infinite]">
                <svg width="240" height="240" viewBox="0 0 100 100" fill="white">
                  <path d="M50 10 C60 30 90 30 90 50 C90 70 60 70 50 90 C40 70 10 70 10 50 C10 30 40 30 50 10" />
                </svg>
              </div>
              <div className="z-10 text-center text-white px-8">
                <div className="text-7xl mb-4 select-none drop-shadow-md">✨</div>
                <h3 className="font-serif lg:text-3xl text-xl font-bold tracking-wide drop-shadow-md">Vos Personnalisations</h3>
                <p className="font-sans text-[11px] font-black uppercase tracking-widest text-white/90 mt-2 drop-shadow-sm">Unique & Finitions Soignées</p>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div 
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center bg-ana-bg transition-all duration-700 ease-in-out transform ${
              activeHeroSlide === 1 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
            }`}
          >
            <div className="w-full md:w-1/2 p-6 sm:p-12 md:pl-20 flex flex-col justify-center text-left h-full">
              <span className="text-[10px] uppercase font-black text-ana-primary tracking-[0.4em] mb-3 inline-block">
                ⭐ GRAVURE PÉI (RÉUNION)
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-ana-dark leading-tight mb-4">
                Mariage, Baptême,<br />Fêtes & Naissances…
              </h2>
              <p className="font-cormorant text-sm sm:text-xl italic text-ana-dark/70 mb-6 sm:mb-8 font-medium">
                Chaque joli moment de partage mérite une magnifique création sur mesure.
              </p>
              <div>
                <button 
                  onClick={() => scrollToShopAndFilter("naissance")}
                  className="bg-ana-primary hover:bg-ana-accent text-white text-xs font-black tracking-widest px-6 sm:px-8 py-3.5 rounded-lg uppercase shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  Nos Personnalisables
                </button>
              </div>
            </div>

            <div 
              className="hidden md:flex w-1/2 h-full relative items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/Pancarte%20naissance%2040%E2%82%AC.jpeg')" }}
            >
              {/* Soft overlay to ensure great legibility for text overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none"></div>

              <div className="z-10 text-center text-white px-8">
                <div className="text-7xl mb-4 select-none drop-shadow-md">🍼</div>
                <h3 className="font-serif lg:text-3xl text-xl font-bold tracking-wide drop-shadow-md text-white">La Douceur Bébé</h3>
                <p className="font-sans text-[11px] font-black uppercase tracking-widest text-white/90 mt-2 drop-shadow-sm">Cadeaux de Naissance uniques</p>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div 
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center transition-all duration-700 ease-in-out transform ${
              activeHeroSlide === 2 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
            }`}
            style={{ backgroundColor: "#F7F5F2" }}
          >
            <div className="w-full md:w-1/2 p-6 sm:p-12 md:pl-20 flex flex-col justify-center text-left h-full">
              <span className="text-[10px] uppercase font-black text-ana-primary tracking-[0.4em] mb-3 inline-block">
                🚚 EXPÉDITION EXPRESS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-ana-dark leading-tight mb-4">
                Livraison Offerte<br />dès 80€ d'achat !
              </h2>
              <p className="font-cormorant text-sm sm:text-xl italic text-ana-dark/70 mb-6 sm:mb-8 font-medium">
                Commandez de chez vous et recevez votre colis soigné sous 10 jours.
              </p>
              <div>
                <button 
                  onClick={() => scrollToShopAndFilter("promotions")}
                  className="bg-ana-gold hover:bg-[#b08f51] text-white text-xs font-black tracking-widest px-6 sm:px-8 py-3.5 rounded-lg uppercase shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  Voir les Promotions
                </button>
              </div>
            </div>

            <div 
              className="hidden md:flex w-1/2 h-full relative items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/Bouquet%20savon%205%E2%82%AC.jpeg')" }}
            >
              {/* Soft overlay to ensure great legibility for text overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none"></div>

              <div className="z-10 text-center text-white px-8">
                <div className="text-7xl mb-4 select-none drop-shadow-md">🕊️</div>
                <h3 className="font-serif lg:text-3xl text-xl font-bold tracking-wide drop-shadow-md text-white">baptêmes</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? 2 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ana-primary p-2 rounded-full shadow-lg z-20 cursor-pointer transition-all active:scale-90"
          title="Précédent"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={() => setActiveHeroSlide((prev) => (prev + 1) % 3)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ana-primary p-2 rounded-full shadow-lg z-20 cursor-pointer transition-all active:scale-90"
          title="Suivant"
        >
          <ChevronRight size={18} />
        </button>

        {/* Nav dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {[...Array(3)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveHeroSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeHeroSlide === i ? "w-8 bg-ana-primary" : "w-2 bg-ana-primary/30"
              }`}
              title={`Aller à la diapositive ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* --- 5. BANDE RÉASSURANCE --- */}
      <section 
        id="assurance-belt"
        className="bg-white py-6 px-4 md:px-8 shadow-xs border-b border-ana-pale select-none"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-ana-primary/10 select-none">
          
          <div className="flex flex-col items-center text-center p-2.5">
            <span className="text-2xl mb-1.5 transform hover:scale-125 duration-200 transition-transform">🌿</span>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-ana-dark">
              Créations Fait Main
            </h3>
            <p className="text-[10.5px] text-gray-400 mt-1 max-w-[170px] leading-snug">
              Chaque pièce créée avec passion dans notre atelier.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 pt-4 md:pt-2.5">
            <span className="text-2xl mb-1.5 transform hover:scale-125 duration-200 transition-transform">✏️</span>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-ana-dark">
              100% Personnalisable
            </h3>
            <p className="text-[10.5px] text-gray-400 mt-1 max-w-[170px] leading-snug">
              Prénom, date, couleur et message sur-mesure.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 pt-4 md:pt-2.5">
            <span className="text-2xl mb-1.5 transform hover:scale-125 duration-200 transition-transform">🚚</span>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-ana-dark">
              Expédition sous 10j
            </h3>
            <p className="text-[10.5px] text-gray-400 mt-1 max-w-[170px] leading-snug">
              Expédition soignée et rapide en suivi postal.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 pt-4 md:pt-2.5">
            <span className="text-2xl mb-1.5 transform hover:scale-125 duration-200 transition-transform">⭐</span>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-ana-dark">
              Communauté Péi
            </h3>
            <p className="text-[10.5px] text-gray-400 mt-1 max-w-[170px] leading-snug">
              Plus de 200 clients heureux et fidèles.
            </p>
          </div>

        </div>
      </section>

      {/* --- 6. GRILLE CATÉGORIES "NOS OCCASIONS" --- */}
      <section 
        id="occasions-grid-section"
        className="py-12 px-4 sm:px-6 max-w-7xl mx-auto text-center"
      >
        <div className="mb-8 relative flex flex-col items-center">
          <span className="text-ana-primary font-black text-xs tracking-[0.3em] uppercase mb-1">Célébrer ensemble</span>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-black text-ana-dark flex items-center gap-2">
            Créations pour chaque occasion
          </h2>
          <div className="w-16 h-1 bg-ana-primary mt-3 rounded-full"></div>
        </div>

        {/* 8 tiles matching the user request prompt */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => scrollToShopAndFilter(cat.id)}
                className={`aspect-square p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden select-none border group ${
                  isSelected 
                    ? "border-ana-primary shadow-xl ring-2 ring-ana-primary/50 text-white"
                    : cat.image 
                      ? "border-transparent text-white shadow-xs hover:shadow-lg" 
                      : "bg-white text-ana-dark border-ana-pale/40 shadow-xs hover:bg-ana-primary hover:text-white"
                }`}
              >
                {cat.image && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${cat.image}')` }}
                    />
                    <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? 'bg-black/60' : 'bg-black/40 group-hover:bg-black/50'}`} />
                  </>
                )}

                {/* Botanical light watermark pattern behind the tile */}
                <div className={`absolute right-0 bottom-0 pointer-events-none transition-colors duration-300 z-10 ${cat.image ? 'opacity-20 text-white/30 group-hover:text-white/50' : 'opacity-5 text-ana-dark group-hover:text-white'}`}>
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 15C50 15 42 35 50 45C58 35 50 15 50 15Z" />
                  </svg>
                </div>

                <div className="text-4xl mb-4 transform group-hover:scale-115 transition-transform duration-300 z-10 drop-shadow-md">
                  {cat.emoji}
                </div>
                
                <h3 className={`font-serif text-xs sm:text-sm font-black text-center tracking-wide leading-tight uppercase z-10 ${cat.image ? 'text-white' : ''} drop-shadow-xs`}>
                  {cat.name.split(" ").slice(1).join(" ")}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- 8. SECTION COMPTEUR PROMO (FLASH SALE SPECIAL CHIC) --- */}
      <section 
        id="flash-promo-banner"
        className="bg-ana-gradient py-12 px-6 text-white text-center relative overflow-hidden my-6 select-none shadow-md"
      >
        {/* SVG Leaves Botanical Watermark background overlay (Opacité 8%) */}
        <div className="absolute inset-0 opacity-8 pointer-events-none flex items-center justify-around">
          {[...Array(6)].map((_, idx) => (
            <svg key={idx} className="w-40 h-40 transform rotate-12" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C 30 30, 20 60, 50 90C 80 60, 70 30, 50 10ZM50 10V90" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50 30C40 40 40 50 50 50" stroke="currentColor" strokeWidth="1.2" />
              <path d="M50 50C60 60 60 70 50 70" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-black tracking-[0.25em] mb-4 uppercase">
            🔥 FLASH SALE EXCLUSIVITÉ ATELIER
          </div>
          
          <h2 className="font-serif text-2xl sm:text-4xl font-black mb-2 tracking-wide text-white">
            Offre spéciale — Livraison offerte ce weekend !
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ana-pale/90 max-w-xl mb-8 leading-relaxed">
            Profitez de la gratuité d'expédition sur toutes nos collections artisanales pour vos événements.
          </p>

          {/* Real-time calculated Countdown Box */}
          <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 mb-8 font-serif">
            
            <div className="bg-white text-ana-primary px-2.5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl flex flex-col items-center shrink-0 min-w-[60px] sm:min-w-[90px] border border-white/50">
              <span className="text-lg sm:text-2xl md:text-3xl font-black font-mono leading-none">
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9.5px] font-black tracking-widest uppercase text-ana-dark/50 mt-1">Jours</span>
            </div>

            <div className="text-lg sm:text-2xl font-black text-white/50 font-mono">:</div>

            <div className="bg-white text-ana-primary px-2.5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl flex flex-col items-center shrink-0 min-w-[60px] sm:min-w-[90px] border border-white/50">
              <span className="text-lg sm:text-2xl md:text-3xl font-black font-mono leading-none">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9.5px] font-black tracking-widest uppercase text-ana-dark/50 mt-1">Heures</span>
            </div>

            <div className="text-lg sm:text-2xl font-black text-white/50 font-mono">:</div>

            <div className="bg-[#E8D5D3]/20 backdrop-blur-md bg-white text-ana-primary px-2.5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl flex flex-col items-center shrink-0 min-w-[60px] sm:min-w-[90px] border border-white/50">
              <span className="text-lg sm:text-2xl md:text-3xl font-black font-mono leading-none">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9.5px] font-black tracking-widest uppercase text-ana-dark/50 mt-1">Minutes</span>
            </div>

            <div className="text-lg sm:text-2xl font-black text-white/50 font-mono">:</div>

            <div className="bg-white text-ana-primary px-2.5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl flex flex-col items-center shrink-0 min-w-[60px] sm:min-w-[90px] border border-white/50">
              <span className="text-lg sm:text-2xl md:text-3xl font-black font-mono leading-none">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9.5px] font-black tracking-widest uppercase text-ana-dark/50 mt-1">Secondes</span>
            </div>

          </div>

          <button 
            onClick={() => {
              const el = document.getElementById("shop-section");
              el?.scrollIntoView({ behavior: "smooth" });
              triggerToast("💸 Code FLASH974 appliqué d'office sur votre panier !");
            }}
            className="bg-white hover:bg-[#E8D5D3] text-ana-primary text-xs font-black tracking-[0.2em] px-8 py-4 rounded-xl uppercase shadow-lg duration-300 transition-all transform active:scale-95 cursor-pointer"
          >
            EN PROFITER MAINTENANT →
          </button>
        </div>
      </section>

      {/* --- GRID & SHOP WRAPPER --- */}
      <div id="shop-section" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Active filtering state feedback bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-ana-pale/60 pb-4 select-none">
          <div className="text-left w-full sm:w-auto">
            <h3 className="text-xs uppercase font-black text-ana-primary tracking-widest flex items-center gap-1.5 leading-none">
              <SlidersHorizontal size={14} /> Catalogue de l'Atelier
            </h3>
            <p className="text-[11px] text-gray-400 mt-1 font-sans">
              Filtrer par catégorie pour trouver de jolis souvenirs gravés.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-ana-primary text-white font-bold"
                  : "bg-white hover:bg-ana-pale/25 text-ana-dark hover:text-ana-primary"
              }`}
            >
              Tous ({allProducts.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = allProducts.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-ana-primary text-white font-bold"
                      : "bg-white hover:bg-ana-pale/25 text-ana-dark hover:text-ana-primary"
                  }`}
                >
                  {cat.name.split(" ").slice(1).join(" ")} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 7. COUPS DE CŒUR GRID (Products 1-8) --- */}
        <div id="coups-de-coeur-section" className="mb-14">
          <div className="flex justify-between items-end mb-6">
            <div className="text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-ana-dark flex items-center gap-1.5">
                ⭐ Nos coups de cœur
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Les pièces les plus demandées pour sublimer vos tablées de fêtes.
              </p>
            </div>
            {activeCategory !== "all" && (
              <button 
                onClick={() => setActiveCategory("all")}
                className="text-xs font-bold text-ana-primary border-b border-ana-primary pb-0.5 hover:text-ana-dark hover:border-ana-dark transition-all"
              >
                Tout réafficher
              </button>
            )}
          </div>

          {/* Grid Products */}
          {filteredProducts.filter(p => p.id <= 8).length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-ana-pale text-xs text-gray-400 italic">
              Aucun coup de cœur disponible pour cette sélection.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.filter(p => p.id <= 8).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isFavorite={favorites.includes(prod.id)}
                  onToggleFavorite={() => toggleFavorite(prod.id)}
                  onQuickView={() => setSelectedProduct(prod)}
                  onAddToCartDirect={() => handleAddToCartDirect(prod)}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- 9. SECTION NOUVEAUTÉS (Products 9-16) --- */}
        <div id="nouveautes-section" className="border-t border-ana-pale/40 pt-12">
          <div className="flex justify-between items-end mb-6">
            <div className="text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-ana-dark flex items-center gap-1.5">
                ✨ Dernières créations
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Nouveaux herbiers pressés, toiles, et accessoires poétiques.
              </p>
            </div>
          </div>

          {/* Grid Products */}
          {filteredProducts.filter(p => p.id > 8).length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-ana-pale text-xs text-gray-400 italic">
              Aucun nouvel article ne correspond à votre filtre.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.filter(p => p.id > 8).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isFavorite={favorites.includes(prod.id)}
                  onToggleFavorite={() => toggleFavorite(prod.id)}
                  onQuickView={() => setSelectedProduct(prod)}
                  onAddToCartDirect={() => handleAddToCartDirect(prod)}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* --- 10. SECTION AVIS CLIENTS & DÉPOT DE COMMENTAIRES --- */}
      <section 
        id="reviews-section"
        className="bg-[#F7F5F2] py-14 px-4 sm:px-6 border-t border-b border-ana-pale"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch font-sans">
          
          {/* Aesthetic photo of a client holding a beautifully crafted AnaFactory creation */}
          <div className="lg:w-1/3 bg-white p-4 sm:p-5 rounded-3xl border border-ana-pale/60 flex flex-col justify-between overflow-hidden group shadow-sm">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-inner bg-ana-bg/50">
              <img 
                src="/natheomiel.jpg"
                alt="Création artisanale gravée AnaFactory tenue avec soin dans les mains d'un client"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-5 text-left">
                <span className="text-[9px] font-black tracking-widest uppercase text-ana-pale/95 antialiased">
                  VOTRE QUOTIDIEN DOUX
                </span>
                <p className="font-serif text-base font-bold text-white mt-1 leading-snug antialiased">
                  Des pièces d'artisanat uniques qui voyagent de notre atelier à votre intérieur.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial List columns (3 cards) */}
          <div className="lg:w-2/3 flex flex-col justify-between">
            <div className="text-left mb-6">
              <span className="text-[10px] font-black tracking-widest text-ana-accent uppercase block mb-1">SATISFACTION GARANTIE</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-ana-dark flex items-center gap-2">
                Ce que disent nos clients ❤️
              </h2>
              <div className="w-12 h-0.5 bg-ana-primary mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviewsList.slice(0, 3).map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-ana-pale/30 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-ana-gold mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#B87B84" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="text-xs text-ana-dark/80 italic font-sans leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-ana-bg pt-3 mt-1.5">
                    <div className="w-8 h-8 rounded-full bg-ana-primary text-white font-black text-xs flex items-center justify-center shrink-0">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ana-dark leading-none">{rev.name}</div>
                      <div className="text-[10px] text-gray-400 mt-1 leading-none">{rev.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center md:text-right text-[11px] text-ana-accent font-bold mt-4">
              99.8% d'évaluation positive basée sur {1200 + reviewsList.length} commandes livrées à bon port.
            </div>
          </div>

        </div>
      </section>

      {/* --- 11. SECTION NEWSLETTER --- */}
      <section 
        id="newsletter-section"
        className="bg-ana-gradient py-12 px-6 text-white text-center relative overflow-hidden select-none border-b border-white/10"
      >
        {/* Leaves SVG Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center gap-12">
          <svg className="w-48 h-48 transform -rotate-45" viewBox="0 0 100 100" fill="white">
            <path d="M50 15C 40 40, 10 50, 10 50C 10 50, 40 60, 50 85C 60 60, 90 50, 90 50C 90 50, 60 40, 50 15Z"/>
          </svg>
          <svg className="w-36 h-36 transform rotate-45" viewBox="0 0 100 100" fill="white">
            <path d="M50 15C 40 40, 10 50, 10 50C 10 50, 40 60, 50 85C 60 60, 90 50, 90 50C 90 50, 60 40, 50 15Z"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-wide mb-1 text-white">
            Rejoignez la famille AnaFactory
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ana-pale/90 mt-1 mb-6 leading-relaxed">
            Nouveautés, offres exclusives fêtes, et idées cadeaux directement dans votre boîte mail.
          </p>

          {!newsletterSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch w-full rounded-xl overflow-hidden shadow-xl gap-2 sm:gap-0">
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Votre adresse email (Ex: julie@gmail.com)" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white text-ana-dark text-xs py-3 px-4 flex-1 outline-hidden sm:rounded-l-xl focus:ring-1 focus:ring-ana-primary rounded-xl sm:rounded-none"
                required
              />
              <button 
                type="submit"
                className="bg-ana-dark hover:bg-white text-white hover:text-ana-primary text-xs font-black tracking-widest px-6 py-3.5 whitespace-nowrap uppercase transition-all duration-300 rounded-xl sm:rounded-r-xl cursor-pointer"
              >
                Je m'inscris !
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 animate-pulse text-white font-serif max-w-md">
              <h3 className="text-lg font-black tracking-wide">✓ Merci beaucoup !</h3>
              <p className="text-xs font-sans text-ana-pale mt-1 font-medium select-none">
                Vous êtes inscrit(e). Un code de bienvenue de <strong className="text-white">-10%</strong> vous a été virtuellement envoyé à : <span className="underline">{newsletterEmail}</span>.
              </p>
            </div>
          )}
        </div>
      </section>
        </>
      ) : activePage === "promotions" ? (
        <PromotionsPage
          allProducts={allProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onQuickView={(prod) => setSelectedProduct(prod)}
          onAddToCartDirect={handleAddToCartDirect}
          onBackToHome={() => scrollToShopAndFilter("all")}
          triggerToast={triggerToast}
        />
      ) : (
        <CategoryPages
          pageId={activePage}
          allProducts={allProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onQuickView={(prod) => setSelectedProduct(prod)}
          onAddToCartDirect={handleAddToCartDirect}
          onBackToHome={() => scrollToShopAndFilter("all")}
          triggerToast={triggerToast}
        />
      )}

      {/* --- 12. FOOTER --- */}
      <footer 
        id="main-footer"
        className="bg-ana-gradient text-white select-none border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white/90">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-black text-white flex items-center gap-4 tracking-tight">
              <img 
                src="/logo.jpeg"
                alt="Logo"
                className="w-20 h-20 rounded-full object-cover border border-white/10 bg-white shadow-md hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              ANA FACTORY
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-sans select-text">
              Créations artisanales et naturelles faites main avec amour au cœur de La Réunion, expédiées avec soin à votre porte.
            </p>
            
            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="https://www.instagram.com/anafactory974/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white hover:scale-110 flex items-center justify-center transition-all cursor-pointer"
                title="Suivez-nous sur Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://www.facebook.com/anafactory974"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white hover:scale-110 flex items-center justify-center transition-all cursor-pointer"
                title="Rejoignez-nous sur Facebook"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3.5">
            <h3 className="font-semibold text-xs tracking-widest text-[#F3F2F0] uppercase border-b border-white/5 pb-2">
              Notre boutique
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => scrollToShopAndFilter(cat.id)}
                    className="hover:text-white/80 transition-colors cursor-pointer text-left"
                  >
                    {cat.name.split(" ").slice(1).join(" ")}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => scrollToShopAndFilter("all")}
                  className="hover:text-white/80 transition-colors text-white font-bold cursor-pointer text-left"
                >
                  ★ Tous nos articles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3.5">
            <h3 className="font-semibold text-xs tracking-widest text-[#F3F2F0] uppercase border-b border-white/5 pb-2">
              Informations
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button 
                  onClick={() => triggerToast("Foire Aux Questions ❓")} 
                  className="hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  Livraison & délais
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast("Politique des retours sous 14 jours ↩️")} 
                  className="hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  Politique de retour
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast("Vos questions les plus fréquentes")} 
                  className="hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  FAQ générale
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast("Conditions Générales de Vente")} 
                  className="hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  Conditions Générales (CGV)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast("Mentions Légales de l'atelier")} 
                  className="hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  Mentions légales / RGPD
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & quick form */}
          <div className="space-y-3.5">
            <h3 className="font-semibold text-xs tracking-widest text-white uppercase border-b border-white/5 pb-2">
              Contactez l'Atelier ✉️
            </h3>
            <p className="text-xs text-white/80 leading-normal select-text space-y-1 font-sans">
              <span className="block">📩 <a href="mailto:anafactory974@gmail.com" className="hover:underline transition-colors">anafactory974@gmail.com</a></span>
              <span className="block">📞 <a href="tel:0693910000" className="hover:underline transition-colors">0693 91 00 00</a></span>
            </p>
            <p className="text-[10.5px] text-white/70 leading-none select-text font-sans">
              ⏱️ Du lundi au vendredi : 9h – 18h
            </p>

            {!contactSent ? (
              <form onSubmit={handleContactSubmit} className="space-y-2 pt-1 font-sans">
                <input 
                  type="text" 
                  placeholder="Prénom" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-xs p-2 bg-white/10 focus:bg-white rounded text-white focus:text-ana-dark placeholder:text-white/60 outline-hidden transition-all text-left" 
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={contactMail}
                  onChange={(e) => setContactMail(e.target.value)}
                  className="w-full text-xs p-2 bg-white/10 focus:bg-white rounded text-white focus:text-ana-dark placeholder:text-white/60 outline-hidden transition-all text-left" 
                  required
                />
                <textarea 
                  rows={2}
                  placeholder="Votre question..." 
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full text-xs p-2 bg-white/10 focus:bg-white rounded text-white focus:text-ana-dark placeholder:text-white/60 outline-hidden resize-none transition-all text-left" 
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-white/90 text-ana-primary text-[10px] font-black tracking-widest py-1.5 rounded-lg uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send size={10} /> ENVOYER MA QUESTION
                </button>
              </form>
            ) : (
              <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-center select-none text-[10px] text-[#F3F2F0] font-medium animate-pulse">
                ✓ Message transmis ! L'atelier de la Réunion vous apporte une réponse rapide sous peu.
              </div>
            )}
          </div>

        </div>

        {/* Payment Partner Logos & Copyright */}
        <div className="bg-black/10 border-t border-white/5 py-5 px-6 font-sans">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs select-none">
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span className="font-serif font-black text-white leading-none text-sm select-none">
                ANA FACTORY
              </span>
              <p className="text-white/60 text-[10.5px] text-center md:text-left select-text">
                © 2025 AnaFactory — Tous droits réservés — Fait avec ❤️ à La Réunion 
              </p>
            </div>

            {/* Payment Icons SVGs */}
            <div className="flex items-center gap-2 grayscale brightness-200 opacity-60">
              <svg className="w-9 h-6 bg-white/15 rounded px-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="55" fill="white" fontStyle="italic" fontSize="24" fontWeight="black" textAnchor="middle">VISA</text>
              </svg>
              <svg className="w-9 h-6 bg-white/15 rounded px-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="50" r="18" fill="#EB001B" />
                <circle cx="60" cy="50" r="18" fill="#F79E1B" fillOpacity="0.8" />
              </svg>
              <svg className="w-9 h-6 bg-white/15 rounded px-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="55" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">PayPal</text>
              </svg>
              <svg className="w-9 h-6 bg-white/15 rounded px-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="56" fill="white" fontSize="20" letterSpacing="0.5" fontWeight="bold" textAnchor="middle" fontStyle="italic">PAY</text>
              </svg>
            </div>

          </div>
        </div>
      </footer>

      {/* --- SIDEBAR DRAWER: CART (🛒) --- */}
      {isCartOpen && (
        <div 
          id="cart-drawer-overlay"
          className="fixed inset-0 bg-ana-dark/60 z-50 backdrop-blur-xs flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.3)] animate-[slide_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header drawer */}
            <div className="p-5 border-b border-ana-pale/60 flex items-center justify-between bg-ana-bg">
              <div className="flex items-center gap-1.5 text-ana-primary font-bold">
                <ShoppingBag size={18} />
                <h3 className="font-serif text-lg font-black tracking-wide">Mon Panier</h3>
                <span className="text-xs bg-ana-primary text-white font-mono px-2 py-0.5 rounded-full leading-none ml-1">
                  {cart.reduce((ct, i) => ct + i.quantity, 0)} items
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-ana-primary hover:bg-ana-pale p-1.5 rounded-full cursor-pointer transition-all"
                title="Fermer le panier"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <span className="text-5xl select-none animate-bounce">🛒</span>
                  <h4 className="font-serif font-black text-sm text-ana-dark">Votre panier est tout vide</h4>
                  <p className="text-[11px] text-gray-400 font-sans max-w-[220px]">
                    Sélectionnez de magnifiques boîtes à dragées ou des marque-places uniques à personnaliser.
                  </p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-ana-primary text-white text-[10px] font-black tracking-widest px-6 py-2.5 rounded-lg uppercase shadow-md hover:bg-ana-dark transition-all cursor-pointer"
                  >
                    Voir notre catalogue
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-stretch gap-3.5 bg-ana-bg/40 p-3 rounded-xl border border-ana-pale/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative"
                    >
                      {/* Product image SVG thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-ana-bg flex items-center justify-center shrink-0 text-ana-primary/70 border border-ana-pale/30">
                        <ProductSVG type={item.product.icon} className="w-11 h-11" />
                      </div>

                      {/* Info & options selected */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-ana-dark line-clamp-2 max-w-[90%]">{item.product.name}</h4>
                          <span className="text-[10px] text-ana-primary font-black font-mono block mt-0.5">
                            {item.product.price.toFixed(2)} €
                          </span>
                          
                          {/* Customize attributes labels display if exists */}
                          {(item.customizationName || item.customizationDate || item.customizationColor) && (
                            <div className="mt-1.5 bg-white p-1.5 rounded-lg border border-ana-pale/35 text-[9px] text-ana-dark/70 space-y-0.5 font-sans leading-relaxed">
                              {item.customizationName && (
                                <div>✍️ <strong className="font-black text-ana-primary uppercase">Engravé: </strong> "{item.customizationName}"</div>
                              )}
                              {item.customizationDate && (
                                <div>📅 <strong className="font-bold">Date:</strong> {item.customizationDate}</div>
                              )}
                              {item.customizationColor && (
                                <div className="text-[8.5px] italic text-gray-400">{item.customizationColor}</div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Qty update buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden shrink-0 scale-90">
                            <button
                              onClick={() => updateCartQuantity(idx, -1)}
                              className="px-2 py-0.5 text-ana-dark hover:bg-ana-pale/25 font-black text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 font-bold text-xs font-mono min-w-[22px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(idx, 1)}
                              className="px-2 py-0.5 text-ana-dark hover:bg-ana-pale/25 font-black text-xs"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="text-xs font-black font-mono text-ana-primary">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      </div>

                      {/* Delete icon */}
                      <button 
                        onClick={() => handleRemoveFromCart(idx)}
                        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-ana-primary transition-colors cursor-pointer"
                        title="Supprimer l'article"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations & Checkout CTA buttons */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-ana-pale/60 bg-ana-bg/75 space-y-4">
                <div className="space-y-1.5 text-xs text-ana-dark">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total :</span>
                    <span className="font-mono font-bold">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Livraison (Délai 10j) :</span>
                    <span className="font-mono font-semibold">
                      {deliveryCost === 0 ? "Offerte (Colissimo 🎁)" : `${deliveryCost.toFixed(2)} €`}
                    </span>
                  </div>
                  
                   {deliveryCost > 0 && (
                    <div className="text-[9.5px] text-ana-accent bg-ana-accent/10 p-1 rounded-md text-center font-bold">
                      💡 Complétez pour {(80 - subtotal).toFixed(2)}€ d'achat pour la gratuité totale !
                    </div>
                  )}

                  <div className="flex justify-between pt-2.5 border-t border-ana-pale/40 font-bold text-sm">
                    <span className="text-ana-dark font-black tracking-wide uppercase">Total TTC :</span>
                    <span className="text-base font-black text-ana-primary font-mono">{grandTotal.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={triggerCheckout}
                    className="w-full bg-ana-primary hover:bg-ana-dark text-white text-xs font-black tracking-widest py-3.5 rounded-xl uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check size={14} /> VALIDER MA COMMANDE
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-[10.5px] text-gray-400 hover:text-ana-dark font-bold font-sans py-1.5 block cursor-pointer"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- SIDEBAR DRAWER: FAVORITES (♡) --- */}
      {isFavoritesOpen && (
        <div 
          onClick={() => setIsFavoritesOpen(false)}
          className="fixed inset-0 bg-ana-dark/60 z-50 backdrop-blur-xs flex justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.3)] animate-[slide_0.3s_ease]"
          >
            <div className="p-5 border-b border-ana-pale/60 flex items-center justify-between bg-ana-bg">
              <div className="flex items-center gap-1.5 text-ana-primary font-bold">
                <Heart size={18} fill="#B5473C" strokeWidth={0} />
                <h2 className="font-serif text-lg font-black tracking-wide">Mes coups de cœur ♡</h2>
                <span className="text-xs bg-ana-primary text-white font-mono px-2 py-0.5 rounded-full leading-none ml-1">
                  {favorites.length} coups
                </span>
              </div>
              <button 
                onClick={() => setIsFavoritesOpen(false)}
                className="text-ana-primary hover:bg-ana-pale p-1.5 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 select-none">
                  <HeartCrack size={44} className="text-ana-pale text-center animate-pulse" />
                  <h4 className="font-serif font-black text-sm text-ana-dark">Aucune création aimée encore</h4>
                  <p className="text-[11px] text-gray-400 font-sans max-w-[210px] leading-relaxed">
                    Cliquez sur l'icône de cœur de n'importe quel produit pour le garder de côté.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {favorites.map((favId) => {
                    const prod = allProducts.find((p) => p.id === favId);
                    if (!prod) return null;
                    return (
                      <div 
                        key={prod.id} 
                        className="flex items-center gap-3 bg-ana-bg/30 p-2.5 rounded-xl border border-ana-pale/35 hover:bg-ana-pale/15 transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-ana-bg flex items-center justify-center shrink-0">
                          <ProductSVG type={prod.icon} className="w-9 h-9 text-ana-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-ana-dark truncate">{prod.name}</h4>
                          <span className="text-[10px] text-ana-primary font-black font-mono">{prod.price.toFixed(2)} €</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProduct(prod);
                              setIsFavoritesOpen(false);
                            }}
                            className="p-2 rounded bg-ana-primary/10 hover:bg-ana-primary text-ana-primary hover:text-white transition-all cursor-pointer"
                            title="Configurer / Personnaliser"
                          >
                            <SlidersHorizontal size={13} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prod.id)}
                            className="p-2 rounded text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                            title="Retirer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 bg-ana-bg/50 border-t border-ana-pale/40 text-center text-[10px] text-gray-400">
              * Vos coups de cœur sont stockés sur votre navigateur localement.
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR LATERAL: DRAWER MOBILE HAMBURGER (☰) --- */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-ana-dark/60 z-50 backdrop-blur-xs flex justify-start md:hidden"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-sm h-full flex flex-col justify-between shadow-2xl animate-[slide-left_0.3s_ease]"
          >
            {/* Header drawer search and close */}
            <div className="p-5 border-b border-ana-pale/60 bg-ana-bg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo.jpeg"
                    alt="Logo"
                    className="w-14 h-14 rounded-full object-cover border border-ana-pale bg-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-serif text-base font-black text-ana-primary leading-none">ANA FACTORY</h2>
                    <span className="text-[8px] font-bold text-ana-accent uppercase tracking-widest mt-1">Atelier Réunion</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-ana-primary hover:bg-ana-pale p-1.5 rounded-full cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Search input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Rechercher sur la boutique..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs py-2 px-3.5 pl-9 rounded-lg bg-white border border-gray-200 focus:outline-ana-primary outline-hidden"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-ana-primary" />
              </div>
            </div>

            {/* Content Lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Core Occasions Categories */}
              <div>
                <h3 className="text-[10px] font-black tracking-widest text-ana-primary uppercase pb-2 border-b border-ana-bg mb-2.5">
                  💎 Nos Collections principales
                </h3>
                <ul className="space-y-1 text-xs">
                  <li 
                    onClick={() => scrollToShopAndFilter("all")}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-ana-pale/20 transition-all cursor-pointer"
                  >
                    <span>✦ Toutes nos créations</span>
                    <ArrowRight size={10} />
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li 
                      key={cat.id}
                      onClick={() => scrollToShopAndFilter(cat.id)}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-ana-pale/20 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.emoji}</span>
                        <span>{cat.name.split(" ").slice(1).join(" ")}</span>
                      </span>
                      <ArrowRight size={10} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub categories menu dropdown toggle */}
              <div>
                <button
                  onClick={() => setIsMobileOccasionsOpen(!isMobileOccasionsOpen)}
                  className="w-full text-left text-[10px] font-black tracking-widest text-ana-accent uppercase pb-2 border-b border-ana-bg mb-2 flex items-center justify-between cursor-pointer"
                >
                  <span>🌿 Événements Calendrier</span>
                  <span>{isMobileOccasionsOpen ? "▲" : "▼"}</span>
                </button>
                {isMobileOccasionsOpen && (
                  <ul className="pl-2 space-y-1 text-xs py-1">
                    {[...OCCASION_COL_1, ...OCCASION_COL_2].map((occ) => (
                      <li 
                        key={occ}
                        onClick={() => {
                          const routeId = occ.includes("Baptême") ? "bapteme" : occ.includes("Noël") ? "fetes" : "all";
                          scrollToShopAndFilter(routeId);
                        }}
                        className="p-1.5 hover:text-ana-primary transition-colors cursor-pointer"
                      >
                        • {occ}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>

            <div className="p-4 bg-ana-bg text-center text-[10px] text-ana-dark/60 font-medium">
              🌍 Heures d'ouverture de l'atelier : Lun–Ven 9h–18h
              <div className="mt-1 text-ana-primary">Fait main à l'île de La Réunion 🌴🌺</div>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP WINDOW MODAL: LOGIN ACCOUNT (👤) --- */}
      {isAccountOpen && (
        <div 
          onClick={() => setIsAccountOpen(false)}
          className="fixed inset-0 bg-ana-dark/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-[fade_0.3s_ease]"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-ana-pale relative"
          >
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 text-ana-primary hover:bg-ana-pale p-1.5 rounded-full cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-2xl">🌿</span>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-ana-primary tracking-tight mt-1.5">
                Bienvenue chez AnaFactory
              </h3>
              <p className="text-[11px] text-gray-400 font-sans mt-1">
                Suivez vos commandes sur-mesure et accédez à vos designs personnalisés.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-2.5 bg-red-50 text-red-600 text-xs text-center font-semibold rounded-lg border border-red-100">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-black text-ana-dark tracking-wider mb-1">
                  Adresse Email :
                </label>
                <input 
                  type="email" 
                  placeholder="Ex: julie_974@gmail.com" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border-none focus:outline-ana-primary outline-hidden text-left"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-ana-dark tracking-wider mb-1">
                  Mot de passe :
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border-none focus:outline-ana-primary outline-hidden text-left"
                  required
                />
              </div>

              <div className="text-right text-[10px] text-gray-400 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </div>

              <button
                type="submit"
                className="w-full bg-ana-primary hover:bg-ana-dark text-white text-xs font-black tracking-widest py-3 rounded-lg uppercase transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md"
              >
                ME CONNECTER →
              </button>
            </form>

            <div className="border-t border-ana-bg pt-4 mt-5 text-center text-xs text-gray-400">
              Nouveau membre ? <span className="text-ana-primary font-bold hover:underline cursor-pointer" onClick={() => triggerToast("Création d'un compte direct in-app ✨")}>Créer un compte atelier</span>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP WINDOW MODAL: CHECKOUT & ADDRESS INPUT (🚚) --- */}
      {isCheckoutOpen && (
        <div 
          onClick={() => { if (!orderCompleted) setIsCheckoutOpen(false); }}
          className="fixed inset-0 bg-ana-dark/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-[fade_0.3s_ease]"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-ana-pale relative max-h-[90vh] overflow-y-auto"
          >
            {!orderCompleted ? (
              <>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 text-ana-primary hover:bg-ana-pale p-1.5 rounded-full cursor-pointer"
                >
                  ✕
                </button>

                <h3 className="font-serif text-xl sm:text-2xl font-black text-ana-primary leading-tight border-b border-ana-pale pb-3 mb-4 flex items-center gap-1.5">
                  <span>🚚</span> Validation de votre commande
                </h3>

                <form onSubmit={handleProcessCheckoutOrder} className="space-y-4">
                  
                  {/* Adresse livraison form */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-black tracking-widest uppercase text-ana-primary">
                      1. Adresse de Livraison
                    </h4>

                    <div>
                      <input 
                        type="text" 
                        placeholder="Adresse : Rue, numéro d'immeuble, etc." 
                        value={checkoutStreet}
                        onChange={(e) => setCheckoutStreet(e.target.value)}
                        className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border border-gray-100 focus:outline-ana-primary text-left"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Code Postal : Ex 97400" 
                          value={checkoutZip}
                          onChange={(e) => setCheckoutZip(e.target.value)}
                          className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border border-gray-100 focus:outline-ana-primary text-left"
                          required
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Ville : Ex Saint-Denis" 
                          value={checkoutCity}
                          onChange={(e) => setCheckoutCity(e.target.value)}
                          className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border border-gray-100 focus:outline-ana-primary text-left"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input 
                        type="text" 
                        placeholder="Numéro de Téléphone pour la livraison" 
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-ana-bg rounded-lg border border-gray-100 focus:outline-ana-primary text-left"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment partner information mock */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-black tracking-widest uppercase text-ana-primary mb-2">
                      2. Paiement Sécurisé (Médiateur bancaire local)
                    </h4>
                    <div className="p-3 bg-ana-pale/20 rounded-xl border border-ana-pale flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border text-ana-primary font-bold shrink-0">
                        💳 Sec
                      </div>
                      <div className="text-[11px] text-ana-dark/80">
                        <strong className="block">Dépôt sécurisé SSL (3D-Secure V2)</strong>
                        Débit à l'expédition après validation manuelle par l'Atelier sous 48h.
                      </div>
                    </div>
                  </div>

                  {/* Commande summary summary */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-black tracking-widest uppercase text-ana-accent mb-1.5">
                      3. Récapitulatif
                    </h4>
                    <div className="bg-ana-bg p-3.5 rounded-xl text-xs space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>Frais d'expédition :</span>
                        <span className="font-bold">{deliveryCost === 0 ? "Offerts" : `${deliveryCost.toFixed(2)} €`}</span>
                      </div>
                      <div className="flex justify-between text-ana-primary font-black pt-1.5 border-t border-dashed border-gray-200">
                        <span>TOTAL À PAYER TTC :</span>
                        <span>{grandTotal.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ana-primary hover:bg-ana-dark text-white text-xs font-black tracking-widest py-3.5 rounded-xl uppercase transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg"
                  >
                    🎉 PASSER COMMANDE & RÉGLER MON SOLDE
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center p-6 space-y-5 select-none">
                <span className="text-6xl inline-block animate-[bounce_1.5s_infinite]">🌺</span>
                <h3 className="font-serif text-2xl font-black text-green-700 leading-tight">
                  ✓ Commande Confirmée !
                </h3>
                <p className="text-xs text-ana-dark/80 max-w-md mx-auto leading-relaxed">
                  Merci infiniment de soutenir le travail artisanal péi de l'île de la Réunion. Notre artisan va inspecter et graver manuellement le bois de vos pièces.
                </p>
                <div className="bg-ana-bg p-4 rounded-xl max-w-sm mx-auto text-left text-[11px] space-y-1 font-mono border">
                  <div>🔢 <strong className="font-bold">Commande :</strong> #ANA-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div>📍 <strong className="font-bold text-ana-primary">Adresse :</strong> {checkoutStreet}, {checkoutZip} {checkoutCity}</div>
                  <div>📞 <strong className="font-bold">Téléphone :</strong> {checkoutPhone}</div>
                  <div>🚚 <strong className="font-bold">Statut :</strong> Préparation manuelle sous 10j</div>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderCompleted(false);
                    setCheckoutStreet("");
                    setCheckoutPhone("");
                  }}
                  className="bg-ana-primary hover:bg-ana-dark text-white text-xs font-black tracking-widest px-8 py-3 rounded-lg uppercase transition-all cursor-pointer"
                >
                  Fermer & Continuer l'Aventure
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- QUICK VIEW POPUP PERSONALIZATION MODAL --- */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddCustomizedItem}
        />
      )}

      {/* --- TOASTER SYSTEM BANNER --- */}
      <div 
        id="toasts-hub"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-black uppercase text-white tracking-widest transition-all duration-300 pointer-events-auto shrink-0 animate-[toastIn_0.3s_ease-out] border ${
              toast.type === "info"
                ? "bg-ana-dark border-ana-pale/20"
                : "bg-ana-primary border-white/10"
            }`}
          >
            <span className="shrink-0">{toast.type === "info" ? "💡" : "✓"}</span>
            <div className="flex-1 font-sans font-semibold normal-case select-none pr-1.5">
              {toast.message}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
