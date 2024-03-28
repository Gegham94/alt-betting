import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ICompetitionOption } from './constant';
import { collapse } from '../../../shared/animations/animations';


@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss',
  animations: [collapse],
})
export class CompetitionComponent {
  @ContentChild(TemplateRef) contentChild!: TemplateRef<any>;
  @Input() option: ICompetitionOption = {
    icon: 'gb-football',
    label: 'Football',
    iconColor: '#079B77',
    background: '#55b86b33',
  };

  isOpen: boolean = false;

  handleIsOpen(e:Event) {
    this.isOpen = !this.isOpen;
  }

}
