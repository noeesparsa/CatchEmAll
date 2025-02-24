import { useEffect, useState } from "react";

import "./App.css";
import PokemonCard from "./components/card/PokemonCard.tsx";
import { fetchPokemonList, fetchPokemonDetail } from "./services/Pokemon.service.ts";
import { PokemonDetail, PokemonLight } from "./types/Pokemon.type.ts";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const loadPokemonData = async () => {
      const pokemonLightList: PokemonLight[] = await fetchPokemonList(); // Liste avec tout les Pokémon

      // pokemonDetailedList va attendre que toutes les promesses (map la liste des pokémon pour récupérer chaque url) soient résolues
      const pokemonDetailedList = await Promise.all(
        pokemonLightList.map((pokemonLight) => fetchPokemonDetail(pokemonLight.url)),
      );
      setPokemonList(pokemonDetailedList);
    };

    loadPokemonData();
  }, []);

  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="cards">
        {/* pokemonList récup les infos de pokemonDetailedList via le setPokemonList */}
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={pokemon.description || "No description available"}
            imageURL={pokemon.sprites.front_default}
            types={pokemon.types.map((typeInfo) => typeInfo.type.name)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
