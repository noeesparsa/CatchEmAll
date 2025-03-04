import { useEffect, useState } from "react";

import "./App.css";
import PokemonCard from "./components/card/PokemonCard.tsx";
import { fetchPokemonList, fetchPokemonDetail } from "./services/Pokemon.service.ts";
import { PokemonDetail, PokemonLight } from "./types/Pokemon.type.ts";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const { results, next } = await fetchPokemonList();
        const pokemonDetailedList = await Promise.all(
          results.map((pokemonLight) => fetchPokemonDetail(pokemonLight.url)),
        );
        setPokemonList(pokemonDetailedList);
        setNextUrl(next);
      } catch (error) {
        console.error("Failed to load Pokémon data", error);
      }
    };

    loadPokemonData();
  }, []);

  const loadMorePokemon = async () => {
    try {
      if (!nextUrl) {
        console.error("Next URL is null or not found");
        return;
      }

      const response = await fetch(nextUrl);
      const data: { results: PokemonLight[]; next: string | null } = await response.json();
      const pokemonDetailedList = await Promise.all(
        data.results.map((pokemonLight) => fetchPokemonDetail(pokemonLight.url)),
      );

      setPokemonList((prevList) => [...prevList, ...pokemonDetailedList]);
      setNextUrl(data.next);
    } catch (error) {
      console.error("Failed to load more Pokémon data", error);
    }
  };

  const getPokemonType = (pokemon: PokemonDetail) => {
    return {
      types: pokemon.types.map((typeInfo) => typeInfo.type.name),
    };
  };

  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="cards">
        {pokemonList.map((pokemon) => {
          const pokemonData = getPokemonType(pokemon);
          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageURL={pokemon.sprites.front_default}
              types={pokemonData.types}
            />
          );
        })}
      </div>
      <div className="load__more__button">
        {nextUrl && <button onClick={loadMorePokemon}>Load More...</button>}
      </div>
    </>
  );
}

export default App;
