import "./App.css";
import Card from "./components/card.tsx";

function App() {
  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Logo Pokédex" role="pokedexLogo" />
      </div>
      <div className="cards">
        <Card />
      </div>
    </>
  );
}

export default App;
