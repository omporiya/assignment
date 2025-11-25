import express from 'express';
import { getPokemon } from '../services/pokeService';

const router = express.Router();

router.get('/pokemon/:name', async (req, res) => {
    try {
        const name = req.params.name;
        if (!name) {
            return res.status(400).json({ error: 'Pokemon name is required' });
        }

        const data = await getPokemon(name);
        res.json(data);
    } catch (error: any) {
        if (error.message === 'Pokemon not found') {
            res.status(404).json({ error: 'Pokemon not found' });
        } else {
            console.error('Error fetching pokemon:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

export default router;
