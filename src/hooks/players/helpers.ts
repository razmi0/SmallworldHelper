import { PLAYER_COLORS } from "../../components/icons/data";
import { BarData, LineData, Player, PieData } from "../../types";
import { addOpacityToHex, findMaxNbrTurns, getRandomColor } from "../../utils";

const errorMsg = "Player not found";

// HELPERS FUNCTIONS FOR BUILD CHARTS FROM SCRATCH
//--
export const buildAllLines = (players: Player[]) => {
  const maxTurns = findMaxNbrTurns(players);
  console.log("buildAllLines");
  return {
    labels:
      maxTurns == 0 ? [] : Array.from({ length: maxTurns }, (_, i) => (i + 1).toString()) ?? [],
    datasets:
      players.length == 0
        ? []
        : players.map((p: Player) => {
            return {
              label: p.name,
              data: p.history,
              backgroundColor: p.color,
              borderColor: p.color,
            };
          }) ?? [],
  };
};

export const buildAllBars = (players: Player[]) => {
  console.log("buildAllBars");

  return {
    labels: players.map((p) => p.name) ?? [],
    datasets: [
      {
        label: "Max score",
        data: players.map((p) => p.max) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: 2,
      },
      {
        label: "Average score",
        data: players.map((p) => p.avg) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: 2,
      },
      {
        label: "Min score",
        data: players.map((p) => p.min) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: 2,
      },
    ],
  };
};

export const buildAllPies = (players: Player[]) => {
  console.log("buildAllPies");
  return {
    labels: players.map((p) => p.name) ?? [],
    datasets: [
      {
        label: "Victory points",
        data: players.map((p) => p.victoryPtn) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, 0.8)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: 0,
      },
    ],
  };
};

// HELPERS FUNCTIONS FOR ADD_PLAYER
//--

export const buildBaseStats = (name: string, startScore: number, id: number) => {
  return {
    id: id,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    victoryPtn: startScore,
    history: [startScore],
    addedScores: [startScore],
    rankChange: 0,
    color: PLAYER_COLORS[id] ?? getRandomColor(),
    max: startScore,
    min: startScore,
    avg: startScore,
    sum: startScore,
  };
};

export const buildNewLines = (lines: LineData, newPlayer: Player) => {
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

export const buildNewBars = (bars: BarData, newPlayer: Player) => {
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

export const buildNewPies = (pies: PieData, newPlayer: Player) => {
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

export const updatePlayersStats = (players: Player[], newScore: number, id: number) => {
  const playerIndex = players.findIndex((p) => p.id === id);
  if (playerIndex === -1) throw new Error(errorMsg);
  const updatedPlayer = updatePlayerStats(players[playerIndex], newScore);
  const updatedPlayers = [
    ...players.slice(0, playerIndex),
    updatedPlayer,
    ...players.slice(playerIndex + 1),
  ];

  return { updatedPlayer, updatedPlayers };
};

export const updateLines = (
  lines: LineData,
  updatedPlayer: Player,
  players: Player[]
): LineData => {
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

export const updateBars = (bars: BarData, updatedPlayer: Player): BarData => {
  const index = bars.labels.findIndex((label) => label === updatedPlayer.name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = bars.datasets.map((dataset, i) => {
    const newData = [...dataset.data];
    newData[index] = i === 0 ? updatedPlayer.max : i === 1 ? updatedPlayer.min : updatedPlayer.avg;
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

export const updatePies = (pies: PieData, updatedPlayer: Player): PieData => {
  const index = pies.labels.findIndex((label) => label === updatedPlayer.name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    newData[index] = updatedPlayer.victoryPtn;
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
export const resetPlayersStats = (players: Player[], id: Player["id"]) => {
  const newPlayers = players.map((player) => {
    return player.id === id ? resetPlayerStats(player) : player;
  });
  const index = newPlayers.findIndex((player) => player.id === id);
  if (index === -1) throw new Error(errorMsg);
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

export const resetLine = (lines: LineData, name: Player["name"], players: Player[]): LineData => {
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

export const resetBar = (bars: BarData, name: Player["name"]): BarData => {
  const index = bars.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = bars.datasets.map((dataset) => {
    const newData = [...dataset.data];
    newData[index] = 0;
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

export const resetPie = (pies: PieData, name: Player["name"]): PieData => {
  const index = pies.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    newData[index] = 0;
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
export const removePlayer = (players: Player[], id: Player["id"]) => {
  const index = players.findIndex((player) => player.id === id);
  if (index === -1) throw new Error(errorMsg);
  return {
    rmPlayers: players.filter((player) => player.id !== id),
    rmPlayer: players[index],
  };
};

export const removeLine = (lines: LineData, name: Player["name"]): LineData => {
  const newDatasets = lines.datasets.filter((dataset) => dataset.label !== name);
  if (newDatasets.length === 0) throw new Error(errorMsg);
  return {
    labels: [...lines.labels],
    datasets: newDatasets,
  };
};

export const removeBar = (bars: BarData, name: Player["name"]): BarData => {
  const index = bars.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = bars.datasets.map((dataset) => {
    const newData = [...dataset.data];
    const newBackgroundColor = [...dataset.backgroundColor];
    const newBorderColor = [...dataset.borderColor];
    newData.splice(index, 1);
    newBackgroundColor.splice(index, 1);
    newBorderColor.splice(index, 1);
    return {
      ...dataset,
      data: newData,
      backgroundColor: newBackgroundColor,
      borderColor: newBorderColor,
    };
  });
  return {
    labels: bars.labels.filter((label) => label !== name),
    datasets: newDatasets,
  };
};

export const removePie = (pies: PieData, name: Player["name"]): PieData => {
  const index = pies.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = pies.datasets.map((dataset) => {
    const newData = [...dataset.data];
    const newBackgroundColor = [...dataset.backgroundColor];
    const newBorderColor = [...dataset.borderColor];
    newData.splice(index, 1);
    newBackgroundColor.splice(index, 1);
    newBorderColor.splice(index, 1);
    return {
      ...dataset,
      data: newData,
      backgroundColor: newBackgroundColor,
      borderColor: newBorderColor,
    };
  });
  return {
    labels: pies.labels.filter((label) => label !== name),
    datasets: newDatasets,
  };
};

type ResetStates = {
  players: Player[];
  lines: LineData;
  bars: BarData;
  pies: PieData;
};
// RESET ALL STATES (PLAYERS, LINES, BARS, PIES)
//--
export const fullReset = (): ResetStates => {
  return {
    players: [],
    lines: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "",
          borderColor: "",
        },
      ],
    },
    bars: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
        },
        {
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
        },
        {
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
        },
      ],
    },
    pies: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 0,
        },
      ],
    },
  };
};
