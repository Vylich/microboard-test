import React, { useState, useEffect } from "react";

const SettingsMenu = ({ player, onChangeColor, onClose }) => {
  const [color, setColor] = useState(player.color);

  useEffect(() => {
    setColor(player.color);
  }, [player]);

  const handleApply = () => {
    onChangeColor(color);
    onClose();
  };

  return (
    <div className="settings-menu">
      <h2>Settings</h2>
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <button onClick={handleApply}>Apply Settings</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SettingsMenu;
