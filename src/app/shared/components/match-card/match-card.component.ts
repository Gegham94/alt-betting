import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.scss',
})
export class MatchCardComponent {
  @Input() typeCard: 1 | 2 = 1;
  @Input() isLive: boolean = false;
  @Input() dir: 'rtl' | 'ltr' = 'ltr';
  @Input() isEditMood: boolean = false;
  @Input() disabledTeamPosition?: 'top' | 'bottom' | null;
  @Output() onCastling: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.popular')
  get getPopular(){
    return this.typeCard === 2
  }
}
