import { useState } from "react";
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
import { saveToLocalStorage } from "./utils";
import { useChart, usePlayers } from "./hooks/usePlayer";

const INITIAL_UI_STATES = {
  booleanMap: (size: number): boolean[] => Array.from({ length: size }, () => false),
  newScores: (size: number): number[] => Array.from({ length: size }, () => 0),
  hideScore: false,
  startScore: 0,
  newPlayerName: "",
  openAddPlayer: false,
  openMenu: false,
  openCharts: false,
  theme: "dark" as "dark" | "light",
};

/* == COMPONENT == */
//--
const App = () => {
  /* == STATES FOR DATA == */
  //--
  const { addPlayer, removePlayer, resetScore, updateScore, players } = usePlayers();
  const { lines, bars, pies } = useChart();

  /* == STATES FOR WORKING DATA == */
  const [newPlayer, setNewPlayer] = useState(INITIAL_UI_STATES.newPlayerName);
  const [newScore, setNewScore] = useState(INITIAL_UI_STATES.newScores(players.length));
  const [startScore, setStartScore] = useState(INITIAL_UI_STATES.startScore);

  /* == STATES FOR UI == */
  //--
  const [openAddPlayer, setOpenAddPlayer] = useState(INITIAL_UI_STATES.openAddPlayer);
  const [openMenu, setOpenMenu] = useState(INITIAL_UI_STATES.openMenu);
  const [openCharts, setOpenCharts] = useState(INITIAL_UI_STATES.openCharts);
  const [isFocusOnField, setIsFocusOnField] = useState(
    INITIAL_UI_STATES.booleanMap(players.length)
  );
  const [isScoreHidden, setIsScoreHidden] = useState(INITIAL_UI_STATES.hideScore);
  const [theme, setTheme] = useState(INITIAL_UI_STATES.theme);

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
            saveToLocalStorage("players", players);
            saveToLocalStorage("lineData", lines);
            saveToLocalStorage("barData", bars);
            saveToLocalStorage("pieData", pies);
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
        <ul className="players-list-ctn">
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
                    onClick={() => resetScore(id)}
                    icon={Reset}
                    iconName="reset"
                    svgData={playerIconStyle}
                  />
                  <IconButton
                    onClick={() => removePlayer(id)}
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
                      if (e.key === "Enter") updateScore(id, newScore[i]);
                      e.currentTarget.blur();
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
        {openCharts && players.length > 0 && (
          <ChartContainer>
            <Line data={lines} options={lineOptions} theme={theme} />
            <Bar data={bars} options={barOptions} theme={theme} />
            <Pie data={pies} options={pieOptions} theme={theme} />
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
              addPlayer(newPlayer, startScore);
              setNewPlayer("");
            }}
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
            value={newPlayer}
            onClick={() => addPlayer(newPlayer, startScore)}
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
              onEnter={() => addPlayer(newPlayer, startScore)}
            />
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default App;
