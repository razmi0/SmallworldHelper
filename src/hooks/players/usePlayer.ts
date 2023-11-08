// IMPORTS
// --
import { useCallback, useReducer } from "react";
import { BarData, LineData, PieData, Player } from "../../types";
import {
  buildBaseStats,
  buildNewBars,
  buildNewLines,
  buildNewPies,
  removeBar,
  removeLine,
  removePie,
  removePlayer,
  resetBar,
  resetLine,
  resetPie,
  resetPlayersStats,
  fullReset,
  updateBars,
  updateLines,
  updatePies,
  updatePlayersStats,
} from "./helpers";
import {
  addOpacityToHex,
  findMaxNbrTurns,
  findAverage,
  findMax,
  findMin,
  getFromLocalStorage,
} from "../../utils";

// TYPES
// --
type PlayerState = {
  players: Player[];
  lines: LineData;
  bars: BarData;
  pies: PieData;
};

type PlayerAction =
  | { type: "ADD_PLAYER"; payload: { name: Player["name"]; startScore: number } }
  | { type: "REMOVE_PLAYER"; payload: { id: Player["id"] } }
  | { type: "RESET_SCORE"; payload: { id: Player["id"] } }
  | { type: "UPDATE_SCORE"; payload: { id: Player["id"]; newScore: number } };

// INITIAL STATES
// --
const initialPlayerStates = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  lineData: () => getFromLocalStorage<LineData>("lineData", initialPlayerStates.initLineData()),
  barData: () => getFromLocalStorage<BarData>("barData", initialPlayerStates.initBarData()),
  pieData: () => getFromLocalStorage<PieData>("pieData", initialPlayerStates.initPieData()),

  initLineData: () => {
    const maxTurns = findMaxNbrTurns(initialPlayerStates.players);
    return {
      labels:
        maxTurns == 0 ? [] : Array.from({ length: maxTurns }, (_, i) => (i + 1).toString()) ?? [],
      datasets:
        initialPlayerStates.players.length == 0
          ? []
          : initialPlayerStates.players.map((p: Player) => {
              return {
                label: p.name,
                data: p.history,
                backgroundColor: p.color,
                borderColor: p.color,
              };
            }) ?? [],
    };
  },
  initBarData: () => {
    return {
      labels: initialPlayerStates.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Max score",
          data: initialPlayerStates.players.map((p) => findMax(p.addedScores)) ?? [],
          backgroundColor:
            initialPlayerStates.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: initialPlayerStates.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Min score",
          data: initialPlayerStates.players.map((p) => findMin(p.addedScores)) ?? [],
          backgroundColor:
            initialPlayerStates.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: initialPlayerStates.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Average score",
          data: initialPlayerStates.players.map((p) => findAverage(p.addedScores)) ?? [],
          backgroundColor:
            initialPlayerStates.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: initialPlayerStates.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
      ],
    };
  },
  initPieData: () => {
    return {
      labels: initialPlayerStates.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Victory points",
          data: initialPlayerStates.players.map((p) => p.victoryPtn) ?? [],
          backgroundColor:
            initialPlayerStates.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: initialPlayerStates.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
      ],
    };
  },
};

// REDUCER
// --
const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const { type, payload } = action;
  const { players, lines, bars, pies } = state;

  switch (type) {
    case "ADD_PLAYER": {
      const { name, startScore } = payload;
      const newPlayer = buildBaseStats(name, startScore, players.length /*id*/);
      return {
        ...state,
        players: [...players, newPlayer],
        lines: buildNewLines(lines, newPlayer),
        bars: buildNewBars(bars, newPlayer),
        pies: buildNewPies(pies, newPlayer),
      };
    }

    case "REMOVE_PLAYER": {
      const { id } = payload;
      const { rmPlayers, rmPlayer } = removePlayer(players, id);
      if (rmPlayers.length === 0) return { ...state, ...fullReset() };

      return {
        ...state,
        players: rmPlayers,
        lines: removeLine(lines, rmPlayer.name),
        bars: removeBar(bars, rmPlayer.name),
        pies: removePie(pies, rmPlayer.name),
      };
    }

    case "RESET_SCORE": {
      const { id } = payload;
      const { newPlayer, newPlayers } = resetPlayersStats(players, id);
      return {
        ...state,
        players: newPlayers,
        lines: resetLine(lines, newPlayer.name, newPlayers),
        bars: resetBar(bars, newPlayer.name),
        pies: resetPie(pies, newPlayer.name),
      };
    }

    case "UPDATE_SCORE": {
      const { id, newScore } = payload;
      const { updatedPlayer, updatedPlayers } = updatePlayersStats(players, newScore, id);
      return {
        ...state,
        players: updatedPlayers,
        lines: updateLines(lines, updatedPlayer, updatedPlayers),
        bars: updateBars(bars, updatedPlayer),
        pies: updatePies(pies, updatedPlayer),
      };
    }

    default:
      return state;
  }
};

// PLAYER STATES HOOK
//--
export const usePlayer = () => {
  const [state, dispatch] = useReducer(playerReducer, {
    players: initialPlayerStates.players,
    lines: initialPlayerStates.lineData(),
    bars: initialPlayerStates.barData(),
    pies: initialPlayerStates.pieData(),
  });

  return {
    // STATES
    //--
    players: state.players,
    lines: state.lines,
    bars: state.bars,
    pies: state.pies,

    // ACTIONS
    //--
    addPlayer: useCallback((name: string, startScore: number) => {
      dispatch({ type: "ADD_PLAYER", payload: { name, startScore } });
    }, []),
    removePlayer: useCallback((id: Player["id"]) => {
      dispatch({ type: "REMOVE_PLAYER", payload: { id } });
    }, []),
    resetScore: useCallback((id: Player["id"]) => {
      dispatch({ type: "RESET_SCORE", payload: { id } });
    }, []),
    updateScore: useCallback((id: Player["id"], newScore: number) => {
      dispatch({ type: "UPDATE_SCORE", payload: { id, newScore } });
    }, []),
  };
};
