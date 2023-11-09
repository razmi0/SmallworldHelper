import { IconButton, Reset, Delete, Star, IconHeading } from "./components/icons/Icons";
import { headingStarIconStyle, playerIconStyle } from "./components/icons/data";
import { Input, InputButton, SoftInput } from "./components/Input";
import { Spacer } from "./components/Utils";
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import { ChartContainer, MainContainer } from "./components/containers/Containers";
import { usePlayer, useToggle, useIntermediateState } from "./hooks";
import { Nav } from "./components/nav/Nav";

const App = () => {
  const { addPlayer, removePlayer, resetScore, updateScore, players, lines, bars, pies } =
    usePlayer();
  const {
    booleanMap,
    newPlayerName,
    newScores,
    startScore,
    setBooleanMap,
    setNewPlayerName,
    setNewScores,
    setStartScore,
  } = useIntermediateState(players.length);
  const {
    isAddPlayerOpen,
    isChartsOpen,
    isScoreHidden,
    isNavOpen,
    toggleHideScore,
    toggleOpenAddPlayer,
    toggleOpenCharts,
    toggleOpenNav,
  } = useToggle();

  return (
    <MainContainer>
      <Nav
        toggleHideScore={toggleHideScore}
        toggleOpenAddPlayer={toggleOpenAddPlayer}
        toggleOpenCharts={toggleOpenCharts}
        toggleOpenNav={toggleOpenNav}
        isScoreHidden={isScoreHidden}
        isNavOpen={isNavOpen}
      />
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
                  />
                </div>
              </li>
            );
          })}
        </ul>
        {/* == CHARTS == */}
        {isChartsOpen && players.length > 0 && (
          <ChartContainer>
            <Line key="line" data={lines} options={lineOptions} />
            <Bar key="bar" data={bars} options={barOptions} />
            <Pie key="pie" data={pies} options={pieOptions} />
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
    </MainContainer>
  );
};

export default App;
