import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import PokemonCard from "./components/pokemonCard/PokemonCard.tsx";
import PokemonDetailPageCard from "./components/pokemonDetailPage/PokemonDetailPage.tsx";
import { fetchPokemonList, fetchPokemonCardInfo } from "./services/Pokemon.service.ts";
import { PokemonCardInfo } from "./types/Pokemon.type.ts";

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
    } else {
      resetPokemonList();
    }
  }, [searchTerm]);

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

  const resetPokemonList = async (): Promise<void> => {
    setPokemonList([]);
    setNextUrl(null);
    await loadPokemonData();
  };

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

export default App;
