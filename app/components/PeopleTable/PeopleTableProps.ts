export interface PeopleTableProps {
  onRowPress: () => void;
  onFavoritePress: ({name, gender}: {name: string; gender: string}) => void;
  people:
    | {
        name: string;
        checked: boolean;
        birthYear: string;
        gender: string;
        homeWorld: string;
        species?: string;
      }[]
    | undefined;
}
