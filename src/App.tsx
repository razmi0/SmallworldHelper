import { FormEvent, useState } from "react";
import {
  AddPlayer,
  Save,
  Load,
  IconButton,
  Theme,
  Menu,
  Reset,
  Delete,
} from "./components/icons/Icons";
import { iconStyle, playerIconStyle } from "./components/icons";
import { Input, InputButton, SoftInput } from "./components/Input";
import Heading from "./components/Heading";
import { Spacer } from "./components/Utils";

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

const bodyElement = document.querySelector("body");
const INITIAL_PLAYERS_LOAD = JSON.parse(window.localStorage.getItem("players") ?? "[]");
const INITIAL_VICTORY_PTN = 0;

const App = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS_LOAD);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [startScore, setStartScore] = useState<number>(INITIAL_VICTORY_PTN);
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenAddPlayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

  const handleThemeChange = () => {
    if (theme == "light") {
      //DARK
      setTheme("dark");
      bodyElement?.classList.add("dark-bg");
      bodyElement?.classList.remove("light-bg");
    } else {
      //LIGHT
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
        name: newPlayer.trim().charAt(0).toUpperCase() + newPlayer.slice(1),
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

  const handleDeletePlayer = (id: number) => {
    const newPlayers = [...players];
    newPlayers.splice(
      players.findIndex((p) => p.id == id),
      1
    );
    setPlayers(newPlayers);
  };

  const handleResetScore = (id: number) => {
    const newPlayers = [...players];
    newPlayers[players.findIndex((p) => p.id == id)].victoryPtn = 0;
    setPlayers(newPlayers);
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
        min-width: 270px;
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
      {/* == NAV == */}
      <nav className="nav-ctn">
        <style>
          {`
          .nav-ctn {
            display: flex;
            width: 100%;
            gap: 5px;
            justify-content: flex-start;
            align-items: center;
          }
          `}
        </style>
        <IconButton
          sx={{
            zIndex: iconStyle.icons.menu.zIndex,
            transform: openMenu ? "none" : iconStyle.icons.menu.transform?.(),
            transition: iconStyle.icons.menu.transition?.(),
          }}
          theme={theme}
          icon={Menu}
          iconName="menu"
          svgData={iconStyle}
          onClick={handleOpenMenu}
        />
        <IconButton
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.theme.transform?.(),
            transition: iconStyle.icons.theme.transition?.(),
            zIndex: iconStyle.icons.theme.zIndex,
          }}
          theme={theme}
          icon={Theme}
          iconName="theme"
          svgData={iconStyle}
          onClick={handleThemeChange}
        />
        <IconButton
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.load.transform?.(),
            transition: iconStyle.icons.load.transition?.(),
            zIndex: iconStyle.icons.load.zIndex,
          }}
          theme={theme}
          icon={Load}
          iconName="load"
          svgData={iconStyle}
          onClick={handleLoad}
        />
        <IconButton
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.save.transform?.(),
            transition: iconStyle.icons.save.transition?.(),
            zIndex: iconStyle.icons.save.zIndex,
          }}
          icon={Save}
          iconName="save"
          svgData={iconStyle}
          onClick={handleSave}
          theme={theme}
        />
        <IconButton
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.addplayer.transform?.(),
            transition: iconStyle.icons.addplayer.transition?.(),
            zIndex: iconStyle.icons.addplayer.zIndex,
          }}
          theme={theme}
          icon={AddPlayer}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={handleOpenAddPlayer}
        />
      </nav>
      {/* == PLAYERS LIST == */}
      <ul className="players-list-ctn">
        {players
          .sort((a, b) => b.victoryPtn - a.victoryPtn)
          .map((player, i) => {
            const { name, victoryPtn, id } = player;
            const subjectId = `${id}_${name.toLowerCase()}_newScore`;

            return (
              <li className="list-element" key={i}>
                <div style={{ display: "flex" }}>
                  <Heading name={name} victoryPtn={victoryPtn} />
                  <Spacer />
                  <IconButton
                    onClick={() => handleResetScore(id)}
                    icon={Reset}
                    iconName="reset"
                    svgData={playerIconStyle}
                  />
                  <IconButton
                    onClick={() => handleDeletePlayer(id)}
                    icon={Delete}
                    iconName="delete"
                    svgData={playerIconStyle}
                  />
                </div>
                <form
                  style={{ display: "flex", alignItems: "center" }}
                  onSubmit={(e: FormEvent<ScoreForm>) => handleNewScoreEntryEvent(e, subjectId)}
                >
                  <SoftInput
                    labelText="Score"
                    subjectId={subjectId}
                    onEnter={() => new SubmitEvent("submit")}
                    theme={theme}
                  />
                </form>
              </li>
            );
          })}
      </ul>
      {/* == ADD PLAYER == */}
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
    </div>
  );
};

export default App;
