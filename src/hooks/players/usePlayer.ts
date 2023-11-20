// IMPORTS
// --
import { useCallback, useReducer } from "react";
import { BarData, LineData, DonutData, Player, PlayerState } from "@Types";
import {
  buildAllLines,
  buildAllBars,
  buildAlldonuts,
  buildBaseStats,
  buildNewBars,
  buildNewLines,
  buildNewdonuts,
  removeBar,
  removeLine,
  removedonut,
  removePlayer,
  resetBar,
  resetLine,
  resetdonut,
  resetPlayersStats,
  fullReset,
  updateBars,
  updateLines,
  updatedonuts,
  updatePlayersStats,
} from "./helpers";
import { getFromLocalStorage } from "@Utils";

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

  /* DonutData not stored at the moment */
  DonutData: () =>
    getFromLocalStorage<DonutData>("DonutData", buildAlldonuts(initialPlayerStates.players)),
};

// REDUCER
// --
const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const { type, payload } = action;
  const { players, lines, bars, donuts } = state;

  switch (type) {
    case "ADD_PLAYER": {
      const { name, startScore } = payload;
      const hasName = players.find((player) => player.name === name);
      if (hasName) return state;
      const newPlayer = buildBaseStats(name, startScore, players.length /* => id*/);
      return {
        ...state,
        players: [...players, newPlayer],
        lines: buildNewLines(lines, newPlayer),
        bars: buildNewBars(bars, newPlayer),
        donuts: buildNewdonuts(donuts, newPlayer),
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
        donuts: removedonut(donuts, rmPlayer.name),
      };
    }

    case "RESET_SCORE": {
      const { id } = payload;
      const { rsPlayer, rsPlayers } = resetPlayersStats(players, id);
      return {
        ...state,
        players: rsPlayers,
        lines: resetLine(lines, rsPlayer.name, rsPlayers),
        bars: resetBar(bars, rsPlayer.name),
        donuts: resetdonut(donuts, rsPlayer.name),
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
        donuts: updatedonuts(donuts, updatedPlayer),
      };
    }

    case "SET_PLAYERS": {
      const { players } = payload;
      return {
        ...state,
        players,
        lines: buildAllLines(players),
        bars: buildAllBars(players),
        donuts: buildAlldonuts(players),
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
    donuts: initialPlayerStates.DonutData(),
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
