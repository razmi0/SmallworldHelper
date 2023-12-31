import { addOpacityToHex, findMaxNbrTurns, getRandomColor } from "@Utils/utils";
import type { BarDataType, LineDataType, Player, DonutDataType } from "@Types";

const errorMsg = "Player not found";
const BORDER_WIDTH = 1 as const;
const BORDER_WIDTH_DONUT = 0 as const;
const BG_OPACITY = 0.8 as const; // bar & donut
const BAR_THICKNESS = 10 as const;
const BAR_PERCENTAGE = 1.0 as const;
const CATEGORY_PERCENTAGE = 1.0 as const;

// HELPERS FUNCTIONS FOR BUILD CHARTS FROM SCRATCH
//--
export const buildAllLines = (players: Player[]) => {
  const maxTurns = findMaxNbrTurns(players);
  return {
    labels:
      maxTurns == 0 ? [] : Array.from({ length: maxTurns }, (_, i) => (i + 1).toString()) ?? [],
    datasets:
      players.length == 0
        ? []
        : players.map((p: Player) => {
            return {
              label: p.name,
              data: p.addedScores,
              backgroundColor: p.color,
              borderColor: p.color,
            };
          }) ?? [],
  };
};

export const buildAllBars = (players: Player[]) => {
  // console.trace("buildAllBars");
  return {
    labels: players.map((p) => p.name) ?? [],
    datasets: [
      {
        label: "Max score",
        data: players.map((p) => p.max) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, BG_OPACITY)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: BORDER_WIDTH,
        barThickness: BAR_THICKNESS,
        barPercentage: BAR_PERCENTAGE,
        categoryPercentage: CATEGORY_PERCENTAGE,
      },
      {
        label: "Average score",
        data: players.map((p) => p.avg) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, BG_OPACITY)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: BORDER_WIDTH,
        barThickness: BAR_THICKNESS,
        barPercentage: BAR_PERCENTAGE,
        categoryPercentage: CATEGORY_PERCENTAGE,
      },
      {
        label: "Min score",
        data: players.map((p) => p.min) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, BG_OPACITY)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: BORDER_WIDTH,
        barThickness: BAR_THICKNESS,
        barPercentage: BAR_PERCENTAGE,
        categoryPercentage: CATEGORY_PERCENTAGE,
      },
    ],
  };
};

export const buildAlldonuts = (players: Player[]) => {
  return {
    labels: players.map((p) => p.name) ?? [],
    datasets: [
      {
        label: "Victory points",
        data: players.map((p) => p.victoryPtn) ?? [],
        backgroundColor: players.map((p) => addOpacityToHex(p.color, BG_OPACITY)) ?? [],
        borderColor: players.map((p) => p.color) ?? [],
        borderWidth: BORDER_WIDTH_DONUT,
      },
    ],
  };
};

// HELPERS FUNCTIONS FOR ADD_PLAYER
//--

export const buildBaseStats = (name: string, startScore: number, id: number) => {
  return {
    id: id,
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    victoryPtn: startScore,
    history: [startScore],
    addedScores: [startScore],
    rankChange: 0,
    color: getRandomColor(),
    max: startScore,
    min: startScore,
    avg: startScore,
    sum: startScore,
  };
};

export const buildNewLines = (lines: LineDataType, newPlayer: Player) => {
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

export const buildNewBars = (bars: BarDataType, newPlayer: Player) => {
  const { datasets, labels } = bars;
  const clonedDatasets = datasets.map((dataset) => ({
    ...dataset,
    data: [...dataset.data, newPlayer.victoryPtn],
    borderColor: [...dataset.borderColor, newPlayer.color],
    backgroundColor: [...dataset.backgroundColor, addOpacityToHex(newPlayer.color, BG_OPACITY)],
  }));
  return {
    labels: [...labels, newPlayer.name],
    datasets: clonedDatasets,
  };
};

export const buildNewdonuts = (donuts: DonutDataType, newPlayer: Player) => {
  const { datasets, labels } = donuts;
  return {
    labels: [...labels, newPlayer.name],
    datasets: [
      {
        ...datasets[0],
        data: [...datasets[0].data, newPlayer.victoryPtn],
        backgroundColor: [
          ...datasets[0].backgroundColor,
          addOpacityToHex(newPlayer.color, BG_OPACITY),
        ],
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
  lines: LineDataType,
  updatedPlayer: Player,
  players: Player[]
): LineDataType => {
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

export const updateBars = (bars: BarDataType, updatedPlayer: Player): BarDataType => {
  const index = bars.labels.findIndex((label) => label === updatedPlayer.name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = bars.datasets.map((dataset, i) => {
    const newData = [...dataset.data];
    newData[index] = i === 0 ? updatedPlayer.max : i === 1 ? updatedPlayer.avg : updatedPlayer.min;
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: bars.labels, // This spread is not necessary labels are not being mutated
    datasets: newDatasets,
  };
};

export const updatedonuts = (donuts: DonutDataType, updatedPlayer: Player): DonutDataType => {
  const index = donuts.labels.findIndex((label) => label === updatedPlayer.name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = donuts.datasets.map((dataset) => {
    const newData = [...dataset.data];
    newData[index] = updatedPlayer.victoryPtn;
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: [...donuts.labels], // This spread is not necessary labels are not being mutated
    datasets: newDatasets,
  };
};

// HELPERS FUNCTIONS FOR RESET_PLAYER
//--
export const resetPlayersStats = (players: Player[], id: Player["id"]) => {
  const rsPlayers = players.map((player) => {
    return player.id === id ? resetPlayerStats(player) : player;
  });
  const index = rsPlayers.findIndex((player) => player.id === id);
  if (index === -1) throw new Error(errorMsg);
  return {
    rsPlayer: rsPlayers[index],
    rsPlayers: rsPlayers,
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

export const resetLine = (
  lines: LineDataType,
  name: Player["name"],
  players: Player[]
): LineDataType => {
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

export const resetBar = (bars: BarDataType, name: Player["name"]): BarDataType => {
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

export const resetdonut = (donuts: DonutDataType, name: Player["name"]): DonutDataType => {
  const index = donuts.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = donuts.datasets.map((dataset) => {
    const newData = [...dataset.data];
    newData[index] = 0;
    return {
      ...dataset,
      data: newData,
    };
  });
  return {
    labels: donuts.labels,
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

export const removeLine = (lines: LineDataType, name: Player["name"]): LineDataType => {
  const newDatasets = lines.datasets.filter((dataset) => dataset.label !== name);
  if (newDatasets.length === 0) throw new Error(errorMsg);
  return {
    labels: [...lines.labels],
    datasets: newDatasets,
  };
};

export const removeBar = (bars: BarDataType, name: Player["name"]): BarDataType => {
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

export const removedonut = (donuts: DonutDataType, name: Player["name"]): DonutDataType => {
  const index = donuts.labels.findIndex((label) => label === name);
  if (index === -1) throw new Error(errorMsg);
  const newDatasets = donuts.datasets.map((dataset) => {
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
    labels: donuts.labels.filter((label) => label !== name),
    datasets: newDatasets,
  };
};

type ResetStates = {
  players: Player[];
  lines: LineDataType;
  bars: BarDataType;
  donuts: DonutDataType;
};
// RESET ALL STATES (PLAYERS, LINES, BARS, donutS)
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
    donuts: {
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
