import "./App.css";
import PokemonCard from "./components/card/PokemonCard.tsx";

function App() {
  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="cards">
        {/* Test avec un pokémon aléatoire pour le moment, ce sera adapté dans l'exo suivant, en lien avec la consigne */}
        <PokemonCard
          id={1}
          name="Pikachu"
          description="Electric type Pokémon"
          imageURL="/assets/pikachu.png"
          types={["Electric"]}
        />
      </div>
    </>
  );
}

export default App;
