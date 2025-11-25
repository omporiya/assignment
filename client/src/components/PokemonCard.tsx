import React from 'react';

interface PokemonStats {
    name: string;
    value: number;
}

interface PokemonData {
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    stats: PokemonStats[];
    abilities: string[];
}

interface PokemonCardProps {
    pokemon: PokemonData;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <div className="glass-panel pokemon-card">
            <div className="types-container">
                {pokemon.types.map((type) => (
                    <span key={type} className={`type-badge type-${type}`}>
                        {type}
                    </span>
                ))}
            </div>

            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />

            <h2 className="pokemon-name">
                #{pokemon.id} {pokemon.name}
            </h2>

            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Height</span>
                    <span className="stat-value">{pokemon.height / 10}m</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Weight</span>
                    <span className="stat-value">{pokemon.weight / 10}kg</span>
                </div>
                {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="stat-item">
                        <span className="stat-label">{stat.name.replace('-', ' ')}</span>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;
