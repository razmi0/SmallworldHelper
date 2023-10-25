import { useState } from "react";
import "./App.css";

const INITIAL_VICTORY_PTN = 5;

type Player = {
  name: string;
  victoryPtn: number;
};

const App = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [newScore, setNewScore] = useState<number>(0);

  const handleNewPlayer = (newPlayer: string) => {
    setPlayers([...players, { name: newPlayer, victoryPtn: INITIAL_VICTORY_PTN }]);
  };

  const handlePlayersScores = (player: Player, newScore: number) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === player.name) {
        players[i].victoryPtn += newScore;
        break;
      }
    }
    setNewScore(0);
  };

  return (
    <>
      <ul
        style={{
          textAlign: "left",
        }}
      >
        {players
          .sort((a, b) => {
            return b.victoryPtn - a.victoryPtn;
          })
          .map((player, i) => (
            <li
              key={i}
              style={{
                marginTop: "30px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                {player.name} : {player.victoryPtn}
              </span>
              <br />
              <label htmlFor="newScore" id="newScore">
                Turn score :
                <br />
                <input
                  style={{}}
                  type="number"
                  name="newScore"
                  id="newScore"
                  value={newScore}
                  onChange={(e) => setNewScore(parseInt(e.target.value, 10))}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlayersScores(player, newScore);
                  }}
                >
                  Update Score
                </button>
              </label>
            </li>
          ))}
      </ul>

      {openAddPlayer && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="player">
            Name:
            <input
              type="text"
              id="player"
              name="player"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleNewPlayer(newPlayer);
                setOpenAddPlayer(false);
              }}
            >
              Confirm
            </button>
          </label>
        </div>
      )}
      <div>
        <button
          style={{
            height: "50px",
          }}
          onClick={() => setOpenAddPlayer(true)}
        >
          Add Player
        </button>
      </div>
    </>
  );
};

export default App;
