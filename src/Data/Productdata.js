// Simple approach using direct image imports for Vite
import atrasa1 from "../assets/images/product/atrasa1.jpeg";
import atrasa2 from "../assets/images/product/atrasa2.jpeg";
import atrasa3 from "../assets/images/product/atrasa3.jpeg";
import bananachips1 from "../assets/images/product/bananachips1.jpg";
import bananachips2 from "../assets/images/product/bananachips2.webp";
import bananachips3 from "../assets/images/product/bananachips3.webp";
import chakli1 from "../assets/images/product/chakli1.jpeg";
import chakli2 from "../assets/images/product/chakli2.jpeg";
import chakli3 from "../assets/images/product/chakli3.png";
import ghee1 from "../assets/images/product/ghee1.png";
import ghee2 from "../assets/images/product/ghee2.png";
import ghee3 from "../assets/images/product/ghee3.png";
import honey1 from "../assets/images/product/honey1.jpeg";
import honey2 from "../assets/images/product/honey2.png";
import honey3 from "../assets/images/product/honey3.jpg";
import jackchips1 from "../assets/images/product/jackchips1.webp";
import jackchips2 from "../assets/images/product/jackchips2.webp";
import jackchips3 from "../assets/images/product/jackchips3.jpg";
import karjikai1 from "../assets/images/product/karjikai1.jpg";
import karjikai2 from "../assets/images/product/karjikai2.webp";
import karjikai3 from "../assets/images/product/karjikai3.jpg";
import oil1 from "../assets/images/product/oil1.png";
import oil2 from "../assets/images/product/oil2.png";
import oil3 from "../assets/images/product/oil3.png";
import papad1 from "../assets/images/product/papad1.jpg";
import papad2 from "../assets/images/product/papad2.webp";
import papad3 from "../assets/images/product/papad3.webp";
import vada1 from "../assets/images/product/vada1.jpeg";
import vada2 from "../assets/images/product/vada2.jpg";
import vada3 from "../assets/images/product/vada3.jpg";

// Fallback to a placeholder if any image fails to load
const placeholder = "https://via.placeholder.com/300x200?text=Product+Image";

const products = [
  {
    id: 1,
    name: "Atrasa",
    description:
      "Traditional Indian sweet, deep-fried and crispy, infused with ghee and jaggery",
    newprice: 15, // 1 piece
    oldprice: 20,
    images: [
      atrasa1 || placeholder,
      atrasa2 || placeholder,
      atrasa3 || placeholder,
    ],
    image: atrasa1 || placeholder, // Single image for product card
    rating: 4.8,
    category: "Sauces",
  },
  {
    id: 2,
    name: "Banana Chips",
    description:
      "Crispy and crunchy banana chips, a perfect snack for all ages",
    newprice: 119, // 100g
    oldprice: 140,
    images: [
      bananachips1 || placeholder,
      bananachips2 || placeholder,
      bananachips3 || placeholder,
    ],
    image: bananachips1 || placeholder,
    rating: 5.0,
    category: "Desserts",
  },
  {
    id: 3,
    name: "Chakli",
    description:
      "Crispy and savory snack made from rice flour and spices, deep-fried to perfection",
    newprice: 99, // 250g
    oldprice: 120,
    images: [
      chakli1 || placeholder,
      chakli2 || placeholder,
      chakli3 || placeholder,
    ],
    image: chakli1 || placeholder,
    rating: 4.7,
    category: "Bakery",
  },
  {
    id: 4,
    name: "Desi Ghee",
    description:
      "Pure clarified butter made from fresh cow's milk, rich in flavor and nutrients",
    newprice: 18.99,
    oldprice: 22,
    images: [ghee1 || placeholder, ghee2 || placeholder, ghee3 || placeholder],
    image: ghee1 || placeholder,
    rating: 4.9,
    category: "Dairy",
  },
  {
    id: 5,
    name: "Organic Honey",
    description:
      "Raw honey harvested from local beehives, naturally sweet and healthy",
    newprice: 14.99,
    oldprice: 18,
    images: [
      honey1 || placeholder,
      honey2 || placeholder,
      honey3 || placeholder,
    ],
    image: honey1 || placeholder,
    rating: 4.8,
    category: "Sweeteners",
  },
  {
    id: 6,
    name: "Jackfruit Chips",
    description:
      "Crispy chips made from fresh jackfruit, lightly salted and delicious",
    newprice: 10.99,
    oldprice: 13,
    images: [
      jackchips1 || placeholder,
      jackchips2 || placeholder,
      jackchips3 || placeholder,
    ],
    image: jackchips1 || placeholder,
    rating: 4.6,
    category: "Snacks",
  },
  {
    id: 7,
    name: "Karjikai",
    description:
      "Traditional sweet dumplings filled with coconut and jaggery, fried to perfection",
    newprice: 16.99,
    oldprice: 20,
    images: [
      karjikai1 || placeholder,
      karjikai2 || placeholder,
      karjikai3 || placeholder,
    ],
    image: karjikai1 || placeholder,
    rating: 4.7,
    category: "Desserts",
  },
  {
    id: 8,
    name: "Coconut Oil",
    description:
      "Virgin coconut oil extracted from fresh coconuts, ideal for cooking and skincare",
    newprice: 13.99,
    oldprice: 16,
    images: [oil1 || placeholder, oil2 || placeholder, oil3 || placeholder],
    image: oil1 || placeholder,
    rating: 4.8,
    category: "Oils",
  },
  {
    id: 9,
    name: "Homemade Papad",
    description:
      "Thin, crispy lentil crackers seasoned with spices, perfect as a snack",
    newprice: 8.99,
    oldprice: 11,
    images: [
      papad1 || placeholder,
      papad2 || placeholder,
      papad3 || placeholder,
    ],
    image: papad1 || placeholder,
    rating: 4.5,
    category: "Snacks",
  },
  {
    id: 10,
    name: "Crunchy Vada",
    description:
      "Savory lentil fritters with spices, a traditional South Indian delicacy",
    newprice: 12.99,
    oldprice: 15,
    images: [vada1 || placeholder, vada2 || placeholder, vada3 || placeholder],
    image: vada1 || placeholder,
    rating: 4.9,
    category: "Snacks",
  },
];

export default products;
