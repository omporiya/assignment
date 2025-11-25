import { useState } from 'react';
import Search from './components/Search';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchPokemon = async (query: string) => {
    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const response = await fetch(`http://localhost:3000/api/pokemon/${query}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError('Pokemon not found. Please try another name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Pokedex</h1>

      <Search onSearch={searchPokemon} />

      {loading && <div className="glass-panel" style={{ padding: '2rem', display: 'inline-block' }}>Loading...</div>}

      {error && <div className="error-message">{error}</div>}

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;
