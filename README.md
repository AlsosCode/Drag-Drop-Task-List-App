# Drag & Drop Lists

A beautiful, responsive drag-and-drop task management application with a clean macOS-inspired design. Create multiple lists, organize tasks with intuitive drag-and-drop, and sync your data across devices with Google authentication.

## Features

- **Multiple Lists**: Create unlimited lists for different contexts (Today, Groceries, etc.)
- **Drag & Drop**: Intuitive drag-and-drop to reorder items within lists or move between lists
- **Task Management**: Add, edit, delete, and mark items as done
- **Google OAuth**: Secure authentication with Google - each user gets their own private lists
- **Dark Mode**: Beautiful dark theme with automatic system detection and manual toggle
- **Auto-Save**: Automatic persistence to localStorage
- **Server Sync**: Backend sync for multi-device access with per-user data isolation
- **Accessible**: Keyboard navigation and screen reader support
- **Responsive**: Works beautifully on desktop, tablet, and mobile
- **macOS Design**: Clean, polished UI inspired by macOS Big Sur/Monterey with custom indigo accent color

## Tech Stack

### Frontend
- **React 18** with Vite for blazing-fast development
- **@dnd-kit** for accessible, touch-enabled drag and drop
- **@react-oauth/google** for Google authentication
- **Tailwind CSS** for utility-first styling with custom macOS theme
- **Vitest + React Testing Library** for comprehensive testing

### Backend
- **Node.js + Express** for simple, efficient API
- **Per-user JSON file storage** (easily upgradable to PostgreSQL/MongoDB)
- **CORS-enabled** for local development

### DevOps
- **Docker + docker-compose** for containerized development
- **GitHub Actions** for CI/CD
- **ESLint + Prettier** for code quality

## Getting Started

### Prerequisites

- Node.js 18+ or Docker
- npm or yarn
- Google Cloud account (for OAuth - see [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md))

### Google OAuth Setup (Required for Multi-User Support)

To enable user authentication and separate data for each user:

1. Follow the detailed guide: **[GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)**
2. Get your Google Client ID from Google Cloud Console
3. Add it to `frontend/.env`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```

**Without OAuth**: The app works offline with localStorage only (single user, no server sync)

### Local Development (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drag-drop-lists.git
   cd drag-drop-lists
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Configure Google OAuth** (see [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md))
   ```bash
   cd frontend
   # Create .env file with your Google Client ID
   echo "VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com" > .env
   echo "VITE_API_URL=http://localhost:4000/api" >> .env
   ```

4. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on `http://localhost:4000`

5. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Local Development (With Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drag-drop-lists.git
   cd drag-drop-lists
   ```

2. **Start with docker-compose**
   ```bash
   docker compose up --build
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage & Demo

### Basic Operations

1. **Create a new list**: Click the "New List" button
2. **Add items**: Type in the input field at the bottom of any list and press Enter or click the + button
3. **Drag items**: Click and hold the drag handle (⋮⋮) to reorder or move items between lists
4. **Mark done**: Click the checkbox next to any item
5. **Edit**: Double-click on item text or click the edit icon
6. **Delete**: Click the × icon to delete items or lists

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter**: Submit forms or activate buttons
- **Escape**: Cancel editing
- **Arrow Keys**: Navigate drag-drop operations (with keyboard sensor)

### Server Sync

1. **Login with Google**: Click the Google login button in the header
2. **Save to Server**: Click "Save to Server" to persist your lists to the backend (user-specific)
3. **Load from Server**: Click "Load from Server" to restore previously saved data
4. **Auto-sync**: Data automatically loads when you login

Each user's data is stored separately and isolated from other users.

## Running Tests

### Frontend Tests

```bash
cd frontend
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # With coverage
```

### Backend Tests

```bash
cd backend
npm test
```

## Project Structure

```
drag-drop-lists/
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── DraggableItem.jsx
│   │   │   ├── ListColumn.jsx
│   │   │   ├── NewListForm.jsx
│   │   │   ├── GoogleAuth.jsx
│   │   │   └── DarkModeToggle.jsx
│   │   ├── styles/           # CSS files
│   │   ├── tests/            # Test files
│   │   ├── stateUtils.js     # Pure state management functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Environment variables (not committed)
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── sync.js       # User sync endpoints
│   │   └── server.js         # Express server
│   ├── data/
│   │   └── user_*.json       # Per-user data storage (not committed)
│   ├── Dockerfile
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
├── docker-compose.yml
├── GOOGLE_OAUTH_SETUP.md     # OAuth setup guide
├── LICENSE
└── README.md
```

## Design Philosophy

This application follows the macOS design language with:

- **Clean, minimal aesthetics** with generous white space
- **Subtle shadows and borders** for depth without distraction
- **Smooth animations** using CSS transitions
- **SF Pro-style typography** with system font stack
- **Accessible color palette** with high contrast ratios
- **Frosted glass effects** (blur/backdrop-filter) where appropriate

## Customization

### Color Scheme

Edit [frontend/tailwind.config.cjs](frontend/tailwind.config.cjs) to customize the color palette:

```javascript
colors: {
  macos: {
    bg: '#f5f5f7',           // Light background
    blue: '#6366f1',          // Primary accent (indigo)
    'dark-bg': '#1c1c1e',    // Dark background
    // ... more colors
  },
}
```

### Default Lists

Modify the `getInitialState()` function in [frontend/src/stateUtils.js](frontend/src/stateUtils.js) to change seed data.

## Deployment

### Frontend (Vercel/Netlify)

1. Connect your GitHub repository
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/dist`
4. Set environment variables:
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.com/api`)

**Important**: Update your Google OAuth authorized JavaScript origins and redirect URIs in Google Cloud Console with your Vercel domain.

### Backend (Render/Railway/Heroku)

1. Connect your GitHub repository
2. Set root directory: `backend`
3. Set start command: `npm start`
4. Configure environment variables:
   - `PORT`: Auto-configured by most platforms
   - `NODE_ENV`: `production`

### Docker Registry

```bash
# Build and tag images
docker build -t yourusername/drag-drop-frontend:latest ./frontend
docker build -t yourusername/drag-drop-backend:latest ./backend

# Push to registry
docker push yourusername/drag-drop-frontend:latest
docker push yourusername/drag-drop-backend:latest
```

## Roadmap

- [x] **Dark Mode**: Beautiful dark theme with automatic detection
- [x] **User Accounts**: Google OAuth authentication and user-specific data
- [ ] **Database Migration**: Upgrade from JSON files to PostgreSQL/MongoDB
- [ ] **Undo/Redo**: Action history with Ctrl+Z support
- [ ] **Offline First**: Service Worker for offline functionality
- [ ] **Recurring Tasks**: Daily/weekly task templates
- [ ] **Custom Themes**: Additional color themes beyond light/dark
- [ ] **Mobile App**: React Native version
- [ ] **Collaboration**: Real-time multi-user editing
- [ ] **Rich Text**: Markdown support for item descriptions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [@dnd-kit](https://dndkit.com/) for the amazing drag-and-drop library
- [@react-oauth/google](https://github.com/MomenSherif/react-oauth) for seamless Google authentication
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- Apple for the design inspiration

## Support

If you encounter any issues or have questions, please file an issue on GitHub.

---

Made with React, Express, and modern web technologies
