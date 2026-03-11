import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/services
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/services
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, icon, image_url } = req.body;
    const orderResult = await query('SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM services');
    const result = await query(
      'INSERT INTO services (title, description, icon, image_url, display_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, description || '', icon || 'shield', image_url || '', orderResult.rows[0].next_order]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/services/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, icon, image_url } = req.body;
    const result = await query(
      'UPDATE services SET title=$1, description=$2, icon=$3, image_url=$4 WHERE id=$5 RETURNING *',
      [title, description || '', icon || 'shield', image_url || '', req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/services/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM services WHERE id=$1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
