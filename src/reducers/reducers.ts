import { BarData, LineData, PieData, Player } from "../App";
import { playerColors } from "../components/icons/data";
import { getRandomColor } from "../utils";

type PlayerAction =
  | { type: "ADD_PLAYER"; payload: { name: Player["name"]; startScore: number } }
  | { type: "REMOVE_PLAYER"; payload: Player["id"] }
  | { type: "RESET_SCORE"; payload: Player["id"] }
  | { type: "UPDATE_SCORE"; payload: { id: Player["id"]; newScore: number } };

export const combinedReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const { type, payload } = action;
  const players = state.players;
  switch (type) {
    case "ADD_PLAYER": {
      const newName = payload.name.trim().charAt(0).toUpperCase() + payload.name.slice(1);
      const newColor = playerColors[players.length] ?? getRandomColor();
      const startScore = payload.startScore;
      return {
        ...state,
        players: [
          ...players,
          {
            id: players.length,
            name: newName,
            victoryPtn: startScore,
            history: [startScore],
            addedScores: [startScore],
            rankChange: 0,
            color: newColor,
            max: startScore,
            min: startScore,
            avg: startScore,
            sum: startScore,
          },
        ],
      };
    }

    case "REMOVE_PLAYER":
      return { ...state, players: players.filter((player) => player.id !== payload) };

    case "RESET_SCORE": {
      return {
        ...state,
        players: players.map((player) => {
          if (player.id === payload) {
            return {
              ...player,
              history: [...player.history, 0],
              addedScores: [...player.addedScores, 0],
              victoryPtn: 0,
              max: 0,
              min: 0,
              avg: 0,
              sum: 0,
            };
          }
          return player;
        }),
      };
    }

    case "UPDATE_SCORE": {
      const { id, newScore } = payload;
      return {
        ...state,
        players: players.map((player) => {
          if (player.id === id) {
            return {
              ...player,
              history: [...player.history, newScore],
              addedScores: [...player.addedScores, newScore],
              victoryPtn: (player.victoryPtn += newScore),
              max: Math.max(player.max, newScore),
              min: Math.min(player.min, newScore),
              avg: Math.round((player.sum + newScore) / (player.addedScores.length + 1)),
              sum: player.sum + newScore,
            };
          }
          return player;
        }),
      };
    }
    default:
      return state;
  }
};

type PlayerState = {
  players: Player[];
};

type LineState = {
  lines: LineData;
};

type BarState = {
  bars: BarData[];
};

type PieState = {
  pies: PieData[];
};

type CombinedState = {
  players: PlayerState;
  lines: LineState;
  bars: BarState;
  pies: PieState;
};

type CombinedAction = PlayerAction | LineAction | BarAction | PieAction;

export const rootReducer = (state: CombinedState, action: CombinedAction): CombinedState => {
  return {
    players: playerReducer(state.players, action),
    lines: lineReducer(state.lines, action),
    bars: barReducer(state.bars, action),
    pies: pieReducer(state.pies, action),
  };
};
