import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetslipService {
  isOpenBetSlip: boolean = false;
  quickBetChecked: boolean = false;
  quickBetStake: string = '';
  quickBetOdds: boolean = false;

  constructor() {}
}
