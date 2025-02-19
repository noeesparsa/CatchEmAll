import "./App.css";
import Card from "./components/card/card.tsx";

function App() {
  return (
    <>
      <div id="header">
        <img src="/assets/logoPokedex.png" alt="Pokedex" />
      </div>
      <div className="cards">
        <Card />
      </div>
    </>
  );
}

export default App;
