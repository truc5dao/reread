import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css'],
  standalone: false,
})
export class BestSellerComponent implements OnInit {

  books: Book[] = [];
  visibleBooks = 10; // Initially show 10 books

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBestSellers().subscribe((books) => {
      this.books = books;
    });
  }

  loadMore(): void {
    if (this.visibleBooks < this.books.length) {
      this.visibleBooks += 5; // Show 5 more books each time
    }
  }
}