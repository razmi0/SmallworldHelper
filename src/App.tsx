import { FormEvent, useState } from "react";
import { flushSync } from "react-dom";
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
  IconHeading,
  EyeClose,
  EyeOpen,
} from "./components/icons/Icons";
import {
  headingStarIconStyle,
  iconStyle,
  playerIconStyle,
  playerColors,
} from "./components/icons/data";
import { Input, InputButton, SoftInput } from "./components/Input";
import { Spacer } from "./components/Utils";
import { Line } from "./components/charts/Line";
import { lineOptions, barOptions } from "./components/charts/data";
import {
  findMaxNbrTurns,
  getFromLocalStorage,
  getRandomColor,
  saveToLocalStorage,
  findAverage,
  findMin,
  findMax,
  hexToRgba,
} from "./utils";
import { ChartContainer } from "./components/Containers";
import { Bar } from "./components/charts/Bar";

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
  max: number;
  min: number;
  avg: number;
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

type BarData = {
  labels: string[]; // x-axis & players name
  datasets: {
    label: string; // maxscore, minscore, average
    data: number[]; // treated data from Player['addedScores'] [fn maxscoredata, fn minscoredata, fn average data]
    backgroundColor?: string | string[]; // player color with opacity
    borderColor?: string | string[]; // player color
  }[];
};

// const initializeLineData = (players: Player[]): LineData => {};

const updatePlayers = (
  players: Player[],
  subjectId: string,
  newScore: number
): [Player[], number] => {
  const playerId = +subjectId.split("_")[0];
  const newPlayers = [...players];
  const idx = players.findIndex((p) => p.id === playerId);

  if (idx === -1) {
    console.warn(`${playerId} not found`);
    return [newPlayers, -1];
  }

  const player = newPlayers[idx];
  player.victoryPtn += newScore;
  player.history.push(player.victoryPtn);
  player.addedScores.push(newScore);

  return [newPlayers, idx];
};

const updateLineChart = (lineData: LineData, players: Player[], idx: number) => {
  const newLineChartDatasets = [...lineData.datasets];
  const newLabels = [...lineData.labels];
  const newLength = findMaxNbrTurns(players);

  if (newLength > newLabels.length) {
    newLabels.push((newLabels.length + 1).toString());
  }

  const playerDatasetIdx = newLineChartDatasets.findIndex((d) => d.label === players[idx].name);
  if (playerDatasetIdx == -1) {
    console.warn(`${players[idx].name} not found`);
    return lineData;
  }

  newLineChartDatasets[playerDatasetIdx].data = [...players[idx].history];

  return {
    labels: newLabels,
    datasets: newLineChartDatasets,
  };
};

const updateBarChart = (barData: BarData, players: Player[], idx: number) => {
  const player = players[idx];
  const newDatasets = [...barData.datasets];
  const fns = [findMax, findMin, findAverage];
  const idxInData = barData.labels.findIndex((l) => l === player.name);
  for (let i = 0; i < fns.length; i++) {
    newDatasets[i].data[idxInData] = fns[i](player.addedScores);
  }

  return {
    labels: barData.labels,
    datasets: newDatasets,
  };
};

const bodyElement = document.querySelector("body");

const INITIAL_STATES = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  hovering: () => Array.from({ length: INITIAL_STATES.players.length }, () => false),
  lineData: () => INITIAL_STATES.initLineData(),
  barData: () => INITIAL_STATES.initBarData(),
  initLineData: () => {
    const maxTurns = findMaxNbrTurns(INITIAL_STATES.players);
    return {
      labels:
        maxTurns == 0 ? [] : Array.from({ length: maxTurns }, (_, i) => (i + 1).toString()) ?? [],
      datasets:
        INITIAL_STATES.players.length == 0
          ? []
          : INITIAL_STATES.players.map((p: Player) => {
              return {
                label: p.name,
                data: p.history,
                backgroundColor: p.color,
                borderColor: p.color,
              };
            }) ?? [],
    };
  },
  initBarData: (): BarData => {
    return {
      labels: INITIAL_STATES.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Max score",
          data: INITIAL_STATES.players.map((p) => findMax(p.addedScores)) ?? [],
          backgroundColor:
            INITIAL_STATES.players.map((p) => {
              return hexToRgba(p.color), hexToRgba(p.color, 0.95), hexToRgba(p.color, 0.9);
            }) ?? [],
        },
        {
          label: "Min score",
          data: INITIAL_STATES.players.map((p) => findMin(p.addedScores)) ?? [],
          backgroundColor:
            INITIAL_STATES.players.map((p) => {
              return hexToRgba(p.color), hexToRgba(p.color, 0.95), hexToRgba(p.color, 0.9);
            }) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
        },
        {
          label: "Average score",
          data: INITIAL_STATES.players.map((p) => findAverage(p.addedScores)) ?? [],
          backgroundColor:
            INITIAL_STATES.players.map((p) => {
              return hexToRgba(p.color), hexToRgba(p.color, 0.95), hexToRgba(p.color, 0.9);
            }) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
        },
      ],
    };
  },
};

