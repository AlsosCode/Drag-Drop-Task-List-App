# Drag & Drop Task List App

A modern, intuitive task management application with Apple-OS inspired design, featuring drag-and-drop functionality and Google authentication for multi-user support.

**Live Demo**: [https://drag-drop-task-list-app.vercel.app](https://drag-drop-task-list-app.vercel.app) 🚀

![GitHub Actions](https://github.com/AlsosCode/Drag-Drop-Task-List-App/workflows/CI/badge.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ Features

- **Multiple Lists**: Create unlimited lists for different contexts (Today, Groceries, Work, etc.)
- **Drag & Drop**: Smooth, accessible drag-and-drop to reorder items within lists or move between lists
- **Task Management**: Add, edit, delete, and mark items as complete with checkboxes
- **Google OAuth**: Secure authentication - each user gets their own private lists
- **Light/Dark Mode**: Toggle with preference saved to localStorage, respects system theme
- **Auto-Save**: Automatic persistence to localStorage for offline use
- **Server Sync**: Optional backend sync for multi-device access with per-user data isolation
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Apple-OS Aesthetic**: Clean, minimalistic design inspired by macOS Big Sur/Monterey
- **Accessible**: Keyboard navigation, ARIA labels, screen reader support
- **Performance**: React 18 with Vite, fast HMR, optimized bundle

## 🚀 Quick Start

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlsosCode/Drag-Drop-Task-List-App.git
   cd Drag-Drop-Task-List-App
   ```

2. **Install dependencies**:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend (in a new terminal)
   cd backend
   npm install
   ```

3. **Set up environment variables** (optional - for Google OAuth):
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env and add your Google Client ID (see Google OAuth Setup below)
   ```

4. **Start the development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   # Backend runs on http://localhost:4000

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

5. **Open your browser**:
   Visit `http://localhost:5173`

### Using Docker (Alternative)

```bash
# Clone and navigate
git clone https://github.com/AlsosCode/Drag-Drop-Task-List-App.git
cd Drag-Drop-Task-List-App

# Start with docker-compose
docker compose up --build

# Open http://localhost:5173
```

## 📝 Google OAuth Setup

To enable multi-user support with Google authentication:

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** (or use existing)
3. **Enable Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Authorized JavaScript origins: `http://localhost:5173` (for local dev)
   - Copy your Client ID
5. **Add to your `.env` file**:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   VITE_API_URL=http://localhost:4000/api
   ```

For detailed instructions, see [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md).

**Without OAuth**: The app works perfectly offline with localStorage only (single user, no server sync).

## 🎯 Usage

### Basic Operations

- **Create a new list**: Click the "New List" button in the top-right
- **Add items**: Type in the input field at the bottom of any list and press Enter or click +
- **Drag items**: Click and hold the drag handle (⋮⋮) on the left of items to drag
- **Mark complete**: Click the checkbox next to any item
- **Edit items**: Double-click on item text or click the edit icon
- **Delete**: Click the × icon on items or lists

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter**: Submit forms or activate buttons
- **Escape**: Cancel editing mode
- **Arrow Keys**: Navigate drag-drop operations

### Server Sync (with Google OAuth)

1. **Login**: Click the Google login button in the header
2. **Save**: Click "Save to Server" to persist your lists to the backend
3. **Load**: Click "Load from Server" to restore saved data
4. **Auto-sync**: Data automatically loads when you login

Each user's data is completely isolated and private.

## 🛠️ Technologies Used

### Frontend
- **React 18**: Component-based UI with hooks
- **Vite**: Lightning-fast build tool and dev server
- **@dnd-kit**: Accessible drag-and-drop library
- **@react-oauth/google**: Google authentication
- **Tailwind CSS**: Utility-first CSS with custom design system
- **Vitest + React Testing Library**: Unit and integration tests

### Backend
- **Node.js + Express**: Lightweight REST API
- **JSON file storage**: Per-user data files (easily upgradable to PostgreSQL/MongoDB)
- **CORS**: Configured for local and production environments

### DevOps
- **Docker**: Containerized development environment
- **GitHub Actions**: Automated CI/CD pipeline
- **ESLint + Prettier**: Code quality and formatting

## 📁 Project Structure

```
Drag-Drop-Task-List-App/
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── App.jsx           # Main app component
│   │   │   ├── DraggableItem.jsx # Draggable task item
│   │   │   ├── ListColumn.jsx    # List container
│   │   │   ├── NewListForm.jsx   # Create list form
│   │   │   ├── GoogleAuth.jsx    # Google OAuth login
│   │   │   └── DarkModeToggle.jsx# Dark mode switch
│   │   ├── styles/               # CSS files
│   │   │   ├── globals.css       # Global styles
│   │   │   └── components.css    # Component styles
│   │   ├── tests/                # Test files
│   │   ├── stateUtils.js         # State management logic
│   │   └── main.jsx              # Entry point
│   ├── .env.example              # Environment variables template
│   ├── tailwind.config.cjs       # Tailwind configuration
│   ├── vite.config.js            # Vite configuration
│   ├── Dockerfile                # Frontend Docker image
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── sync.js           # User data sync endpoints
│   │   └── server.js             # Express server
│   ├── data/                     # User data storage
│   │   └── user_*.json           # Per-user JSON files (gitignored)
│   ├── Dockerfile                # Backend Docker image
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
├── docker-compose.yml            # Multi-container setup
├── GOOGLE_OAUTH_SETUP.md         # OAuth setup guide
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## 🎨 Design System

### Colors

**Light Mode**:
- Background: `#f5f5f7` (Light gray)
- Surface: `#ffffff` (White)
- Text: `#1d1d1f` (Near black)
- Accent: `#6366f1` (Indigo)

**Dark Mode**:
- Background: `#1c1c1e` (Near black)
- Surface: `#2c2c2e` (Dark gray)
- Text: `#ffffff` (White)
- Accent: `#818cf8` (Light indigo)

### Typography

System font stack for native OS feel:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

### Spacing & Layout
- Container max-width: `1200px`
- Border radius: `12px` (cards), `8px` (buttons)
- Shadow: Subtle elevation with `rgba` shadows
- Transitions: `150ms ease` for smooth interactions

## 🧪 Running Tests

### Frontend Tests
```bash
cd frontend
npm test                  # Run all tests
npm test -- --watch       # Watch mode
npm test -- --coverage    # With coverage report
```

### Backend Tests
```bash
cd backend
npm test
```

### CI/CD
GitHub Actions automatically runs tests on push and pull requests:
- Frontend tests (Node.js 18.x and 20.x)
- Backend tests (Node.js 18.x and 20.x)
- Docker build validation

## 🚢 Deployment

### Frontend (Vercel/Netlify)

**Vercel**:
1. Connect your GitHub repository
2. Framework preset: Vite
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Environment variables:
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `VITE_API_URL`: Your backend URL (e.g., `https://api.example.com/api`)

**Important**: Update Google Cloud Console with your production domain in authorized origins.

### Backend (Render/Railway/Heroku)

**Render**:
1. Connect your GitHub repository
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Environment variables:
   - `PORT`: Auto-configured
   - `NODE_ENV`: `production`

## 🎯 Customization Guide

### Change Accent Color

Edit `frontend/tailwind.config.cjs`:
```javascript
colors: {
  macos: {
    blue: '#6366f1',        // Change to your color
    'blue-hover': '#4f46e5', // Darker shade for hover
  },
}
```

### Modify Default Lists

Edit `frontend/src/stateUtils.js` in the `getInitialState()` function:
```javascript
export function getInitialState() {
  return {
    lists: [
      {
        id: 'list-1',
        name: 'Your Custom List',
        items: [
          { id: 'i1', text: 'Your task here', done: false },
        ],
      },
    ],
  };
}
```

### Add More Features

The app is structured for easy extension:
- **Components**: Add new components in `frontend/src/components/`
- **State Logic**: Extend `stateUtils.js` for new features
- **API Endpoints**: Add routes in `backend/src/routes/`
- **Styling**: Use Tailwind utilities or extend `components.css`

## 🗺️ Roadmap

- [x] Core drag-and-drop functionality
- [x] Dark mode with system detection
- [x] Google OAuth authentication
- [x] Per-user data isolation
- [x] Responsive mobile design
- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] Undo/Redo with Ctrl+Z
- [ ] Service Worker for offline-first
- [ ] Recurring tasks (daily/weekly templates)
- [ ] Custom color themes
- [ ] React Native mobile app
- [ ] Real-time collaboration
- [ ] Rich text with Markdown support
- [ ] Task priorities and due dates
- [ ] Search and filter

## ♿ Accessibility

- ✅ Semantic HTML5 elements
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ✅ Focus visible states with accent color
- ✅ Color contrast ratio > 4.5:1 (WCAG AA)
- ✅ Respects `prefers-reduced-motion`
- ✅ Accessible drag-and-drop with @dnd-kit

## 📱 Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Required features:
- CSS Variables, Grid, Flexbox
- ES6+ JavaScript
- LocalStorage
- Fetch API

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**TL;DR**: Feel free to use this project for personal or commercial purposes, but please:
- Keep the license notice
- Give credit where appropriate
- No warranty provided

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please ensure:
- Tests pass (`npm test`)
- Code follows ESLint rules (`npm run lint`)
- Commit messages are descriptive

## 🙏 Acknowledgments

- [@dnd-kit](https://dndkit.com/) - Amazing accessible drag-and-drop
- [@react-oauth/google](https://github.com/MomenSherif/react-oauth) - Seamless Google auth
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Apple - Design inspiration for the clean macOS aesthetic

## 📧 Contact

**Mathias Alsos Paulsen**

- Email: Mathias.Alsos03@gmail.com
- GitHub: [@AlsosCode](https://github.com/AlsosCode)
- Portfolio: [alsoscode.github.io](https://alsoscode.github.io/)

---

Built with ❤️ using React, Express, and modern web technologies. No unnecessary dependencies, just clean, maintainable code.
