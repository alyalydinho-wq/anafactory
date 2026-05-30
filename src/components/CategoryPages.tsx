import React, { useState } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Percent, 
  Check, 
  CheckCircle,
  FileText,
  Bookmark,
  Calendar,
  Layers,
  ShoppingBag,
  Info,
  SlidersHorizontal,
  Flame,
  Star
} from "lucide-react";
import { Product } from "../types";
import { ProductCard, ProductSVG } from "./ProductCard";

interface CategoryPagesProps {
  pageId: string; // "marriage" | "birthdays" | "anniversaries" | "parties" | "gifts" | "invitations" | "crafts" | "promotions"
  allProducts: Product[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onQuickView: (prod: Product) => void;
  onAddToCartDirect: (prod: Product) => void;
  onBackToHome: () => void;
  triggerToast: (msg: string, type?: "success" | "info") => void;
}

export function CategoryPages({
  pageId,
  allProducts,
  favorites,
  onToggleFavorite,
  onQuickView,
  onAddToCartDirect,
  onBackToHome,
  triggerToast
}: CategoryPagesProps) {

  // --- 1. LOCAL STATES FOR INTERACTIVE MINI-TOOLS ---
  // A. Wedding coordinator tools
  const [weddingGuests, setWeddingGuests] = useState(80);
  const [weddingTheme, setWeddingTheme] = useState("champetre");
  const [weddingMaterial, setWeddingMaterial] = useState("goyavier");

  // B. Birthday Topper engine
  const [topperName, setTopperName] = useState("Clara");
  const [topperAge, setTopperAge] = useState("25");
  const [topperMat, setTopperMat] = useState("acrylic_gold");

  // C. Milestones anniversary engine
  const [selectedMilestone, setSelectedMilestone] = useState(5); // 5 years = Wood
  const [annivHusband, setAnnivHusband] = useState("Mathieu");
  const [annivWife, setAnnivWife] = useState("Audrey");

  // D. Checklist state for Parties
  const [checklist, setChecklist] = useState({
    date: true,
    invites: false,
    welcomeSign: false,
    favors: false,
    magnets: false
  });

  // E. Bulk pricing estimator
  const [selectedBulkItem, setSelectedBulkItem] = useState("dragees"); // dragees, places, magnets, bougies
  const [bulkQuantity, setBulkQuantity] = useState(60);

  // F. Calligraphy Card previewer
  const [customText, setCustomText] = useState("Julie & Thomas");
  const [selectedFont, setSelectedFont] = useState("serif");
  const [selectedPaper, setSelectedPaper] = useState("velin");

  // G. Materials guidance
  const [selectedMaterialTab, setSelectedMaterialTab] = useState("goyavier");

  // H. Promo helper state
  const [simulatedPromoTotal, setSimulatedPromoTotal] = useState(45.00);

  // --- CALCULATE FILTERED CLASSIFIED PRODUCTS ---
  // Simple mapping to fit our standard data categorizations in data.ts
  const getFilteredProducts = (): Product[] => {
    switch (pageId) {
      case "marriage":
        return allProducts.filter(p => p.category === "mariage" || p.id === 5 || p.id === 8);
      case "birthdays":
        return allProducts.filter(p => p.category === "anniv-adulte" || p.category === "anniv-enfant" || p.id === 3 || p.id === 7 || p.id === 13);
      case "anniversaries":
        return allProducts.filter(p => p.category === "valentin" || p.category === "mariage" || p.id === 6 || p.id === 12);
      case "naissance":
        return allProducts.filter(p => p.category === "naissance");
      case "parties":
        return allProducts.filter(p => p.category === "bapteme" || p.category === "fetes" || p.id === 1 || p.id === 4 || p.id === 10 || p.id === 14);
      case "gifts":
        return allProducts.filter(p => p.badge === "Personnalisable" || p.badge === "Populaire" || p.id === 1 || p.id === 5 || p.id === 8 || p.id === 11);
      case "invitations":
        return allProducts.filter(p => p.category === "papeterie" || p.category === "bapteme" || p.id === 4 || p.id === 14);
      case "crafts":
        return allProducts.filter(p => p.badge === "Fait main" || p.id === 2 || p.id === 5 || p.id === 9 || p.id === 12);
      case "promotions":
        // Simulated promotion items (we discount them in output listing or suggest nice bundle discount)
        return allProducts.slice(0, 6);
      default:
        return allProducts;
    }
  };

  const filteredList = getFilteredProducts();

  // Meta metadata for category layout design
  const getPageMeta = () => {
    switch (pageId) {
      case "marriage":
        return {
          title: "💍 Collection Mariage",
          subtitle: "Le raffinement de votre plus beau jour",
          desc: "Faites scintiller votre union grâce à nos panneaux de bienvenue rustiques, marque-places gravés à la Réunion et jolis souvenirs en bois précieux pour vos prestigieux convives.",
          bg: "bg-[#E8D5D3]",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
      case "birthdays":
        return {
          title: "🎂 Collection Anniversaire",
          subtitle: "Célébrez chaque étape en beauté",
          desc: "Sublimez votre fête avec nos Cake Toppers sur mesure de fabrication artisanale, kits de table floraux personnalisables et tasses souvenirs péi gravées à l'effigie des fêtés.",
          bg: "bg-white/60",
          textColor: "text-ana-dark",
          accentColor: "#B87B84"
        };
      case "anniversaries":
        return {
          title: "🌹 Anniversaires de Mariage",
          subtitle: "Gravez l'amour éternel pas à pas",
          desc: "Qu'il s'agisse de vos noces de coton ou d'un jalon d'or, découvrez des présents sentimentaux sur-mesure pour fêter votre couple avec noblesse et délicatesse.",
          bg: "bg-[#E8D5D3]",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
      case "naissance":
        return {
          title: "🍼 Collection Naissance",
          subtitle: "Célébrez l'arrivée de bébé",
          desc: "Découvrez notre douce sélection d'articles personnalisés pour fêter la naissance : porte-clés ourson, protège-carnets, pancartes et de magnifiques souvenirs.",
          bg: "bg-[#F7F5F2]",
          textColor: "text-ana-dark",
          accentColor: "#D28C77"
        };
      case "parties":
        return {
          title: "🕊️ Jolis Événements & Fêtes",
          subtitle: "Baptêmes, Communions & Célébrations Péi",
          desc: "Concevez une digne ambiance fleurie pour vos repas de famille. De nos boîtes à dragées botaniques aux magnifiques livres d'or, immortalisez l'allégresse de vos enfants.",
          bg: "bg-white/60",
          textColor: "text-ana-dark",
          accentColor: "#B87B84"
        };
      case "gifts":
        return {
          title: "🎁 Cadeaux Invités",
          subtitle: "Petites attentions, grands souvenirs",
          desc: "Remerciez tendrement les proches qui partagent vos moments de joie grâce à nos magnets gravés, bougies végétales coulées main aux senteurs de coton et mini herbiers peints.",
          bg: "bg-[#E8D5D3]",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
      case "invitations":
        return {
          title: "📜 Papeterie & Invitations",
          subtitle: "Le prélude de vos douces festivités",
          desc: "Chaque joli moment d'exception mérite un digne faire-part assorti. Découvrez des impressions délicates sur de prestigieux papiers velins recyclés d'origine certifiée.",
          bg: "bg-white/60",
          textColor: "text-ana-dark",
          accentColor: "#B87B84"
        };
      case "crafts":
        return {
          title: "🌿 L'Atelier Fait Main Péi",
          subtitle: "Savoir-faire, bois locaux & poésie",
          desc: "Découvrez notre engagement pour un artisanat d'art durable. Chaque pièce est taillée, poncée et gravée dans le bois du goyavier précieusement récupéré au cœur de nos belles hauteurs réunionnaises.",
          bg: "bg-[#E8D5D3]",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
      case "promotions":
        return {
          title: "★ Offres & Promotions",
          subtitle: "La poésie de l'artisanat au meilleur tarif",
          desc: "Profitez de nos offres combinées de saison ainsi que de la livraison offerte dès 80€ d'achat pour garnir votre décoration sans compromettre l'authenticité.",
          bg: "bg-[#F3EFE9]",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
      default:
        return {
          title: "Collection Spéciale",
          subtitle: "Créations à la Demande",
          desc: "Découvrez nos jolies créations faites avec amour.",
          bg: "bg-white",
          textColor: "text-ana-dark",
          accentColor: "#B5473C"
        };
    }
  };

  const meta = getPageMeta();

  // --- RENDER DEDICATED CUSTOM INTERACTIVE MINI-TOOLS ---
  const renderInteractiveTool = () => {
    switch (pageId) {
      case "marriage": {
        // Core interactive: Wedding Coordinator
        const baseDragéesQty = weddingGuests;
        const signSize = weddingGuests < 100 ? "Medium (50x70cm)" : "Grand (60x80cm)";
        const magnetsSouvenirCount = Math.ceil(weddingGuests * 0.8);
        const estTotal = (baseDragéesQty * 8.90 + 59.90 + magnetsSouvenirCount * 3.90).toFixed(2);

        // Noces Milestone
        const anniversaryMilestones = [
          { years: 1, name: "Noces de Coton", desc: "Le début de votre magnifique voyage commun. L'atelier vous propose de jolis sachets parfumés de lavande gravés de vos prénoms." },
          { years: 5, name: "Noces de Bois", desc: "Le cap de la longévité solide ! C'est le chef-d'œuvre de l'atelier : célébrez cela en gravant un magnifique panneau souvenir en chêne ou goyavier péi." },
          { years: 10, name: "Noces d'Étain", desc: "Dix ans de complicité. Ajoutez notre célèbre bougie artisanale aux herbes locales avec couvercle en étain brossé gravé de vos initiales." },
          { years: 25, name: "Noces d'Argent", desc: "Un quart de siècle d'amour précieux. Succombez à l'acrylique miroir argent d'une élégance absolue pour de magnifiques magnets décoratifs." },
          { years: 50, name: "Noces d'Or", desc: "L'apogée d'une vie de dévouement. Découvrez notre somptueux album photo relié or avec couverture toilée faite main aux éclats scintillants." }
        ];

        const activeMilestone = anniversaryMilestones.find(m => m.years === selectedMilestone) || anniversaryMilestones[1];

        return (
          <div className="flex flex-col gap-8">
          <div className="bg-white rounded-3xl border border-ana-pale/60 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💍</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-ana-dark">Coordinateur de Tablée AnaFactory</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Simulateur d'aménagement de cérémonie</p>
              </div>
            </div>

            <p className="text-xs text-ana-dark/70 leading-relaxed mb-6 font-sans">
              Planifiez au mieux vos accessoires de table et vos attentions cadeaux d'invités. Ajustez les jauges ci-dessous pour voir les recommandations instantanées :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sliders */}
              <div className="space-y-4 bg-ana-bg/40 p-4 rounded-xl border border-ana-pale/20">
                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">Nombre d'invités estimé : <strong className="text-ana-primary">{weddingGuests}</strong></label>
                  <input 
                    type="range" 
                    min="20" 
                    max="300" 
                    step="5"
                    value={weddingGuests} 
                    onChange={(e) => setWeddingGuests(Number(e.target.value))}
                    className="w-full accent-ana-primary"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-mono mt-0.5">
                    <span>20</span>
                    <span>150</span>
                    <span>300</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">Thématique Déco :</label>
                  <select 
                    value={weddingTheme} 
                    onChange={(e) => setWeddingTheme(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-ana-pale rounded-lg focus:outline-ana-primary"
                  >
                    <option value="champetre">Champêtre & Végétal 🌿</option>
                    <option value="boheme">Bohème Chic & Lin 🌹</option>
                    <option value="classique">Classique Chic Doré ✨</option>
                    <option value="exotique">Exotique Réunionnais 🌴</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">Essence de Bois phare :</label>
                  <select 
                    value={weddingMaterial} 
                    onChange={(e) => setWeddingMaterial(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-ana-pale rounded-lg focus:outline-ana-primary"
                  >
                    <option value="goyavier">Goyavier des Hauts (Prestigieux)</option>
                    <option value="pin">Pin Maritime Massif (Rustique)</option>
                    <option value="olivier">Bois d'Olivier noble (Chaud)</option>
                  </select>
                </div>
              </div>

              {/* Output Results */}
              <div className="col-span-2 space-y-4">
                <h5 className="font-serif text-sm font-bold text-ana-primary border-b border-ana-pale pb-1.5 flex items-center gap-1.5">
                  ⭐ Recommandations d'Aménagement Personnalisé
                </h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-ana-bg/60 p-3 rounded-xl border border-ana-pale/30 text-center">
                    <span className="font-mono text-xl font-black text-ana-primary">{baseDragéesQty}</span>
                    <p className="text-[10px] font-bold text-ana-dark uppercase mt-1">Sachets Dragées</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">1 par convive assis</p>
                  </div>
                  
                  <div className="bg-ana-bg/60 p-3 rounded-xl border border-ana-pale/30 text-center">
                    <span className="font-serif text-xs font-black text-nowrap text-[#C9A96E]">{signSize}</span>
                    <p className="text-[10px] font-bold text-ana-dark uppercase mt-1">Panneau d'Accueil</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Bois de pin gravé</p>
                  </div>

                  <div className="bg-ana-bg/60 p-3 rounded-xl border border-ana-pale/30 text-center">
                    <span className="font-mono text-xl font-black text-[#C9A96E]">{magnetsSouvenirCount}</span>
                    <p className="text-[10px] font-bold text-ana-dark uppercase mt-1">Magnets Cadeaux</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Pour laisser un joli souvenir</p>
                  </div>
                </div>

                <div className="bg-ana-bg/60 p-4 rounded-xl border border-ana-pale flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] font-black text-[#C9A96E] uppercase tracking-widest block">Estimation de l'ensemble d'artisanat</span>
                    <h5 className="font-serif text-base font-bold text-ana-dark mt-0.5">Finitions coordonnées personnalisées : <span className="font-mono text-ana-primary font-black">{estTotal} €</span></h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">Livraison par coursier offerte partout (France métropolitaine & Réunion)</p>
                  </div>
                  <button 
                    onClick={() => {
                      triggerToast("✨ Notre artisan-graveur prend note de votre besoin ! Nous vous contactons par chat pour la maquette.", "info");
                    }}
                    className="bg-ana-primary hover:bg-ana-dark text-white text-[9.5px] font-black tracking-widest px-4 py-2.5 rounded-lg uppercase transition-all duration-300 transform active:scale-95 whitespace-nowrap"
                  >
                    Discuter ma maquette
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-ana-pale/60 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌹</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-ana-dark">Milestone Noces de Mariage</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Sélectionnez votre nombre d'années d'amour</p>
              </div>
            </div>

            <p className="text-xs text-ana-dark/70 leading-relaxed mb-6 font-sans">
              Sélectionnez ci-dessous l'anniversaire de mariage que vous célébrez. Entrez vos prénoms pour voir une douce proposition de notre artisan :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year Selectors */}
              <div className="space-y-2">
                <span className="block text-[10px] uppercase font-bold text-ana-dark/70 mb-1">Nombre d'années :</span>
                {anniversaryMilestones.map((m) => (
                  <button
                    key={m.years}
                    onClick={() => setSelectedMilestone(m.years)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${selectedMilestone === m.years ? "bg-ana-primary text-white border-ana-primary font-bold shadow-md" : "bg-white border-ana-pale hover:bg-ana-pale/25 text-ana-dark"}`}
                  >
                    <span>{m.years} an{m.years > 1 ? "s" : ""} — {m.name}</span>
                    <Sparkles size={12} className={selectedMilestone === m.years ? "text-white animate-pulse" : "text-ana-primary"} />
                  </button>
                ))}
              </div>

              {/* Suggestion Card with customized preview names */}
              <div className="col-span-2 bg-ana-bg/60 border border-ana-pale/80 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h5 className="font-serif text-base font-bold text-ana-primary border-b border-ana-pale pb-2 flex items-center gap-2">
                    ✨ Recommendation Spéciale : {activeMilestone.name} ({selectedMilestone} ans)
                  </h5>
                  <p className="text-xs text-ana-dark/80 mt-3 leading-relaxed font-sans font-medium">
                    {activeMilestone.desc}
                  </p>

                  {/* Small simulation input box */}
                  <div className="flex gap-4 items-center mt-5">
                    <div className="flex-1">
                      <label className="block text-[9px] uppercase font-bold text-gray-400">Prénom 1 :</label>
                      <input 
                        type="text" 
                        value={annivHusband}
                        onChange={(e) => setAnnivHusband(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-ana-pale rounded-md"
                      />
                    </div>
                    <span className="text-ana-primary font-bold font-serif text-lg mt-3">♥</span>
                    <div className="flex-1">
                      <label className="block text-[9px] uppercase font-bold text-gray-400">Prénom 2 :</label>
                      <input 
                        type="text" 
                        value={annivWife}
                        onChange={(e) => setAnnivWife(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-ana-pale rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated preview image pattern */}
                <div className="mt-4 pt-4 border-t border-ana-pale/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-[#C9A96E] bg-white flex items-center justify-center font-serif text-xs font-black text-ana-primary shadow-xs">
                      {annivHusband[0] || "A"}+{annivWife[0] || "M"}
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] bg-ana-primary/10 text-ana-primary px-2 py-0.5 rounded-full font-black uppercase">Maquette Péi</span>
                      <p className="text-xs font-bold text-ana-dark/80 mt-1">Gravure : "{annivHusband} ❤️ {annivWife}"</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerToast(`🌿 Maquette "${annivHusband} & ${annivWife}" créée avec succès. Prêt pour gravure laser !`);
                    }}
                    className="bg-ana-primary hover:bg-ana-dark text-white text-[9.5px] font-black tracking-widest px-4 py-2.5 rounded-lg uppercase transition-all"
                  >
                    Valider le motif
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        );
      }





      case "parties": {
        return null;
      }

      case "gifts": {
        return null;
      }

      case "invitations": {
        // Core interactive: Custom calligraphy font & paper layout previewer
        return (
          <div className="bg-white rounded-3xl border border-ana-pale/60 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📜</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-ana-dark">Studio de Maquette Calligraphique</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Ressentez et personnalisez vos typographies</p>
              </div>
            </div>

            <p className="text-xs text-ana-dark/70 leading-relaxed mb-6 font-sans">
              Rédigez l'en-tête de votre faire-part. Changez la texture du papier et le style calligraphique d'un clic pour trouver l'harmonie poétique :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">En-tête / Prénoms à afficher :</label>
                  <input 
                    type="text" 
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full text-xs p-2.5 bg-ana-bg/60 border border-ana-pale rounded-lg focus:outline-ana-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">Style de Police calligraphiée :</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setSelectedFont("serif")}
                      className={`p-2 rounded text-[10.5px] font-bold border ${selectedFont === "serif" ? "bg-ana-primary text-white border-ana-primary" : "bg-white border-ana-pale"}`}
                    >
                      Elegant Serif
                    </button>
                    <button 
                      onClick={() => setSelectedFont("cursive")}
                      className={`p-2 rounded text-[10.5px] font-bold border ${selectedFont === "cursive" ? "bg-ana-primary text-white border-ana-primary" : "bg-white border-ana-pale"}`}
                    >
                      Bohème Cursive
                    </button>
                    <button 
                      onClick={() => setSelectedFont("clean")}
                      className={`p-2 rounded text-[10.5px] font-bold border ${selectedFont === "clean" ? "bg-ana-primary text-white border-ana-primary" : "bg-white border-ana-pale"}`}
                    >
                      Minimal Sans
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ana-dark mb-1">Texture Papier d'Art :</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setSelectedPaper("velin")}
                      className={`p-2 rounded text-[10px] font-bold border ${selectedPaper === "velin" ? "bg-[#C9A96E] text-white border-[#C9A96E]" : "bg-white border-ana-pale"}`}
                    >
                      Velin Blanc 320g
                    </button>
                    <button 
                      onClick={() => setSelectedPaper("lin")}
                      className={`p-2 rounded text-[10px] font-bold border ${selectedPaper === "lin" ? "bg-[#C9A96E] text-white border-[#C9A96E]" : "bg-white border-ana-pale"}`}
                    >
                      Toilé Lin Coco 350g
                    </button>
                    <button 
                      onClick={() => setSelectedPaper("kraft")}
                      className={`p-2 rounded text-[10px] font-bold border ${selectedPaper === "kraft" ? "bg-[#C9A96E] text-white border-[#C9A96E]" : "bg-white border-ana-pale"}`}
                    >
                      Kraft Recyclé 300g
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 bg-ana-bg p-2.5 rounded-lg border border-ana-pale/50 flex items-center gap-1.5 leading-none">
                  <Info size={12} className="text-[#C9A96E]" />
                  <span>Chaque sachet d'invitation est imprimé avec de l'encre végétale sans solvant.</span>
                </div>
              </div>

              {/* Rendering Card */}
              <div className="border border-ana-pale/60 rounded-2xl p-6 aspect-video flex flex-col justify-between shadow-xl text-center relative overflow-hidden"
                   style={{
                     backgroundColor: selectedPaper === "velin" ? "#FAF9F6" : selectedPaper === "lin" ? "#EFECE6" : "#E8D9C5",
                     borderColor: "#D4C7B3"
                   }}>
                
                {/* Visual botanical leafy branches corners */}
                <div className="absolute top-2 left-2 w-10 h-10 border-t border-l opacity-25" style={{ borderColor: "#B5473C" }}></div>
                <div className="absolute bottom-2 right-2 w-10 h-10 border-b border-r opacity-25" style={{ borderColor: "#B5473C" }}></div>

                <span className="text-[8px] tracking-[0.3em] font-black text-gray-400 uppercase leading-none">Faire-part d'Honorable Célébration</span>
                
                <div className="my-auto py-4">
                  <h3 className="tracking-wide leading-tight px-2"
                      style={{
                        fontFamily: selectedFont === "serif" ? "Georgia, serif" : selectedFont === "cursive" ? "'Brush Script MT', cursive" : "monospace",
                        fontSize: selectedFont === "cursive" ? "2.3rem" : "1.8rem",
                        fontWeight: "italic",
                        color: "#3A211B"
                      }}>
                    {customText || "Mélissa & Simon"}
                  </h3>
                  <p className="text-[9.5px] uppercase font-bold tracking-widest text-[#C9A96E] mt-3">Seraient ravis de vous compter parmi eux</p>
                </div>

                <div className="flex justify-between items-center text-[8.5px] font-mono text-gray-400">
                  <span>ATELIER REUNION</span>
                  <span>PREPARATION 10J</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "crafts": {
        // Core interactive: Custom Material Inspector
        return (
          <div className="bg-white rounded-3xl border border-ana-pale/60 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌲</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-ana-dark">Explorateur de Matières Réunionnaises</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold font-bold">Sensibilité écologique & Approvisionnement solidaire</p>
              </div>
            </div>

            <p className="text-xs text-ana-dark/70 leading-relaxed mb-6 font-sans font-medium">
              Chez AnaFactory, la matière raconte une histoire de terroir. Cliquez sur les essences locales et observez l'impact écologique :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Materials list selection */}
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedMaterialTab("goyavier")}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${selectedMaterialTab === "goyavier" ? "bg-ana-primary text-white border-ana-primary font-bold shadow-md" : "bg-white hover:bg-ana-pale/25 border-ana-pale text-ana-dark"}`}
                >
                  <span>🌿 Bois de Goyavier Péi</span>
                  <span>→</span>
                </button>

                <button 
                  onClick={() => setSelectedMaterialTab("pin")}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${selectedMaterialTab === "pin" ? "bg-ana-primary text-white border-ana-primary font-bold shadow-md" : "bg-white hover:bg-ana-pale/25 border-ana-pale text-ana-dark"}`}
                >
                  <span>🌲 Pin Massif Maritime</span>
                  <span>→</span>
                </button>

                <button 
                  onClick={() => setSelectedMaterialTab("olivier")}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${selectedMaterialTab === "olivier" ? "bg-ana-primary text-white border-ana-primary font-bold shadow-md" : "bg-white hover:bg-ana-pale/25 border-ana-pale text-ana-dark"}`}
                >
                  <span>🫒 Bois d'Olivier noble</span>
                  <span>→</span>
                </button>
              </div>

              {/* Inspector board */}
              <div className="col-span-2 bg-ana-bg/60 border border-ana-pale rounded-2xl p-5 flex flex-col justify-between">
                {selectedMaterialTab === "goyavier" ? (
                  <div className="space-y-3">
                    <span className="text-[9px] bg-[#B5473C] text-white px-2 py-0.5 rounded-full font-bold uppercase">100% Endémique Réunion</span>
                    <h5 className="font-serif text-base font-bold text-ana-dark">Bois de Goyavier des Hauts</h5>
                    <p className="text-xs text-ana-dark/80 leading-relaxed">
                      Le goyavier est une espèce pionnière envahissante coupée pour régénérer la forêt primaire de la Réunion. En achetant des marque-places ou cadres en Goyavier, vous aidez financièrement la préservation de la flore endémique péi.
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] text-gray-500 font-bold uppercase">
                      <div className="bg-white p-2 rounded text-center">Densité : Forte</div>
                      <div className="bg-white p-2 rounded text-center">Origine : Saint-Benoît</div>
                      <div className="bg-white p-2 rounded text-center">Impact : Positif 🌱</div>
                    </div>
                  </div>
                ) : selectedMaterialTab === "pin" ? (
                  <div className="space-y-3">
                    <span className="text-[9px] bg-green-700 text-white px-2 py-0.5 rounded-full font-bold uppercase">Éco-certifié FSC</span>
                    <h5 className="font-serif text-base font-bold text-ana-dark">Pin maritime à grandes fibres</h5>
                    <p className="text-xs text-ana-dark/80 leading-relaxed font-sans">
                      D'origine forestière contrôlée, le pin maritime propose de superbes nœuds et une surface texturée. Idéal pour faire ressortir l'authenticité de nos grands panneaux de bienvenue peints à l'atelier.
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] text-gray-500 font-bold uppercase">
                      <div className="bg-white p-2 rounded text-center">Densité : Moyenne</div>
                      <div className="bg-white p-2 rounded text-center">Finition : Poncé à l'huile</div>
                      <div className="bg-white p-2 rounded text-center">Impact : Neutre 🌲</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[9px] bg-[#C9A96E] text-white px-2 py-0.5 rounded-full font-bold uppercase">Prestige Noble</span>
                    <h5 className="font-serif text-base font-bold text-ana-dark">Bois d'Olivier sauvage veiné</h5>
                    <p className="text-xs text-ana-dark/80 leading-relaxed font-sans">
                      L'olivier sauvage se distingue par ses cernes de croissance de couleur miel mâtinées de brun foncé très contrastées. Particulièrement dur et imperméable, il offre d'admirables porte-clés qui vieilliront avec splendeur.
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] text-gray-500 font-bold uppercase">
                      <div className="bg-white p-2 rounded text-center">Densité : Très Forte</div>
                      <div className="bg-white p-2 rounded text-center font-sans uppercase">Entretien : Huile de lin</div>
                      <div className="bg-white p-2 rounded text-center">Finition : Satinée ✨</div>
                    </div>
                  </div>
                )}

                <div className="text-[10.5px] italic text-gray-400 mt-4 pt-3 border-t border-ana-pale/40">
                  * Conseil d'artisan : Nourrissez vos objets en bois une fois par an avec un filet d'huile de lin biologique pour préserver l'éclat de la gravure.
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "promotions": {
        // Core interactive: Promo bundle slider progress towards Free shipping
        const gapLeft = Math.max(0, 80 - simulatedPromoTotal);
        const shippingPercent = Math.min(100, Math.round((simulatedPromoTotal / 80) * 100));

        return (
          <div className="bg-white rounded-3xl border border-ana-pale/60 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-ana-dark">Seuil de Livraison Gratuite - Jauge</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Optimisez votre panier et faites d'immenses économies</p>
              </div>
            </div>

            <p className="text-xs text-ana-dark/70 leading-relaxed mb-6 font-sans">
              Ajoutez des lots d'ateliers simulés pour débloquer automatiquement la gratuité de la livraison postale à 80€ :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Simulation additions */}
              <div className="space-y-3">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Compléter mon lot d'essai :</span>
                
                <button 
                  onClick={() => {
                    setSimulatedPromoTotal(prev => prev + 12.90);
                    triggerToast("🌻 Ajouté au panier d'essai : Cake Topper Prénom (12.90€)");
                  }}
                  className="w-full text-left p-2.5 rounded bg-white hover:bg-ana-pale/30 border border-ana-pale text-[11px] font-bold text-ana-dark flex justify-between"
                >
                  <span>🍰 Cake Topper Prénom</span>
                  <span className="text-ana-primary">12.90 €</span>
                </button>

                <button 
                  onClick={() => {
                    setSimulatedPromoTotal(prev => prev + 34.90);
                    triggerToast("🌻 Ajouté au panier d'essai : Kit tablée complète (34.90€)");
                  }}
                  className="w-full text-left p-2.5 rounded bg-white hover:bg-ana-pale/30 border border-ana-pale text-[11px] font-bold text-ana-dark flex justify-between"
                >
                  <span>🍽️ Kit d'aménagement de Table</span>
                  <span className="text-ana-primary">34.90 €</span>
                </button>

                <button 
                  onClick={() => {
                    setSimulatedPromoTotal(45.00);
                    triggerToast("Panier d'essai réinitialisé à 45.00€.");
                  }}
                  className="w-full p-2 rounded text-center text-[10px] uppercase font-black text-gray-400 hover:text-ana-primary block"
                >
                  Réinitialiser le panier d'essai
                </button>
              </div>

              {/* Progress visual */}
              <div className="col-span-2 space-y-4 bg-ana-bg/40 p-5 rounded-2xl border border-ana-pale">
                <div className="flex justify-between text-xs text-ana-dark">
                  <span>Montant de votre commande :</span>
                  <span className="font-mono font-black text-ana-primary text-sm">{simulatedPromoTotal.toFixed(2)} €</span>
                </div>

                {/* Progressive meter */}
                <div>
                  <div className="relative w-full h-3.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div className="absolute top-0 bottom-0 left-0 bg-ana-primary rounded-full transition-all duration-500"
                         style={{ width: `${shippingPercent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-[#C9A96E] font-bold uppercase tracking-widest mt-1.5">
                    <span>0 €</span>
                    <span>Optimisation</span>
                    <span>80 € (Port offert)</span>
                  </div>
                </div>

                {gapLeft > 0 ? (
                  <div className="p-3 bg-white rounded-xl border border-ana-pale text-[#C9A96E] text-xs font-semibold leading-relaxed flex items-center gap-2">
                    <span className="text-base">🚚</span>
                    <span>Plus que <strong className="font-mono text-ana-primary text-sm font-bold">{gapLeft.toFixed(2)} €</strong> d'achat à pourvoir pour obtenir la <strong>livraison offerte</strong> vers la France & La Réunion !</span>
                  </div>
                ) : (
                  <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-green-700 text-xs font-black leading-relaxed flex items-center gap-2 animate-bounce">
                    <span className="text-base">🎉</span>
                    <span>Félicitations ! Votre seuil de gratuité d'expédition de 80€ est déverrouillé ! Livraison d'Atelier offerte.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 animate-[fade-in_0.5s_ease-out]">
      
      {/* 1. BUTTON TO GO BACK WITH STYLIZED ARROW CONTAINER */}
      <div>
        <button 
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white hover:bg-ana-primary text-ana-primary hover:text-white px-4.5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase border border-ana-pale hover:border-ana-primary shadow-xs transition-all cursor-pointer transform hover:-translate-x-1"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </button>
      </div>

      {/* 2. DEDICATED BANNER HERO PAGE STYLE */}
      <div className={`rounded-3xl p-8 sm:p-12 md:p-14 ${meta.bg} ${meta.textColor} relative overflow-hidden shadow-xs border border-ana-pale/40`}>
        {/* Abstract design botanical rings overlay */}
        <div className="absolute top-0 right-0 pointer-events-none opacity-5 text-ana-primary scale-150 transform rotate-45 select-none font-serif">
          🌴 💍 🌸
        </div>

        <div className="relative z-10 max-w-2xl text-left">
          <span className="text-[10px] bg-white/75 backdrop-blur-xs px-3 py-1 rounded-full font-black text-ana-primary uppercase tracking-[0.25em] inline-block mb-4">
            Atelier AnaFactory
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-none mb-3">
            {meta.title}
          </h2>
          <p className="font-serif italic text-[#C9A96E] text-sm sm:text-lg tracking-wide font-black mb-4">
            {meta.subtitle}
          </p>
          <p className="font-sans text-xs sm:text-sm text-ana-dark/70 font-medium leading-relaxed max-w-xl">
            {meta.desc}
          </p>
        </div>
      </div>

      {/* 3. DEDICATED HIGH FIDELITY INTERACTIVE TOOLS */}
      {(() => {
        const interactiveTool = renderInteractiveTool();
        if (!interactiveTool) return null;
        return (
          <div className="border-t border-b border-ana-pale/60 py-6">
            <div className="mb-6 text-left">
              <span className="text-[10px] font-black text-[#C9A96E] uppercase tracking-widest">Atelier Créatif</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ana-dark">Assistant d'aménagement & Simulation</h3>
            </div>
            {interactiveTool}
          </div>
        );
      })()}

      {/* 4. DEDICATED GRID CATALOG SHOWING SPECIFIC ITEMS FOR THIS REFRESH VIEW */}
      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="text-left">
            <span className="text-[10px] font-black text-ana-primary uppercase tracking-widest">Produits coordonnés</span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-ana-dark">Découvrir les réalisations ({filteredList.length})</h3>
          </div>
          <span className="text-[10.5px] text-gray-400 italic font-medium leading-none">Sélections d'artisanat d'art de l'atelier pays</span>
        </div>

        {filteredList.length === 0 ? (
          <div className="bg-white p-14 text-center rounded-2xl border border-dashed border-ana-pale text-xs text-gray-400 italic">
            Aucun article n'est actuellement mis en avant pour cette catégorie. De nouvelles créations arrivent bientôt !
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredList.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isFavorite={favorites.includes(prod.id)}
                onToggleFavorite={() => onToggleFavorite(prod.id)}
                onQuickView={() => onQuickView(prod)}
                onAddToCartDirect={() => onAddToCartDirect(prod)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 5. SECONDARY CALL TO ACTION OUTLINE */}
      <div className="bg-ana-dark text-white rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden select-none border border-white/5 shadow-md">
        <h4 className="font-serif text-2xl font-black tracking-wide mb-2 text-white">Une personnalisation sur-mesure non listée ?</h4>
        <p className="text-xs text-ana-pale/70 max-w-lg mx-auto mb-6 leading-relaxed">
          Nous créons d'admirables herbiers pressés, toiles florales et gravures à vos dimensions exactes. Contactez directement Mellie à l'atelier via notre messagerie pour concrétiser vos jolis songes.
        </p>
        <button 
          onClick={() => {
            const footerEl = document.getElementById("main-footer");
            footerEl?.scrollIntoView({ behavior: "smooth" });
            triggerToast("L'atelier de la Réunion est ravi de vous écouter ! Écrivez-nous ci-dessous ✉️", "info");
          }}
          className="bg-ana-primary hover:bg-[#E8D5D3] text-white hover:text-ana-dark font-sans text-xs font-black tracking-widest px-6 py-3 rounded-lg uppercase transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          Écrire un message à l'Atelier
        </button>
      </div>

    </div>
  );
}
