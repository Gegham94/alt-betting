export interface IHeaderOptionWeb {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  link: string;
}
export const HEADER_OPTIONS_WEB: IHeaderOptionWeb[] = [
  { id: 1, name: 'Match Builder', link: '/1/match-builder' },
  { id: 2, name: 'Popular', link: '/1/popular' },
  { id: 3, name: 'My Games', link: '/1/my-games' },
  { id: 4, name: 'My Bets', link: '/1/my-bets' },
  { id: 5, name: 'Results', link: '//1/results' },
];
