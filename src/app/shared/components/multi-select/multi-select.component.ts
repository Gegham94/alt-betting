import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
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
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true,
};
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [NUMERIC_INPUT_VALUE_ACCESSOR],
})
export class MultiSelectComponent implements ControlValueAccessor, OnChanges,AfterViewInit,OnDestroy {
  @Input() values: any = null;
  @Output() valuesChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() options: any[] = [];
  @Input() keyName: string = 'id';
  @Input() placeholder: string = '';
  @Input() labelName: string = 'name';
  @Input() disabled: boolean = false;
  @Input() returnOnlyKeyName: boolean = false;
  // default params
  @Input() isSearchable: boolean = false;
  @Input() searchName: string = 'name';
  @Input() searchType: 'indexOf' | 'includes' = 'indexOf';
  // for search
  @Input() badgesLength: number = 2;

  @ViewChild('selectLabel') selectLabel!: ElementRef<HTMLInputElement>;
  @ViewChild('multiSelect') multiSelect!: ElementRef;
  @ViewChild('dropDownTemplate') dropDownTemplate!: TemplateRef<any>;

  viewRef: any;
  isOpen: boolean = false;
  searchValue: string = '';
  selectedOptions: any[] = [];
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
    private cdr: ChangeDetectorRef,
  ) {}

  @HostListener('window:resize')
  onWindowResize() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  getClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!this.multiSelect.nativeElement.contains(target) && this.isOpen) {
      this.isOpen = false;
      this.viewRef?.destroy();
    }
  }


  isChecked(option: any): boolean {
    return this.selectedOptions.find((el) => el[this.keyName] === option[this.keyName]);
  }

  propagateChange = (_: any) => {};
  propagateTouch = () => {};

  writeValue(value: any[]): void {
    if (Array.isArray(value)) {
      if (this.returnOnlyKeyName) {
        this.selectedOptions = this.options.filter((el) => value.includes(el?.[this.keyName]));
      } else {
        this.selectedOptions = value;
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
      const rect = this.multiSelect.nativeElement.getBoundingClientRect();
      const rectDropDown = dropDown.getBoundingClientRect();

      rect.bottom + rectDropDown.height > window.innerHeight
        ? (dropDown.style.top = rect.top - rectDropDown.height + 'px')
        : (dropDown.style.top = rect.bottom + 'px');

      dropDown.style.left = rect.left + 'px';
      dropDown.style.width = rect.width + 'px';
    }
  }

  toggleDropdown(e: MouseEvent): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.searchValue = '';
      if (this.isSearchable) {
        this.cdr.detectChanges();
        this.selectLabel?.nativeElement?.focus();
      }
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.dropDownTemplate);
      this.viewRef.detectChanges();
      this.detectPositionDropDown()
      this.renderer.appendChild(document.body, this.viewRef.rootNodes[0]);
    } else {
      this.viewRef.destroy();
    }
  }

  selectOption(e: MouseEvent, option: any): void {
    e.stopPropagation();
    this.changeOutedValues(option);
  }

  handleSearch(e: Event) {
    this.searchValue = (e.target as HTMLInputElement).value;
  }

  handleDeleteBadge(e: Event, option: any) {
    e.stopPropagation();
    if (this.disabled) return;
    this.selectedOptions = this.selectedOptions.filter((opt) => opt?.[this.keyName] !== option?.[this.keyName]);
    this.changeOutedValues(option);
  }

  changeOutedValues(option: any) {
    if (this.returnOnlyKeyName) {
      const foundedIndex = this.values.findIndex((key: number) => key === option[this.keyName]);
      if (foundedIndex === -1) {
        // add
        this.valuesChange.emit([...this.values, option[this.keyName]]);
        this.propagateChange([...this.values, option[this.keyName]]);
      } else {
        // delete
        this.values.splice(foundedIndex, 1);
        this.valuesChange.emit([...this.values]);
        this.propagateChange([...this.values]);
      }
    } else {
      const foundedIndex = this.values.findIndex((opt: any) => opt[this.keyName] === option[this.keyName]);
      if (foundedIndex === -1) {
        // add
        this.valuesChange.emit([...this.values, option]);
        this.propagateChange([...this.values, option]);
      } else {
        // delete
        this.values.splice(foundedIndex, 1);
        this.valuesChange.emit([...this.values]);
        this.propagateChange([...this.values]);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('values' in changes) {
      const selectedOptionValue = changes['values']?.currentValue;
      if (this.returnOnlyKeyName) {
        this.selectedOptions = this.options.filter((opt) => selectedOptionValue.includes(opt[this.keyName]));
      } else {
        this.selectedOptions = selectedOptionValue;
      }
    }
  }

  ngAfterViewInit() {
    this.foundedParentScrollContainer = findParentScrollContainer(this.multiSelect.nativeElement);
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
