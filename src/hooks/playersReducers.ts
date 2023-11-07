import { BarData, LineData, PieData, Player } from "../App";
import { playerColors } from "../components/icons/data";
import {
  addOpacityToHex,
  findMaxNbrTurns,
  getRandomColor,
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

export const playersReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
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

// HELPERS FUNCTIONS FOR ADD_PLAYER
//--
const buildBaseStats = (name: string, startScore: number, id: number) => {
  return {
    id: id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    victoryPtn: startScore,
    history: [startScore],
    addedScores: [startScore],
    rankChange: 0,
    color: playerColors[id] ?? getRandomColor(),
    max: startScore,
    min: startScore,
    avg: startScore,
    sum: startScore,
  };
};

const buildNewLines = (lines: LineData, newPlayer: Player) => {
  const { datasets, labels } = lines;
  return {
    labels: labels,
    datasets: [
      ...datasets,
      {
        label: newPlayer.name,
        data: [...newPlayer.history],
        backgroundColor: newPlayer.color,
        borderColor: newPlayer.color,
      },
    ],
  };
};

const buildNewBars = (bars: BarData, newPlayer: Player) => {
  const { datasets, labels } = bars;
  const clonedDatasets = datasets.map((dataset) => ({
    ...dataset,
    data: [...dataset.data, newPlayer.victoryPtn],
    borderColor: [...dataset.borderColor, newPlayer.color],
    backgroundColor: [...dataset.backgroundColor, addOpacityToHex(newPlayer.color, 0.8)],
  }));
  return {
    labels: [...labels, newPlayer.name],
    datasets: clonedDatasets,
  };
};

const buildNewPies = (pies: PieData, newPlayer: Player) => {
  const { datasets, labels } = pies;
  return {
    labels: [...labels, newPlayer.name],
    datasets: [
      {
        ...datasets[0],
        data: [...datasets[0].data, newPlayer.victoryPtn],
        backgroundColor: [...datasets[0].backgroundColor, addOpacityToHex(newPlayer.color, 0.8)],
        borderColor: [...datasets[0].borderColor, newPlayer.color],
      },
    ],
  };
};

// HELPERS FUNCTIONS FOR UPDATE_SCORE
//--
const updatePlayerStats = (player: Player, newScore: number) => {
  const updatedPlayer = {
    ...player,
    history: [...player.history, newScore],
    addedScores: [...player.addedScores, newScore],
    victoryPtn: player.victoryPtn + newScore,
    max: Math.max(player.max, newScore),
    min: Math.min(player.min, newScore),
    avg: Math.round((player.sum + newScore) / (player.addedScores.length + 1)),
    sum: player.sum + newScore,
  };

  return updatedPlayer;
};

const updatePlayersStats = (players: Player[], newScore: number, id: number) => {
  const playerIndex = players.findIndex((p) => p.id === id);
  if (playerIndex === -1) {
    throw new Error("Player not found");
  }
  const updatedPlayer = updatePlayerStats(players[playerIndex], newScore);
  const updatedPlayers = [
    ...players.slice(0, playerIndex),
    updatedPlayer,
    ...players.slice(playerIndex + 1),
  ];

  return { updatedPlayer, updatedPlayers };
};

const updateLines = (lines: LineData, updatedPlayer: Player, players: Player[]): LineData => {
  const newLabels =
    findMaxNbrTurns(players) > lines.labels.length
      ? [...lines.labels, (lines.labels.length + 1).toString()]
      : [...lines.labels];
  const newDatasets = lines.datasets.map((dataset) => {
    if (dataset.label === updatedPlayer.name) {
      return {
        ...dataset,
        data: [...dataset.data, updatedPlayer.victoryPtn],
      };
    }
    return dataset;
  });
  return {
    labels: newLabels,
    datasets: newDatasets,
  };
};

const updateBars = (bars: BarData, updatedPlayer: Player): BarData => {
  const index = bars.labels.findIndex((label) => label === updatedPlayer.name);
  const newDatasets = bars.datasets.map((dataset, i) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData[index] =
        i === 0 ? updatedPlayer.max : i === 1 ? updatedPlayer.min : updatedPlayer.avg;
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: [...bars.labels], // This spread is not necessary labels are not being mutated
    datasets: newDatasets,
  };
};

const updatePies = (pies: PieData, updatedPlayer: Player): PieData => {
  const index = pies.labels.findIndex((label) => label === updatedPlayer.name);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData[index] = updatedPlayer.victoryPtn;
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: [...pies.labels], // This spread is not necessary labels are not being mutated
    datasets: newDatasets,
  };
};

