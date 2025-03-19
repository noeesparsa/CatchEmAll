import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useParams, BrowserRouter } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadPokemonData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchPokemon(searchTerm);
    } else if (searchTerm === "") {
      resetPokemonList();
    }
  }, [searchTerm]);

  const loadPokemonData = async (): Promise<void> => {
    try {
      const data = await fetchPokemonList();
      if (data && data.results) {
        const pokemonDetailedList = await Promise.all(
          data.results.map((pokemon) => fetchPokemonCardInfo(pokemon.url)),
        );
        setPokemonList(pokemonDetailedList);
        setNextUrl(data.next);
      } else {
        console.error("No Pokémon data found");
      }
    } catch (error) {
      console.error("Failed to load Pokémon data", error);
    }
  };

  const resetPokemonList = async (): Promise<void> => {
    setPokemonList([]);
    setNextUrl(null);
    await loadPokemonData();
  };

  const loadMorePokemon = async (): Promise<void> => {
    try {
      if (nextUrl) {
        const data = await fetchPokemonList(nextUrl);
        if (data && data.results) {
          const pokemonDetailedList = await Promise.all(
            data.results.map((pokemon) => fetchPokemonCardInfo(pokemon.url)),
          );
          setPokemonList((prevList) => [...prevList, ...pokemonDetailedList]);
          setNextUrl(data.next);
        } else {
          console.error("No more Pokémon data found");
        }
      }
    } catch (error) {
      console.error("Failed to load more Pokémon data", error);
    }
  };

  const searchPokemon = async (term: string) => {
    setIsSearching(true);
    setPokemonList([]);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15000`);
      const data = await response.json();
      const filteredResults = data.results.filter((pokemon: { name: string; url: string }) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase()),
      );
      const pokemonDetailedList = await Promise.all(
        filteredResults.map((PokemonList: { name: string; url: string }) =>
          fetchPokemonCardInfo(PokemonList.url),
        ),
      );
      setPokemonList(pokemonDetailedList);
    } catch (error) {
      console.error("Failed to search Pokémon data", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getPokemonTypes = (pokemon: PokemonCardInfo) => {
    return pokemon.types.map((typeInfo) => typeInfo.type.name);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="header">
                <img src="./assets/logoPokedex.png" alt="Pokedex" />
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search Pokémon"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
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
              {!isSearching && nextUrl && !searchTerm && (
                <div className="load__more__button">
                  <button onClick={loadMorePokemon}>Load More...</button>
                </div>
              )}
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
          <img src="../assets/logoPokedex.png" alt="Pokedex" />
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
