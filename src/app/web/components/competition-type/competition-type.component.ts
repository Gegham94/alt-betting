import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { collapse } from '../../../shared/animations/animations';
import { ICompetitionTypeOption } from './constant';

@Component({
  selector: 'app-competition-type',
  templateUrl: './competition-type.component.html',
  styleUrl: './competition-type.component.scss',
  animations: [collapse],
})
export class CompetitionTypeComponent {
  @ContentChild(TemplateRef) contentChild!: TemplateRef<any>;
  @Input() option: ICompetitionTypeOption = {
    icon: 'gb-wincup',
    iconColor: '#4173CD',
    background: '#181818',
    label: 'Popular Competitions',
  };

  public isOpen: boolean = false;

  handleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
