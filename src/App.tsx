import { FormEvent, useState } from "react";
import {
  AddPlayer,
  Save,
  AddScore,
  Load,
  IconButton,
  SvgStatDataType,
  Theme,
} from "./components/Icons";
import "./App.css";
import { Input, InputButton } from "./components/Input";
import Heading from "./components/Heading";

const iconStyle: SvgStatDataType = {
  size: ["50px", "50px"],
  filter: ["4px", "0px"],
  transition: "all 0.2s ease-in-out",
  icons: {
    addplayer: {
      color: ["#646cff", "#609dff"], // light dark
    },
    save: {
      color: ["#646cff", "#609dff"],
    },
    load: {
      color: ["#646cff", "#609dff"],
    },
    addscore: {
      color: ["#646cff", "#609dff"],
    },
    theme: {
      color: ["#646cff", "#609dff"],
    },
  },
};

const bodyElement = document.querySelector("body");

const INITIAL_PLAYERS_LOAD = JSON.parse(window.localStorage.getItem("players") ?? "[]");
const INITIAL_VICTORY_PTN = 0;

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
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS_LOAD);
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [startScore, setStartScore] = useState<number>(INITIAL_VICTORY_PTN);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleOpenAddPlayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

  const handleThemeChange = () => {
    if (theme == "light") {
      setTheme("dark");
      bodyElement?.classList.add("dark-bg");
      bodyElement?.classList.remove("light-bg");
    } else {
      setTheme("light");
      bodyElement?.classList.add("light-bg");
      bodyElement?.classList.remove("dark-bg");
    }
  };

  const handleNewPlayer = (newPlayer: string, startScore: number) => {
    if (newPlayer === "") return;
    setPlayers([
      ...players,
      {
        id: players.length,
        name: newPlayer.charAt(0).toUpperCase() + newPlayer.slice(1),
        victoryPtn: startScore,
        rankChange: 0,
      },
    ]);
    setNewPlayer("");
    setOpenAddPlayer(false);
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

  const handleLoad = (): void => {
    const players = JSON.parse(window.localStorage.getItem("players") ?? "[]");
    setPlayers(players);
  };

  return (
    <div className="main-ctn">
      <style>
        {`
      .main-ctn {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
      .players-list-ctn {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: left;
      }
      .list-element {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
      }
      .dark-bg {
        background-color : #242424;
        color: #ffffffde;
      }
      .light-bg {
        background-color : #ffffffde;
        color: #242424;
      }
      `}
      </style>
      <ul className="players-list-ctn">
        {players
          .sort((a, b) => b.victoryPtn - a.victoryPtn)
          .map((player, i) => {
            const { name, victoryPtn, id } = player;
            const subjectId = `${id}_${name.toLowerCase()}_newScore`;

            return (
              <li className="list-element" key={i}>
                <Heading name={name} victoryPtn={victoryPtn} />
                <form
                  style={{ display: "flex", alignItems: "center" }}
                  onSubmit={(e: FormEvent<ScoreForm>) => handleNewScoreEntryEvent(e, subjectId)}
                >
                  <Input
                    labelText="Turn score"
                    subjectId={subjectId}
                    onEnter={() => new SubmitEvent("submit")}
                  />
                  <IconButton
                    icon={AddScore}
                    iconName="addscore"
                    svgData={iconStyle}
                    btnType="submit"
                    theme={theme}
                  />
                </form>
              </li>
            );
          })}
      </ul>
      {openAddPlayer && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            transform: "translate(35px)",
            gap: "5px",
          }}
        >
          <InputButton
            labelText="Name"
            subjectId="newPlayer"
            btnText="Confirm"
            onEnter={() => {
              handleNewPlayer(newPlayer, startScore);
            }}
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
            value={newPlayer}
            onClick={() => {
              handleNewPlayer(newPlayer, startScore);
            }}
          />
          <div style={{ transform: "translate(-37px" }}>
            <Input
              labelText="Start score"
              subjectId="startScore"
              onChange={(e) =>
                setStartScore(
                  isNaN(Number(e.currentTarget.value)) ? 0 : Number(e.currentTarget.value)
                )
              }
              value={startScore}
              onEnter={() => {
                handleNewPlayer(newPlayer, startScore);
              }}
            />
          </div>
        </div>
        // </div>
      )}
      {!openAddPlayer && (
        <nav className="actions-icons-ctn">
          <style>
            {`
          .actions-icons-ctn {
            display: flex;
            width: 100%;
            justify-content: flex-end;
            align-items: center;
            gap: 5px;
          }
          `}
          </style>

          <IconButton
            theme={theme}
            icon={Theme}
            iconName="theme"
            svgData={iconStyle}
            onClick={handleThemeChange}
          />
          <IconButton
            theme={theme}
            icon={Load}
            iconName="load"
            svgData={iconStyle}
            onClick={handleLoad}
          />
          <IconButton
            icon={Save}
            iconName="save"
            svgData={iconStyle}
            onClick={handleSave}
            theme={theme}
          />
          <IconButton
            theme={theme}
            icon={AddPlayer}
            iconName="addplayer"
            svgData={iconStyle}
            onClick={handleOpenAddPlayer}
          />
        </nav>
      )}
    </div>
  );
};

export default App;
