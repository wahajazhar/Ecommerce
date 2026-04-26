import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/api/routes/auth.ts';
import productRoutes from './src/api/routes/products.ts';
import Product from './src/api/models/Product.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Health Check first
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(express.static(process.cwd()));

  // MongoDB Connection (non-blocking start)
  if (process.env.MONGODB_URI) {
    console.log('Attempting to connect to MongoDB...');
    mongoose.connect(process.env.MONGODB_URI)
      .then(async () => {
        console.log('Connected to MongoDB');
        
        // Seed data - ALWAYS for now to update images
        try {
          await Product.deleteMany({});
          const seedProducts = [
            {
              name: 'MJ Signature Fedora',
              price: 249,
              image: '/images_4.jfif',
              description: 'The iconic black felt fedora. A symbol of rhythmic elegance.',
              category: 'Hats',
              featured: true
            },
            {
              name: 'Red Current Jacket',
              price: 899,
              image: '/images_13.jfif',
              description: 'Multi-zipper luxury leather jacket in striking high-voltage red.',
              category: 'Jackets',
              featured: true
            },
            {
              name: 'Smooth Ivory Fedora',
              price: 280,
              image: '/images_6.jfif',
              description: 'Pearl white felt with contrast black band. For the sharpest silhouettes.',
              category: 'Hats',
              featured: true
            },
            {
              name: 'Midnight Sequin Blazer',
              price: 1250,
              image: '/images_15.jfif',
              description: 'Hand-sewn black sequins that catch every spotlight.',
              category: 'Jackets',
              featured: true
            },
            {
              name: 'Apple Head Trucker',
              price: 65,
              image: '/images_3.jfif',
              description: 'Limited edition Apple Head Gang embroidered trucker cap.',
              category: 'Hats',
              featured: false
            },
            {
              name: 'King of Pop Loafers',
              price: 420,
              image: '/images_18.jfif',
              description: 'Black patent leather loafers paired with signature crystal-embedded socks.',
              category: 'Shoes',
              featured: true
            },
            {
              name: 'Military Detail Jacket',
              price: 1100,
              image: '/images_12.jfif',
              description: 'Black structured jacket with silver braiding and red armband accent.',
              category: 'Jackets',
              featured: false
            },
            {
              name: 'Yellow Studio Shirt',
              price: 290,
              image: '/images_17.jfif',
              description: 'Vibrant yellow button-down as seen in the legendary studio sessions.',
              category: 'Clothes',
              featured: false
            },
            {
              name: 'MJ Signed Loafers',
              price: 520,
              image: '/images_19.jfif',
              description: 'Exclusive signed black patent leather loafers. Collector edition.',
              category: 'Shoes',
              featured: false
            },
            {
              name: 'Silver Tech Blazer',
              price: 850,
              image: '/images_9.jfif',
              description: 'Futuristic silver blazer with industrial arm band detailing.',
              category: 'Jackets',
              featured: false
            },
            {
              name: 'Pearl White Fedora',
              price: 310,
              image: '/images_7.jfif',
              description: 'Extended brim ivory felt fedora for high-end silhouettes.',
              category: 'Hats',
              featured: false
            }
          ] as const;
          await Product.insertMany(seedProducts);
          console.log('Database seeded with initial products');
        } catch (err) {
          console.error('Seeding error:', err);
        }
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
      });
  } else {
    console.warn('MONGODB_URI not found in environment. Database features will be disabled.');
  }

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
