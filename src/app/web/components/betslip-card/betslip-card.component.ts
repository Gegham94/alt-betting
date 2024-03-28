import { Component, Input } from '@angular/core';
import { blockNumbersChars } from '../../../helpers/utils';
import { animateBetButton, fadeInOut } from '../../../shared/animations/animations';

@Component({
  selector: 'app-betslip-card',
  templateUrl: './betslip-card.component.html',
  styleUrl: './betslip-card.component.scss',
  animations:[animateBetButton,fadeInOut]
})
export class BetslipCardComponent {
  @Input() variant: 1 | 2 = 1;
  stakeValue: string = '';
  blockChars: (event: KeyboardEvent) => void = blockNumbersChars;
}
