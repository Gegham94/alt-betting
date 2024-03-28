import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { IRegionOption } from './constant';
import { collapse } from '../../../shared/animations/animations';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss',
  animations: [collapse],
})
export class RegionComponent {
  @ContentChild(TemplateRef) contentChild!: TemplateRef<any>;
  @Input() option: IRegionOption = {
    srcImage: 'assets/images/am.png',
    label: 'Football',
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
