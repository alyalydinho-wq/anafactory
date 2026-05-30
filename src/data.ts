import { Product, Category, Review } from "./types";

export const CATEGORIES: Category[] = [
  { id: "marriage", name: "💍 Mariage", emoji: "💍", color: "#E8D5D3", image: "/mariage.jpg" },
  { id: "birthdays", name: "🎂 Anniversaires", emoji: "🎂", color: "#F7F5F2", image: "/anniversaire.jpg" },
  { id: "anniversaries", name: "🌹 Noces d'Amour", emoji: "🌹", color: "#E8D5D3", image: "/nocedamour.jpg" },
  { id: "parties", name: "🕊️ Baptêmes & Fêtes", emoji: "🕊️", color: "#F7F5F2", image: "/bapteme.jpg" },
  { id: "gifts", name: "🎁 Cadeaux Invités", emoji: "🎁", color: "#E8D5D3", image: "/cadeauinvitée.jpg" },
  { id: "invitations", name: "📜 Faire-part", emoji: "📜", color: "#F7F5F2", image: "/fairepart.jpg" },
  { id: "crafts", name: "🌿 L'Atelier Réunion", emoji: "🌿", color: "#E8D5D3", image: "/latelierreunion.jpg" },
  { id: "promotions", name: "★ Offres & Promos", emoji: "★", color: "#F7F5F2", image: "/offrepromo.jpg" }
];

export const COUPS_DE_COEUR: Product[] = [
  {
    id: 1,
    name: "Caramel beurre salé",
    price: 4.50,
    badge: "Populaire",
    category: "bapteme",
    rating: 5,
    salesCount: 142,
    icon: "gift",
    color: "#E8D5D3",
    description: "Somptueux caramel au beurre salé artisanal, fait maison avec amour au cœur de La Réunion. Une texture onctueuse et gourmande inimitable.",
    details: ["Contenance : Pot en verre de 120g", "Ingrédients : Sucre de canne, beurre de La Réunion, fleur de sel, crème fraîche", "Sans conservateurs ni arômes artificiels", "Fait main artisanalement"],
    image: "/Caramel beurre salé 4,50€.jpeg"
  },
  {
    id: 2,
    name: "Biscuits sablés",
    price: 3.80,
    badge: "Fait main",
    category: "bapteme",
    rating: 5,
    salesCount: 88,
    icon: "cookie",
    color: "#B5473C",
    description: "De délicieux biscuits sablés pur beurre, méticuleusement dorés au four et personnalisables pour un événement croquant d'originalité.",
    details: ["Matière première : Ingrédients nobles locaux", "Sablé croquant et fondant", "Estampage personnalisé sur demande", "Sachet individuel kraft hermétique"],
    image: "/Biscuits sablés 3.80€.jpeg"
  },
  {
    id: 3,
    name: "Bouteille mignonnette",
    price: 5.50,
    badge: "Personnalisable",
    category: "bapteme",
    rating: 5,
    salesCount: 224,
    icon: "glass",
    color: "#B87B84",
    description: "Délicate petite bouteille mignonnette en verre avec bouchon hermétique en liège naturel, parfaite pour offrir un souvenir éco-responsable et chaleureux à vos convives.",
    details: ["Contenance : 50 ml", "Matière : Verre robuste de haute qualité", "Fermeture : Bouchon en liège naturel inclus", "Étiquette et gravure entièrement personnalisables"],
    image: "/Bouteille mignonnette 5,50€.jpeg"
  },
  {
    id: 4,
    name: "Sac ourson",
    price: 33.90,
    badge: "Fait main",
    category: "naissance",
    rating: 5,
    salesCount: 142,
    icon: "pocket",
    color: "#F7F5F2",
    description: "Adorable sac ourson en peluche ultra-douce ou lin naturel, entièrement cousu main. Une création poétique et rassurante personnalisable au prénom de l'enfant.",
    details: ["Matière : Velours de coton biologique ou lin écru", "Dimensions : 24 x 20 cm, parfait pour doudou et tétine", "Fermeture sécurisée et bretelles ajustables douces", "Broderie personnalisée réalisée avec soin à La Réunion"],
    image: "/Sac ourson 33.90€.jpeg"
  },
  {
    id: 5,
    name: "Protège Carnet de Sante",
    price: 22.90,
    badge: "Fait main",
    category: "naissance",
    rating: 5,
    salesCount: 154,
    icon: "book",
    color: "#E8D5D3",
    description: "Superbe protège carnet de santé artisanal confectionné avec amour à La Réunion. Un tissu matelassé extrêmement doux et moelleux pour envelopper de tendresse les documents précieux de bébé.",
    details: ["Matière : Coton certifié Oeko-Tex matelassé de première qualité", "Dimensions : 17 x 23 cm (format universel pour carnets de santé français)", "Fermeture par bouton-pression élégant et sécurisé", "Personnalisation brodée avec le prénom et fleurs de décoration"],
    image: "/Protege Carnet de Sante 22.90€.jpeg"
  },
  {
    id: 6,
    name: "Tableau imprimé GM 50x70",
    price: 89.00,
    badge: "Populaire",
    category: "bapteme",
    rating: 5,
    salesCount: 119,
    icon: "image",
    color: "#B5473C",
    description: "Splendide tableau imprimé grand format (50x70 cm) pour immortaliser vos plus précieux moments. Une impression haute définition réalisée avec soin à La Réunion.",
    details: ["Dimensions : 50x70 cm (Grand Modèle)", "Papier : Papier photo mat haut de gamme 230g", "Type d'impression : Jet d'encre pigmentaire HD haute durabilité", "Personnalisation intégrale du visuel, des noms et de la date"],
    image: "/Tableau imprimé GM 50x70 89€.jpeg"
  },
  {
    id: 7,
    name: "Miel",
    price: 4.00,
    badge: "Personnalisable",
    category: "bapteme",
    rating: 5,
    salesCount: 168,
    icon: "heart",
    color: "#B87B84",
    description: "Un précieux petit pot de miel artisanal personnalisé de La Réunion, garni de miel de fleurs sauvages doux et crémeux, prêt à ravir vos convives.",
    details: ["Contenance : 40g net", "Origine : Miel artisanal récolté localement à La Réunion", "Inclus : Cuillère en bois à miel miniature en option", "Personnalisation du couvercle en tissu et étiquette kraft"],
    image: "/Miel 4€.jpeg"
  },
  {
    id: 8,
    name: "Carré chocolat",
    price: 1.20,
    badge: "Personnalisable",
    category: "bapteme",
    rating: 5,
    salesCount: 420,
    icon: "gift",
    color: "#F7F5F2",
    description: "Un délicieux carré de chocolat fin enveloppé d'un emballage personnalisé pour ajouter une touche gourmande et attentionnée à vos tables de fête.",
    details: ["Matière : Chocolat au lait supérieur 37% de cacao ou noir 70%", "Dimensions : 3.5 x 3.5 cm par carré", "Emballage kraft personnalisé imprimé localement", "Conservation : Dans un endroit frais et sec (16-18°C)"],
    image: "/Carré chocolat 1.20€.jpeg"
  }
];

