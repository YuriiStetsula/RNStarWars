export interface Person {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  planet: number;
  species: number[];
}

export interface People {
  count: number;
  next: string;
  previous: null | string;
  results?: {
    [key: string]: Person[];
  };
}
