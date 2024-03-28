import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TypeSwitcher = 'default' | 'switch';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() type: TypeSwitcher = 'default';
  @Input() label: string = '';
  @Input() size: number = 24;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.switcher')
  get addSwitchClass() {
    return this.type === 'switch';
  }

  @HostBinding('style.--size') get getSize() {
    return this.size + 'px';
  }

  onChangeHandler: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChangeHandler = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.checked = value;
  }

  onCheckboxChange(event: any): void {
    this.checked = event.target.checked;
    this.onChangeHandler(this.checked);
    this.onTouch();
    this.checkedChange.emit(event.target.checked);
  }
}
