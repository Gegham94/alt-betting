import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';

interface IFormGroup {
  betId: null | number;
  betType: null | number;
  matchType: any[] | [];
  state: null | number;
  from: Date | null;
  to: Date | null;
}

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrl: './my-bets.component.scss',
})
export class MyBetsComponent implements OnInit {
  form = this.fb.group<IFormGroup>({
    betId: null,
    betType: null,
    matchType: [[]],
    state: null,
    from: null,
    to: null,
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const { from, to } = this.form.value;
    console.log(this.form.value);
  }

  // testing data
  tableData: any[] = [];
  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.tableData.push({
        id: i, name: `Item ${i}`
      });
    }
  }

  currentPage = 1;
  itemPerPage:number = 10
  onChangeItemPerPage(page: number) {
    this.itemPerPage = page;
  }

  onChangePage(page:any){
    this.currentPage = page
  }
}
