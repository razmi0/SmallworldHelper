import { FormEvent, useState } from "react";
import "./App.css";
import { AddPlayer, Icon, Save, AddScore, Load } from "./components/Icons";

const INITIAL_PLAYERS = JSON.parse(window.localStorage.getItem("players") ?? "[]");

const INITIAL_VICTORY_PTN = 5;

interface FormElements extends HTMLFormControlsCollection {
  newScore: HTMLInputElement;
}

interface ScoreForm extends HTMLFormElement {
  readonly elements: FormElements;
}

type Player = {
  id: number;
  name: string;
  victoryPtn: number;
  rankChange: number;
};

const App = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<string>("");
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

  const handleNewScoreEntryEvent = (e: FormEvent<ScoreForm>, subjectId: string) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newScore = Number(formData.get(subjectId)) ?? 0;
    if (isNaN(newScore)) return;

    const playerId = +subjectId.split("_")[0];
    const newPlayers = [...players];
    newPlayers[players.findIndex((player) => player.id === playerId)].victoryPtn += newScore;

    setPlayers(newPlayers);

    e.currentTarget.reset();
  };

  const handleSave = (): void => {
    window.localStorage.setItem("players", JSON.stringify(players));
  };

  const handleLoad = (): Player[] => {
    const players = JSON.parse(window.localStorage.getItem("players") ?? "[]");
    return players;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <ul
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
          textAlign: "left",
        }}
      >
        {players.map((player, i) => {
          const { name, victoryPtn, id } = player;
          const subjectId = `${id}_${name.toLowerCase()}_newScore`;

          return (
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
                {name} : {victoryPtn}
              </span>
              <form
                style={{ display: "flex", alignItems: "center" }}
                onSubmit={(e: FormEvent<ScoreForm>) => handleNewScoreEntryEvent(e, subjectId)}
              >
                <label htmlFor={subjectId}>Turn score : </label>
                <input
                  style={{ marginLeft: "3px" }}
                  minLength={1}
                  maxLength={3}
                  type="text"
                  name={subjectId}
                  id={subjectId}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      new SubmitEvent("submit");
                    }
                  }}
                />
                {/* <Flex sx={{ transform: "translate(30px)" }}> */}
                {/* <Spacer /> */}
                <button type="submit" style={{ all: "unset", cursor: "pointer" }}>
                  <Icon
                    icon={AddScore}
                    svgData={{
                      size: ["40px", "40px"],
                      filter: ["1px", "0"],
                      transition: "all 0.2s ease-in-out",
                      icons: {
                        addscore: {
                          color: "#646cff",
                        },
                      },
                    }}
                  />
                </button>
                {/* </Flex> */}
              </form>
            </li>
          );
        })}
      </ul>
      {/* TODO : Implement form for add new player */}
      {openAddPlayer && (
        <form
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label htmlFor="newPlayer" style={{ textAlign: "left" }}>
            Name :
          </label>
          <br />
          <input
            style={{ marginLeft: "6px" }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleNewPlayer(newPlayer);
                setOpenAddPlayer(false);
              }
            }}
            type="text"
            id="newPlayer"
            name="newPlayer"
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
        </form>
      )}
      {!openAddPlayer && (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <button
            style={{ all: "unset", cursor: "pointer" }}
            onClick={() => setOpenAddPlayer(true)}
          >
            <Icon
              icon={AddPlayer}
              svgData={{
                size: ["40px", "40px"],
                filter: ["1px", "0"],
                transition: "all 0.2s ease-in-out",
                icons: {
                  addplayer: {
                    color: "#646cff",
                  },
                },
              }}
            />
          </button>
          <button
            style={{ all: "unset", cursor: "pointer" }}
            onClick={() => {
              window.localStorage.setItem("players", JSON.stringify(players));
            }}
          >
            <Icon
              icon={Save}
              svgData={{
                size: ["40px", "40px"],
                filter: ["1px", "0"],
                transition: "all 0.2s ease-in-out",
                icons: {
                  save: {
                    color: "#646cff",
                  },
                },
              }}
            />
          </button>
          <button
            style={{ all: "unset", cursor: "pointer" }}
            onClick={() => {
              const players = JSON.parse(window.localStorage.getItem("players") ?? "[]");
              setPlayers(players);
            }}
          >
            <Icon
              icon={Load}
              svgData={{
                size: ["40px", "40px"],
                filter: ["1px", "0"],
                transition: "all 0.2s ease-in-out",
                icons: {
                  load: {
                    color: "#646cff",
                  },
                },
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
