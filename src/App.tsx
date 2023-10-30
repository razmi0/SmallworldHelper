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

const INITIAL_PLAYERS_LOAD = getFromLocalStorage<Player[]>("players", []);
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
    if (idx == -1) return;
    const player = newPlayers[idx];

    player.victoryPtn += newScore;
    player.history.push(player.victoryPtn);
    player.addedScores.push(newScore);

    setPlayers(newPlayers.sort((a, b) => b.victoryPtn - a.victoryPtn));

    e.currentTarget.reset();

    /* == LINECHART STATES UPDATE == */
    const newLineChartDatasets = [...lineData.datasets];
    const newLabels = [...lineData.labels];
    const newLength = findMaxNbrTurns(newPlayers);

    if (newLength > newLabels.length) {
      newLabels.push((newLabels.length + 1).toString());
    }

    const playerDatasetIdx = newLineChartDatasets.findIndex((d) => d.label === player.name);
    if (playerDatasetIdx == -1) return;

    newLineChartDatasets[playerDatasetIdx].data = [...newPlayers[idx].history];

    setLineData({
      labels: newLabels,
      datasets: newLineChartDatasets,
    });
  };

  const handleDeletePlayer = (id: number, name: string) => {
    /* == PLAYERS STATES UPDATE == */
    const idx = players.findIndex((p) => p.id == id);
    if (idx == -1) return;
    const newPlayers = [...players];
    newPlayers.splice(idx, 1);
    setPlayers(newPlayers);

    /* == LINECHART STATES UPDATE == */
    const playerLineIdx = lineData.datasets.findIndex((d) => d.label === name);
    if (playerLineIdx == -1) return;
    const newLineDatasets = [...lineData.datasets];
    newLineDatasets.splice(playerLineIdx, 1);
    setLineData({
      labels: lineData.labels,
      datasets: newLineDatasets,
    });
    console.log({
      labels: lineData.labels,
      datasets: newLineDatasets,
    });
  };

  const handleResetScore = (id: number, name: string) => {
    /* == PLAYERS STATES UPDATE == */
    const newPlayers = [...players];
    const idx = players.findIndex((p) => p.id === id);
    if (idx == -1) return;
    newPlayers[idx].victoryPtn = 0;

    /* == LINECHART STATES UPDATE == */
    const playerLineIdx = lineData.datasets.findIndex((d) => d.label === name);
    if (playerLineIdx == -1) return;
    const newLineDatasets = [...lineData.datasets];
    const newLabels = [...lineData.labels];

    const data = newLineDatasets[playerLineIdx].data;
    const maxTurns = lineData.labels.length;
    if (data.length + 1 > maxTurns) {
      newLabels.push((data.length + 1).toString());
    }

    console.log(newLineDatasets[playerLineIdx].data);
    console.log(data);
    data.push(0);
    console.log(newLineDatasets[playerLineIdx].data);
    console.log(data);

    setLineData({
      labels: newLabels,
      datasets: newLineDatasets,
    });
    setPlayers(newPlayers.sort((a, b) => b.victoryPtn - a.victoryPtn));

    console.log({
      labels: lineData.labels,
      datasets: newLineDatasets,
    });
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
        min-width: 250px;
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
          icon={Menu}
          sx={{
            zIndex: iconStyle.icons.menu.zIndex,
            transform: openMenu ? "none" : iconStyle.icons.menu.transform?.(),
            transition: iconStyle.icons.menu.transition?.(),
          }}
          theme={theme}
          iconName="menu"
          svgData={iconStyle}
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        />
        <IconButton
          icon={Theme}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.theme.transform?.(),
            transition: iconStyle.icons.theme.transition?.(),
            zIndex: iconStyle.icons.theme.zIndex,
          }}
          theme={theme}
          iconName="theme"
          svgData={iconStyle}
          onClick={handleThemeChange}
        />

        <IconButton
          icon={Load}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.load.transform?.(),
            transition: iconStyle.icons.load.transition?.(),
            zIndex: iconStyle.icons.load.zIndex,
          }}
          theme={theme}
          iconName="load"
          svgData={iconStyle}
          onClick={() => {
            setPlayers(getFromLocalStorage<Player[]>("players"));
            setLineData(getFromLocalStorage<LineData>("lineData", INITIAL_LINE_DATA));
          }}
        />
        <IconButton
          icon={Save}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.save.transform?.(),
            transition: iconStyle.icons.save.transition?.(),
            zIndex: iconStyle.icons.save.zIndex,
          }}
          iconName="save"
          svgData={iconStyle}
          onClick={() => {
            saveToLocalStorage("players", players);
            saveToLocalStorage("lineData", lineData);
          }}
          theme={theme}
        />
        <IconButton
          icon={AddPlayer}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.addplayer.transform?.(),
            transition: iconStyle.icons.addplayer.transition?.(),
            zIndex: iconStyle.icons.addplayer.zIndex,
          }}
          theme={theme}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={() => setOpenAddPlayer(!openAddPlayer)}
        />
        <IconButton
          icon={LineChart}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.linechart.transform?.(),
            transition: iconStyle.icons.linechart.transition?.(),
            zIndex: iconStyle.icons.linechart.zIndex,
          }}
          theme={theme}
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
          {players.map((player, i) => {
            const { name, victoryPtn, id } = player;
            const subjectId = `${id}_${name.toLowerCase()}_newScore`;

            return (
              <li className="list-element" key={i}>
                <div style={{ display: "flex" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    <IconButton
                      sx={{}}
                      icon={Star}
                      iconName="star"
                      theme={theme}
                      svgData={playerIconStyle}
                    />
                    {/* <span
                      
                    > */}
                    {name} : {victoryPtn}
                    {/* </span> */}
                  </span>
                  <Spacer />
                  <IconButton
                    onClick={() => handleResetScore(id, name)}
                    icon={Reset}
                    iconName="reset"
                    svgData={playerIconStyle}
                  />
                  <IconButton
                    onClick={() => handleDeletePlayer(id, name)}
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
