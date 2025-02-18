import "../css/card.css";

export function Card() {
  return (
    <div className="card">
      <div id="top">
        <div id="types">
          <span id="type1" data-testid="type1">
            Type1
          </span>
          <span id="type2" data-testid="type2">
            Type2
          </span>
        </div>

        <div id="id" data-testid="id">
          <p>
            <strong>#001</strong>
          </p>
        </div>
      </div>

      <div id="name" data-testid="name">
        <p>Test name</p>
      </div>

      <div id="bottom">
        <div id="description" data-testid="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Perferendis sit officiis nemo
            cumque, dignissimos modi non unde saepe.
          </p>

          <button id="more">Know More...</button>
        </div>

        <div id="sprite" data-testid="sprite">
          <img src="/assets/pokeball.png" alt="Pokemon" />
        </div>
      </div>
    </div>
  );
}
