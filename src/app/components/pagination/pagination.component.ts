import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() total: number;
  @Input() totalPages: number;
  @Input() isLoading: boolean;

  @Output() goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  pages() {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPage(page: number): void {
    this.goToPage.emit(page);
  }


}
