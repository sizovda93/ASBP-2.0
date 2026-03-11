import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/stats
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM stats ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/stats
router.post('/', async (req: Request, res: Response) => {
  try {
    const { label, value, unit, badge } = req.body;
    const orderResult = await query('SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM stats');
    const result = await query(
      'INSERT INTO stats (label, value, unit, badge, display_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [label, value, unit || '', badge || '', orderResult.rows[0].next_order]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/stats/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { label, value, unit, badge } = req.body;
    const result = await query(
      'UPDATE stats SET label=$1, value=$2, unit=$3, badge=$4 WHERE id=$5 RETURNING *',
      [label, value, unit || '', badge || '', req.params.id]
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

// DELETE /api/stats/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM stats WHERE id=$1 RETURNING id', [req.params.id]);
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
