export interface PeopleTableProps {
  onPress: () => void;
  people: {
    name: string;
    birthYear: string;
    gender: string;
    homeWorld: string;
    species?: string;
  }[];
}
