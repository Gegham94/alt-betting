import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { collapse } from '../../../shared/animations/animations';
import { IAddGroupOption, IIsOpenState, IName } from './constant';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrl: './competition-detail.component.scss',
  animations: [collapse],
})
export class CompetitionDetailComponent {
  @ContentChild(TemplateRef) contentChild!: TemplateRef<any>;
  @ViewChild('competitionDetailTop') competitionDetailTop!: ElementRef<HTMLDivElement>;
  @Output() onAddGroup: EventEmitter<IAddGroupOption> = new EventEmitter<IAddGroupOption>();

  showMore: boolean = false;
  isOpenState: IIsOpenState = null;

  @HostListener('document:click', ['$event'])
  getDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!this.competitionDetailTop.nativeElement.contains(target) && this.isOpenState !== null) {
      this.isOpenState = null;
    }
  }

  handleShowMore() {
    this.showMore = !this.showMore;
  }

  onChangeIsOpen(e: MouseEvent, key: IIsOpenState) {
    e.stopPropagation();
    this.isOpenState = key;
  }

  onDetectType(e:MouseEvent,name: IName) {
    const typeMap = { home: 1, group: 2, away: 3 };
    // TODO add option when have backend
    const data = { type: typeMap[name], name, option: '',position:this.isOpenState };
    this.onAddGroup.emit(data);
  }
}
