// import { Input, InputButton } from "./components/Input";
import { useUndoRedo, usePlayer, useToggle, useLocalStorage } from "@Hooks";
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

const App = () => {
  const { playersStates, playersActions } = usePlayer();
  const { players, lines, bars, donuts } = playersStates;
  const { addPlayer, resetScore, removePlayer, updateScore, setPlayers } = playersActions;

  useLocalStorage("players", players, setPlayers);

  const { toggleStates, toggleActions } = useToggle();
  const { hideScore, openAddPlayer, openCharts } = toggleActions;
  const { isScoreHidden, isChartsOpen } = toggleStates;

  const { undoRedoStates, undoRedoActions } = useUndoRedo<Player[]>(players, setPlayers);

  const hasPlayer = players.length > 0;

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
        >
          <AddPlayer
            addPlayer={addPlayer}
            isOpen={toggleStates.isAddPlayerOpen}
            toggleOpenAddPlayer={openAddPlayer}
          />
        </Board>
        <Charts
          isOpen={isChartsOpen && players.length > 0}
          lines={lines}
          bars={bars}
          donuts={donuts}
        />
      </PlayerStatsContainer>
    </MainContainer>
  );
};

export default App;