export const NOUVEAUTES: Product[] = [
  {
    id: 9,
    name: "Bertel vide",
    price: 3.70,
    badge: "Nouveau",
    category: "bapteme",
    rating: 5,
    salesCount: 22,
    icon: "pocket",
    color: "#E8D5D3",
    description: "Un authentique bertel traditionnel en feuilles de vacoa tressées à la main à La Réunion. Idéal comme contenant de dragées ou élément de décoration traditionnel.",
    details: ["Matière : Feuilles de vacoa 100% naturelles tressées", "Format : Poche plate ouverte traditionnelle", "Dimensions : 8 x 10 cm environ", "Savoir-faire artisanal réunionnais préservé"],
    image: "/Bertel vide 3,70€!.jpeg"
  },
  {
    id: 10,
    name: "Bouquet savon",
    price: 5.00,
    image: "/Bouquet savon 5€.jpeg",
    badge: "Nouveau",
    category: "bapteme",
    rating: 5,
    salesCount: 34,
    icon: "book",
    color: "#B5473C",
    description: "Album à couverture rigide toilée lin beige, rehaussée d'une illustration botanique minimaliste et d'une gravure personnalisée.",
    details: ["Pages : 40 pages blanches épaisses 250g de haute tenue", "Dimensions : 21 x 21 cm", "Idéal pour coller des tirages ou écrire des mots doux", "Reliure cousue haut de gamme à ouverture bien à plat"]
  },
  {
    id: 11,
    name: "Boîte dragées",
    price: 3.50,
    image: "/Boîte dragées 3.50€.jpeg",
    badge: "Nouveau",
    category: "bapteme",
    rating: 4,
    salesCount: 180,
    icon: "pocket",
    color: "#B87B84",
    description: "Sachet d'organza fin blanc mâtiné de lin pour dragées ou fleurs séchées de lavande. Étiquette en bois ou papier kraft personnalisée suspendue.",
    details: ["Dimension : 8 x 10 cm", "Étiquette fournie imprimée ou gravée", "Fermeture par lien coulissant de satin blanc", "Parfait pour offrir de petits bijoux ou des douceurs créoles"]
  },
  {
    id: 12,
    name: "Pancarte naissance",
    price: 40.00,
    image: "/Pancarte naissance 40€.jpeg",
    badge: "Nouveau",
    category: "naissance",
    rating: 5,
    salesCount: 95,
    icon: "key",
    color: "#F7F5F2",
    description: "Porte-clés gravé sur bois d'olivier veiné d'une rare élégance. Idéal comme petit présent pour la fête des mères ou des pères.",
    details: ["Matière : Bois d'olivier huilé avec grain unique", "Dimensions du pendentif : 5.5 x 2.2 cm", "Anneau fendu solide en acier inoxydable brossé", "Épaisseur : 5 mm ultra résistant aux chocs quotidiens"]
  },
  {
    id: 13,
    name: "prénom plexi",
    price: 40.00,
    image: "/prenom plexi 40€.jpeg",
    badge: "Nouveau",
    category: "naissance",
    rating: 5,
    salesCount: 47,
    icon: "coffee",
    color: "#E8D5D3",
    description: "Mug en céramique blanche mate avec anse ergonomique. Sublimation de splendides aquarelles de feuilles tropicales réunionnaises et personnalisation.",
    details: ["Contenance : 325 ml", "Impression de qualité premium inaltérable par sublimation", "Passe au micro-ondes et au lave-vaisselle sans problème", "Livré dans sa boîte en carton recyclé protectrice"]
  },
  {
    id: 14,
    name: "Marque page bois",
    price: 12.00,
    image: "/Marque page bois 12€.jpeg",
    badge: "Nouveau",
    category: "fetes",
    rating: 5,
    salesCount: 15,
    icon: "clipboard",
    color: "#B5473C",
    description: "Cartoline de vœux scintillante de dorure à chaud au reflet or avec enveloppe assortie chic pour des fêtes magiques.",
    details: ["Dimension : Format carte postale standard (10.5x14.8 cm)", "Façonnage : Dorure à chaud véritable pressé artisanalement", "Papier haut de gamme lin 350g chic", "Création graphique originale et exclusive"]
  },
  {
    id: 15,
    name: "Porte clé ourson",
    price: 12.00,
    image: "/Porte clé ourson 12€.jpeg",
    badge: "Nouveau",
    category: "naissance",
    rating: 5,
    salesCount: 28,
    icon: "image",
    color: "#B87B84",
    description: "Cadre en bois brut à double paroi de verre. Glissez-y la photo de bébé, entourée d'un délicat herbier pressé de fleurs de letchi ou d'eucalyptus.",
    details: ["Taille totale : 20 x 25 cm", "Fleurs pressées à la main séchées patiemment", "Système d'ouverture facile avec agrafes parisiennes", "Bois de pin naturel certifié éco-géré"]
  },
  {
    id: 16,
    name: "Topper bois",
    price: 12.00,
    image: "/Topper bois 12€.jpeg",
    badge: "Nouveau",
    category: "mariage",
    rating: 4,
    salesCount: 120,
    icon: "scissors",
    color: "#F7F5F2",
    description: "Mètre de ruban satiné soyeux imprimé en continu avec votre texte doré. Idéal pour attacher les bouquets ou sceller les boîtes repas de noces.",
    details: ["Largeur : 15 mm de pur satin", "Prix par mètre linéaire", "Impression or métallique à chaud très nette", "Choix de plus de 12 polices d'écriture romantiques"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "La Réunion",
    rating: 5,
    comment: "Les boîtes à dragées pour le baptême de ma fille étaient magnifiques, exactement ce que j'avais demandé ! Tout le monde a adoré l'attention personnalisée.",
    initials: "SM"
  },
  {
    id: 2,
    name: "Christelle R.",
    location: "Paris",
    rating: 5,
    comment: "Panneau de bienvenue mariage sublime. Livraison ultra rapide en métropole sous 8 jours, emballage très soigné et protecteur. Merci infiniment AnaFactory !",
    initials: "CR"
  },
  {
    id: 3,
    name: "Fatima K.",
    location: "Marseille",
    rating: 5,
    comment: "Produit encore plus beau en vrai qu'en photo ! On sent la passion du travail artisanal fait main. Le service client m'a contacté pour ajuster l'écriture, au top.",
    initials: "FK"
  }
];
