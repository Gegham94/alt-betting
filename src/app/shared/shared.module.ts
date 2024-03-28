import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as FromComponents from './components';

const shared: any[] = [
  FromComponents.ResultWidgetComponent,
  FromComponents.DatePickerComponent,
  FromComponents.SingleSelectComponent,
  FromComponents.MultiSelectComponent,
  FromComponents.MatchCardComponent,
  FromComponents.CrossMatchCardGroupComponent,
  FromComponents.MarketGroupCollapseComponent,
  FromComponents.SelectionComponent,
  FromComponents.CheckboxComponent,
  FromComponents.GroupWinnerCardComponent,
  FromComponents.GroupWinnerCardGroupComponent,
];
@NgModule({
  declarations: shared,
  imports: [FormsModule, CommonModule, NgOptimizedImage, ReactiveFormsModule],
  exports: shared,
})
export class SharedModule {}
