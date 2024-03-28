import { Component, Input } from '@angular/core';
import { ISideBarOptions } from '../sidebar/constant';
import { MatchBuilderService } from '../../../services/match-builder.service';
import { IAddGroupOption } from '../competition-detail/constant';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html',
  styleUrl: './sidebar-view.component.scss',
})
export class SidebarViewComponent {
  @Input() activeCategory!: ISideBarOptions;
  selectedValue: null | {} = null;

  constructor(private matchBuilderService: MatchBuilderService) {}

  onAddGroup({ type, position, option, name }: IAddGroupOption) {
    const mapper = {
      home: this.matchBuilderService.homeAssets,
      group: this.matchBuilderService.groupAssets,
      away: this.matchBuilderService.awayAssets,
    };
    if (mapper[name]) {
      let data = { id: uuidv4(), name: 'test', position };
      mapper[name].next([...mapper[name].value, data]);
    }
  }
}
