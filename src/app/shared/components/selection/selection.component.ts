import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fixDecimalPlaces } from '../../../helpers/utils';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input() isColumn: boolean = false;

  @Input() hideTitle: boolean = false;
  @Input() title: string = '';

  @Input() isSelectedYes: boolean = false;
  @Input() isSelectedNo: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  onChangeHandler(value: number) {
    if (value === 0) {
      this.isSelectedYes = !this.isSelectedYes;
      this.onChange.emit({ value, isSelected: this.isSelectedYes });
    } else {
      this.isSelectedNo = !this.isSelectedNo;
      this.onChange.emit({ value, isSelected: this.isSelectedNo });
    }
  }


  protected readonly Number = Number;
  protected readonly fixDecimalPlaces = fixDecimalPlaces;
}
