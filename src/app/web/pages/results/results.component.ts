import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface IFormGroup {
  betId: null | number;
  betType: null | number;
  state: null | number;
  from: Date | null;
  to: Date | null;
  withLineups:boolean,
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  form = this.fb.group<IFormGroup>({
    betId: null,
    betType: null,
    state: null,
    from: null,
    to: null,
    withLineups: false,
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.form.value);
  }
}
