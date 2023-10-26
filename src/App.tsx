import { useState } from "react";
import "./App.css";

const INITIAL_VICTORY_PTN = 5;

type Player = {
  id: number;
  name: string;
  victoryPtn: number;
  rankChange: number;
};

const App = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [newScore, setNewScore] = useState<number>(0);
  // const [ranksChanges, setRanksChanges] = useState<number[]>([]);

  const handleNewPlayer = (newPlayer: string) => {
    if (newPlayer === "") return;
    setPlayers([
      ...players,
      {
        id: players.length,
        name: newPlayer.charAt(0).toUpperCase() + newPlayer.slice(1),
        victoryPtn: INITIAL_VICTORY_PTN,
        rankChange: 0,
      },
    ]);
  };

  const handlePlayersScores = (newScore: number, id: Player["id"]) => {
    if (newScore == 0 || isNaN(newScore)) {
      setNewScore(0);
      return;
    }
    const i = players.findIndex((player) => player.id === id);

    const newPlayers = [...players];
    const player = newPlayers[i];
    const previousScore = player.victoryPtn;
    player.victoryPtn = previousScore + newScore;

    setNewScore(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul
        style={{
          textAlign: "left",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {players
          // .sort((a, b) => b.victoryPtn - a.victoryPtn)
          .map((player, i) => (
            <li
              key={i}
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  transform: "translateX(-30px)",
                }}
              >
                <img
                  src="/chevron-right.png"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }}
                />
                {player.name} : {player.victoryPtn}
              </span>
              <label htmlFor="newScore" id="newScore">
                Turn score :
                <input
                  style={{ marginLeft: "6px" }}
                  maxLength={3}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handlePlayersScores(newScore, i);
                      e.currentTarget.value = "";
                    }
                  }}
                  type="text"
                  name="newScore"
                  id="newScore"
                  onChange={(e) => {
                    setNewScore(parseInt(e.currentTarget.value, 10));
                  }}
                />
              </label>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}></div>
                <button
                  onClick={() => {
                    console.log(newScore, i);
                    handlePlayersScores(newScore, i);
                  }}
                >
                  Update Score
                </button>
              </div>
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
          <label htmlFor="player" style={{ textAlign: "left" }}>
            Name: <br />
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleNewPlayer(newPlayer);
                  setOpenAddPlayer(false);
                }
              }}
              type="text"
              id="player"
              name="player"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
            />
            <button
              onClick={() => {
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
          style={
            {
              // height: "50px",
            }
          }
          onClick={() => setOpenAddPlayer(true)}
        >
          Add Player
        </button>
      </div>
    </div>
  );
};

export default App;
