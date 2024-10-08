import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() currentPage = 1;
  @Input() totalCount!:number;
  @Input() pageSize!:number;
  totalPages!:number;
  @Output() pageChanged = new EventEmitter<number>();

  onPageClick(page: number): void {
    this.pageChanged.emit(page);
  }

  generateNumberArray(num: number) {
    const pageArray = [];
    this.totalPages = Math.ceil(num / this.pageSize)
    for (let i = 1; i <= this.totalPages ; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

}
