import React from "react";

const Ranges = ({ player, handleChangeFireRate, handleChangeSpeed }) => {
  return (
    <div className="ranges">
      <div className="player-name">{`Player ${player.id}`}</div>
      <div className="range">
        <input
          type="range"
          min="10"
          max="1000"
          value={player.fireRate}
          onChange={(e) => handleChangeFireRate(e.target.value, player.id)}
        />
        <div className="label">
          <label htmlFor="fireRate">Fire Rate:</label>
          <span>{player.fireRate}</span>
        </div>
      </div>

      <div className="range">
        <input
          type="range"
          min="1"
          max="10"
          value={player.speed}
          onChange={(e) => handleChangeSpeed(e.target.value, player.id)}
        />

        <div className="label">
          <label htmlFor="speed">Speed:</label>
          <span>{player.speed}</span>
        </div>
      </div>
    </div>
  );
};

export default Ranges;
