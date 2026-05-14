import truffle from "@/assets/pizza-truffle.jpg";
import spicy from "@/assets/pizza-spicy.jpg";
import margherita from "@/assets/pizza-margherita.jpg";
import bbq from "@/assets/pizza-bbq.jpg";

export type Pizza = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  badge?: string;
};

export const pizzas: Pizza[] = [
  {
    id: "truffle-king",
    name: "The Truffle King",
    tagline: "Wild mushrooms · Black truffle",
    description:
      "Wild forest mushrooms, black truffle oil, fresh thyme and aged fontina cheese on our 48-hour fermented sourdough.",
    price: 24,
    rating: 4.9,
    reviews: 2148,
    category: "Signature",
    image: truffle,
    badge: "Chef's Pick",
  },
  {
    id: "sweet-heat",
    name: "Sweet Heat",
    tagline: "Spicy salami · Hot honey",
    description:
      "Calabrian spicy salami, organic hot honey drizzle, San Marzano tomatoes and pearls of buffalo mozzarella.",
    price: 21,
    rating: 4.8,
    reviews: 1820,
    category: "Spicy",
    image: spicy,
    badge: "Trending",
  },
  {
    id: "gold-margherita",
    name: "The Gold Standard",
    tagline: "Buffalo mozzarella · Basil",
    description:
      "Our classic margherita with cold-pressed olive oil, garden basil and sun-ripened heirloom tomatoes.",
    price: 18,
    rating: 4.9,
    reviews: 3402,
    category: "Classic",
    image: margherita,
  },
  {
    id: "smoky-bbq",
    name: "Smoky BBQ Bird",
    tagline: "Pulled chicken · Red onion",
    description:
      "Hickory-smoked pulled chicken, caramelized red onions, fresh cilantro and our house BBQ glaze.",
    price: 22,
    rating: 4.7,
    reviews: 1190,
    category: "Signature",
    image: bbq,
  },
];

export const categories = [
  { id: "signature", label: "Signature", emoji: "🔥" },
  { id: "classic", label: "Classics", emoji: "🍕" },
  { id: "spicy", label: "Spicy", emoji: "🌶️" },
  { id: "veggie", label: "Plant-based", emoji: "🌱" },
  { id: "sides", label: "Sides", emoji: "🥗" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
];

export const offers = [
  { title: "50% OFF", subtitle: "First order over $20", code: "FIRST50" },
  { title: "Free Delivery", subtitle: "Orders above $30", code: "FREESHIP" },
  { title: "Buy 1 Get 1", subtitle: "On Margherita pizzas", code: "BOGO" },
];

export const reviews = [
  {
    name: "Sophia Bennett",
    role: "Food Blogger",
    text: "The crust alone is worth ordering. Best Neapolitan I've had outside Naples.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Regular customer",
    text: "Delivered hotter than my last apartment. The truffle pie is unreal.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Chef",
    text: "Premium ingredients, premium experience. Tracking UI is beautiful too.",
    rating: 5,
  },
];
