import { useEffect, useMemo } from "react";
import { usePlayer } from "@Hooks/players/usePlayer";
import { useUndoRedo } from "@Hooks/useUndoRedo";
import { useToggle } from "@Hooks/useToggle";
import { useFocus } from "@Hooks/useFocus";
import { useStorage } from "@Context/useStorage";
import { useNotif } from "@Context/useNotif";
import { MainContainer, BoardView } from "@Components/Containers";
import Board from "@Components/Board";
import Nav from "@Components/Nav";
import Charts from "@Components/Charts";
import AddPlayerCard from "@Components/AddPlayer";
import { StartButton, Toast, RisingStars, MockButton } from "@Components/Utils";
import { getFromLocalStorage, saveToLocalStorage } from "@Utils/utils";
import { buildAllBars, buildAllLines, buildAlldonuts } from "./hooks/players/helpers";
import type { Player } from "@Types";

const workingVars = (players: Player[], onlyOneFocusIndex: number) => {
  const hasPlayer = players.length > 0;
  const hasHistory = hasPlayer && players.some((player) => player.history.length > 1);
  const color = players[onlyOneFocusIndex]?.color;

  return { hasPlayer, hasHistory, color };
};

const App = () => {
  // console.log("App");

  /**
   * useNotif
   */
  const { post } = useNotif();

  /**
   * usePlayer
   */
  const { playersStates, playersActions, playerSize, playersNames } = usePlayer();
  const { players /**, lines, bars, donuts */ } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  /**
   * useChart
   */
  const lines = useMemo(() => buildAllLines(players), [players]);
  const bars = useMemo(() => buildAllBars(players), [players]);
  const donuts = useMemo(() => buildAlldonuts(players), [players]);

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

  /**
   * useClock
   */

  useEffect(() => {
    switch (storageEvent) {
      case "LOAD":
        setLoad(false);
        /**
         * Players
         */
        const { stored: storedPlayers, error: errorPlayers } = getFromLocalStorage<Player[]>("players", []);
        if (errorPlayers.status) {
          post({ type: "error", message: errorPlayers.text });
        }

        if (!errorPlayers.status) setPlayers(storedPlayers);
        post({ type: "success", message: "Loaded 👍" });
        break;

      case "SAVE":
        setSave(false);
        /**
         * Players
         */
        const errorPlayer = saveToLocalStorage("players", players);
        if (errorPlayer) {
          post({ type: "error", message: errorPlayer });
        }

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
      <Nav
        storageActions={storageActions}
        togglers={toggleActions}
        isNavOpen={isNavOpen}
        isScoreHidden={isScoreHidden}
        playerSize={playerSize}
        undoRedoStates={undoRedoStates}
        undoRedoActions={undoRedoActions}
      />
      <RisingStars color={color} />
      <StartButton
        toggleOpenAddPlayer={toggleActions.openAddPlayer}
        hasPlayers={hasPlayer}
        isAddPlayerOpen={toggleStates.isAddPlayerOpen}
      />
      <MainContainer>
        <BoardView>
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
        </BoardView>

        <AddPlayerCard
          addPlayer={addPlayer}
          isOpen={toggleStates.isAddPlayerOpen}
          toggleCard={toggleActions.openAddPlayer}
          names={playersNames}
          changeFocus={focusActions.changeFocus}
        />
        <Toast />
        <MockButton setMock={() => setPlayers(mock)} />
      </MainContainer>
    </>
  );
};

export default App;

const mock = [
  {
    id: 0,
    name: "Thomas",
    victoryPtn: 14,
    history: [0, 1, 2, 6, 5],
    addedScores: [0, 1, 2, 6, 5],
    rankChange: 0,
    color: "#DEAD2FFF",
    max: 6,
    min: 0,
    avg: 3,
    sum: 14,
  },
  {
    id: 5,
    name: "Nita",
    victoryPtn: 17,
    history: [0, 3, 8, 6],
    addedScores: [0, 3, 8, 6],
    rankChange: 0,
    color: "#211EA9FF",
    max: 8,
    min: 0,
    avg: 4,
    sum: 17,
  },
  {
    id: 98,
    name: "Dfg",
    victoryPtn: 14,
    history: [0, 4, 3, 7],
    addedScores: [0, 4, 3, 7],
    rankChange: 0,
    color: "#F0D6EEFF",
    max: 7,
    min: 0,
    avg: 4,
    sum: 14,
  },
  {
    id: 30,
    name: "Zer",
    victoryPtn: 19,
    history: [0, 5, 5, 9],
    addedScores: [0, 5, 5, 9],
    rankChange: 0,
    color: "#519AC4FF",
    max: 9,
    min: 0,
    avg: 5,
    sum: 19,
  },
  {
    id: 20,
    name: "Fg",
    victoryPtn: 21,
    history: [0, 3, 9, 8, 1],
    addedScores: [0, 3, 9, 8, 1],
    rankChange: 0,
    color: "#5991BFFF",
    max: 9,
    min: 0,
    avg: 4,
    sum: 21,
  },
  {
    id: 75,
    name: "Gh",
    victoryPtn: 14,
    history: [0, 4, 1, 9],
    addedScores: [0, 4, 1, 9],
    rankChange: 0,
    color: "#C740B1FF",
    max: 9,
    min: 0,
    avg: 4,
    sum: 14,
  },
  {
    id: 102,
    name: "Sd",
    victoryPtn: 8,
    history: [0, 5, 2, 1],
    addedScores: [0, 5, 2, 1],
    rankChange: 0,
    color: "#E818F0FF",
    max: 5,
    min: 0,
    avg: 2,
    sum: 8,
  },
  {
    id: 66,
    name: "Ukuh",
    victoryPtn: 12,
    history: [0, 7, 3, 2],
    addedScores: [0, 7, 3, 2],
    rankChange: 0,
    color: "#02F7FEFF",
    max: 7,
    min: 0,
    avg: 3,
    sum: 12,
  },
];
