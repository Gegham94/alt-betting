import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { collapse } from '../../../shared/animations/animations';
import { IRegionDetailOption } from './constant';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrl: './region-detail.component.scss',
  animations: [collapse],
})
export class RegionDetailComponent {
  @ContentChild(TemplateRef) contentChild!: TemplateRef<any>;
  @Input() option: IRegionDetailOption = {
    srcImage: 'assets/images/am.png',
    label: 'Armenian Prem League 1231312312312312',
    icon: 'gb-football',
    iconColor: '#AAAAAA',
  };
  @Input() startSelected: boolean = false;
  @Output() handleStar: EventEmitter<any> = new EventEmitter<any>();

  public isOpen: boolean = false;

  handleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  handleStarClick(event: MouseEvent) {
    event.stopPropagation();
    this.handleStar.emit();
  }
}
