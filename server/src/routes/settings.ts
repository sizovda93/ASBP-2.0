import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/settings — all settings as key-value map
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT setting_key, setting_value FROM site_settings');
    const map: Record<string, string> = {};
    for (const row of result.rows) {
      map[row.setting_key] = row.setting_value;
    }
    res.json(map);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/:key — upsert a single setting
router.put('/:key', async (req: Request, res: Response) => {
  try {
    const { setting_value } = req.body;
    const result = await query(
      'UPDATE site_settings SET setting_value=$1, updated_at=CURRENT_TIMESTAMP WHERE setting_key=$2 RETURNING *',
      [setting_value, req.params.key]
    );
    if (result.rows.length === 0) {
      const insertResult = await query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES ($1, $2) RETURNING *',
        [req.params.key, setting_value]
      );
      res.json(insertResult.rows[0]);
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — bulk update multiple settings
router.put('/', async (req: Request, res: Response) => {
  try {
    const settings = req.body as Record<string, string>;
    for (const [key, value] of Object.entries(settings)) {
      const result = await query(
        'UPDATE site_settings SET setting_value=$1, updated_at=CURRENT_TIMESTAMP WHERE setting_key=$2',
        [value, key]
      );
      if (result.rowCount === 0) {
        await query(
          'INSERT INTO site_settings (setting_key, setting_value) VALUES ($1, $2)',
          [key, value]
        );
      }
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
