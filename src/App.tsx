import { IconButton, Reset, Delete, Star, IconHeading } from "./components/icons/Icons";
import { headingStarIconStyle, playerIconStyle } from "./components/icons/data";
import { Input, InputButton, SoftInput } from "./components/Input";
import { Spacer } from "./components/Utils";
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import {
  ChartContainer,
  Flex,
  InputContainer,
  MainContainer,
} from "./components/containers/Containers";
import {
  PlayerListElement,
  PlayerStatsContainer,
  PlayerText,
  PlayerTextContainer,
  PlayersList,
} from "./components/players/PlayersList";
import { usePlayer, useToggle, useIntermediate, useIntermediateDispatch } from "./hooks";
import { Nav } from "./components/nav/Nav";

const App = () => {
  const { addPlayer, removePlayer, resetScore, updateScore, players, lines, bars, pies } =
    usePlayer();
  const { booleanMap, newPlayerName, newScores, startScore } = useIntermediate();
  const { setBooleanMap, setNewPlayerName, setNewScores, setStartScore } =
    useIntermediateDispatch();
  const {
    isAddPlayerOpen,
    isChartsOpen,
    isScoreHidden,
    toggleHideScore,
    toggleOpenAddPlayer,
    toggleOpenCharts,
  } = useToggle();

  return (
    <MainContainer>
      <Nav
        toggleHideScore={toggleHideScore}
        toggleOpenAddPlayer={toggleOpenAddPlayer}
        toggleOpenCharts={toggleOpenCharts}
        isScoreHidden={isScoreHidden}
      />
      <PlayerStatsContainer>
        <PlayersList>
          {players.map((player, i) => {
            const { name, victoryPtn, id, color } = player;
            const subjectId = `${id}_${name.toLowerCase()}`;

            return (
              <PlayerListElement key={id}>
                <Flex>
                  <PlayerTextContainer>
                    <IconHeading
                      animationName="translate"
                      isHover={booleanMap[i]}
                      color={color}
                      icon={Star}
                      svgData={headingStarIconStyle}
                    />
                    <PlayerText color={booleanMap[i] ? color : "inherit"}>
                      {name} : {isScoreHidden ? "*****" : victoryPtn}
                    </PlayerText>
                  </PlayerTextContainer>
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
                </Flex>
                <InputContainer>
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
                </InputContainer>
              </PlayerListElement>
            );
          })}
        </PlayersList>
        <ChartContainer isOpen={isChartsOpen && players.length > 0}>
          <Line data={lines} options={lineOptions} />
          <Bar data={bars} options={barOptions} />
          <Pie data={pies} options={pieOptions} />
        </ChartContainer>
      </PlayerStatsContainer>
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
