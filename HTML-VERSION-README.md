# Xbox Game Sale Predictor 🎮

A lightweight HTML/CSS/JavaScript web app that helps you track Xbox game prices and predict upcoming sales.

## 🚀 Quick Start

**Option 1: Open Locally**
1. Download this project
2. Open `index.html` in your browser
3. Done! No installation needed ✨

**Option 2: Deploy to Vercel (Free)**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project" → "Import Git Repository"
3. Select your repository
4. Deploy! Your site will be live instantly

**Option 3: Deploy to GitHub Pages (Free)**
1. Go to your repository Settings → Pages
2. Select "Deploy from a branch" → main branch → root folder
3. Your site will be at: `https://yourname.github.io/xbox-game-sale-predictor`

## 📁 Project Structure

```
xbox-game-sale-predictor/
├── index.html       # Main HTML file with page structure
├── styles.css       # All styling with responsive design
├── script.js        # App logic and mock game data
└── README.md        # This file
```

## ✨ Features

- 🔍 **Search Games** - Real-time search through Xbox games
- 📊 **Game Details** - Click any game to see pricing info
- 💰 **Sale Predictions** - AI-predicted upcoming sales
- 🎯 **Current Prices** - Live pricing with discount percentages
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **No Backend Needed** - Pure client-side app with mock data

## 🛠️ How to Customize

### Add More Games
Edit `script.js` and add entries to the `mockGames` array:

```javascript
{
    id: 9,
    title: "Your Game Title",
    emoji: "🎮",
    currentPrice: 29.99,
    originalPrice: 59.99,
    genre: "Action",
    onSale: true,
    discount: 50,
    imageColor: "#FF0000"
}
```

### Modify Sale Predictions
Edit the `mockPredictions` array in `script.js` to update predicted sales.

### Change Colors
Update the CSS variables at the top of `styles.css`:

```css
:root {
    --primary: #107c10;      /* Main green (Xbox color) */
    --secondary: #005a9e;    /* Blue */
    --accent: #ffb900;       /* Yellow/Gold */
    --dark: #1e1e1e;         /* Dark gray */
    --light: #f3f3f3;        /* Light gray */
}
```

## 🌐 Live Demo

Coming soon! Deploy this project and share your link.

## 📋 What's Included

- ✅ Beautiful Xbox-themed UI
- ✅ Game search with autocomplete
- ✅ Game detail modals with predictions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ 8 sample games with realistic data
- ✅ 6 sale predictions with confidence scores
- ✅ No database needed - works anywhere!

## 🎓 Next Steps (Optional)

Want to add more features? You can:

1. **Add Real Data**: Fetch game data from an API
2. **Add Authentication**: Let users create wishlists
3. **Add Backend**: Create an API to serve real Xbox Store data
4. **Upgrade to Next.js**: Check out the full Next.js version in the repository

## 📝 License

MIT - Feel free to use this project for anything!

## 🤝 Need Help?

This is a simple HTML prototype. Want to:
- **Modify the design?** Edit `styles.css`
- **Change functionality?** Edit `script.js`
- **Add more games?** Update the data in `script.js`

---

**Made with ❤️ for Xbox Game Sales**
