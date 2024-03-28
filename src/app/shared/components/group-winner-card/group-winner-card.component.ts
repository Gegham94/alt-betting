import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-group-winner-card',
  templateUrl: './group-winner-card.component.html',
  styleUrl: './group-winner-card.component.scss'
})
export class GroupWinnerCardComponent {
  @Input() isLive: boolean = false;
  @Input() isEditMood: boolean = false;
  @Input() disabledTeamPosition?: 'top' | 'bottom' | null;
  @Output() onCastling: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

}
