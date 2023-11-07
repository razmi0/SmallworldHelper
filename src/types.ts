export type Player = {
  id: number;
  name: string;
  victoryPtn: number;
  history: number[];
  addedScores: number[];
  rankChange: number;
  color: string;
  max: number;
  min: number;
  avg: number;
  sum: number;
};

export type LineData = {
  labels: string[]; // x-axis & ...turns
  datasets: {
    label: string; // player name
    data: number[]; // history
    backgroundColor: string; // player color
    borderColor: string; // player color with opacity
  }[];
};

export type BarData = {
  labels: string[]; // x-axis & players name
  datasets: {
    label: string; // maxscore, minscore, average
    data: number[]; // treated data from Player['addedScores'] [fn maxscoredata, fn minscoredata, fn average data]
    backgroundColor: string[]; // player color with opacity
    borderColor: string[]; // player color
    borderWidth: number;
  }[];
};

export type PieData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};
