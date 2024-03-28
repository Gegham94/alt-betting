import { Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
import { collapse, fadeInOut } from '../../animations/animations';

@Component({
  selector: 'app-group-winner-card-group',
  templateUrl: './group-winner-card-group.component.html',
  styleUrl: './group-winner-card-group.component.scss',
  animations: [collapse, fadeInOut],
})
export class GroupWinnerCardGroupComponent {
  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<any>;
  @Input() footer: boolean = false;
  @Output() onSaveDraft: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveAll: EventEmitter<any> = new EventEmitter<any>();

  isOpen: boolean = false;
  isOpenRemoveModal: boolean = false;


  onTriggerModal(e: MouseEvent) {
    e.stopPropagation();
    this.isOpenRemoveModal = !this.isOpenRemoveModal;
  }

  onRemove(e: MouseEvent) {
    e.stopPropagation();
    this.isOpenRemoveModal = !this.isOpenRemoveModal;
    this.onRemoveAll.emit();
  }

}
