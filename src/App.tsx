import { Input, InputButton } from "./components/Input";
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import { ChartContainer, MainContainer } from "./components/containers/Containers";
import { PlayerStatsContainer, PlayersList } from "./components/players/PlayersList";
import { usePlayer, useToggle, useIntermediate, useIntermediateDispatch } from "./hooks";
import { Nav } from "./components/nav/Nav";

const App = () => {
  const { addPlayer, removePlayer, resetScore, updateScore, players, lines, bars, pies } =
    usePlayer();
  const { newPlayerName, startScore } = useIntermediate();
  const { setNewPlayerName, setStartScore } = useIntermediateDispatch();
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
        <PlayersList
          hideScore={isScoreHidden}
          players={players}
          reset={resetScore}
          remove={removePlayer}
          update={updateScore}
        />
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
