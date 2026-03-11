import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/cases
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM cases ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cases
router.post('/', async (req: Request, res: Response) => {
  try {
    const { case_number, status, amount, description, card_size, accent } = req.body;
    const orderResult = await query('SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM cases');
    const result = await query(
      'INSERT INTO cases (case_number, status, amount, description, card_size, accent, display_order) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [case_number, status || '', amount || '', description || '', card_size || 'large', accent ?? false, orderResult.rows[0].next_order]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cases/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { case_number, status, amount, description, card_size, accent } = req.body;
    const result = await query(
      'UPDATE cases SET case_number=$1, status=$2, amount=$3, description=$4, card_size=$5, accent=$6 WHERE id=$7 RETURNING *',
      [case_number, status || '', amount || '', description || '', card_size || 'large', accent ?? false, req.params.id]
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

// DELETE /api/cases/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM cases WHERE id=$1 RETURNING id', [req.params.id]);
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
