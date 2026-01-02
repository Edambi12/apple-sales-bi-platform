export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const categories = [
  { id: "all", name: "Tous", icon: "Grid3X3" },
  { id: "phones", name: "Téléphones", icon: "Smartphone" },
  { id: "laptops", name: "Ordinateurs", icon: "Laptop" },
  { id: "tablets", name: "Tablettes", icon: "Tablet" },
  { id: "audio", name: "Audio", icon: "Headphones" },
  { id: "wearables", name: "Montres", icon: "Watch" },
  { id: "accessories", name: "Accessoires", icon: "Cable" },
];

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "phones",
    price: 1199,
    description: "Le smartphone le plus avancé jamais conçu. Avec sa puce A17 Pro révolutionnaire, son design en titane et son système de caméra professionnel, l'iPhone 15 Pro repousse les limites de ce qu'un téléphone peut accomplir.",
    shortDescription: "Titane. Action. Performance titanesque.",
    features: [
      "Puce A17 Pro avec GPU 6 cœurs",
      "Système de caméra Pro 48 MP",
      "Design en titane de qualité aérospatiale",
      "Bouton Action personnalisable",
      "USB-C avec USB 3",
      "Autonomie jusqu'à 29 heures"
    ],
    specifications: {
      "Écran": "Super Retina XDR 6,1\"",
      "Puce": "A17 Pro",
      "Stockage": "256 Go - 1 To",
      "Caméra": "Triple 48 MP + 12 MP + 12 MP",
      "Batterie": "Jusqu'à 29h vidéo",
      "Résistance": "IP68"
    },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Titane naturel", hex: "#8A8D8F" },
      { name: "Titane bleu", hex: "#394E6A" },
      { name: "Titane blanc", hex: "#F5F5F0" },
      { name: "Titane noir", hex: "#3C3C3D" }
    ],
    rating: 4.9,
    reviewCount: 2847,
    inStock: true,
    isNew: true
  },
  {
    id: "macbook-pro-16",
    name: "MacBook Pro 16\"",
    category: "laptops",
    price: 2699,
    originalPrice: 2999,
    description: "La puissance d'un studio dans votre sac. Équipé de la puce M3 Max, le MacBook Pro 16 pouces offre des performances extraordinaires pour les workflows professionnels les plus exigeants.",
    shortDescription: "Puissance maximale. Portabilité ultime.",
    features: [
      "Puce M3 Max jusqu'à 16 cœurs CPU",
      "Jusqu'à 128 Go de mémoire unifiée",
      "Écran Liquid Retina XDR",
      "Autonomie jusqu'à 22 heures",
      "Système audio six haut-parleurs",
      "Connectivité complète"
    ],
    specifications: {
      "Écran": "Liquid Retina XDR 16,2\"",
      "Puce": "M3 Pro / M3 Max",
      "RAM": "18 Go - 128 Go",
      "Stockage": "512 Go - 8 To SSD",
      "Batterie": "Jusqu'à 22h",
      "Poids": "2,14 kg"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Gris sidéral", hex: "#4A4A4C" },
      { name: "Argent", hex: "#E3E4E5" }
    ],
    rating: 4.8,
    reviewCount: 1523,
    inStock: true,
    isBestseller: true
  },
  {
    id: "ipad-pro-12",
    name: "iPad Pro 12,9\"",
    category: "tablets",
    price: 1329,
    description: "L'ordinateur ultime. Avec la puce M2, l'écran Liquid Retina XDR et la compatibilité Apple Pencil Pro, l'iPad Pro redéfinit ce que signifie travailler sur une tablette.",
    shortDescription: "Votre prochain ordinateur n'est pas un ordinateur.",
    features: [
      "Puce M2 avec Neural Engine 16 cœurs",
      "Écran Liquid Retina XDR",
      "Caméra TrueDepth avec Face ID",
      "Compatible Apple Pencil Pro",
      "Thunderbolt / USB 4",
      "5G optionnel"
    ],
    specifications: {
      "Écran": "Liquid Retina XDR 12,9\"",
      "Puce": "M2",
      "Stockage": "128 Go - 2 To",
      "Caméra": "12 MP grand-angle + 10 MP ultra",
      "Connecteur": "Thunderbolt",
      "Face ID": "Oui"
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Gris sidéral", hex: "#4A4A4C" },
      { name: "Argent", hex: "#E3E4E5" }
    ],
    rating: 4.7,
    reviewCount: 982,
    inStock: true,
    isNew: true
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    category: "audio",
    price: 279,
    description: "Un son qui vous transporte. Avec l'annulation active du bruit adaptative, le mode Transparence et l'Audio spatial personnalisé, les AirPods Pro offrent une expérience audio immersive.",
    shortDescription: "Son magique. Réinventé.",
    features: [
      "Annulation active du bruit adaptative",
      "Mode Transparence",
      "Audio spatial personnalisé",
      "Jusqu'à 6h d'écoute",
      "Boîtier de charge MagSafe",
      "Résistance à l'eau IP54"
    ],
    specifications: {
      "Driver": "Haut-parleur Apple",
      "Puce": "H2",
      "Autonomie": "6h (30h avec boîtier)",
      "Recharge": "Lightning / MagSafe",
      "Bluetooth": "5.3",
      "Résistance": "IP54"
    },
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Blanc", hex: "#F5F5F5" }
    ],
    rating: 4.8,
    reviewCount: 5621,
    inStock: true,
    isBestseller: true
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    category: "wearables",
    price: 899,
    description: "L'aventure vous attend. Conçue pour les environnements les plus extrêmes, l'Apple Watch Ultra 2 combine robustesse, précision et fonctionnalités avancées pour les athlètes et explorateurs.",
    shortDescription: "Aucune limite. Seulement des horizons.",
    features: [
      "Boîtier titane 49 mm",
      "Écran le plus lumineux jamais créé",
      "GPS double fréquence de précision",
      "Autonomie jusqu'à 36 heures",
      "Profondimètre et capteur de température",
      "Bouton Action programmable"
    ],
    specifications: {
      "Écran": "OLED LTPO 1,92\"",
      "Boîtier": "Titane 49 mm",
      "Résistance": "WR100 / EN13319",
      "Batterie": "Jusqu'à 36h",
      "Capteurs": "GPS L1/L5, profondimètre",
      "Puce": "S9 SiP"
    },
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Titane naturel", hex: "#8A8D8F" }
    ],
    rating: 4.9,
    reviewCount: 1234,
    inStock: true,
    isNew: true
  },
  {
    id: "homepod-mini",
    name: "HomePod mini",
    category: "audio",
    price: 99,
    description: "Un son étonnant dans un format compact. HomePod mini utilise une technologie audio avancée pour offrir un son riche et détaillé, tout en servant de hub intelligent pour votre maison.",
    shortDescription: "Petit mais costaud.",
    features: [
      "Audio computationnel avancé",
      "Puce S5 avec Neural Engine",
      "Siri intelligent",
      "Centre de contrôle domotique",
      "Interphone entre pièces",
      "Son immersif 360°"
    ],
    specifications: {
      "Hauteur": "8,43 cm",
      "Driver": "Haut-parleur large bande",
      "Connectivité": "Wi-Fi 802.11n",
      "Puce": "S5",
      "Alimentation": "USB-C 20W",
      "Siri": "Intégré"
    },
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Blanc", hex: "#F5F5F5" },
      { name: "Minuit", hex: "#1D1D1F" },
      { name: "Orange", hex: "#F56300" },
      { name: "Jaune", hex: "#F7DC6F" },
      { name: "Bleu", hex: "#5DADE2" }
    ],
    rating: 4.6,
    reviewCount: 3421,
    inStock: true
  },
  {
    id: "magsafe-charger",
    name: "Chargeur MagSafe",
    category: "accessories",
    price: 49,
    description: "La recharge sans fil, repensée. Le chargeur MagSafe s'aligne parfaitement avec votre iPhone pour une recharge sans fil rapide et efficace.",
    shortDescription: "S'attache. Se charge. Magnifique.",
    features: [
      "Alignement magnétique parfait",
      "Recharge sans fil 15W",
      "Compatible iPhone 12 et ultérieur",
      "Design compact",
      "Câble intégré 1m",
      "Certifié Apple"
    ],
    specifications: {
      "Puissance": "15W max",
      "Longueur câble": "1 mètre",
      "Connecteur": "USB-C",
      "Compatibilité": "iPhone 12+",
      "Poids": "50 g",
      "Diamètre": "5,6 cm"
    },
    images: [
      "https://images.unsplash.com/photo-1622676093881-c7862f85ae17?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Blanc", hex: "#F5F5F5" }
    ],
    rating: 4.5,
    reviewCount: 2156,
    inStock: true
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    category: "audio",
    price: 579,
    originalPrice: 629,
    description: "L'expérience audio ultime. Avec un son haute fidélité, l'annulation active du bruit et l'Audio spatial, les AirPods Max offrent une immersion sonore incomparable.",
    shortDescription: "Le son dans toute sa splendeur.",
    features: [
      "Driver dynamique Apple 40 mm",
      "Annulation active du bruit",
      "Mode Transparence",
      "Audio spatial avec suivi dynamique",
      "Autonomie 20 heures",
      "Design premium aluminium"
    ],
    specifications: {
      "Driver": "40 mm dynamique",
      "Puce": "H1 (x2)",
      "Autonomie": "20 heures",
      "Recharge": "Lightning",
      "Matériaux": "Aluminium, acier",
      "Poids": "384,8 g"
    },
    images: [
      "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Argent", hex: "#E3E4E5" },
      { name: "Gris sidéral", hex: "#4A4A4C" },
      { name: "Vert", hex: "#ACD5BD" },
      { name: "Rose", hex: "#F5C6C6" },
      { name: "Bleu ciel", hex: "#A7C7DC" }
    ],
    rating: 4.7,
    reviewCount: 1876,
    inStock: true
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === "all") return products;
  return products.filter(p => p.category === categoryId);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}
