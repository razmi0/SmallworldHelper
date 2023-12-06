import { useEffect } from "react";
import { usePlayer } from "@Hooks/players/usePlayer";
import { useUndoRedo } from "@Hooks/useUndoRedo";
import { useToggle } from "@Hooks/useToggle";
import { useFocus } from "@Hooks/useFocus";
import { useMid } from "@Context/useMid";
import { useNotif } from "@Context/useNotif";
import { MainContainer } from "@Components/Containers";
import Board, { PlayerStatsContainer } from "@Components/Board";
import Nav from "@Components/Nav";
import Charts from "@Components/Charts";
import AddPlayerCard from "@Components/AddPlayer";
import { FreshStartButton, Toast, RisingStars } from "@Components/Utils";
import { getFromLocalStorage, saveToLocalStorage } from "@Utils/utils";
import { Player } from "@Types";

// let a = 0;
const App = () => {
  /**
   * useNotif
   */
  const { post } = useNotif();

  /**
   * usePlayer
   */
  const { playersStates, playersActions, playerSize, playersNames } = usePlayer();
  const { players, lines, bars, donuts } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  /**
   * useMid
   */
  const { storageEvent, storageActions } = useMid(); // , isFocus
  const { setLoadPlayers, setSavePlayers } = storageActions;

  /**
   * useFocus
   */
  const { focusStates, focusActions } = useFocus(players.length);
  const { focusMap, onlyOneFocus } = focusStates;

  /**
   * useToggle
   */
  const { toggleStates, toggleActions } = useToggle();
  const { isScoreHidden, isChartsOpen, isNavOpen } = toggleStates;

  /**
   * useUndoRedo
   */
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
          : post({ type: "success", message: "Saved 👍" });
        break;

      default:
        break;
    }
  }, [storageEvent]);

  useEffect(() => {
    focusActions.changeFocusLength(players.length);
  }, [playerSize]);

  const { hasPlayer, hasHistory, color } = workingVars(players, onlyOneFocus.index);

  return (
    <>
      <RisingStars color={color} />
      <MainContainer>
        <Nav
          storageActions={storageActions}
          togglers={toggleActions}
          isNavOpen={isNavOpen}
          isScoreHidden={isScoreHidden}
          playerSize={playerSize}
          undoRedoStates={undoRedoStates}
          undoRedoActions={undoRedoActions}
        />
        <FreshStartButton
          toggleOpenAddPlayer={toggleActions.openAddPlayer}
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
            focusActions={focusActions}
            focusStates={{
              focusMap,
              onlyOneFocus,
            }}
          />
          <Charts
            focusActions={focusActions}
            focusStates={{
              focusMap,
              onlyOneFocus,
              color,
            }}
            isOpen={isChartsOpen && playerSize > 0 && hasHistory}
            lines={lines}
            bars={bars}
            donuts={donuts}
          />
        </PlayerStatsContainer>
        <AddPlayerCard
          addPlayer={addPlayer}
          isOpen={toggleStates.isAddPlayerOpen}
          toggleOpenAddPlayer={toggleActions.openAddPlayer}
          names={playersNames}
          changeFocus={focusActions.changeFocus}
        />
        <Toast />
      </MainContainer>
    </>
  );
};

const workingVars = (players: Player[], onlyOneFocusIndex: number) => {
  const hasPlayer = players.length > 0;
  const hasHistory = hasPlayer && players.some((player) => player.history.length > 1);
  const color = players[onlyOneFocusIndex]?.color;

  return { hasPlayer, hasHistory, color };
};

export default App;
