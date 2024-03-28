import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

function HostBinding(mobile1: string) {}

@Component({
  selector: 'app-result-widget',
  templateUrl: './result-widget.component.html',
  styleUrl: './result-widget.component.scss',
})
export class ResultWidgetComponent implements AfterViewInit {
  @Input() percent: number = 0;
  @Input() name: string = '';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() coefficient: string | number = '1.00';
  @Input() showPercent: boolean = true;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) {}
  ngAfterViewInit() {
    this.renderer.addClass(this.elRef.nativeElement, this.color);
  }
}
