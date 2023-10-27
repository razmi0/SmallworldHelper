import { FormEvent, useState } from "react";
import { AddPlayer, Save, AddScore, Load, IconButton, SvgStatDataType } from "./components/Icons";
import "./App.css";
import { Input, InputButton } from "./components/Input";
import Heading from "./components/Heading";

const iconStyle: SvgStatDataType = {
  size: ["40px", "40px"],
  filter: ["1px", "0"],
  transition: "all 0.2s ease-in-out",
  icons: {
    addplayer: {
      color: "#646cff",
    },
    save: {
      color: "#646cff",
    },
    load: {
      color: "#646cff",
    },
    addscore: {
      color: "#646cff",
    },
  },
};

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

  const handleOpenAddPlayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

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
      `}
      </style>
      <ul className="players-list-ctn">
        {players.map((player, i) => {
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
                  labelText="Turn score :"
                  subjectId={subjectId}
                  onEnter={() => new SubmitEvent("submit")}
                />
                <IconButton icon={AddScore} svgData={iconStyle} btnType="submit" />
              </form>
            </li>
          );
        })}
      </ul>
      {openAddPlayer && (
        <form className="add-player-form">
          <style>
            {`
          .add-player-form {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          `}
          </style>
          <InputButton
            labelText="Name :"
            subjectId="newPlayer"
            btnText="Confirm"
            onEnter={() => {
              handleNewPlayer(newPlayer);
            }}
            onChange={(e) => setNewPlayer(e.target.value)}
            value={newPlayer}
            onClick={() => {
              handleNewPlayer(newPlayer);
            }}
          />
        </form>
      )}
      {!openAddPlayer && (
        <div className="actions-icons-ctn">
          <style>
            {`
          .actions-icons-ctn {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          `}
          </style>
          <IconButton icon={Save} svgData={iconStyle} onClick={handleSave} />
          <IconButton icon={Load} svgData={iconStyle} onClick={handleLoad} />
          <IconButton icon={AddPlayer} svgData={iconStyle} onClick={handleOpenAddPlayer} />
        </div>
      )}
    </div>
  );
};

export default App;
