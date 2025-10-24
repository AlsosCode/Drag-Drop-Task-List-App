import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper function to get user-specific file path
function getUserDataFile(userId) {
  // Sanitize userId to prevent directory traversal
  const sanitized = userId.replace(/[^a-zA-Z0-9-_]/g, '');
  return path.join(DATA_DIR, `user_${sanitized}.json`);
}

router.get('/load', (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    const userFile = getUserDataFile(userId);

    if (!fs.existsSync(userFile)) {
      return res.json({ lists: [] });
    }

    const raw = fs.readFileSync(userFile, 'utf8');
    return res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Load error:', err);
    return res.status(500).json({ error: 'failed to load' });
  }
});

router.post('/save', (req, res) => {
  try {
    const { userId, data } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    // Validate data structure
    if (!data || (!Array.isArray(data.lists) && !Array.isArray(data))) {
      return res.status(400).json({ error: 'invalid data structure' });
    }

    const userFile = getUserDataFile(userId);
    const toWrite = JSON.stringify(data, null, 2);

    // Atomic write: write to temp file then rename
    fs.writeFileSync(userFile + '.tmp', toWrite, 'utf8');
    fs.renameSync(userFile + '.tmp', userFile);

    return res.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    return res.status(500).json({ error: 'failed to save' });
  }
});

export default router;
