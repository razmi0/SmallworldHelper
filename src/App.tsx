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
  LineChart,
  Star,
} from "./components/icons/Icons";
import { iconStyle, playerIconStyle } from "./components/icons/data";
import { Input, InputButton, SoftInput } from "./components/Input";
import Heading from "./components/Heading";
import { Spacer } from "./components/Utils";
import { Line } from "./components/charts/Line";
import { options, playerColors } from "./components/charts/data";
import { findMaxNbrTurns, getFromLocalStorage, getRandomColor, saveToLocalStorage } from "./utils";

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
  history: number[];
  addedScores: number[];
  rankChange: number;
  color: string;
};

type LineData = {
  labels: string[]; // x-axis & ...turns
  datasets: {
    label: string; // player name
    data: number[]; // history
    backgroundColor: string; // player color
    borderColor: string; // player color with opacity
  }[];
};

const bodyElement = document.querySelector("body");
const INITIAL_PLAYERS_LOAD = JSON.parse(window.localStorage.getItem("players") ?? "[]");
const turns = findMaxNbrTurns(INITIAL_PLAYERS_LOAD);
const INITIAL_LINE_DATA: LineData = {
  labels: turns == 0 ? [] : Array.from({ length: turns }, (_, i) => (i + 1).toString()) ?? [],
  datasets:
    INITIAL_PLAYERS_LOAD.length == 0
      ? []
      : INITIAL_PLAYERS_LOAD.map((p: Player) => {
          return {
            label: p.name,
            data: p.history,
            backgroundColor: p.color,
            borderColor: p.color,
          };
        }) ?? [],
};
const INITIAL_VICTORY_PTN = 0;

const App = () => {
  /* == STATES FOR DATA == */
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS_LOAD);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [startScore, setStartScore] = useState<number>(INITIAL_VICTORY_PTN);
  const [lineData, setLineData] = useState<LineData>(INITIAL_LINE_DATA);

  /* == STATES FOR UI == */
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openLineChart, setOpenLineChart] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
    if (isNaN(startScore)) return;

    const newColor = playerColors[players.length - 1] ?? getRandomColor();
    const labels = lineData.labels;
    const newName = newPlayer.trim().charAt(0).toUpperCase() + newPlayer.slice(1);

    setPlayers([
      ...players,
      {
        id: players.length,
        name: newName,
        victoryPtn: startScore,
        history: [startScore],
        addedScores: [startScore],
        rankChange: 0,
        color: newColor,
      },
    ]);

    setLineData({
      labels,
      datasets: [
        ...lineData.datasets,
        {
          label: newName,
          data: [startScore],
          backgroundColor: newColor,
          borderColor: newColor,
        },
      ],
    });

    setNewPlayer("");
    setOpenAddPlayer(false);
  };

  const handleNewScoreEntry = (e: FormEvent<ScoreForm>, subjectId: string) => {
    /* == PLAYERS STATES UPDATE == */
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newScore = Number(formData.get(subjectId)) ?? 0;

    if (isNaN(newScore)) return;

    const playerId = +subjectId.split("_")[0];
    const newPlayers = [...players];
    const idx = players.findIndex((p) => p.id === playerId);

    newPlayers[idx].victoryPtn += newScore;
    newPlayers[idx].history.push(newPlayers[idx].victoryPtn);
    newPlayers[idx].addedScores.push(newScore);

    setPlayers(newPlayers);

    e.currentTarget.reset();

    /* == LINECHART STATES UPDATE == */
    const newLineChartDatasets = [...lineData.datasets];
    const newLabels = [...lineData.labels];
    const newLength = findMaxNbrTurns(newPlayers);

    if (newLength > newLabels.length) {
      newLabels.push((newLabels.length + 1).toString());
    }

    const playerDatasetIdx = newLineChartDatasets.findIndex(
      (d) => d.label === newPlayers[idx].name
    );

    newLineChartDatasets[playerDatasetIdx].data = newPlayers[idx].history;

    setLineData({
      labels: newLabels,
      datasets: newLineChartDatasets,
    });
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

  return (
    <div className="main-ctn">
      <style>
        {`
      .main-ctn {
        display: flex;
        flex-direction: column;
        min-width: 325px;
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
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
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
          onClick={() => {
            setPlayers(getFromLocalStorage("players"));
          }}
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
          onClick={() => saveToLocalStorage("players", players)}
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
          onClick={() => setOpenAddPlayer(!openAddPlayer)}
        />
        <IconButton
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.linechart.transform?.(),
            transition: iconStyle.icons.linechart.transition?.(),
            zIndex: iconStyle.icons.linechart.zIndex,
          }}
          theme={theme}
          icon={LineChart}
          iconName="linechart"
          svgData={iconStyle}
          onClick={() => setOpenLineChart(!openLineChart)}
        />
      </nav>
      <section
        style={{
          display: "flex",
        }}
      >
        {/* == PLAYERS LIST & SCORE INPUT == */}
        <ul className="players-list-ctn">
          {players
            .sort((a, b) => b.victoryPtn - a.victoryPtn)
            .map((player, i) => {
              const { name, victoryPtn, id } = player;
              const subjectId = `${id}_${name.toLowerCase()}_newScore`;

              return (
                <li className="list-element" key={i}>
                  <div style={{ display: "flex" }}>
                    <span>
                      <IconButton
                        sx={{
                          marginRight: "10px",
                        }}
                        icon={Star}
                        iconName="star"
                        theme={theme}
                        svgData={playerIconStyle}
                      />

                      <Heading name={name} victoryPtn={victoryPtn} />
                    </span>
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
                    autoComplete="off"
                    noValidate
                    style={{ display: "flex", alignItems: "center" }}
                    onSubmit={(e: FormEvent<ScoreForm>) => handleNewScoreEntry(e, subjectId)}
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
        {/* == LINECHART == */}
        {openLineChart && <Line data={lineData} option={options} />}
      </section>
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
