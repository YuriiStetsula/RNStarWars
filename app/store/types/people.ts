export interface Person {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeWorld: string;
  species: string[];
}

export interface PeopleInitialState {
  count: number;
  next: string;
  previous: null | string;
  results?: Person[];
}
