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
        datasets: newLineDatasets([...lines.datasets], newPlayer),
      };
      const newBars = {
        labels: [...bars.labels, newPlayer.name],
        datasets: newBarsDatasets([...bars.datasets], newPlayer),
      };
      const newPies = {
        labels: [...pies.labels, newPlayer.name],
        datasets: newPieDatasets([...pies.datasets], newPlayer),
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
  datasets.push({
    label: newPlayer.name,
    data: [...newPlayer.history],
    backgroundColor: newPlayer.color,
    borderColor: newPlayer.color,
  });

  return datasets;
};

const newBarsDatasets = (datasets: BarData["datasets"], newPlayer: Player) => {
  for (let i = 0; i < datasets.length; i++) {
    datasets[i].data.push(newPlayer.victoryPtn); // push a new max, min, avg
    datasets[i].borderColor.push(newPlayer.color);
    datasets[i].backgroundColor.push(addOpacityToHex(newPlayer.color, 0.8));
  }
  console.log(datasets);
  return datasets;
};

const newPieDatasets = (datasets: PieData["datasets"], player: Player) => {
  datasets[0].label = player.name;
  datasets[0].data.push(player.victoryPtn);
  datasets[0].backgroundColor.push(addOpacityToHex(player.color, 0.8));
  datasets[0].borderColor.push(player.color);

  return datasets;
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
  const { labels, datasets } = lines;
  const newLabels = [...labels];
  const temp = [...datasets];
  findMaxNbrTurns(players) > newLabels.length
    ? newLabels.push((newLabels.length + 1).toString())
    : newLabels;
  const i = temp.findIndex((d) => d.label === updatedPlayer.name);
  if (i == -1) throw new Error("Player in lines not found");
  temp[i].data.push(updatedPlayer.victoryPtn);
  return {
    labels: newLabels,
    datasets: temp,
  };
};

const updateBars = (bars: BarData, updatedPlayer: Player): BarData => {
  const { labels, datasets } = bars;
  const temp = [...datasets];
  const i = labels.findIndex((l) => l === updatedPlayer.name);
  if (i == -1) throw new Error("Player in bars not found");
  temp[0].data[i] = updatedPlayer.max;
  temp[1].data[i] = updatedPlayer.min;
  temp[2].data[i] = updatedPlayer.avg;
  return {
    labels: labels,
    datasets: temp,
  };
};

const updatePies = (pies: PieData, updatedPlayer: Player): PieData => {
  const { labels, datasets } = pies;
  const temp = [...datasets];
  const i = labels.findIndex((l) => l === updatedPlayer.name);
  if (i == -1) throw new Error("Player in pies not found");
  temp[0].data[i] = updatedPlayer.victoryPtn;
  return {
    labels: labels,
    datasets: temp,
  };
};
