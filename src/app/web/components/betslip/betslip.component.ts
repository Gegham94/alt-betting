import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { collapse } from '../../../shared/animations/animations';
import { BetslipService } from '../../../services/betslip.service';
import { blockNumbersChars } from '../../../helpers/utils';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrl: './betslip.component.scss',
  animations: [collapse],
})
export class BetslipComponent {
  @ContentChild(TemplateRef) cardsRef!: TemplateRef<any>;
  @Input() isOpen: boolean = false;
  @Output() onChangeIsOpen: EventEmitter<any> = new EventEmitter<any>();

  isOpenQuickBet: boolean = false;
  blockChars: (event: KeyboardEvent) => void = blockNumbersChars;


  constructor(public betslipService: BetslipService) {}

  onClickHeaderOptions(e: MouseEvent, type: 'betslip' | 'open_bets') {
    if (!this.isOpen) return;
    e.stopPropagation();
  }

  handleAnimationDone(e:any){
    if(e.toState === 'void'){
      this.isOpenQuickBet = false;
    }
  }

}
