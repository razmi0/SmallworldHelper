import { useEffect } from "react";
import { useUndoRedo, usePlayer, useToggle, useMidAction, useMidState, useNotif } from "@Hooks";
import {
  MainContainer,
  PlayerStatsContainer,
  Board,
  Nav,
  Charts,
  AddPlayerCard,
  FreshStartButton,
  Toast,
} from "@Components";
import { Player } from "@Types";
import { getFromLocalStorage, saveToLocalStorage } from "@Utils";

let a = 0;
const App = () => {
  // console.time("App");

  const { post } = useNotif();

  const { playersStates, playersActions } = usePlayer();

  const { players, lines, bars, donuts } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  const { storageActions } = useMidAction();
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { storageEvent } = useMidState();

  const { toggleStates, toggleActions } = useToggle();
  const { hideScore, openAddPlayer, openCharts } = toggleActions;
  const { isScoreHidden, isChartsOpen } = toggleStates;

  const { undoRedoStates, undoRedoActions } = useUndoRedo<Player[]>(players, setPlayers);

  useEffect(() => {
    switch (storageEvent) {
      case "LOAD":
        setLoadPlayers(false);
        const storedData = getFromLocalStorage<Player[]>("players", []);
        storedData.error.length > 0
          ? post({ type: "error", message: storedData.error })
          : post({ type: "success", message: "Loaded 👍" });
        break;

      case "SAVE":
        setSavePlayers(false);
        const error = saveToLocalStorage("players", players);
        error
          ? post({ type: "error", message: error })
          : post({ type: "success", message: "Saved" });
        break;

      default:
        break;
    }
  }, [storageEvent]);

  const hasPlayer = players.length > 0;
  const names = players.map((player) => player.name);
  const playerSize = players.length;

  // console.timeEnd("App");

  a += 1;
  console.log("counter", a);

  return (
    <MainContainer>
      <Nav
        storageActions={storageActions}
        toggleHideScore={hideScore}
        toggleOpenAddPlayer={openAddPlayer}
        toggleOpenCharts={openCharts}
        isScoreHidden={isScoreHidden}
        playerSize={playerSize}
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
        />
        <Charts
          isOpen={isChartsOpen && players.length > 0}
          lines={lines}
          bars={bars}
          donuts={donuts}
        />
      </PlayerStatsContainer>
      <AddPlayerCard
        addPlayer={addPlayer}
        isOpen={toggleStates.isAddPlayerOpen}
        toggleOpenAddPlayer={openAddPlayer}
        names={names}
      />
      <Toast />
    </MainContainer>
  );
};

export default App;
