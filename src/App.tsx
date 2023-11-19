import { useEffect } from "react";
import { useUndoRedo, usePlayer, useToggle, useMidAction, useMidState } from "@Hooks";
import {
  MainContainer,
  PlayerStatsContainer,
  Board,
  Nav,
  Charts,
  AddPlayer,
  FreshStartButton,
} from "@Components";
import { Player } from "@Types";
import { manageStorage } from "@Utils";

const App = () => {
  const { playersStates, playersActions } = usePlayer();
  const { players, lines, bars, donuts } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  const { setLoadPlayers, setSavePlayers } = useMidAction();
  const { loadPlayers, savePlayers } = useMidState();

  const { toggleStates, toggleActions } = useToggle();
  const { hideScore, openAddPlayer, openCharts } = toggleActions;
  const { isScoreHidden, isChartsOpen } = toggleStates;

  const { undoRedoStates, undoRedoActions } = useUndoRedo<Player[]>(players, setPlayers);

  const hasPlayer = players.length > 0;

  useEffect(() => {
    const loadedPlayers = manageStorage(
      loadPlayers,
      savePlayers,
      setLoadPlayers,
      setSavePlayers,
      players
    );
    if (loadedPlayers) {
      setPlayers(loadedPlayers);
    }
  }, [loadPlayers, savePlayers]);

  return (
    <MainContainer>
      {/* {isDevEnv() && <Clock />} */}
      <Nav
        toggleHideScore={hideScore}
        toggleOpenAddPlayer={openAddPlayer}
        toggleOpenCharts={openCharts}
        isScoreHidden={isScoreHidden}
        undoRedoStates={undoRedoStates}
        undoRedoActions={undoRedoActions}
      />
      <FreshStartButton
        toggleOpenAddPlayer={openAddPlayer}
        hasPlayers={hasPlayer}
        isAddPlayerOpen={toggleStates.isAddPlayerOpen}
      />
      <PlayerStatsContainer>
        <Board
          hideScore={isScoreHidden}
          players={players}
          reset={resetScore}
          remove={removePlayer}
          update={updateScore}
        ></Board>
        <Charts
          isOpen={isChartsOpen && players.length > 0}
          lines={lines}
          bars={bars}
          donuts={donuts}
        />
        <AddPlayer
          addPlayer={addPlayer}
          isOpen={toggleStates.isAddPlayerOpen}
          toggleOpenAddPlayer={openAddPlayer}
        />
      </PlayerStatsContainer>
    </MainContainer>
  );
};

export default App;
