import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { collapse } from '../../animations/animations';

@Component({
  selector: 'app-market-group-collapse',
  templateUrl: './market-group-collapse.component.html',
  styleUrl: './market-group-collapse.component.scss',
  animations: [collapse],
})
export class MarketGroupCollapseComponent {
  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<any>;
  @Input() title: string = '';

  @Input() isFavorite: boolean = false;
  @Output() onChangeFavorite: EventEmitter<any> = new EventEmitter<any>();
  isOpen: boolean = false;

  onChangeFavoriteHandler(e: MouseEvent) {
    e.stopPropagation();
    this.onChangeFavorite.emit(this.isFavorite);
  }
}
