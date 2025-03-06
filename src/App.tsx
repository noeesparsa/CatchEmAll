import { useEffect, useState } from "react";

import "./App.css";
import PokemonCard from "./components/card/PokemonCard.tsx";
import { fetchPokemonList, fetchPokemonDetail } from "./services/Pokemon.service.ts";
import { PokemonDetail } from "./types/Pokemon.type.ts";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonData = async (): Promise<void> => {
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

    loadPokemonData().catch((error) => {
      console.error("Error in useEffect", error);
    });
  }, []);

  const loadMorePokemon = async (): Promise<void> => {
    try {
      if (nextUrl) {
        const { results, next } = await fetchPokemonList(nextUrl);
        const pokemonDetailedList = await Promise.all(
          results.map((pokemonLight) => fetchPokemonDetail(pokemonLight.url)),
        );
        setPokemonList((prevList) => [...prevList, ...pokemonDetailedList]);
        setNextUrl(next);
      }
    } catch (error) {
      console.error("Failed to load more Pokémon data", error);
    }
  };

  const getPokemonTypes = (pokemon: PokemonDetail) => {
    return pokemon.types.map((typeInfo) => typeInfo.type.name);
  };

  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="cards">
        {pokemonList.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageURL={pokemon.sprites.front_default}
              types={getPokemonTypes(pokemon)}
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