// HELPERS FUNCTIONS FOR RESET_PLAYER
//--
const resetPlayersStats = (players: Player[], id: Player["id"]) => {
  const newPlayers = players.map((player) => {
    return player.id === id ? resetPlayerStats(player) : player;
  });
  const index = newPlayers.findIndex((player) => player.id === id);
  if (index === -1) {
    throw new Error("Player not found");
  }
  return {
    newPlayer: newPlayers[index],
    newPlayers: newPlayers,
  };
};

const resetPlayerStats = (player: Player) => {
  return {
    ...player,
    history: [...player.history, 0],
    addedScores: [...player.addedScores, 0],
    victoryPtn: 0,
  };
};

const resetLine = (lines: LineData, name: Player["name"], players: Player[]): LineData => {
  const newDatasets = lines.datasets.map((dataset) => {
    return dataset.label === name ? { ...dataset, data: [...dataset.data, 0] } : dataset;
  });
  const newLabels =
    findMaxNbrTurns(players) > lines.labels.length
      ? [...lines.labels, (lines.labels.length + 1).toString()]
      : lines.labels;
  return {
    labels: newLabels,
    datasets: newDatasets,
  };
};

const resetBar = (bars: BarData, name: Player["name"]): BarData => {
  const index = bars.labels.findIndex((label) => label === name);
  const newDatasets = bars.datasets.map((dataset) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData[index] = 0;
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: bars.labels,
    datasets: newDatasets,
  };
};

const resetPie = (pies: PieData, name: Player["name"]): PieData => {
  const index = pies.labels.findIndex((label) => label === name);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData[index] = 0;
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: pies.labels,
    datasets: newDatasets,
  };
};

// HELPERS FUNCTIONS FOR REMOVE_PLAYER
//--
const removePlayer = (players: Player[], id: Player["id"]) => {
  const index = players.findIndex((player) => player.id === id);
  return {
    rmPlayers: players.filter((player) => player.id !== id),
    rmPlayer: players[index],
  };
};

const removeLine = (lines: LineData, name: Player["name"]): LineData => {
  const newDatasets = lines.datasets.filter((dataset) => dataset.label !== name);
  return {
    labels: [...lines.labels],
    datasets: newDatasets,
  };
};

const removeBar = (bars: BarData, name: Player["name"]): BarData => {
  const index = bars.labels.findIndex((label) => label === name);
  const newDatasets = bars.datasets.map((dataset) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData.splice(index, 1);
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: bars.labels.filter((label) => label !== name),
    datasets: newDatasets,
  };
};

const removePie = (pies: PieData, name: Player["name"]): PieData => {
  const index = pies.labels.findIndex((label) => label === name);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    if (index !== -1) {
      newData.splice(index, 1);
    }
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: pies.labels.filter((label) => label !== name),
    datasets: newDatasets,
  };
};
import {} from "src/utils";
import { useReducer } from "react";

const INITIAL_STATES = {
  players: getFromLocalStorage<Player[]>("players", []),
  startScore: 0,
  newScores: () => INITIAL_STATES.initNewScores(),
  lineData: () => getFromLocalStorage<LineData>("lineData", INITIAL_STATES.initLineData()),
  barData: () => getFromLocalStorage<BarData>("barData", INITIAL_STATES.initBarData()),
  pieData: () => getFromLocalStorage<PieData>("pieData", INITIAL_STATES.initPieData()),
  hovering: () => Array.from({ length: INITIAL_STATES.players.length }, () => false),
  initNewScores: () => Array.from({ length: INITIAL_STATES.players.length }, () => 0),
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
