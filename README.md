# Xbox Game Sale Predictor 🎮

A modern web application that predicts when Xbox games will next go on sale and estimates the likely discount percentage based on historical sale data.

## 🚀 Features

### Core Features
- **Xbox Game Search**: Real-time autocomplete search for Xbox Store games
- **Historical Price Tracking**: Track price changes over time with detailed analytics
- **AI-Powered Sale Predictions**: Machine learning-based prediction engine
- **Interactive Charts**: Beautiful, responsive price and discount charts
- **User Wishlist**: Save favorite games and track their prices
- **Sale Alerts**: Get notified when games go on sale or price predictions occur
- **Game Details**: Comprehensive game information including ESRB ratings, genres, publishers
- **Admin Panel**: Manage game data and pricing updates

## 📋 Project Structure

```
xbox-game-sale-predictor/
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
│
├── prisma/
│   ├── schema.prisma         # Database schema definition
│   └── seed.js               # Database seeding script
│
├── src/
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   │
│   ├── lib/
│   │   ├── api.ts            # API client for frontend
│   │   ├── db.ts             # Prisma database client
│   │   ├── cache.ts          # In-memory caching system
│   │   └── prediction.ts     # Prediction algorithm logic
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   └── Footer.tsx    # Footer component
│   │   ├── Search/
│   │   │   └── SearchBar.tsx # Game search with autocomplete
│   │   ├── Games/
│   │   │   └── GameCard.tsx  # Individual game card component
│   │   └── Charts/
│   │       ├── PriceChart.tsx    # Price history chart
│   │       └── DiscountChart.tsx # Discount visualization
│   │
│   ├── app/
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Homepage
│   │
│   └── styles/
│       └── globals.css       # Global styles and animations
│
└── README.md                 # This file
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts for interactive data visualization
- **State Management**: Zustand
- **UI/UX**: Framer Motion for animations, React Hot Toast for notifications
- **Language**: TypeScript for type safety

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (primary) / MongoDB (alternative)
- **ORM**: Prisma for database management
- **Authentication**: JWT + bcryptjs

### Database Models

#### User
- Authentication and user management
- Premium subscription tracking
- Email verification

#### Game
- Xbox game information
- Current pricing and discount status
- Game metadata (genre, developer, ESRB rating)
- Game Pass availability

#### PriceHistory
- Historical price records
- Tracks every price change
- Discount percentage calculations
- Indexed for fast queries

#### SaleHistory
- Sales event tracking
- Sale duration and discount information
- Used for prediction algorithm training

#### SalePrediction
- Predicted sale dates
- Confidence scores (0-100)
- Estimated discount percentages
- Model version tracking for A/B testing

#### User Features
- **WishlistItem**: User's game wishlist
- **FavoriteGame**: Quick access favorites
- **SaleAlert**: Notification preferences per game
- **Notification**: User notification history
- **GameReview**: User reviews and ratings

## 🔮 Prediction Algorithm

### How It Works

The prediction engine analyzes historical sales data using statistical analysis:

1. **Sale Frequency Analysis**
   - Calculates average days between sales
   - Measures consistency (standard deviation)
   - Detects irregular patterns

2. **Discount Pattern Detection**
   - Tracks average discount percentages
   - Identifies seasonal patterns (Black Friday, Summer sales, etc.)
   - Analyzes discount trends over time

3. **Confidence Scoring**
   - Higher confidence with more historical data
   - Penalizes inconsistent sale intervals
   - Boosts confidence for clear patterns
   - Adjusts based on time since last sale

4. **Prediction Generation**
   - Estimates next sale date based on intervals
   - Predicts discount percentage from historical average
   - Calculates estimated sale price
   - Provides confidence score and reasoning

### Confidence Level Breakdown
- **90-100%**: Very strong pattern, reliable prediction
- **70-89%**: Strong pattern with minor variations
- **50-69%**: Moderate pattern, use with caution
- **Below 50%**: Insufficient data, prediction unreliable

## 💾 Historical Pricing Storage

### Data Collection
- **Automated Daily Updates**: Scheduled scraping of Xbox Store
- **Price Records**: Each price change creates a PriceHistory entry
- **Sale Events**: SaleHistory captures full sale information
- **Indexing**: Optimized queries with database indexes

### Data Structure
```typescript
// Price History Entry
{
  id: string;
  gameId: string;
  price: number;           // Current price at this time
  discount?: number;       // Discount percentage (0-100)
  isOnSale: boolean;       // Was game on sale?
  recordedAt: DateTime;    // When this price was recorded
  source: string;          // Data source (xbox, api, etc.)
}

