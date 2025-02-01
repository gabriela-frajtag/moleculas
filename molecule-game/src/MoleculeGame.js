import React, { useState, useEffect } from "react";

const MoleculeGame = () => {
  const [molecule, setMolecule] = useState(null);
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("playing");
  const [showHint, setShowHint] = useState(false);
  const [molImageUrl, setMolImageUrl] = useState("");

  useEffect(() => {
    fetch("/molecules.json")
      .then((res) => res.json())
      .then((data) => {
        const todayIndex = new Date().getDate() % data.length;
        const selectedMolecule = data[todayIndex];
        setMolecule(selectedMolecule);

        const smilesEncoded = encodeURIComponent(selectedMolecule.smiles);
        const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${smilesEncoded}/PNG`;
        setMolImageUrl(imageUrl);
      });
  }, []);

  const checkAnswer = () => {
    if (guess.toLowerCase().trim() === molecule.name) {
      setGameState("won");
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        setGameState("lost");
      }
    }
  };

  if (!molecule) return <p className="loading">Carregando...</p>;

  return (
    <div className="container">
      <h1 className="title">Molecule.io</h1>
      <p className="subtitle">Todo dia uma nova molécula!</p>

      <div className="molecule-container">
        <img src={molImageUrl} alt="Molécula" className="molecule-image" />
      </div>

      <p className="lives">Vidas: {"💜".repeat(lives)}</p>

      {gameState === "playing" && (
        <>
          <input
            type="text"
            className="input"
            placeholder="Digite o nome IUPAC..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <div className="buttons">
            <button className="button" onClick={checkAnswer}>
              Verificar
            </button>
            <button className="hint-button" onClick={() => setShowHint(!showHint)}>
              {showHint ? "Ocultar Dica" : "💡 Mostrar Dica"}
            </button>
          </div>
          {showHint && <p className="hint"><strong>Dica:</strong> {molecule.hint}</p>}
        </>
      )}

      {gameState === "won" && (
        <p className="result win">🎉 Parabéns! A molécula era {molecule.name}!</p>
      )}
      {gameState === "lost" && (
        <p className="result lose">😔 Fim de jogo! A resposta era {molecule.name}.</p>
      )}
    </div>
  );
};

export default MoleculeGame;
