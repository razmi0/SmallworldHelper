// import { Input, InputButton } from "./components/Input";
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
import { Clock, FreshStartButton } from "./components/Utils";
import { AddPlayer } from "./components/addplayer/AddPlayer";

const App = () => {
  const { playersStates, playersActions } = usePlayer();
  const { players, lines, bars, pies } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  const { savePlayers, loadPlayers } = useIntermediate();
  const { setLoadPlayers, setSavePlayers } = useIntermediateDispatch();

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

  return (
    <MainContainer>
      {isDevEnv() && <Clock />}
      <Nav
        toggleHideScore={hideScore}
        toggleOpenAddPlayer={openAddPlayer}
        toggleOpenCharts={openCharts}
        isScoreHidden={isScoreHidden}
        undoRedoStates={{ isUndoPossible, isRedoPossible, nbrOfRedos, nbrOfUndos }}
        undoRedoActions={{ undo, redo }}
      />
      <FreshStartButton
        isNavOpen={toggleStates.isNavOpen}
        toggleOpenAddPlayer={openAddPlayer}
        hasPlayers={players.length > 0}
        isAddPlayerOpen={toggleStates.isAddPlayerOpen}
      />
      <PlayerStatsContainer>
        <PlayersList
          hideScore={isScoreHidden}
          players={players}
          reset={resetScore}
          remove={removePlayer}
          update={updateScore}
        >
          {toggleStates.isAddPlayerOpen && <AddPlayer addPlayer={addPlayer} />}
        </PlayersList>
        <ChartContainer isOpen={isChartsOpen && players.length > 0}>
          <Line data={lines} options={lineOptions} />
          <Bar data={bars} options={barOptions} />
          <Pie data={pies} options={pieOptions} />
        </ChartContainer>
      </PlayerStatsContainer>
    </MainContainer>
  );
};

export default App;
