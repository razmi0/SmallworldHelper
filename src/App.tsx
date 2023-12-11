import { useEffect } from "react";
import { usePlayer } from "@Hooks/players/usePlayer";
import { useUndoRedo } from "@Hooks/useUndoRedo";
import { useToggle } from "@Hooks/useToggle";
import { useFocus } from "@Hooks/useFocus";
import { useStorage } from "@Context/useStorage";
import { useNotif } from "@Context/useNotif";
import { MainContainer } from "@Components/Containers";
import Board, { PlayerStatsContainer } from "@Components/Board";
import Nav from "@Components/Nav";
import Charts from "@Components/Charts";
import AddPlayerCard from "@Components/AddPlayer";
import { StartButton, Toast, RisingStars } from "@Components/Utils";
import { getFromLocalStorage, saveToLocalStorage } from "@Utils/utils";
import type { Player } from "@Types";

const App = () => {
  console.log("App");

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
   * useStorage
   */
  const { storageEvent, storageActions } = useStorage();
  const { setLoad, setSave } = storageActions;

  /**
   * useFocus
   */
  const { focusStates, focusActions } = useFocus(players.length);
  const { focusMap, onlyOneFocus, noFocus } = focusStates;

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
        setLoad(false);
        const { stored, error } = getFromLocalStorage<Player[]>("players", []);
        if (error.status) {
          post({ type: "error", message: error.text });
        }
        post({ type: "success", message: "Loaded 👍" });
        setPlayers(stored);
        break;

      case "SAVE":
        setSave(false);
        const err = saveToLocalStorage("players", players);
        err
          ? post({ type: "error", message: err })
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
  const focusStatesChart = { focusMap, onlyOneFocus, color, noFocus };
  const focusStatesBoard = { focusMap, onlyOneFocus };

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
        <StartButton
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
            focusStates={focusStatesBoard}
          />
          <Charts
            focusActions={focusActions}
            focusStates={focusStatesChart}
            isOpen={isChartsOpen && playerSize > 0 && hasHistory}
            lines={lines}
            bars={bars}
            donuts={donuts}
          />
        </PlayerStatsContainer>
        <AddPlayerCard
          addPlayer={addPlayer}
          isOpen={toggleStates.isAddPlayerOpen}
          toggleCard={toggleActions.openAddPlayer}
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
