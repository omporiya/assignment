import axios from 'axios';
import { LRUCache } from 'lru-cache';

// Cache configuration: Max 500 items, 1 hour TTL
const cache = new LRUCache<string, any>({
    max: 500,
    ttl: 1000 * 60 * 60,
});

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (name: string) => {
    const lowerName = name.toLowerCase().trim();

    // Check cache
    if (cache.has(lowerName)) {
        console.log(`Cache hit for ${lowerName}`);
        return cache.get(lowerName);
    }

    try {
        console.log(`Fetching from PokeAPI for ${lowerName}`);
        const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${lowerName}`);
        const data = response.data;

        // Extract interesting attributes
        const pokemonData = {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name),
            height: data.height,
            weight: data.weight,
            stats: data.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),
            abilities: data.abilities.map((a: any) => a.ability.name),
        };

        // Store in cache
        cache.set(lowerName, pokemonData);
        return pokemonData;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            throw new Error('Pokemon not found');
        }
        throw error;
    }
};
