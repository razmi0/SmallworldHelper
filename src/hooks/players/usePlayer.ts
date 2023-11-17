// IMPORTS
// --
import { useCallback, useReducer } from "react";
import { BarData, LineData, PieData, Player, PlayerState } from "../../types";
import {
  buildAllLines,
  buildAllBars,
  buildAllPies,
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
import { getFromLocalStorage } from "../../utils";

// TYPES
// --

type PlayerAction =
  | { type: "ADD_PLAYER"; payload: { name: Player["name"]; startScore: number } }
  | {
      type: "SET_PLAYERS";
      payload: { players: Player[] };
    }
  | { type: "REMOVE_PLAYER"; payload: { id: Player["id"] } }
  | { type: "RESET_SCORE"; payload: { id: Player["id"] } }
  | { type: "UPDATE_SCORE"; payload: { id: Player["id"]; newScore: number } };

// INITIAL STATES
// --
export const initialPlayerStates = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,

  /* lineData not stored at the moment */
  lineData: () =>
    getFromLocalStorage<LineData>("lineData", buildAllLines(initialPlayerStates.players)),

  /* barData not stored at the moment */
  barData: () => getFromLocalStorage<BarData>("barData", buildAllBars(initialPlayerStates.players)),

  /* pieData not stored at the moment */
  pieData: () => getFromLocalStorage<PieData>("pieData", buildAllPies(initialPlayerStates.players)),
};

// REDUCER
// --
const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const { type, payload } = action;
  const { players, lines, bars, pies } = state;

  switch (type) {
    case "ADD_PLAYER": {
      const { name, startScore } = payload;
      const newPlayer = buildBaseStats(name, startScore, players.length /* => id*/);
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

    case "SET_PLAYERS": {
      const { players } = payload;
      return {
        ...state,
        players,
        lines: buildAllLines(players),
        bars: buildAllBars(players),
        pies: buildAllPies(players),
      };
    }

    default:
      return state;
  }
};

// PLAYER STATES HOOK
//--
export const usePlayer = () => {
  const [playersStates, dispatch] = useReducer(playerReducer, {
    players: initialPlayerStates.players,
    lines: initialPlayerStates.lineData(),
    bars: initialPlayerStates.barData(),
    pies: initialPlayerStates.pieData(),
  });

  /**
   * Build charts from there
   */
  const setPlayers = useCallback((players: Player[]) => {
    dispatch({ type: "SET_PLAYERS", payload: { players: players } });
  }, []);

  const addPlayer = useCallback((name: string, startScore: number) => {
    dispatch({ type: "ADD_PLAYER", payload: { name, startScore } });
  }, []);

  const removePlayer = useCallback((id: Player["id"]) => {
    dispatch({ type: "REMOVE_PLAYER", payload: { id } });
  }, []);

  const resetScore = useCallback((id: Player["id"]) => {
    dispatch({ type: "RESET_SCORE", payload: { id } });
  }, []);

  const updateScore = useCallback((id: Player["id"], newScore: number) => {
    dispatch({ type: "UPDATE_SCORE", payload: { id, newScore } });
  }, []);

  return {
    playersStates,
    playersActions: { setPlayers, addPlayer, removePlayer, resetScore, updateScore },
  };
};
