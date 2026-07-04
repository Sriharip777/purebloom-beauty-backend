# PureBloom Beauty

A production-ready full-stack beauty affiliate marketing platform built with React, Node.js, Express, and MongoDB.

## Brand Identity

**PureBloom Beauty** is a curated beauty discovery platform where elegance meets modern luxury. The platform features a sophisticated powder blue, cream, and navy visual system with editorial-style layouts and premium animations.

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS 3
- Framer Motion (cinematic animations)
- React Router DOM 6
- Axios
- Context API (state management)
- React Hot Toast
- React Icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing
- Nodemailer (SMTP email)
- Express Rate Limiting
- Helmet Security

### Integrations
- Amazon Affiliate Links
- WhatsApp Click-to-Chat
- SMTP Email (Gmail)
- Optional: Cloudinary, MCP Server

## Features

### Public
- Cinematic hero with parallax and floating animations
- Curated product discovery grid (Pinterest-style)
- Category browsing with mega menu
- Trending / Best Sellers / Deals sections
- Product details with affiliate redirect
- Quick View modal
- Compare up to 3 products
- Wishlist (localStorage)
- Search with filters
- Newsletter subscription
- Contact form with email notification
- WhatsApp click-to-chat
- Social sharing (Pinterest, Twitter, Facebook)
- Smooth page transitions and scroll reveals
- Shimmer skeleton loaders
- Accessibility (reduced-motion support)

### Admin
- Secure JWT authentication
- Forgot / Reset / Change password
- Dashboard with key metrics
- Manage products (CRUD)
- Manage categories (CRUD)
- Analytics dashboard
- Contact message management
- Subscriber management
- WhatsApp click tracking

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)

### 1. Clone and Install

```bash
cd purebloom-beauty

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Variables

Edit `server/.env` with your values:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/purebloom
JWT_SECRET=your_jwt_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@purebloom.com
ADMIN_PASSWORD=your-admin-password
```

### 3. Seed Database

```bash
cd server
npm run seed
```

This creates:
- 1 admin user
- 8 categories
- 23 products
- 5 sample contact messages
- 5 newsletter subscribers

**Default Admin Login:**
- Email: `srihariharipechettis@gmail.com`
- Password: `PureBloomAdmin2026`

### 4. Run Development

```bash
# Terminal 1 - Backend (port 5000)
cd server
npm run dev

# Terminal 2 - Frontend (port 5173)
cd client
npm run dev
```

Visit `http://localhost:5173` for the frontend.
Visit `http://localhost:5173/admin/login` for admin panel.

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (with filters) |
| GET | /api/products/slug/:slug | Get product by slug |
| GET | /api/categories | List categories |
| POST | /api/contact | Submit contact form |
| POST | /api/subscribers | Subscribe to newsletter |
| POST | /api/analytics/track | Track generic click |
| POST | /api/whatsapp/track | Track WhatsApp click |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/forgot-password | Request password reset |
| POST | /api/auth/reset-password/:token | Reset password |
| POST | /api/auth/change-password | Change password (auth) |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard/stats | Dashboard statistics |
| POST/PUT/DELETE | /api/products | Manage products |
| POST/PUT/DELETE | /api/categories | Manage categories |
| GET | /api/analytics | Analytics data |
| GET/PATCH | /api/contact | Manage messages |
| GET/DELETE | /api/subscribers | Manage subscribers |

## MCP Server

The MCP server runs on port 4000 and exposes:
- `get_products` - List products with filters
- `get_product_by_slug` - Get single product
- `list_categories` - List all categories
- `add_product` - Create a product
- `track_click` - Track a click event
- `get_analytics_summary` - Get analytics
- `create_contact_message` - Submit contact form

## Visual Design

- **Colors:** Powder blue (bloom), warm cream, deep navy
- **Typography:** Playfair Display (serif headings), Inter (sans-serif body)
- **Animations:** Framer Motion staggered reveals, parallax, floating elements
- **Layout:** Editorial spacing, rounded corners, pill-shaped CTAs

## Contact

**Email:** srihariharipechettis@gmail.com
**WhatsApp:** Available via floating button

---

Built with love for beauty discovery. ✨
