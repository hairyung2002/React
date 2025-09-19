export interface FortuneData {
  fortune: string;
  score: number;
  luckyItems: {
    color: string;
    number: string;
    food: string;
    place: string;
    activity: string;
    item: string;
    direction: string;
    time: string;
  };
  date: string;
}

export interface FortuneHistory extends FortuneData {
  name: string;
  birthdate: string;
}