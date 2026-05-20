const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ── Product Data ─────────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: 'Collapsible Travel Bowl Set',
    category: 'Feeding',
    price: 14.99,
    emoji: '🥣',
    badge: 'Best Seller',
    description: 'Foldable silicone food and water bowls. Clips to any bag. Fits cats and dogs of all sizes.',
    tags: ['dog', 'cat'],
  },
  {
    id: 2,
    name: 'Deluxe Airline Cat Carrier',
    category: 'Carriers',
    price: 59.99,
    emoji: '🧳',
    badge: 'Airline Approved',
    description: 'Soft-sided, ventilated carrier with mesh windows. Fits under most airline seats.',
    tags: ['cat'],
  },
  {
    id: 3,
    name: 'All-Terrain Pet Stroller',
    category: 'Strollers',
    price: 129.99,
    emoji: '🛒',
    badge: 'New',
    description: 'Three-wheel stroller with suspension. Fits pets up to 30 lbs. Weather canopy included.',
    tags: ['dog', 'cat'],
  },
  {
    id: 4,
    name: 'Portable Dog Bed',
    category: 'Beds',
    price: 39.99,
    emoji: '🛏️',
    badge: null,
    description: 'Memory foam travel bed that rolls up tight. Water-resistant base. Machine washable cover.',
    tags: ['dog'],
  },
  {
    id: 5,
    name: 'Portable Cat Bed',
    category: 'Beds',
    price: 34.99,
    emoji: '☁️',
    badge: null,
    description: 'Ultra-soft donut bed that folds flat. Self-warming inner lining. Perfect for hotels and campsites.',
    tags: ['cat'],
  },
  {
    id: 6,
    name: 'Mesh Backpack Dog Carrier',
    category: 'Carriers',
    price: 49.99,
    emoji: '🎒',
    badge: 'Fan Favorite',
    description: 'Breathable backpack carrier for small dogs up to 20 lbs. Padded straps and safety leash clip.',
    tags: ['dog'],
  },
  {
    id: 7,
    name: 'Travel Water Bottle with Bowl',
    category: 'Feeding',
    price: 18.99,
    emoji: '💧',
    badge: null,
    description: 'One-handed squeeze bottle with attached tray bowl. 20oz BPA-free. Leak-proof flip cap.',
    tags: ['dog', 'cat'],
  },
  {
    id: 8,
    name: 'Pet Travel First Aid Kit',
    category: 'Safety',
    price: 24.99,
    emoji: '🩺',
    badge: 'Essential',
    description: 'Compact kit with bandages, antiseptic wipes, tick remover, and emergency contacts booklet.',
    tags: ['dog', 'cat'],
  },
];

// ── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/shop', (req, res) => {
  const { category, pet } = req.query;
  let filtered = [...products];

  if (category) filtered = filtered.filter(p => p.category === category);
  if (pet) filtered = filtered.filter(p => p.tags.includes(pet));

  const categories = [...new Set(products.map(p => p.category))];

  res.render('shop', { products: filtered, categories, query: req.query });
});

app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.redirect('/shop');
  res.render('product', { product });
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/checkout', (req, res) => {
  res.render('checkout');
});

app.post('/checkout/confirm', (req, res) => {
  res.render('confirmation');
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});