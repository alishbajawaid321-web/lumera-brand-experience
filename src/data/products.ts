import noirDress from "@/assets/p-noir-satin-dress.jpg";
import blazer from "@/assets/p-tailored-blazer.jpg";
import knitTop from "@/assets/p-knit-top.jpg";
import trousers from "@/assets/p-wide-trousers.jpg";
import bag from "@/assets/p-structured-bag.jpg";
import scarf from "@/assets/p-silk-scarf.jpg";
import coat from "@/assets/p-wool-coat.jpg";
import silkShirt from "@/assets/p-silk-shirt.jpg";
import midiSkirt from "@/assets/p-midi-skirt.jpg";
import accessories from "@/assets/p-accessories.jpg";
import colMidnight from "@/assets/col-midnight.jpg";
import colSoft from "@/assets/col-soft.jpg";
import colUrban from "@/assets/col-urban.jpg";
import colEssential from "@/assets/col-essential.jpg";
import colAutumn from "@/assets/col-autumn.jpg";
import mMaxiSand from "@/assets/m-maxi-sand.jpg";
import mAbaya from "@/assets/m-abaya-noir.jpg";
import mPleated from "@/assets/m-pleated-taupe.jpg";
import mGown from "@/assets/m-gown-charcoal.jpg";
import mCoord from "@/assets/m-coord-oat.jpg";
import mKimono from "@/assets/m-kimono-camel.jpg";
import mShirtdress from "@/assets/m-shirtdress-ivory.jpg";
import mLayered from "@/assets/m-layered-stone.jpg";
import mTunic from "@/assets/m-tunic-ivory.jpg";
import mFormal from "@/assets/m-formal-champagne.jpg";
import accessories2 from "@/assets/p-accessories-2.jpg";
import bagTaupe from "@/assets/p-bag-taupe.jpg";
import eveningBurgundy from "@/assets/p-evening-burgundy.jpg";
import suitGray from "@/assets/p-suit-gray.jpg";
import blouseLinen from "@/assets/p-blouse-linen.jpg";
import heroModest from "@/assets/hero-modest.jpg";

export const MODEST_HERO = heroModest;

export const CATEGORIES = [
  "Dresses",
  "Modest Wear",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];


export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: Category;
  collection: string;
  sizes: string[];
  colors: ColorOption[];
  rating: number;
  reviews: number;
  description: string;
  composition: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  keywords: string[];
};

export const COLLECTIONS = [
  {
    slug: "the-essential-edit",
    name: "The Essential Edit",
    tagline: "Foundations, refined",
    description:
      "The pieces a wardrobe is built around — precise tailoring, honest fabrics and proportions designed to be worn for a decade rather than a season.",
    image: colEssential,
  },
  {
    slug: "midnight",
    name: "Midnight Collection",
    tagline: "Evening, distilled",
    description:
      "Liquid satin, deep black wool and quiet drama. An after-dark wardrobe cut for movement and shaped by shadow.",
    image: colMidnight,
  },
  {
    slug: "soft-minimalism",
    name: "Soft Minimalism",
    tagline: "Weightless neutrals",
    description:
      "Cream, oat and bone in fluid silhouettes. Softness treated as structure, with every seam placed to fall rather than hold.",
    image: colSoft,
  },
  {
    slug: "urban-muse",
    name: "Urban Muse",
    tagline: "Tailoring for the city",
    description:
      "Sharp shoulders, easy trousers and pieces that move between a morning meeting and a late dinner without changing register.",
    image: colUrban,
  },
  {
    slug: "autumn-atelier",
    name: "Autumn Atelier",
    tagline: "Warmth, layered",
    description:
      "Camel wool, brushed cashmere and heritage weaves, developed with mills that have worked the same cloth for generations.",
    image: colAutumn,
  },
] as const;

export const collectionNames = COLLECTIONS.map((c) => c.name);

