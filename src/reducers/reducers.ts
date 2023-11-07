import { BarData, LineData, PieData, Player } from "../App";
import { playerColors } from "../components/icons/data";
import { addOpacityToHex, findMaxNbrTurns, getRandomColor } from "../utils";

type PlayerAction =
  | { type: "ADD_PLAYER"; payload: { name: Player["name"]; startScore: number } }
  | { type: "REMOVE_PLAYER"; payload: { id: Player["id"] } }
  | { type: "RESET_SCORE"; payload: Player["id"] }
  | { type: "UPDATE_SCORE"; payload: { id: Player["id"]; newScore: number } };

export const playersReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  const { type, payload } = action;
  const { players, lines, bars, pies } = state;
  switch (type) {
    case "ADD_PLAYER": {
      const { name, startScore } = payload;
      const newPlayer: Player = buildBaseStats(name, startScore, players.length /*id*/);
      const newLines = {
        labels: [...lines.labels],
        datasets: [...newLineDatasets([...lines.datasets], newPlayer)],
      };
      const newBars = {
        labels: [...bars.labels, newPlayer.name],
        datasets: [...newBarsDatasets([...bars.datasets], newPlayer)],
      };
      const newPies = {
        labels: [...pies.labels, newPlayer.name],
        datasets: [...newPieDatasets([...pies.datasets], newPlayer)],
      };
      return {
        ...state,
        players: [...players, newPlayer],
        lines: newLines,
        bars: newBars,
        pies: newPies,
      };
    }

    case "REMOVE_PLAYER": {
      const { id } = payload;
      const newPlayers = players.filter((player) => player.id !== id);
      return { ...state, players: newPlayers };
    }

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
      const { updatedPlayer, updatedPlayers } = updatePlayersStats(players, newScore, id);
      const updatedLines = updateLines(lines, updatedPlayer, updatedPlayers);
      const updatedBars = updateBars(bars, updatedPlayer);
      const updatedPies = updatePies(pies, updatedPlayer);

      return {
        ...state,
        players: updatedPlayers,
        lines: updatedLines,
        bars: updatedBars,
        pies: updatedPies,
      };
    }

    default:
      return state;
  }
};

type PlayerState = {
  players: Player[];
  lines: LineData;
  bars: BarData;
  pies: PieData;
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

const newLineDatasets = (datasets: LineData["datasets"], newPlayer: Player) => {
  return [
    ...datasets,
    {
      label: newPlayer.name,
      data: [...newPlayer.history],
      backgroundColor: newPlayer.color,
      borderColor: newPlayer.color,
    },
  ];
};
const newBarsDatasets = (datasets: BarData["datasets"], newPlayer: Player) => {
  const clonedDatasets = datasets.map((dataset) => ({
    ...dataset,
    data: [...dataset.data, newPlayer.victoryPtn], // Add new data to a cloned array
    borderColor: [...dataset.borderColor, newPlayer.color],
    backgroundColor: [...dataset.backgroundColor, addOpacityToHex(newPlayer.color, 0.8)],
  }));
  return clonedDatasets;
};

const newPieDatasets = (datasets: PieData["datasets"], newPlayer: Player) => {
  return [
    {
      ...datasets[0],
      data: [...datasets[0].data, newPlayer.victoryPtn],
      backgroundColor: [...datasets[0].backgroundColor, addOpacityToHex(newPlayer.color, 0.8)],
      borderColor: [...datasets[0].borderColor, newPlayer.color],
    },
  ];
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
