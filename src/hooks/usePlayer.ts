import { useReducer } from "react";
import { BarData, LineData, PieData, Player } from "../types";
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
} from "../utils";

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

const playersReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
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

const INITIAL_STATES = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  lineData: () => getFromLocalStorage<LineData>("lineData", INITIAL_STATES.initLineData()),
  barData: () => getFromLocalStorage<BarData>("barData", INITIAL_STATES.initBarData()),
  pieData: () => getFromLocalStorage<PieData>("pieData", INITIAL_STATES.initPieData()),

  initLineData: () => {
    const maxTurns = findMaxNbrTurns(INITIAL_STATES.players);
    return {
      labels:
        maxTurns == 0 ? [] : Array.from({ length: maxTurns }, (_, i) => (i + 1).toString()) ?? [],
      datasets:
        INITIAL_STATES.players.length == 0
          ? []
          : INITIAL_STATES.players.map((p: Player) => {
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
      labels: INITIAL_STATES.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Max score",
          data: INITIAL_STATES.players.map((p) => findMax(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Min score",
          data: INITIAL_STATES.players.map((p) => findMin(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
        {
          label: "Average score",
          data: INITIAL_STATES.players.map((p) => findAverage(p.addedScores)) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
      ],
    };
  },
  initPieData: () => {
    return {
      labels: INITIAL_STATES.players.map((p) => p.name) ?? [],
      datasets: [
        {
          label: "Victory points",
          data: INITIAL_STATES.players.map((p) => p.victoryPtn) ?? [],
          backgroundColor: INITIAL_STATES.players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
          borderColor: INITIAL_STATES.players.map((p) => p.color) ?? [],
          borderWidth: 2,
        },
      ],
    };
  },
};

// PLAYER REDUCER HOOK
//--
export const usePlayers = () => {
  const [playersState, playersDispatch] = useReducer(playersReducer, {
    players: INITIAL_STATES.players,
    lines: INITIAL_STATES.lineData(),
    bars: INITIAL_STATES.barData(),
    pies: INITIAL_STATES.pieData(),
  });
  return {
    // STATES
    //--
    players: playersState.players,
    lines: playersState.lines,
    bars: playersState.bars,
    pies: playersState.pies,

    // ACTIONS
    //--
    addPlayer: (name: string, startScore: number) => {
      playersDispatch({ type: "ADD_PLAYER", payload: { name, startScore } });
    },
    removePlayer: (id: Player["id"]) => {
      playersDispatch({ type: "REMOVE_PLAYER", payload: { id } });
    },
    resetScore: (id: Player["id"]) => {
      playersDispatch({ type: "RESET_SCORE", payload: { id } });
    },
    updateScore: (id: Player["id"], newScore: number) => {
      playersDispatch({ type: "UPDATE_SCORE", payload: { id, newScore } });
    },
  };
};

export const useChart = () => {
  const { lines, pies, bars } = usePlayers();
  return {
    lines,
    pies,
    bars,
  };
};
