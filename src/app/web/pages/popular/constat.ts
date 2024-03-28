export interface IPopularTab {
  id: number;
  name: string;
}

export const POPULAR_TABS: IPopularTab[] = [
  { id: 1, name: 'Most Created' },
  { id: 2, name: 'Upcoming'},
  { id: 3, name: 'Group Winner' },
];


export interface IPopularFilter {
  id: number;
  name?: string;
  value: string;
}

export const POPULAR_FILTER: IPopularFilter[] = [
  { id: 1, value:'favorite' },
  { id: 2, name: 'All', value:'all' },
  { id: 3, name: 'Match', value:'match' },
  { id: 4, name: 'Totals', value:'totals' },
  { id: 5, name: 'First Half', value:'first_half' },
  { id: 6, name: 'Second Half', value:'second_half' },
  { id: 7, name: 'Players', value:'players' },
];
