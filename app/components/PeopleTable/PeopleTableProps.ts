export interface PeopleTableProps {
  people: {
    name: string;
    birthYear: string;
    gender: string;
    homeWorld: string;
    species?: string;
  }[];
}
