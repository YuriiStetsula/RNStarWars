export interface PeopleResponse {
  count: number;
  next: string;
  previous: null | string;
  results: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    species: string[];
  }[];
}
