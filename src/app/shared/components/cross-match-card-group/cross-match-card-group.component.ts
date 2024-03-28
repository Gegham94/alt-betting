import { Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
import { collapse, fadeInOut } from '../../animations/animations';

interface MyContext {
  $implicit: {
    share?: boolean;
    edit: boolean;
    expanded: boolean;
  };
}

@Component({
  selector: 'app-cross-match-card-group',
  templateUrl: './cross-match-card-group.component.html',
  styleUrl: './cross-match-card-group.component.scss',
  animations: [collapse, fadeInOut],
})
export class CrossMatchCardGroupComponent {
  @ContentChild('leftTemplate') leftTemplate!: TemplateRef<any>;
  @ContentChild('rightTemplate') rightTemplate!: TemplateRef<any>;
  @ContentChild('collapseTemplate') collapseTemplate!: TemplateRef<any>;
  @Input() typeGroup: 1 | 2 = 1;
  @Output() onSaveDraft: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveAll: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.popular')
  get getPopular() {
    return this.typeGroup === 2 && !this.expanded;
  }

  isOpen: boolean = false;
  expanded: boolean = false;
  isOpenRemoveModal: boolean = false;

  myContext: MyContext = {
    $implicit: {
      share: false,
      edit: false,
      expanded: false,
    },
  };

  onFooterIconsHandler(name: 'share' | 'edit') {
    this.myContext.$implicit[name] = !this.myContext.$implicit[name];
  }

  onTriggerModal(e: MouseEvent) {
    e.stopPropagation();
    this.isOpenRemoveModal = !this.isOpenRemoveModal;
  }

  onRemove(e: MouseEvent) {
    e.stopPropagation();
    this.isOpenRemoveModal = !this.isOpenRemoveModal;
    this.onRemoveAll.emit();
  }

  onExpend() {
    this.expanded = !this.expanded;
    this.myContext.$implicit.expanded = this.expanded;
  }
}
