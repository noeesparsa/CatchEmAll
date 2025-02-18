import "./App.css";
import { Card } from "./components/card.tsx";

function App() {
  return (
    <>
      <div id="header">
        <img src="../public/assets/logoPokedex.png" alt="Logo Pokédex" />
      </div>
      <div className="cards"> {Card()} </div>
    </>
  );
}

export default App;
