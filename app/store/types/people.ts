export interface Person {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  planet?: string;
  species?: (string | undefined)[];
}

export interface People {
  count: number;
  next: string;
  previous: null | string;
  results?: {
    [key: string]: Person[];
  };
}
