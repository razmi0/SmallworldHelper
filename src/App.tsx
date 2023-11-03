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
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import { ChartContainer } from "./components/Containers";
import {
  findMaxNbrTurns,
  getFromLocalStorage,
  getRandomColor,
  saveToLocalStorage,
  findAverage,
  findMin,
  findMax,
  addOpacityToHex,
  findSum,
} from "./utils";

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
  sum: number;
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
    backgroundColor: string[]; // player color with opacity
    borderColor: string[]; // player color
    borderWidth: number;
  }[];
};

type PieData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
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
  player.max = findMax(player.addedScores);
  player.min = findMin(player.addedScores);
  player.avg = findAverage(player.addedScores);
  player.sum = findSum(player.addedScores);

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

const updatePieChart = (pieData: PieData, players: Player[], idx: number) => {
  const newDatasets = [...pieData.datasets];
  const player = players[idx];
  const idxInData = pieData.labels.findIndex((l) => l === player.name);
  newDatasets[0].data[idxInData] = player.victoryPtn;

  return {
    labels: pieData.labels,
    datasets: newDatasets,
  };
};

const INITIAL_STATES = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  lineData: () => getFromLocalStorage<LineData>("lineData", INITIAL_STATES.initLineData()),
  barData: () => getFromLocalStorage<BarData>("barData", INITIAL_STATES.initBarData()),
  pieData: () => getFromLocalStorage<PieData>("pieData", INITIAL_STATES.initPieData()),
  hovering: () => Array.from({ length: INITIAL_STATES.players.length }, () => false),
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
  initBarData: () => {
    return {
      labels: INITIAL_STATES.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Max score",
          data: INITIAL_STATES.players.map((p) => findMax(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Min score",
          data: INITIAL_STATES.players.map((p) => findMin(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Average score",
          data: INITIAL_STATES.players.map((p) => findAverage(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
      ],
    };
  },
  initPieData: () => {
    return {
      labels: INITIAL_STATES.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Victory points",
          data: INITIAL_STATES.players.map((p) => p.victoryPtn) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
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
  const [pieData, setPieData] = useState<PieData>(INITIAL_STATES.pieData());

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

  const handleNewPlayer = (newPlayer: string, startScore: number) => {
    if (newPlayer === "") return;
    if (isNaN(startScore)) return;

    const newColor = playerColors[players.length] ?? getRandomColor();
    const newName = newPlayer.trim().charAt(0).toUpperCase() + newPlayer.slice(1);
    const newBarDatasets = [...barData.datasets];
    const newPieDatasets = [...pieData.datasets];

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
        sum: startScore,
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

    for (const dataset of newBarDatasets) {
      dataset.data = [...dataset.data, startScore];
      dataset.backgroundColor.push(addOpacityToHex(newColor, 0.8));
      dataset.borderColor.push(newColor);
      dataset.borderWidth = 2;
    }

    setBarData({
      labels: [...barData.labels, newName],
      datasets: newBarDatasets,
    });

    setPieData({
      labels: [...pieData.labels, newName],
      datasets: [
        {
          label: "Victory points",
          data: [...newPieDatasets[0].data, startScore],
          backgroundColor: [...newPieDatasets[0].backgroundColor, addOpacityToHex(newColor, 0.8)],
          borderColor: [...newPieDatasets[0].borderColor, newColor],
          borderWidth: 2,
        },
      ],
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
    const newPieData = updatePieChart(pieData, newPlayers, idx);

    setLineData(newLineData);
    setBarData(newBarData);
    setPieData(newPieData);
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

    const newBarLabels = [...barData.labels];
    const newBarDatasets = [...barData.datasets];
    const idxInDatasets = newBarLabels.findIndex((l) => l === name);
    if (idxInDatasets == -1) return;
    newBarLabels.splice(idxInDatasets, 1);
    newBarDatasets.map((d) => {
      d.data.splice(idxInDatasets, 1);
      d.backgroundColor.splice(idxInDatasets, 1);
      d.borderColor.splice(idxInDatasets, 1);
    });

    const newPieLabels = [...pieData.labels];
    const newPieDatasets = [...pieData.datasets];
    const idxInPieDatasets = newPieLabels.findIndex((l) => l === name);
    if (idxInPieDatasets == -1) return;
    newPieLabels.splice(idxInPieDatasets, 1);
    newPieDatasets[0].data.splice(idxInPieDatasets, 1);
    newPieDatasets[0].backgroundColor.splice(idxInPieDatasets, 1);
    newPieDatasets[0].borderColor.splice(idxInPieDatasets, 1);

    setLineData({
      labels: lineData.labels,
      datasets: newLineDatasets,
    });
    setBarData({
      labels: newBarLabels,
      datasets: newBarDatasets,
    });
    setPieData({
      labels: newPieLabels,
      datasets: newPieDatasets,
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

    /* == PIE CHART STATES UPDATE == */
    //--

    const newPieDatasets = [...pieData.datasets];
    const idxInPieData = pieData.labels.findIndex((l) => l === name);
    newPieDatasets[0].data[idxInPieData] = 0;

    setLineData({
      labels: newLabels,
      datasets: newLineDatasets,
    });
    setBarData({
      labels: barData.labels,
      datasets: newBarDatasets,
    });
    setPieData({
      labels: pieData.labels,
      datasets: newPieDatasets,
    });
    setPlayers(newPlayers.sort((a, b) => b.victoryPtn - a.victoryPtn));
  };

  return (
    <div className="main-ctn">
      <style>
        {`
          .themed-bg {
            background-color : ${theme == "dark" ? "#242424" : "#ffffffde"} ;
            color: ${theme == "dark" ? "#ffffffde" : "#242424"};
          }
      `}
      </style>
      {/* == NAV == */}
      <nav className="nav-ctn">
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
            theme == "dark" ? setTheme("light") : setTheme("dark");
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
            setPieData(getFromLocalStorage<PieData>("pieData", INITIAL_STATES.pieData()));
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
            saveToLocalStorage("pieData", pieData);
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
            <ChartContainer>
              <Line data={lineData} options={lineOptions} theme={theme} />
            </ChartContainer>
            <ChartContainer>
              <Bar data={barData} options={barOptions} theme={theme} />
            </ChartContainer>
            <ChartContainer>
              <Pie data={pieData} options={pieOptions} theme={theme} />
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
