export interface PeopleTableProps {
  onRowPress: () => void;
  people:
    | {
        name: string;
        birthYear: string;
        gender: string;
        homeWorld: string;
        species?: string;
      }[]
    | undefined;
}
