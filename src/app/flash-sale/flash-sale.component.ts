import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-flash-sale',
  standalone: false,
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.css'] // Sửa lại từ "styleUrl" thành "styleUrls"
})
export class FlashSaleComponent implements OnInit {

  books: Book[] = [];
  visibleBooks = 10; // Initially show 10 books

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getFlashSaleBooks().subscribe((books) => {
      console.log('Fetched books:', books); // Debugging
      this.books = books;
    });
  }


  loadMore(): void {
    if (this.visibleBooks < this.books.length) {
      this.visibleBooks += 5; // Show 5 more books each time
    }
  }
}
