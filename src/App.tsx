import { useEffect, useState } from "react";

import "./App.css";
import PokemonCard from "./components/card/PokemonCard.tsx";
import { fetchPokemonList, fetchPokemonDetail } from "./services/Pokemon.service.ts";
import { PokemonDetail, PokemonLight } from "./types/Pokemon.type.ts";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const loadPokemonData = async () => {
      const pokemonLightList: PokemonLight[] = await fetchPokemonList();

      const pokemonDetailedList = await Promise.all(
        pokemonLightList.map((pokemonLight) => fetchPokemonDetail(pokemonLight.url)),
      );
      setPokemonList(pokemonDetailedList);
    };

    loadPokemonData();
  }, []);

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
    </>
  );
}

export default App;