// Sale History Entry
{
  id: string;
  gameId: string;
  saleStartDate: DateTime;
  saleEndDate?: DateTime;  // null if ongoing
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  source: string;
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Step 1: Clone and Install
```bash
git clone https://github.com/Isaac-MPA/xbox-game-sale-predictor.git
cd xbox-game-sale-predictor
npm install
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# Required:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET (random string for authentication)
# - NEXT_PUBLIC_API_URL (API endpoint, default: http://localhost:3000/api)
```

### Step 3: Setup Database
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed with sample data (optional)
npm run prisma:seed
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📊 API Endpoints (To Be Implemented)

### Games
- `GET /api/games/search` - Search games with filters
- `GET /api/games/:id` - Get game details
- `GET /api/games/featured` - Featured games list
- `GET /api/games/trending` - Trending games
- `GET /api/games/upcoming-sales` - Games with upcoming predictions

### Predictions
- `GET /api/predictions/:gameId` - Get prediction for a game
- `GET /api/predictions/top` - Top 10 predicted sales

### Price Data
- `GET /api/prices/history/:gameId` - Historical prices
- `GET /api/prices/chart/:gameId` - Chart-ready price data

### User Features
- `GET /api/wishlist` - User's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:gameId` - Remove from wishlist
- `GET /api/alerts` - User's sale alerts
- `POST /api/alerts/:gameId` - Create alert

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# One-time setup
vercel --prod
```

### Self-Hosted (Docker)

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/xbox_predictor
      JWT_SECRET: your_secret_key
    depends_on:
      - db

volumes:
  postgres_data:
```

3. Deploy:
```bash
docker-compose up -d
```

## 🔄 Data Scraping/Updates

### Automated Price Updates (To Be Implemented)

- **Daily at 2 AM UTC**: Scrape current prices from Xbox Store
- **Weekly**: Analyze trends and update predictions
- **Monthly**: Clean up old cache entries

## 💡 Future Improvements

### Phase 2
- [ ] Machine Learning integration (TensorFlow.js)
- [ ] Advanced pattern recognition for seasonal sales
- [ ] Browser notifications for alerts
- [ ] Email digest of predictions
- [ ] Game release date tracking
- [ ] Achievement/trophy tracking

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Social features (following friends, sharing wishlists)
- [ ] Community reviews and ratings
- [ ] Price comparison with other stores (Steam, Epic Games)
- [ ] Twitch/YouTube integration

### Phase 4
- [ ] Premium tier features
- [ ] Advanced analytics dashboard
- [ ] API access for developers
- [ ] Game recommendations engine
- [ ] Price prediction confidence intervals

## 💰 Monetization Ideas

### 1. Premium Subscription ($4.99/month)
- Early access to predictions (24 hours before public)
- Unlimited price alerts per game
- Email and push notifications
- Advanced analytics dashboard
- Ad-free experience

### 2. Affiliate Links
- Xbox Store affiliate program
- Amazon affiliate links for gift cards
- Commission on purchases made through referral links
- Estimated revenue: 2-5% per transaction

### 3. Advertising
- Unobtrusive native ads for gaming products
- Gaming service sponsorships
- VPN/security software partnerships
- Target platform: Sidebar and footer placements

### 4. API Access
- Developer API tier ($99/month)
- 10,000 requests/day
- Webhook support for real-time alerts
- Historical data exports

### 5. Browser Extension
- Alert overlay on Xbox Store pages
- Price comparison badges
- One-click wishlist addition
- Premium features in extension

## 📝 Development Progress

### Phase 1: Core Infrastructure (Current)
- [x] Project setup and structure
- [x] Database schema design
- [x] TypeScript type definitions
- [x] API client setup
- [ ] Prediction algorithm
- [ ] API endpoints
- [ ] Frontend pages
- [ ] Authentication system

### Phase 2: Full Stack (Next)
- [ ] Complete all API routes
- [ ] Frontend page implementations
- [ ] User authentication
- [ ] Admin panel
- [ ] Data scraping setup

### Phase 3: Polish & Launch
- [ ] Testing (unit, integration, e2e)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Security audit
- [ ] Beta testing

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with descriptive commits
4. Push to GitHub
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

Have questions? Open an issue on GitHub or contact the development team.

---

**Last Updated**: May 27, 2026
**Version**: 1.0.0 (In Development)
