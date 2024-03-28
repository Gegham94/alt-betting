export interface IMyGamesTab {
  id: number;
  name: string;
}

export const MY_GAMES_TABS: IMyGamesTab[] = [
  { id: 1, name: 'Cross Match' },
  { id: 2, name: 'Group Winner' },
];


export interface IMyGamesFilter {
  id: number;
  name?: string;
  value: string;
}

export const MY_GAMES_FILTER: IMyGamesFilter[] = [
  { id: 1, value:'favorite' },
  { id: 2, name: 'All', value:'all' },
  { id: 3, name: 'Match', value:'match' },
  { id: 4, name: 'Totals', value:'totals' },
  { id: 5, name: 'First Half', value:'first_half' },
  { id: 6, name: 'Second Half', value:'second_half' },
  { id: 7, name: 'Players', value:'players' },
];
