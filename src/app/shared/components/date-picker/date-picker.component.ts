import {
  Input,
  Output,
  Renderer2,
  Component,
  ViewChild,
  ElementRef,
  forwardRef,
  TemplateRef,
  EventEmitter,
  HostListener,
  ViewContainerRef,
  ChangeDetectorRef, AfterViewInit, OnDestroy,
} from '@angular/core';
import {
  format,
  isAfter,
  addDays,
  subWeeks,
  isBefore,
  subMonths,
  isSameDay,
  addMonths,
  startOfWeek,
  startOfMonth,
  lastDayOfWeek,
  lastDayOfMonth,
  eachDayOfInterval,
} from 'date-fns';
import { collapse } from '../../animations/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { findParentScrollContainer } from '../../../helpers/utils';

const NUMERIC_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  animations: [collapse],
  providers: [NUMERIC_INPUT_VALUE_ACCESSOR],
})
export class DatePickerComponent implements ControlValueAccessor,AfterViewInit,OnDestroy {
  @Input() placeholder = '';
  @Input() disabled: boolean = false;
  @Input() disabledAfter?: Date | null = null;
  @Input() disabledBefore?: Date | null = null;
  @Input() autoClose: boolean = true;
  @Input() formatDate: string = 'yyyy-MM-dd';
  @Input() currentDate: Date = new Date();
  @Input() inputDate: Date | null = null;
  @ViewChild('datepicker') datepicker!: ElementRef;
  @ViewChild('inputWrapperRef') inputWrapperRef!: ElementRef;
  @ViewChild('datePickerTemplate') datePickerTemplate!: TemplateRef<any>;
  @Output() dateSelected = new EventEmitter<Date>();

  isOpen = false;
  viewRef: any;
  foundedParentScrollContainer: null | HTMLElement = null;


  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:resize')
  onWindowResize() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  getDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!this.datepicker.nativeElement.contains(target) && this.isOpen) {
      this.closeDatepicker();
      this.viewRef?.destroy();
    }
  }

  private onChangeCallback: (_: any) => void = () => {};
  public onTouchedCallback: () => void = () => {};

  writeValue(value: any): void {
    this.inputDate = value;
    if (!!value) {
      this.currentDate = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  detectPositionDropDown() {
    const dropDown = this?.viewRef?.rootNodes?.[1];
    if (!!dropDown) {
      const inputRect = this.inputWrapperRef.nativeElement.getBoundingClientRect();
      if (inputRect.bottom + 260 > window.innerHeight) {
        dropDown.style.top = inputRect.top - 260 + 'px';
      } else {
        dropDown.style.top = inputRect.bottom + 'px';
      }
      dropDown.style.width = inputRect.width + 'px';
      dropDown.style.left = inputRect.left - dropDown.getBoundingClientRect().width / 2 + inputRect.width / 2 + 'px';
    }
  }


  getDaysInMonth(): Date[] {
    const startMonth = startOfMonth(this.currentDate);
    const lastMonth = lastDayOfMonth(this.currentDate);
    let start = addDays(startOfWeek(startMonth), 1);
    let end = addDays(lastDayOfWeek(lastMonth), 1);
    if (startMonth.getDay() === 0) {
      start = subWeeks(start, 1);
    }
    if (lastMonth.getDay() === 0) {
      end = subWeeks(end, 1);
    }
    return eachDayOfInterval({ start, end });
  }

  getMonthYearLabel(): string {
    return format(this.currentDate, 'MMMM yyyy');
  }

  toggleDatepicker(e: MouseEvent): void {
    // e.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.datePickerTemplate);
      this.viewRef.detectChanges();
      this.detectPositionDropDown()
      this.renderer.appendChild(document.body, this.viewRef.rootNodes[0]);
    } else {
      this.viewRef?.destroy();
    }
  }

  closeDatepicker(): void {
    this.isOpen = false;
  }

  onDateSelected(e: MouseEvent, date: Date): void {
    if (this.disabledDates(date)) {
      e.stopPropagation();
      return;
    }
    this.currentDate = date;
    this.inputDate = date;
    this.dateSelected.emit(date);
    this.onChangeCallback(date);
    this.autoClose && this.closeDatepicker();
  }

  incrementMonth(e: MouseEvent): void {
    e.stopPropagation();
    this.currentDate = addMonths(this.currentDate, 1);
  }
  decrementMonth(e: MouseEvent): void {
    e.stopPropagation();
    this.currentDate = subMonths(this.currentDate, 1);
  }

  disabledDates(day: Date): boolean {
    if (!!this.disabledBefore && !!this.disabledAfter) {
      return !(isSameDay(this.disabledAfter, day) || isSameDay(this.disabledBefore, day));
    } else if (!!this.disabledAfter) {
      return isAfter(this.disabledAfter, day) || isSameDay(this.disabledAfter, day);
    } else if (!!this.disabledBefore) {
      return isBefore(this.disabledBefore, day) || isSameDay(this.disabledBefore, day);
    }
    return false;
  }

  ngAfterViewInit() {
    this.foundedParentScrollContainer = findParentScrollContainer(this.datepicker.nativeElement);
    if (!!this.foundedParentScrollContainer) {
      this.foundedParentScrollContainer.addEventListener('scroll', this.detectPositionDropDown.bind(this));
    }
  }

  ngOnDestroy() {
    if(this.foundedParentScrollContainer){
      this.foundedParentScrollContainer.removeEventListener('scroll',this.detectPositionDropDown)
    }
  }


  protected readonly format = format;
  protected readonly isSameDay = isSameDay;
}
