import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { findParentScrollContainer } from '../../../helpers/utils';

const NUMERIC_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleSelectComponent),
  multi: true,
};
@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
  providers: [NUMERIC_INPUT_VALUE_ACCESSOR],
})
export class SingleSelectComponent implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  @Input() options: any[] = [];
  @Input() keyName: string = 'id';
  @Input() labelName: string = 'name';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() deleteBtn: boolean = true;
  @Input() returnOnlyKeyName: boolean = false;
  @Input() value: any = null;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  // default params
  @Input() isSearchable: boolean = false;
  @Input() searchName: string = 'name';
  @Input() searchType: 'indexOf' | 'includes' = 'indexOf';
  // for search
  @ViewChild('singleSelect') singleSelect!: ElementRef;
  @ViewChild('selectLabel') selectLabel!: ElementRef;
  @ViewChild('dropDownTemplate') dropDownTemplate!: TemplateRef<any>;

  viewRef: any;
  isOpen: boolean = false;
  searchValue: string = '';
  selectedOption: any = null;
  foundedParentScrollContainer: null | HTMLElement = null;

  get OPTIONS(): any[] {
    if (this.searchType === 'indexOf') {
      return this.searchValue === ''
        ? this.options
        : this.options.filter(
            (option) => option?.[this.searchName]?.toLowerCase().indexOf(this.searchValue.toLowerCase()) === 0,
          );
    } else {
      return this.options.filter((option) => option?.[this.searchName].includes(this.searchValue));
    }
  }

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
    if (!this.singleSelect.nativeElement.contains(target) && this.isOpen) {
      this.isOpen = false;
      this.viewRef?.destroy();
    }
  }
  propagateChange = (_: any) => {};
  propagateTouch = () => {};

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      if (this.returnOnlyKeyName) {
        this.selectedOption = this.options.find((el) => el?.[this.keyName] === value);
      } else {
        this.selectedOption = value;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  detectPositionDropDown() {
    const dropDown = this?.viewRef?.rootNodes?.[1];
    if (!!dropDown) {
      const rect = this.singleSelect.nativeElement.getBoundingClientRect();
      const rectDropDown = dropDown.getBoundingClientRect();

      rect.bottom + rectDropDown.height > window.innerHeight
        ? (dropDown.style.top = rect.top - rectDropDown.height + 'px')
        : (dropDown.style.top = rect.bottom + 'px');

      dropDown.style.left = rect.left + 'px';
      dropDown.style.width = rect.width + 'px';
    }
  }

  toggleDropdown(e: MouseEvent): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchValue = '';
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.dropDownTemplate);
      this.viewRef.detectChanges();
      this.detectPositionDropDown();
      this.renderer.appendChild(document.body, this.viewRef.rootNodes[0]);
    } else {
      this.viewRef.destroy();
    }
  }

  selectOption(e: MouseEvent, option: any): void {
    e.stopPropagation();
    this.isOpen = false;
    this.propagateChange(this.returnOnlyKeyName ? option?.[this.keyName] : option);
    this.valueChange.emit(this.returnOnlyKeyName ? option?.[this.keyName] : option);
  }

  handleSearch(e: Event) {
    this.searchValue = (e.target as HTMLInputElement).value;
  }

  handleDelete(e: MouseEvent) {
    e.stopPropagation();
    this.propagateChange(null);
    this.valueChange.emit(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      const selectedOptionValue = changes['value']?.currentValue;
      if (this.returnOnlyKeyName) {
        this.selectedOption = this.options.find((el) => el?.[this.keyName] === selectedOptionValue);
      } else {
        this.selectedOption = selectedOptionValue;
      }
    }
  }

  ngAfterViewInit() {
    this.foundedParentScrollContainer = findParentScrollContainer(this.singleSelect.nativeElement);
    if (!!this.foundedParentScrollContainer) {
      this.foundedParentScrollContainer.addEventListener('scroll', this.detectPositionDropDown.bind(this));
    }
  }

  ngOnDestroy() {
    if(this.foundedParentScrollContainer){
      this.foundedParentScrollContainer.removeEventListener('scroll',this.detectPositionDropDown)
    }
  }
}