/* == COMPONENT == */
//--
const App = () => {
  /* == STATES FOR DATA == */
  //--
  const [players, setPlayers] = useState<Player[]>(INITIAL_STATES.players);
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [startScore, setStartScore] = useState<number>(INITIAL_STATES.startScore);
  const [lineData, setLineData] = useState<LineData>(INITIAL_STATES.lineData());
  const [barData, setBarData] = useState<BarData>(INITIAL_STATES.barData());

  /* == STATES FOR UI == */
  //--
  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCharts, setOpenCharts] = useState<boolean>(false);
  const [isFocusOnField, setIsFocusOnField] = useState<boolean[]>(INITIAL_STATES.hovering());
  const [isScoreHidden, setIsScoreHidden] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleWithViewTransition = (fn: () => void) => {
    document.startViewTransition(() => {
      flushSync(() => {
        fn();
      });
    });
  };

  const handleThemeChange = () => {
    if (theme == "light") {
      //DARK
      //--
      setTheme("dark");
      bodyElement?.classList.add("dark-bg");
      bodyElement?.classList.remove("light-bg");
    } else {
      //LIGHT
      //--
      setTheme("light");
      bodyElement?.classList.add("light-bg");
      bodyElement?.classList.remove("dark-bg");
    }
  };

  const handleNewPlayer = (newPlayer: string, startScore: number) => {
    if (newPlayer === "") return;
    if (isNaN(startScore)) return;

    const newColor = playerColors[players.length] ?? getRandomColor();
    const newName = newPlayer.trim().charAt(0).toUpperCase() + newPlayer.slice(1);
    const newBarDatasets = [...barData.datasets];

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
        max: startScore,
        min: startScore,
        avg: startScore,
      },
    ]);

    setLineData({
      labels: lineData.labels,
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

    newBarDatasets[0].data = [...newBarDatasets[0].data, startScore];
    newBarDatasets[1].data = [...newBarDatasets[1].data, startScore];
    newBarDatasets[2].data = [...newBarDatasets[2].data, startScore];

    setBarData({
      labels: [...barData.labels, newName],
      datasets: newBarDatasets,
    });

    setNewPlayer("");
  };

  const handleNewScoreEntry = (e: FormEvent<ScoreForm>, subjectId: string) => {
    /* == PLAYERS STATES UPDATE == */
    //--
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newScore = Number(formData.get(subjectId)) ?? 0;
    if (isNaN(newScore)) return;

    const [newPlayers, idx] = updatePlayers(players, subjectId, newScore);

    if (idx == -1) {
      console.warn(`${subjectId} not found`);
      return;
    }
    e.currentTarget.reset();

    /* == CHARTS STATES UPDATE == */
    //--
    const newLineData = updateLineChart(lineData, newPlayers, idx);
    const newBarData = updateBarChart(barData, newPlayers, idx);

    setLineData(newLineData);
    setBarData(newBarData);
    setPlayers(newPlayers.sort((a, b) => b.victoryPtn - a.victoryPtn));
  };

  const handleDeletePlayer = ({ id, name }: Player) => {
    /* == PLAYERS STATES UPDATE == */
    //--
    const idx = players.findIndex((p) => p.id == id);
    if (idx == -1) {
      console.warn(`name : ${name} &  id : ${id} not found`);
      return;
    }
    const newPlayers = [...players];
    newPlayers.splice(idx, 1);

    /* == CHARTS STATES UPDATE == */
    //--
    const playerLineIdx = lineData.datasets.findIndex((d) => d.label === name);
    if (playerLineIdx == -1) return;
    const newLineDatasets = [...lineData.datasets];
    newLineDatasets.splice(playerLineIdx, 1);

    /* == BAR CHART STATES UPDATE == */
    //--
    const newBarLabels = [...barData.labels];
    const newBarDatasets = [...barData.datasets];
    const idxInDatasets = newBarLabels.findIndex((l) => l === name);
    newBarLabels.splice(idxInDatasets, 1);
    newBarDatasets.map((d) => {
      d.data.splice(idxInDatasets, 1);
    });

    setLineData({
      labels: lineData.labels,
      datasets: newLineDatasets,
    });
    setBarData({
      labels: newBarLabels,
      datasets: newBarDatasets,
    });
    setPlayers(newPlayers);
  };

  const handleResetScore = ({ id, name }: Player) => {
    /* == PLAYERS STATES UPDATE == */
    //--
    const newPlayers = [...players];
    const idx = players.findIndex((p) => p.id === id);
    if (idx == -1) {
      console.warn(`name : ${name} &  id : ${id} not found`);
      return;
    }
    newPlayers[idx].victoryPtn = 0;
    newPlayers[idx].history.push(0);
    newPlayers[idx].addedScores.push(0);

    /* == LINECHART STATES UPDATE == */
    //--
    const playerLineIdx = lineData.datasets.findIndex((d) => d.label === name);

    if (playerLineIdx == -1) {
      console.warn(`${name} not found`);
      return;
    }
    const newLineDatasets = [...lineData.datasets];
    const newLabels = [...lineData.labels];

    const data = newLineDatasets[playerLineIdx].data;
    const maxTurns = lineData.labels.length;
    if (data.length + 1 > maxTurns) {
      newLabels.push((data.length + 1).toString());
    }

    data.push(0);

    /* == BAR CHART STATES UPDATE == */
    //--
    const newBarDatasets = [...barData.datasets];
    const idxInData = barData.labels.findIndex((l) => l === name);
    newBarDatasets.map((d) => {
      d.data[idxInData] = 0;
    });

    setLineData({
      labels: newLabels,
      datasets: newLineDatasets,
    });
    setBarData({
      labels: barData.labels,
      datasets: newBarDatasets,
    });
    setPlayers(newPlayers.sort((a, b) => b.victoryPtn - a.victoryPtn));
  };

  return (
    <div className="main-ctn">
      <style>
        {`
      .main-ctn {
        display: flex;
        flex-direction: column;
        min-width: 325px;
        gap: 10px;
        align-items: flex-start;
      }
      .players-list-ctn {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;

      }
      .list-element {
        display: flex;
        flex-direction: column;
        max-height: 125px;
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
            width: fit-content;
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
          onClick={() => {
            handleThemeChange();
            setOpenMenu(!openMenu);
          }}
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
            setLineData(getFromLocalStorage<LineData>("lineData", INITIAL_STATES.lineData()));
            setBarData(getFromLocalStorage<BarData>("barData", INITIAL_STATES.barData()));
            setOpenMenu(!openMenu);
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
            saveToLocalStorage("barData", barData);
            setOpenMenu(!openMenu);
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
          onClick={() => {
            setOpenAddPlayer(!openAddPlayer);
          }}
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
          onClick={() => {
            setOpenMenu(!openMenu);
            if (players.length == 0) return;
            handleWithViewTransition(() => setOpenCharts((p) => !p));
          }}
        />
        <IconButton
          icon={isScoreHidden ? EyeClose : EyeOpen}
          sx={{
            transform: openMenu ? "translate(0px)" : iconStyle.icons.eyes.transform?.(),
            transition: iconStyle.icons.eyes.transition?.(),
            zIndex: iconStyle.icons.eyes.zIndex,
          }}
          theme={theme}
          iconName="eyes"
          svgData={iconStyle}
          onClick={() => {
            setOpenMenu(!openMenu);
            setIsScoreHidden((p) => !p);
          }}
        />
      </nav>
      <section
        style={{
          display: "flex",
        }}
        className="players-ctn"
      >
        {/* == PLAYERS LIST & SCORE INPUT == */}
        <ul className="players-list-ctn" style={{}}>
          {players.map((player, i) => {
            const { name, victoryPtn, id, color } = player;
            const subjectId = `${id}_${name.toLowerCase()}_newScore`;

            return (
              <li className="list-element" key={i}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    <IconHeading
                      animationName="translate"
                      isHover={isFocusOnField[i]}
                      color={color}
                      icon={Star}
                      svgData={headingStarIconStyle}
                    />
                    <span
                      style={{
                        color: isFocusOnField[i] ? color : "inherit",
                        transition: "color 0.3s ease-in-out",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {name} : {isScoreHidden ? "*****" : victoryPtn}
                    </span>
                  </div>
                  <Spacer />
                  <IconButton
                    onClick={() => handleResetScore(player)}
                    icon={Reset}
                    iconName="reset"
                    svgData={playerIconStyle}
                  />
                  <IconButton
                    onClick={() => handleDeletePlayer(player)}
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
                    color={color}
                    onFocus={() =>
                      setIsFocusOnField((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = true;
                        return newPrev;
                      })
                    }
                    onBlur={() =>
                      setIsFocusOnField((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = false;
                        return newPrev;
                      })
                    }
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
        {/* == CHARTS == */}
        {openCharts && players.length > 0 && (
          <section className="charts-ctn">
            <style>
              {`
              .charts-ctn {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
                justify-content: space-around;
              }
              `}
            </style>
            <ChartContainer>
              <Line data={lineData} option={lineOptions} theme={theme} />
            </ChartContainer>
            <ChartContainer>
              <Bar data={barData} option={barOptions} theme={theme} />
            </ChartContainer>
          </section>
        )}
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
