export type IIsOpenState = 'top' | 'bottom' | 'both' | null;
export type IName = 'home' | 'group' | 'away';


export interface IAddGroupOption {
  type:number,
  name:IName,
  position: IIsOpenState,
  option?:any,
}
