# Google OAuth Setup Guide

This guide will help you set up Google Sign-In for your Drag & Drop Lists app.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "**Select a Project**" → "**New Project**"
3. Enter project name: `Drag Drop Lists` (or your choice)
4. Click "**Create**"

## Step 2: Enable Google+ API

1. In your project, go to "**APIs & Services**" → "**Library**"
2. Search for "**Google+ API**"
3. Click on it and click "**Enable**"

## Step 3: Configure OAuth Consent Screen

1. Go to "**APIs & Services**" → "**OAuth consent screen**"
2. Select "**External**" (unless you have a Google Workspace)
3. Click "**Create**"

### Fill in the required fields:

- **App name**: `Drag & Drop Lists`
- **User support email**: Your email
- **App logo**: (optional)
- **App domain**: (leave blank for now, add later when deployed)
- **Developer contact**: Your email

4. Click "**Save and Continue**"
5. **Scopes**: Click "**Save and Continue**" (no additional scopes needed)
6. **Test users**: Add your Gmail address for testing
7. Click "**Save and Continue**"
8. Review and click "**Back to Dashboard**"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "**APIs & Services**" → "**Credentials**"
2. Click "**Create Credentials**" → "**OAuth client ID**"
3. Select "**Web application**"

### Configure:

**Name**: `Drag Drop Lists Web Client`

**Authorized JavaScript origins**:
- For local development: `http://localhost:5173`
- For production (Vercel): `https://your-app.vercel.app`

**Authorized redirect URIs**:
- For local: `http://localhost:5173`
- For production: `https://your-app.vercel.app`

4. Click "**Create**"
5. **COPY YOUR CLIENT ID** - it will look like:
   ```
   123456789-abc123def456.apps.googleusercontent.com
   ```

## Step 5: Configure Your App

### Local Development

1. Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp .env.example .env
```

2. Edit `.env` and add your Client ID:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
VITE_API_URL=http://localhost:4000/api
```

### For Vercel Deployment

1. In Vercel dashboard, go to your project settings
2. Navigate to "**Environment Variables**"
3. Add:
   - **Name**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: Your Google Client ID
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.herokuapp.com/api`)

## Step 6: Update OAuth Credentials for Production

After deploying to Vercel:

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. "**APIs & Services**" → "**Credentials**"
3. Click on your OAuth 2.0 Client ID
4. Add your Vercel URL to:
   - **Authorized JavaScript origins**: `https://your-app.vercel.app`
   - **Authorized redirect URIs**: `https://your-app.vercel.app`
5. Click "**Save**"

## Step 7: Test the Integration

1. Start your backend:
   ```bash
   cd backend && npm run dev
   ```

2. Start your frontend:
   ```bash
   cd frontend && npm run dev
   ```

3. Open `http://localhost:5173`
4. You should see a "**Sign in with Google**" button
5. Click it and sign in
6. Your profile picture and name should appear
7. You can now save/load lists to the server!

## Troubleshooting

### "OAuth client was not found"
- Make sure your Client ID is correct in `.env`
- Restart the dev server after adding `.env`

### "redirect_uri_mismatch"
- Make sure `http://localhost:5173` is in **Authorized redirect URIs**
- Check for typos (http vs https, port number)

### Button doesn't appear
- Check browser console for errors
- Make sure `.env` file exists and has the correct variable name
- Restart the dev server

### "Access blocked: This app's request is invalid"
- Add your email to **Test users** in OAuth consent screen
- Make sure the app is in "**Testing**" mode

## Security Notes

- **Never commit `.env` to Git** (it's in `.gitignore`)
- Keep your Client ID safe (it's not a secret, but don't abuse it)
- The OAuth token is stored in localStorage
- Each user's data is stored separately on the backend

## How It Works

1. User clicks "Sign in with Google"
2. Google popup appears for authentication
3. User grants permission
4. App receives a JWT token with user info
5. Token is sent with each API request
6. Backend stores data in `user_{googleId}.json`
7. Each user only sees their own lists

---

You're all set! Users can now sign in and have their own private lists! 🎉
