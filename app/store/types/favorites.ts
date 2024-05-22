export enum FavoriteType {
  male = 1,
  female,
  other,
}

export interface Favorites {
  [FavoriteType.male]: number;
  [FavoriteType.female]: number;
  [FavoriteType.other]: number;
  ids: string[];
}
