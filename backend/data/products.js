// backend/data/products.js
const products = [
  {
    name: 'Superhero Classic Tee',
    image: '/images/classic_superhero_tee.jpg',
    description:
      'Embrace your inner hero with this classic fit T-shirt featuring iconic superhero insignias. Made from soft, breathable cotton for everyday comfort.',
    brand: 'HeroWear',
    category: 'T-Shirts', // This will be linked to category ID in seeder
    price: 29.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Cosmic Voyager Tee',
    image: '/images/cosmic_voyager_tee.jpg',
    description:
      'Journey through the cosmos with this stunning T-shirt inspired by nebulae and distant galaxies. A vibrant design that captures the wonder of space.',
    brand: 'StarThreads',
    category: 'Cosmic Wear', // This will be linked to category ID in seeder
    price: 34.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Vigilante Shadow Hoodie',
    image: '/images/vigilante_hoodie.jpg',
    description:
      'Channel your inner vigilante with this comfortable and stylish hoodie. Perfect for a cool evening patrol or a casual day out.',
    brand: 'NightGuard Apparel',
    category: 'Hoodies', // This will be linked to category ID in seeder
    price: 59.99,
    countInStock: 5,
    rating: 4.8,
    numReviews: 10,
  },
  {
    name: 'Galactic Guardian Mug',
    image: '/images/galactic_guardian_mug.jpg',
    description:
      'Start your day like a true galactic guardian with this durable ceramic mug featuring cosmic hero artwork. Microwave and dishwasher safe.',
    brand: 'AstroGoods',
    category: 'Accessories', // This will be linked to category ID in seeder
    price: 14.99,
    countInStock: 20,
    rating: 4.2,
    numReviews: 5,
  },
  {
    name: 'Retro Comic Book Tee',
    image: '/images/retro_comic_tee.jpg',
    description:
      'Step back in time with this retro-style T-shirt featuring classic comic book art. A must-have for vintage superhero enthusiasts.',
    brand: 'ComicStrip Co.',
    category: 'T-Shirts', // This will be linked to category ID in seeder
    price: 27.99,
    countInStock: 15,
    rating: 4.3,
    numReviews: 9,
  },
  {
    name: 'Dark Knight Rises Tee',
    image: '/images/dark_knight_tee.jpg',
    description:
      'A sleek, minimalist design inspired by the legendary dark knight. Comfortable and understated, perfect for any fan.',
    brand: 'Gotham Garb',
    category: 'T-Shirts', // This will be linked to category ID in seeder
    price: 31.99,
    countInStock: 8,
    rating: 4.7,
    numReviews: 14,
  },
  {
    name: 'Starlit Sky Beanie',
    image: '/images/starlit_beanie.jpg',
    description:
      'Keep warm under the starlit sky with this cozy beanie. Features a subtle, embroidered star constellation design.',
    brand: 'Celestial Comfort',
    category: 'Accessories', // This will be linked to category ID in seeder
    price: 19.99,
    countInStock: 12,
    rating: 4.1,
    numReviews: 6,
  },
  {
    name: 'Wonder Woman Emblem Tee',
    image: '/images/wonder_woman_tee.jpg',
    description:
      'Show your strength and power with this officially licensed Wonder Woman emblem T-shirt. Made for true amazons.',
    brand: 'Justice League Gear',
    category: 'T-Shirts', // This will be linked to category ID in seeder
    price: 29.99,
    countInStock: 10,
    rating: 4.6,
    numReviews: 11,
  },
];

export default products;