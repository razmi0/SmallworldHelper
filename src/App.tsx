// import { Input, InputButton } from "./components/Input";
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
import { Player } from "@Types"; // BarData, LineData, DonutData,
import { getFromLocalStorage, saveToLocalStorage } from "@Utils";
import { useEffect } from "react";

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
// loadPlayers, savePlayers, setLoadPlayers, setSavePlayers, setPlayers, players
const manageStorage = (
  load: boolean,
  save: boolean,
  setLoad: (value: boolean) => void,
  setSave: (value: boolean) => void,
  payload: Player[]
) => {
  if (load) {
    setLoad(false);
    try {
      const storedData = getFromLocalStorage<Player[]>("players");
      return storedData;
    } catch (error) {
      throw new Error("No players found in local storage");
    }
  } else if (save) {
    setSave(false);
    try {
      saveToLocalStorage<Player[]>("players", payload);
    } catch (error) {
      throw new Error("Unable to save players to local storage");
    }
  }
};
