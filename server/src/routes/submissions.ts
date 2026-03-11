import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/submissions
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/submissions
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, interest, comment, debt } = req.body;
    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone are required' });
      return;
    }
    const result = await query(
      'INSERT INTO submissions (name, phone, email, interest, comment, debt) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, phone, email || '', interest || debt || '', comment || '', debt || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/submissions/:id — update status
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const result = await query(
      'UPDATE submissions SET status=$1 WHERE id=$2 RETURNING *',
      [status || 'new', req.params.id]
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

// DELETE /api/submissions/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM submissions WHERE id=$1 RETURNING id', [req.params.id]);
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
