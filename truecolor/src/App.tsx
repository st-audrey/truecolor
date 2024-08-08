import React, { useState } from "react";

const App: React.FC = () => {
  const [targetColor, setTargetColor] = useState<string>(generateRandomColor());
  const [userColor, setUserColor] = useState<string>("#ffffff");
  const [message, setMessage] = useState<string>("");

  function generateRandomColor(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserColor(event.target.value);
  }

  function handleSubmit() {
    const difference = colorDifference(targetColor, userColor);
    if (difference <= 50) {
      setMessage("Bravo ! Vous avez trouvé la bonne couleur !");
    } else {
      setMessage(
        `Dommage ! Essayez encore. Différence: ${difference.toFixed(2)}`
      );
    }
  }

  function colorDifference(color1: string, color2: string): number {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    const r1 = (c1 >> 16) & 0xff;
    const g1 = (c1 >> 8) & 0xff;
    const b1 = c1 & 0xff;
    const r2 = (c2 >> 16) & 0xff;
    const g2 = (c2 >> 8) & 0xff;
    const b2 = c2 & 0xff;
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Color Match Game</h1>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: targetColor,
          margin: "0 auto 20px",
        }}
      />
      <input type="color" value={userColor} onChange={handleColorChange} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
