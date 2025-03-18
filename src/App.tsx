import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import PokemonCard from "./components/pokemonCard/PokemonCard.tsx";
import PokemonDetailPageComponent from "./components/pokemonDetailPage/PokemonDetailPage.tsx";
import {
  fetchPokemonList,
  fetchPokemonCardInfo,
  fetchPokemonPageDetail,
} from "./services/Pokemon.service.ts";
import { PokemonCardInfo, PokemonDetailPage } from "./types/Pokemon.type.ts";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonCardInfo[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonData = async (): Promise<void> => {
      try {
        const { results, next } = await fetchPokemonList();
        const pokemonDetailedList = await Promise.all(
          results.map((PokemonList) => fetchPokemonCardInfo(PokemonList.url)),
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
          results.map((PokemonList) => fetchPokemonCardInfo(PokemonList.url)),
        );
        setPokemonList((prevList) => [...prevList, ...pokemonDetailedList]);
        setNextUrl(next);
      }
    } catch (error) {
      console.error("Failed to load more Pokémon data", error);
    }
  };

  const getPokemonTypes = (pokemon: PokemonCardInfo) => {
    return pokemon.types.map((typeInfo) => typeInfo.type.name);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/pokemon/"
          element={
            <>
              <div id="header">
                <img src="./assets/logoPokedex.png" alt="Pokedex" />
              </div>
              <div className="cards">
                {pokemonList.map((pokemon) => {
                  return (
                    <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                      <PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        imageURL={pokemon.sprites.front_default}
                        types={getPokemonTypes(pokemon)}
                      />
                    </Link>
                  );
                })}
              </div>
              <div className="load__more__button">
                {nextUrl && <button onClick={loadMorePokemon}>Load More...</button>}
              </div>
            </>
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetailPageCard />} />
      </Routes>
    </BrowserRouter>
  );
}

function PokemonDetailPageCard() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailPage | null>(null);

  useEffect(() => {
    const loadPokemonDetail = async (): Promise<void> => {
      try {
        if (id) {
          const PokemonCardInfo = await fetchPokemonPageDetail(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );
          setPokemon(PokemonCardInfo);
        }
      } catch (error) {
        console.error("Failed to load Pokémon detail", error);
      }
    };

    loadPokemonDetail().catch((error) => {
      console.error("Error in useEffect", error);
    });
  }, [id]);

  const getPokemonAbilities = (pokemon: PokemonDetailPage) => {
    return pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name);
  };

  const getPokemonStats = (pokemon: PokemonDetailPage) => {
    return pokemon.stats.map((statInfo) => ({
      name: statInfo.stat.name,
      base_stat: statInfo.base_stat,
    }));
  };

  if (pokemon) {
    return (
      <>
        <div id="header">
          <img src="./assets/logoPokedex.png" alt="Pokedex" />
        </div>
        <div className="close__page">
          <Link to={`/pokemon/`}>
            <p>x</p>
          </Link>
        </div>
        <PokemonDetailPageComponent
          id={pokemon.id}
          name={pokemon.name}
          imageURL={pokemon.sprites.front_default}
          types={pokemon.types.map((typeInfo) => typeInfo.type.name)}
          weight={pokemon.weight}
          height={pokemon.height}
          abilities={getPokemonAbilities(pokemon)}
          stats={getPokemonStats(pokemon)}
        />
      </>
    );
  }
}

export default App;
