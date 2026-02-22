import { Router, Request, Response } from 'express';

const router = Router();

router.get('/disputes', (req: Request, res: Response) => {
    // your handler logic here
    res.json({ message: 'Disputes endpoint' });
});

export default router;