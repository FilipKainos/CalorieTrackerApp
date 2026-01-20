# Calorie Tracker

A personal calorie tracking app with weight logging, built with TypeScript, Nunjucks, Tailwind CSS, and IndexedDB for local storage.

## Features

- 🍎 **Food Tracking**: Log meals with name, calories, and optional cost
- ⚖️ **Weight Logging**: Record daily weight with trend indicators
- 📊 **Statistics**: View daily, weekly, and monthly calorie averages
- 💰 **Cost Tracking**: Monitor food expenses
- 📱 **Mobile Optimized**: Designed for phone usage
- 🔒 **Private**: All data stored locally in IndexedDB

## Tech Stack

- **Templating**: Nunjucks
- **Scripting**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide
- **Database**: IndexedDB (local storage)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

The development server runs at `http://localhost:5173`

```bash
npm run dev
```

### Build

```bash
npm run build
```

Built files are output to the `dist` directory.

### Deploy to GitHub Pages

1. Create a GitHub repository for this project
2. Push your code to the repository
3. Run the deploy command:

```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

4. In GitHub repository settings:
   - Go to **Settings** → **Pages**
   - Set Source to "Deploy from a branch"
   - Select the `gh-pages` branch and `/ (root)` folder
   - Click Save

Your app will be available at `https://<username>.github.io/<repo-name>/`

### Making it Private

Since GitHub Pages are public by default, to keep your data private:

1. **Do not share the URL** - Your data is stored in your browser's IndexedDB
2. **Use incognito/private browsing** on shared devices
3. **Consider using a unique/obscure repository name** to make it harder to discover

The app stores all data locally in your browser - no data is ever sent to a server.

## Project Structure

```
CalorieTracker/
├── src/
│   ├── index.html          # Main HTML with Nunjucks includes
│   ├── styles/
│   │   └── main.css        # Tailwind CSS styles
│   ├── templates/
│   │   └── partials/       # Nunjucks template partials
│   │       ├── header.njk
│   │       ├── date-nav.njk
│   │       ├── summary-cards.njk
│   │       ├── food-form.njk
│   │       ├── food-list.njk
│   │       ├── weight-form.njk
│   │       ├── weight-history.njk
│   │       └── stats.njk
│   └── ts/
│       ├── app.ts          # Main application logic
│       ├── database.ts     # IndexedDB layer
│       ├── types.ts        # TypeScript types
│       └── utils.ts        # Utility functions
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Usage

### Adding Food Entries

1. Enter the food name
2. Enter the calorie count
3. Optionally enter the cost
4. Click "Add Entry"

### Recording Weight

1. Switch to the "Weight" tab
2. Enter your weight in kg
3. Select the date
4. Click "Record Weight"

### Viewing Statistics

Switch to the "Stats" tab to see:
- Weekly average calories and cost
- Monthly average calories and cost
- Quick tips for better tracking

### Navigation

- Use the arrows or date picker to navigate between days
- Click "Today" to jump to the current date

## Data Storage

All data is stored locally in your browser using IndexedDB. This means:
- ✅ Your data stays on your device
- ✅ No internet required after initial load
- ✅ Data persists between sessions
- ⚠️ Clearing browser data will delete your entries
- ⚠️ Data is per-browser/device

## License

MIT
