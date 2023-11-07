import { useReducer, useState } from "react";
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
import { headingStarIconStyle, iconStyle, playerIconStyle } from "./components/icons/data";
import { Input, InputButton, SoftInput } from "./components/Input";
import { Spacer } from "./components/Utils";
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import { ChartContainer } from "./components/Containers";
import {
  findMaxNbrTurns,
  getFromLocalStorage,
  saveToLocalStorage,
  findAverage,
  findMin,
  findMax,
  addOpacityToHex,
} from "./utils";
import { playersReducer } from "./hooks/reducers";

export type Player = {
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

export type LineData = {
  labels: string[]; // x-axis & ...turns
  datasets: {
    label: string; // player name
    data: number[]; // history
    backgroundColor: string; // player color
    borderColor: string; // player color with opacity
  }[];
};

export type BarData = {
  labels: string[]; // x-axis & players name
  datasets: {
    label: string; // maxscore, minscore, average
    data: number[]; // treated data from Player['addedScores'] [fn maxscoredata, fn minscoredata, fn average data]
    backgroundColor: string[]; // player color with opacity
    borderColor: string[]; // player color
    borderWidth: number;
  }[];
};

export type PieData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

const INITIAL_STATES = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  newScores: () => INITIAL_STATES.initNewScores(),
  lineData: () => getFromLocalStorage<LineData>("lineData", INITIAL_STATES.initLineData()),
  barData: () => getFromLocalStorage<BarData>("barData", INITIAL_STATES.initBarData()),
  pieData: () => getFromLocalStorage<PieData>("pieData", INITIAL_STATES.initPieData()),
  hovering: () => Array.from({ length: INITIAL_STATES.players.length }, () => false),
  initNewScores: () => Array.from({ length: INITIAL_STATES.players.length }, () => 0),
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
  const [playersState, playersDispatch] = useReducer(playersReducer, {
    players: INITIAL_STATES.players,
    lines: INITIAL_STATES.lineData(),
    bars: INITIAL_STATES.barData(),
    pies: INITIAL_STATES.pieData(),
  });
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [newScore, setNewScore] = useState<number[]>(INITIAL_STATES.newScores());
  const [startScore, setStartScore] = useState<number>(INITIAL_STATES.startScore);

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
            saveToLocalStorage("players", playersState.players);
            saveToLocalStorage("lineData", playersState.lines);
            saveToLocalStorage("barData", playersState.bars);
            saveToLocalStorage("pieData", playersState.pies);
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
            if (playersState.players.length == 0) return;
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
        <ul className="players-list-ctn">
          {playersState.players.map((player, i) => {
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
                    onClick={() => {
                      playersDispatch({ type: "RESET_SCORE", payload: id });
                    }}
                    icon={Reset}
                    iconName="reset"
                    svgData={playerIconStyle}
                  />
                  <IconButton
                    onClick={() => {
                      playersDispatch({ type: "REMOVE_PLAYER", payload: { id: id } });
                    }}
                    icon={Delete}
                    iconName="delete"
                    svgData={playerIconStyle}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SoftInput
                    color={color}
                    onFocus={() =>
                      setIsFocusOnField((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = true;
                        return newPrev;
                      })
                    }
                    onBlur={() => {
                      setIsFocusOnField((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = false;
                        return newPrev;
                      });
                      setNewScore((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = 0;
                        return newPrev;
                      });
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        playersDispatch({
                          type: "UPDATE_SCORE",
                          payload: { id: id, newScore: newScore[i] },
                        });
                        e.currentTarget.blur();
                      }
                    }}
                    onChange={(e) => {
                      const newScore = Number(e.currentTarget.value);
                      if (isNaN(newScore)) return;
                      setNewScore((prev) => {
                        const newPrev = [...prev];
                        newPrev[i] = newScore;
                        return newPrev;
                      });
                    }}
                    value={newScore[i] == 0 ? "" : newScore[i]}
                    labelText="Score"
                    subjectId={subjectId}
                    theme={theme}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        {/* == CHARTS == */}
        {openCharts && playersState.players.length > 0 && (
          <ChartContainer>
            <Line data={playersState.lines} options={lineOptions} theme={theme} />
            <Bar data={playersState.bars} options={barOptions} theme={theme} />
            <Pie data={playersState.pies} options={pieOptions} theme={theme} />
          </ChartContainer>
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
              playersDispatch({ type: "ADD_PLAYER", payload: { name: newPlayer, startScore } });
              setNewPlayer("");
            }}
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
            value={newPlayer}
            onClick={() => {
              playersDispatch({ type: "ADD_PLAYER", payload: { name: newPlayer, startScore } });
            }}
          />
          <div style={{ transform: "translate(-37px" }}>
            <Input
              labelText="Start score"
              subjectId="startScore"
              onChange={(e) => {
                setStartScore(
                  isNaN(Number(e.currentTarget.value)) ? 0 : Number(e.currentTarget.value)
                );
              }}
              value={startScore}
              onEnter={() => {
                playersDispatch({ type: "ADD_PLAYER", payload: { name: newPlayer, startScore } });
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
