import "../css/card.css";

export function Card() {
  return (
    <div className="card">
      <div id="top">
        <div id="types">
          <span id="type1">Type1</span>
          <span id="type2">Type2</span> {/* Si le poké en a un */}
        </div>

        <div id="id">
          <p>
            <strong>#001</strong>
          </p>
        </div>
      </div>

      <div id="name">
        <p>Test name</p>
      </div>

      <div id="bottom">
        <div id="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Perferendis sit officiis nemo
            cumque, dignissimos modi non unde saepe.
          </p>

          <button id="more">Know More...</button>
        </div>

        <div id="sprite">
          <img src="/assets/pokeball.png" alt="test" />
        </div>
      </div>
    </div>
  );
}
