# 💸 Bitcoin Regret Calculator - "If I Had Bought BTC..."

A hilarious and painful Bitcoin regret calculator that shows you exactly how much money you would have made if you had bought Bitcoin at any point in the past.

⚠️ **Warning:** This app may cause existential crisis, spontaneous crying, and intense regret about your life choices.

## 🎯 Features

- **Time Travel Calculator**: Enter any past date and investment amount
- **Real-time Bitcoin Prices**: Fetches actual historical and current BTC prices
- **Regret Meter**: Measures your regret on a scale from "Meh" to "MAXIMUM DESTRUCTION"
- **Meme Integration**: Funny content based on your regret level
- **Animated Results**: Smooth animations and transitions
- **Mobile Responsive**: Works on all devices (so you can cry anywhere)

## 🚀 Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Tailwind CSS** - Styling and animations
- **CoinGecko API** - Real Bitcoin price data
- **Lucide React** - Icons
- **Responsive Design** - Mobile-first approach

## 🎮 How to Use

1. Enter the amount you would have invested (in USD)
2. Select the date when you would have bought Bitcoin
3. Click "Calculate My Regret"
4. Watch as your life choices are evaluated by the universe
5. Cry (optional but recommended)

## 💻 Development

```bash
# Clone the repository
git clone <your-repo-url>
cd btc-regret-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎭 Regret Levels

- **0-19%**: Meh, Whatever - You basically broke even
- **20-29%**: Slight Oof - You could've bought a nice dinner
- **30-39%**: Ouch Territory - You missed out on a weekend getaway
- **40-49%**: Regret Loading... - You could've bought a car
- **50-59%**: Pain Level: Medium - You missed buying a house
- **60-69%**: Existential Crisis - You could've retired early
- **70-79%**: Life Choices: Questionable - Generational wealth missed
- **80-89%**: Legendary Mistake - You could've bought a private island
- **90-99%**: Cosmic Level Regret - Bitcoin billionaire status missed
- **100%**: MAXIMUM DESTRUCTION - You could've bought countries

## 🎨 Features Breakdown

### Calculator Interface

- Clean, modern design with gradient backgrounds
- Intuitive date and amount input
- Real-time validation and error handling

### Results Display

- Animated number counting
- Detailed breakdown of investment vs. current value
- Fun facts about your regret (pizza slices, coffee cups, etc.)

### Regret Meter

- Visual progress bar showing regret level
- Animated emojis and memes
- Therapy recommendations for high regret levels
- Funny quotes from "The Internet"

### API Integration

- Fetches real historical Bitcoin prices from CoinGecko
- Gets current Bitcoin price for calculations
- Handles API errors gracefully

## 🛠️ Project Structure

```
src/
├── app/
│   ├── api/bitcoin-price/    # API endpoint for fetching BTC prices
│   ├── globals.css           # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── BitcoinCalculator.tsx # Main calculator component
│   ├── RegretMeter.tsx      # Regret level display
│   └── ResultsDisplay.tsx   # Results visualization
```

## 🎪 Memes & Fun Content

The app includes:

- 10 different regret levels with unique memes
- Animated emojis and reactions
- Funny descriptions for each regret level
- Therapy recommendations for high regret
- Fun facts about what you could buy with your theoretical gains

## 🐛 Known Issues

- May cause spontaneous investment in cryptocurrency
- Side effects include checking Bitcoin price every 5 minutes
- Users have reported an urge to build a time machine

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/MorePain`)
3. Commit your changes (`git commit -m 'Add more regret levels'`)
4. Push to the branch (`git push origin feature/MorePain`)
5. Open a Pull Request

## 📝 License

This project is licensed under the "Do Whatever You Want But Don't Blame Me For Your Regret" License.

## 🎉 Credits

- Built with ❤️ and 😭 by developers who also didn't buy Bitcoin early enough
- Bitcoin price data from [CoinGecko API](https://www.coingecko.com/en/api)
- Memes inspired by the collective pain of the crypto community

---

**Disclaimer**: This app is for entertainment purposes only. Not financial advice. Past performance does not guarantee future results. Please invest responsibly and don't blame us for your life choices.

_"The best time to plant a tree was 20 years ago. The second best time is now. The best time to buy Bitcoin was 10 years ago. The second best time is... well, that ship has sailed."_
