import React, { useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import SettingsMenu from "./SettingsMenu";
import "./App.css";
import Ranges from "./Ranges";

const App = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState({
    player1: {
      id: 1,
      x: 50,
      y: 50,
      dx: 2,
      dy: 1,
      bullets: [],
      color: "#ff0000",
      speed: 1,
      fireRate: 20,
      score: 0,
    },
    player2: {
      id: 2,
      x: 550,
      y: 50,
      dx: -2,
      dy: 1,
      bullets: [],
      color: "#0000ff",
      speed: 1,
      fireRate: 40,
      score: 0,
    },
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {}, []);

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
    setShowSettings(true);
  };

  const handleChangeColor = (color) => {
    if (selectedPlayer) {
      selectedPlayer.color = color;
      setPlayers((prev) => ({
        ...prev,
        [`player${prev.player1.id === selectedPlayer.id ? 1 : 2}`]:
          selectedPlayer,
      }));
    }
  };

  const handleChangeSpeed = (speed, id) => {
    let selectedPlayer = players[`player${id}`];
    const currentDirection = Math.sign(selectedPlayer.speed);
    console.log(Math.abs(selectedPlayer.speed));
    if (Math.abs(selectedPlayer.speed) !== speed) {
      if (selectedPlayer.speed === 0) {
        selectedPlayer.speed = speed;
      } else {
        selectedPlayer.speed = speed * currentDirection;
      }

      setPlayers((prev) => ({
        ...prev,
        [`player${prev.player1.id === selectedPlayer.id ? 1 : 2}`]:
          selectedPlayer,
      }));
    }
  };

  const handleChangeFireRate = (fireRate, id) => {
    const selectedPlayer = players[`player${id}`];
    selectedPlayer.fireRate = fireRate;
    setPlayers((prev) => ({
      ...prev,
      [`player${prev.player1.id === selectedPlayer.id ? 1 : 2}`]:
        selectedPlayer,
    }));
  };

  return (
    <div>
      <div className="game-container">
        <Ranges
          player={players.player1}
          handleChangeFireRate={handleChangeFireRate}
          handleChangeSpeed={handleChangeSpeed}
        />

        <GameCanvas players={players} onPlayerSelect={handlePlayerSelection} />
        <Ranges
          player={players.player2}
          handleChangeFireRate={handleChangeFireRate}
          handleChangeSpeed={handleChangeSpeed}
        />
      </div>
      {showSettings && selectedPlayer && (
        <SettingsMenu
          player={selectedPlayer}
          onChangeColor={handleChangeColor}
          onChangeSpeed={handleChangeSpeed}
          onChangeFireRate={handleChangeFireRate}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default App;