const CLASSIC = ["XS", "S", "M", "L", "XL"];
const ONE_SIZE = ["One Size"];

const C = {
  black: { name: "Black", hex: "#141414" },
  ivory: { name: "Ivory", hex: "#F4F0E7" },
  beige: { name: "Beige", hex: "#DCCEB8" },
  taupe: { name: "Taupe", hex: "#A99383" },
  camel: { name: "Camel", hex: "#C08B54" },
  gray: { name: "Slate Gray", hex: "#8E8C88" },
};

export const PRODUCTS: Product[] = [
  {
    id: "noir-satin-dress",
    name: "Noir Satin Dress",
    price: 480,
    category: "Dresses",
    collection: "Midnight Collection",
    sizes: CLASSIC,
    colors: [C.black, C.taupe],
    rating: 4.8,
    reviews: 126,
    description:
      "A bias-cut silk satin dress that skims rather than clings, finished with a fluid V neckline and an unlined skirt that catches the light with every step.",
    composition: "100% mulberry silk satin. Dry clean only. Made in Portugal.",
    images: [noirDress, colMidnight],
    isNew: true,
    isBestSeller: true,
    keywords: ["evening", "silk", "slip dress", "black"],
  },
  {
    id: "elan-tailored-blazer",
    name: "Élan Tailored Blazer",
    price: 620,
    salePrice: 465,
    category: "Outerwear",
    collection: "Urban Muse",
    sizes: CLASSIC,
    colors: [C.camel, C.black, C.ivory],
    rating: 4.9,
    reviews: 214,
    description:
      "A single-breasted blazer with a softly constructed shoulder and a lengthened lapel, cut generously through the body so it layers over knitwear.",
    composition: "94% virgin wool, 6% elastane. Cupro lining. Made in Italy.",
    images: [blazer, colUrban],
    isBestSeller: true,
    keywords: ["blazer", "tailoring", "jacket", "suiting"],
  },
  {
    id: "solace-knit-top",
    name: "Solace Knit Top",
    price: 240,
    category: "Tops",
    collection: "Soft Minimalism",
    sizes: CLASSIC,
    colors: [C.ivory, C.beige, C.black],
    rating: 4.7,
    reviews: 98,
    description:
      "A fine-gauge ribbed knit with a rolled funnel neck, knitted in one piece to remove side seams for an uninterrupted line.",
    composition: "70% cashmere, 30% merino wool. Hand wash cold.",
    images: [knitTop, colSoft],
    isNew: true,
    keywords: ["knit", "cashmere", "sweater", "top"],
  },
  {
    id: "atelier-wide-leg-trousers",
    name: "Atelier Wide-Leg Trousers",
    price: 380,
    category: "Bottoms",
    collection: "The Essential Edit",
    sizes: CLASSIC,
    colors: [C.beige, C.black, C.gray],
    rating: 4.8,
    reviews: 187,
    description:
      "High-waisted trousers with a single front pleat and a column leg that falls straight from the hip, pressed to hold a permanent crease.",
    composition: "100% wool gabardine. Dry clean only. Made in Portugal.",
    images: [trousers, colEssential],
    isBestSeller: true,
    keywords: ["trousers", "pants", "wide leg", "tailoring"],
  },
  {
    id: "muse-structured-bag",
    name: "Muse Structured Bag",
    price: 890,
    category: "Accessories",
    collection: "Urban Muse",
    sizes: ONE_SIZE,
    colors: [C.black, C.camel],
    rating: 4.9,
    reviews: 76,
    description:
      "A compact top-handle bag in grained calfskin, hand-finished at the edges and fitted with a detachable shoulder strap.",
    composition: "Grained calfskin, suede lining. Comes with dust bag.",
    images: [bag, colUrban],
    isBestSeller: true,
    keywords: ["bag", "handbag", "leather", "accessory"],
  },
  {
    id: "lumiere-silk-scarf",
    name: "Lumière Silk Scarf",
    price: 180,
    salePrice: 135,
    category: "Accessories",
    collection: "Soft Minimalism",
    sizes: ONE_SIZE,
    colors: [C.beige, C.black],
    rating: 4.6,
    reviews: 54,
    description:
      "A hand-rolled square scarf printed with an archive line drawing, screen-printed in eight passes on heavyweight silk twill.",
    composition: "100% silk twill, 90 × 90 cm. Hand-rolled edges.",
    images: [scarf, colSoft],
    keywords: ["scarf", "silk", "print", "accessory"],
  },
  {
    id: "vesper-wool-coat",
    name: "Vesper Wool Coat",
    price: 1150,
    category: "Outerwear",
    collection: "Autumn Atelier",
    sizes: CLASSIC,
    colors: [C.camel, C.black],
    rating: 4.9,
    reviews: 143,
    description:
      "A full-length wrap coat with a self-tie belt and dropped shoulder, woven from a double-faced wool that needs no lining.",
    composition: "88% virgin wool, 12% cashmere. Made in Italy.",
    images: [coat, colAutumn],
    isNew: true,
    isBestSeller: true,
    keywords: ["coat", "wool", "outerwear", "camel"],
  },
  {
    id: "aurele-silk-shirt",
    name: "Aurèle Silk Shirt",
    price: 320,
    category: "Tops",
    collection: "The Essential Edit",
    sizes: CLASSIC,
    colors: [C.ivory, C.black, C.taupe],
    rating: 4.7,
    reviews: 111,
    description:
      "A relaxed silk shirt with a soft collar stand and a curved hem, cut long enough to wear tucked or loose.",
    composition: "100% sandwashed silk. Dry clean only.",
    images: [silkShirt, colEssential],
    keywords: ["shirt", "blouse", "silk", "top"],
  },
  {
    id: "seraphine-midi-skirt",
    name: "Séraphine Midi Skirt",
    price: 295,
    salePrice: 210,
    category: "Bottoms",
    collection: "Midnight Collection",
    sizes: CLASSIC,
    colors: [C.black, C.taupe],
    rating: 4.5,
    reviews: 67,
    description:
      "A fluid midi skirt with an asymmetric wrap front and a concealed side zip, weighted at the hem so it moves as one piece.",
    composition: "76% viscose, 24% acetate. Dry clean only.",
    images: [midiSkirt, colMidnight],
    keywords: ["skirt", "midi", "black", "wrap"],
  },
  {
    id: "orsay-gold-chain",
    name: "Orsay Gold Chain",
    price: 210,
    category: "Accessories",
    collection: "The Essential Edit",
    sizes: ONE_SIZE,
    colors: [{ name: "Gold", hex: "#C9A227" }],
    rating: 4.6,
    reviews: 48,
    description:
      "A fine chain necklace with a hand-set pendant, plated in 18k gold over recycled brass and finished with a lobster clasp.",
    composition: "18k gold plate over recycled brass. 42 cm with 5 cm extender.",
    images: [accessories, colSoft],
    isNew: true,
    keywords: ["necklace", "jewellery", "gold", "chain"],
  },
  {
    id: "celeste-column-dress",
    name: "Céleste Column Dress",
    price: 540,
    category: "Dresses",
    collection: "Soft Minimalism",
    sizes: CLASSIC,
    colors: [C.ivory, C.beige],
    rating: 4.8,
    reviews: 89,
    description:
      "A floor-grazing column dress in matte crepe with a boat neck and a softly gathered back, engineered to hang without a single dart.",
    composition: "100% triacetate crepe. Dry clean only.",
    images: [colSoft, knitTop],
    isNew: true,
    keywords: ["dress", "gown", "ivory", "column"],
  },
  {
    id: "renne-cropped-jacket",
    name: "Renne Cropped Jacket",
    price: 495,
    category: "Outerwear",
    collection: "Urban Muse",
    sizes: CLASSIC,
    colors: [C.taupe, C.black],
    rating: 4.5,
    reviews: 62,
    description:
      "A cropped jacket with a rounded shoulder and hidden closure, shaped through the waist and finished with welt pockets.",
    composition: "82% wool, 18% linen. Bemberg lining.",
    images: [colUrban, blazer],
    keywords: ["jacket", "cropped", "outerwear", "taupe"],
  },
  {
    id: "isolde-cashmere-cardigan",
    name: "Isolde Cashmere Cardigan",
    price: 420,
    salePrice: 315,
    category: "Tops",
    collection: "Autumn Atelier",
    sizes: CLASSIC,
    colors: [C.beige, C.gray],
    rating: 4.7,
    reviews: 103,
    description:
      "An oversized cardigan in brushed cashmere with horn buttons and a ribbed placket that holds its shape through the seasons.",
    composition: "100% brushed cashmere. Hand wash cold, dry flat.",
    images: [colAutumn, knitTop],
    keywords: ["cardigan", "cashmere", "knit", "layer"],
  },
  {
    id: "verane-slip-dress",
    name: "Verane Slip Dress",
    price: 395,
    category: "Dresses",
    collection: "Midnight Collection",
    sizes: CLASSIC,
    colors: [C.black, C.ivory],
    rating: 4.6,
    reviews: 71,
    description:
      "A minimal slip on adjustable straps, cut on the bias in washed silk for a finish that reads matte rather than shiny.",
    composition: "100% washed silk. Dry clean only.",
    images: [noirDress, colMidnight],
    keywords: ["slip", "dress", "silk", "evening"],
  },
  {
    id: "orein-tailored-vest",
    name: "Oréin Tailored Vest",
    price: 285,
    category: "Tops",
    collection: "Urban Muse",
    sizes: CLASSIC,
    colors: [C.black, C.camel],
    rating: 4.4,
    reviews: 44,
    description:
      "A longline waistcoat with a deep V and adjustable back strap, made to be worn as a top on its own.",
    composition: "96% wool, 4% elastane. Made in Portugal.",
    images: [blazer, colUrban],
    isNew: true,
    keywords: ["vest", "waistcoat", "tailoring", "top"],
  },
  {
    id: "lysande-linen-trousers",
    name: "Lysande Linen Trousers",
    price: 265,
    category: "Bottoms",
    collection: "Soft Minimalism",
    sizes: CLASSIC,
    colors: [C.ivory, C.beige],
    rating: 4.5,
    reviews: 88,
    description:
      "Softly tapered trousers in washed linen with an elasticated back waist and deep side pockets.",
    composition: "100% European linen. Machine wash cold.",
    images: [trousers, colSoft],
    keywords: ["linen", "trousers", "summer", "pants"],
  },
  {
    id: "amara-leather-belt",
    name: "Amara Leather Belt",
    price: 165,
    category: "Accessories",
    collection: "The Essential Edit",
    sizes: ONE_SIZE,
    colors: [C.black, C.camel],
    rating: 4.6,
    reviews: 39,
    description:
      "A slim vegetable-tanned belt with a brushed brass buckle that darkens gently with wear.",
    composition: "Vegetable-tanned calf leather, brass hardware.",
    images: [accessories, bag],
    keywords: ["belt", "leather", "accessory"],
  },
  {
    id: "noor-poplin-shirt",
    name: "Noor Poplin Shirt",
    price: 220,
    salePrice: 155,
    category: "Tops",
    collection: "The Essential Edit",
    sizes: CLASSIC,
    colors: [C.ivory, C.gray],
    rating: 4.4,
    reviews: 76,
    description:
      "A crisp cotton poplin shirt with a classic collar and a slightly dropped shoulder for an easy, unstructured line.",
    composition: "100% organic cotton poplin. Machine wash cold.",
    images: [silkShirt, colEssential],
    keywords: ["shirt", "cotton", "poplin", "white"],
  },
  {
    id: "elara-pleated-skirt",
    name: "Élara Pleated Skirt",
    price: 310,
    category: "Bottoms",
    collection: "Autumn Atelier",
    sizes: CLASSIC,
    colors: [C.camel, C.black],
    rating: 4.5,
    reviews: 51,
    description:
      "A knife-pleated midi skirt in a fine wool blend, permanently set so the pleats survive travel and wear.",
    composition: "62% wool, 38% polyester. Dry clean only.",
    images: [midiSkirt, colAutumn],
    keywords: ["skirt", "pleated", "midi", "wool"],
  },
  {
    id: "sable-trench-coat",
    name: "Sable Trench Coat",
    price: 980,
    salePrice: 735,
    category: "Outerwear",
    collection: "The Essential Edit",
    sizes: CLASSIC,
    colors: [C.beige, C.taupe],
    rating: 4.8,
    reviews: 132,
    description:
      "A double-breasted trench in water-resistant cotton gabardine with a storm flap, throat latch and removable belt.",
    composition: "100% cotton gabardine, water-repellent finish.",
    images: [coat, colEssential],
    isBestSeller: true,
    keywords: ["trench", "coat", "outerwear", "beige"],
  },
  {
    id: "ondine-satin-blouse",
    name: "Ondine Satin Blouse",
    price: 275,
    category: "Tops",
    collection: "Midnight Collection",
    sizes: CLASSIC,
    colors: [C.black, C.ivory],
    rating: 4.5,
    reviews: 58,
    description:
      "A fluid satin blouse with a tie neck that can be knotted high or left open, cut with a full sleeve gathered into a narrow cuff.",
    composition: "100% viscose satin. Dry clean only.",
    images: [silkShirt, colMidnight],
    isNew: true,
    keywords: ["blouse", "satin", "evening", "top"],
  },
  {
    id: "tessa-knit-dress",
    name: "Tessa Knit Dress",
    price: 445,
    category: "Dresses",
    collection: "Autumn Atelier",
    sizes: CLASSIC,
    colors: [C.beige, C.gray, C.black],
    rating: 4.7,
    reviews: 94,
    description:
      "A ribbed knit dress with long sleeves and a high neck, knitted to skim the body and finished with a deep side vent.",
    composition: "58% merino wool, 42% viscose. Hand wash cold.",
    images: [knitTop, colAutumn],
    keywords: ["dress", "knit", "winter", "midi"],
  },
  {
    id: "calya-wrap-top",
    name: "Calya Wrap Top",
    price: 195,
    salePrice: 139,
    category: "Tops",
    collection: "Soft Minimalism",
    sizes: CLASSIC,
    colors: [C.ivory, C.taupe],
    rating: 4.3,
    reviews: 41,
    description:
      "A lightweight jersey wrap top with a deep crossover front and ties that fasten at the back for an adjustable fit.",
    composition: "94% Tencel, 6% elastane. Machine wash cold.",
    images: [colSoft, knitTop],
    keywords: ["top", "wrap", "jersey", "everyday"],
  },
  {
    id: "vela-mini-bag",
    name: "Vela Mini Bag",
    price: 640,
    category: "Accessories",
    collection: "Midnight Collection",
    sizes: ONE_SIZE,
    colors: [C.black, C.taupe],
    rating: 4.7,
    reviews: 63,
    description:
      "An evening mini bag in smooth calfskin with a sculpted flap and a slim chain that tucks inside to convert to a clutch.",
    composition: "Smooth calfskin, gold-tone hardware. Comes with dust bag.",
    images: [bag, colMidnight],
    isNew: true,
    keywords: ["bag", "mini", "evening", "clutch"],
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

export const COLOR_FILTERS: ColorOption[] = [
  C.black,
  C.ivory,
  C.beige,
  C.taupe,
  C.camel,
  C.gray,
  { name: "Gold", hex: "#C9A227" },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) =>
    [p.name, p.category, p.collection, p.description, ...p.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};
