import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./PokemonDetailPage.css";
import { fetchPokemonPageDetail } from "../../services/Pokemon.service";
import { PokemonDetailPage, PokemonCardInfo } from "../../types/Pokemon.type";
import PokemonTypeBadge from "../pokemonTypeBadge/PokemonTypeBadge";

const statRenameMapping: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

const PokemonDetailPageCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailPage | null>(null);
  const [description, setDescription] = useState<string>("");

  console.log("id", id);
  useEffect(() => {
    const loadPokemonDetail = async (): Promise<void> => {
      try {
        if (id) {
          const PokemonCardInfo = await fetchPokemonPageDetail(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );
          setPokemon(PokemonCardInfo);
          console.log(PokemonCardInfo);
        }
      } catch (error) {
        console.error("Failed to load Pokémon detail", error);
        console.log(error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await response.json();
        setDescription(data.flavor_text_entries[0].flavor_text);
      } catch (error) {
        console.error("Error retrieving description:", error);
        setDescription("Description not found.");
      }
    };

    loadPokemonDetail();
    fetchDescription();
  }, [id]);

  const getPokemonTypes = (pokemon: PokemonCardInfo) => {
    return pokemon.types.map((typeInfo) => typeInfo.type.name);
  };

  const getPokemonAbilities = (pokemon: PokemonDetailPage) => {
    return pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name);
  };

  const getPokemonStats = (pokemon: PokemonDetailPage) => {
    return pokemon.stats.map((statInfo) => ({
      name: statInfo.stat.name,
      base_stat: statInfo.base_stat,
    }));
  };

  if (!pokemon || !description) {
    console.log("pokemon", pokemon);
    console.log("description", description);
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="card__details">
        <div className="close__page">
          <Link to={`/`}>
            <p className="close__button">x</p>
          </Link>
        </div>
        <div className="card__sprite">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="card_right_side">
          <div className="card_right_side_id">
            <p>#{pokemon.id}</p>
          </div>
          <div className="card_right_side_name">
            <p>{pokemon.name}</p>
          </div>
          <div className="type__badge">
            {getPokemonTypes(pokemon).map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>
          <div className="card_right_side_description">
            <p>{description}</p>
          </div>
          <div className="card_right_side_body">
            <p>
              <span>Height : </span>
              {pokemon.height}
            </p>
            <p>
              <span>Weight : </span>
              {pokemon.weight}
            </p>
          </div>
          <div className="stats">
            <h2>Stats</h2>
            <div className="stats__badges">
              {getPokemonStats(pokemon).map((stat, index) => (
                <span className={`stats__badge__${stat.name}`} key={index}>
                  <p>
                    {statRenameMapping[stat.name]}: {stat.base_stat}
                  </p>
                </span>
              ))}
            </div>
          </div>
          <div className="card_right_side_abilities">
            <p>Abilities</p>
            {getPokemonAbilities(pokemon).map((ability, index) => (
              <span className="ability" key={index}>
                {ability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailPageCard;
