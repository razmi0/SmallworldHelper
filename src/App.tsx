import { Input, InputButton } from "./components/Input";
import { Line, Bar, Pie } from "./components/charts/Charts";
import { lineOptions, barOptions, pieOptions } from "./components/charts/data";
import { ChartContainer, MainContainer } from "./components/containers";
import { PlayerStatsContainer, PlayersList } from "./components/players/PlayersList";
import { usePlayer, useToggle, useIntermediate, useIntermediateDispatch } from "./hooks";
import { Nav } from "./components/nav/Nav";
import { useUndoRedo } from "./hooks";
import { Player } from "./types"; // BarData, LineData, PieData,
import { useEffect } from "react";
import { saveToLocalStorage, getFromLocalStorage, isDevEnv } from "./utils";
import { Clock } from "./components/Utils";

const App = () => {
  const { playersStates, playersActions } = usePlayer();
  const { players, lines, bars, pies } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  const { newPlayerName, startScore, savePlayers, loadPlayers } = useIntermediate();
  const { setNewPlayerName, setStartScore, setLoadPlayers, setSavePlayers } =
    useIntermediateDispatch();

  const { toggleStates, toggleActions } = useToggle();
  const { hideScore, openAddPlayer, openCharts } = toggleActions;
  const { isScoreHidden, isChartsOpen } = toggleStates;

  const { undoRedoStates, undoRedoActions } = useUndoRedo<Player[]>(players, setPlayers);
  const { undo, redo } = undoRedoActions;
  const { isUndoPossible, isRedoPossible, nbrOfRedos, nbrOfUndos } = undoRedoStates;

  useEffect(() => {
    if (savePlayers) {
      saveToLocalStorage("players", players);
      setSavePlayers(false);
    } else if (loadPlayers) {
      const storedPlayers = getFromLocalStorage("players");
      if (!storedPlayers) throw new Error("No players found in local storage");
      setLoadPlayers(false);
      setPlayers(storedPlayers as Player[]);
    }
  }, [savePlayers, loadPlayers]);

  // console.log(players);

  return (
    <MainContainer>
      {isDevEnv() && <Clock />}
      <Nav
        toggleHideScore={hideScore}
        toggleOpenAddPlayer={openAddPlayer}
        toggleOpenCharts={openCharts}
        isScoreHidden={isScoreHidden}
        undo={undo}
        redo={redo}
        isUndoPossible={isUndoPossible}
        isRedoPossible={isRedoPossible}
        nbrOfRedos={nbrOfRedos}
        nbrOfUndos={nbrOfUndos}
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
      {toggleStates.isAddPlayerOpen && (
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
