import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { IItemPerPageOption, ITEM_PER_PAGE_OPTIONS } from './constat';

@Component({
  selector: 'app-my-bets-table',
  templateUrl: './my-bets-table.component.html',
  styleUrl: './my-bets-table.component.scss',
})
export class MyBetsTableComponent {
  itemPerPagesOptions: IItemPerPageOption[] = ITEM_PER_PAGE_OPTIONS;
  /** Table **/
  @ContentChild('thead') thead!: TemplateRef<any>;
  @ContentChild('tbody') tbody!: TemplateRef<any>;

  // remove this tableData
  @Input() tableData: any[] = [];

  /** Pagination **/
  @Input() currentPage: number = 1;
  @Input() pageShowCounts: number = 3;
  @Output() onChangePage: EventEmitter<any> = new EventEmitter<any>();
  /** Per Page **/
  @Output() onChangeItemPerPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() itemPerPage: number = this.itemPerPagesOptions[0].value;

  getPages(): number[] {
    const pageCount = this.getTotalPagesCount();
    const pageCountArr = Array.from({ length: pageCount }, (_, i) => i + 1);
    const slicedPages = pageCountArr.slice(this.currentPage, this.currentPage + this.pageShowCounts);

    if (pageCount === 1) {
      return [pageCount];
    }

    if (this.currentPage === 1) {
      return [this.currentPage, ...slicedPages.slice(0, -1), pageCount];
    }

    if (this.currentPage + this.pageShowCounts >= pageCount) {
      const pages = Array.from({ length: this.pageShowCounts + 2 }, (_, i) => pageCount - i).reverse();
      return pages.filter((page: number) => page > 0);
    }

    return [this.currentPage - 1, this.currentPage, ...slicedPages.slice(0, -2), pageCount];
  }

  getTotalPagesCount() {
    let pages = Math.ceil(this.tableData.length / this.itemPerPage);
    return pages < 1 ? 1 : pages;
  }

  setPage(page: number) {
    const pageCount = this.getTotalPagesCount();
    if (page <= pageCount && page >= 1) {
      this.onChangePage.emit(page);
    }
  }

  onChangeItemPerPageHandler(option:any){
    this.currentPage = 1;
    this.onChangeItemPerPage.emit(option)
  }
}
