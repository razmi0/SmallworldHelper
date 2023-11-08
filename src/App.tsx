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
import { usePlayer, useTheme, useToggle, useIntermediateState } from "./hooks";

const App = () => {
  const { addPlayer, removePlayer, resetScore, updateScore, players, lines, bars, pies } =
    usePlayer();
  const {
    booleanMap,
    newPlayerName,
    newScores,
    setBooleanMap,
    setNewPlayerName,
    setNewScores,
    setStartScore,
    startScore,
  } = useIntermediateState(players.length);
  const {
    isAddPlayerOpen,
    isChartsOpen,
    isNavOpen,
    isScoreHidden,
    toggleHideScore,
    toggleOpenAddPlayer,
    toggleOpenCharts,
    toggleOpenNav,
  } = useToggle();
  const { theme, switchTheme } = useTheme();

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
            transform: isNavOpen ? "none" : iconStyle.icons.menu.transform?.(),
            transition: iconStyle.icons.menu.transition?.(),
          }}
          theme={theme}
          iconName="menu"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
        <IconButton
          icon={Theme}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.theme.transform?.(),
            transition: iconStyle.icons.theme.transition?.(),
            zIndex: iconStyle.icons.theme.zIndex,
          }}
          theme={theme}
          iconName="theme"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            switchTheme();
          }}
        />

        <IconButton
          icon={Load}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.load.transform?.(),
            transition: iconStyle.icons.load.transition?.(),
            zIndex: iconStyle.icons.load.zIndex,
          }}
          theme={theme}
          iconName="load"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
        <IconButton
          icon={Save}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.save.transform?.(),
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
            toggleOpenNav();
          }}
          theme={theme}
        />
        <IconButton
          icon={AddPlayer}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.addplayer.transform?.(),
            transition: iconStyle.icons.addplayer.transition?.(),
            zIndex: iconStyle.icons.addplayer.zIndex,
          }}
          theme={theme}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={toggleOpenAddPlayer}
        />
        <IconButton
          icon={LineChart}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.linechart.transform?.(),
            transition: iconStyle.icons.linechart.transition?.(),
            zIndex: iconStyle.icons.linechart.zIndex,
          }}
          theme={theme}
          iconName="linechart"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav;
            if (players.length == 0) return;
            handleWithViewTransition(toggleOpenCharts);
          }}
        />
        <IconButton
          icon={isScoreHidden ? EyeClose : EyeOpen}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.eyes.transform?.(),
            transition: iconStyle.icons.eyes.transition?.(),
            zIndex: iconStyle.icons.eyes.zIndex,
          }}
          theme={theme}
          iconName="eyes"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            toggleHideScore();
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
            const subjectId = `${id}_${name.toLowerCase()}`;

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
                      isHover={booleanMap[i]}
                      color={color}
                      icon={Star}
                      svgData={headingStarIconStyle}
                    />
                    <span
                      style={{
                        color: booleanMap[i] ? color : "inherit",
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
                    onFocus={() => setBooleanMap(i, true)}
                    onBlur={() => {
                      setBooleanMap(i, false);
                      setNewScores(i, 0);
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        updateScore(id, newScores[i]);
                        e.currentTarget.blur();
                      }
                    }}
                    onChange={(e) => {
                      const newScore = Number(e.currentTarget.value);
                      if (isNaN(newScore)) return;
                      setNewScores(i, newScore);
                    }}
                    value={newScores[i] == 0 ? "" : newScores[i]}
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
        {isChartsOpen && players.length > 0 && (
          <ChartContainer>
            <Line key="line" data={lines} options={lineOptions} theme={theme} />
            <Bar key="bar" data={bars} options={barOptions} theme={theme} />
            <Pie key="pie" data={pies} options={pieOptions} theme={theme} />
          </ChartContainer>
        )}
      </section>
      {/* == ADD PLAYER == */}
      {isAddPlayerOpen && (
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
              addPlayer(newPlayerName, startScore);
              setNewPlayerName("");
            }}
            onChange={(e) => setNewPlayerName(e.currentTarget.value)}
            value={newPlayerName}
            onClick={() => {
              addPlayer(newPlayerName, startScore);
              setNewPlayerName("");
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
              onEnter={() => addPlayer(newPlayerName, startScore)}
            />
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default App;
