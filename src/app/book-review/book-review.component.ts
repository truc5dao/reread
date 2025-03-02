import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported
import { BookReviewService } from '../services/book-review.service'; // Use the service

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css'],
})
export class BookReviewComponent implements OnInit {
  @Input() isbn_n: string = ''; // Get ISBN from BookViewComponent
  bookInfoID: string = ''; // BookInfoID will be fetched
  reviews: any[] = [];

  constructor(
    private http: HttpClient, // Inject HttpClient
    private bookReviewService: BookReviewService
  ) {}

  ngOnInit() {
    if (this.isbn_n) {
      this.fetchBookInfoID();
    }
  }

  fetchBookInfoID() {
    // Fetch BookInfoID from the ISBN
    this.http.get<{ BookInfoID: string }>(`http://localhost:3000/books/${this.isbn_n}`).subscribe(
      (bookData) => {
        console.log('Fetched book data:', bookData); // Log the response
        this.bookInfoID = String(bookData.BookInfoID); // Ensure it's treated as a string
        this.fetchReviews(); // Once we have the BookInfoID, fetch reviews
      },
      (error) => {
        console.error('Error fetching book data:', error);
      }
    );
  }

  fetchReviews() {
    if (!this.bookInfoID) return;

    // Use the BookReviewService to get the reviews
    this.bookReviewService.getReviewsByBookInfoID(this.bookInfoID).subscribe(
      (reviews) => {
        console.log('Fetched reviews:', reviews);
        this.reviews = reviews || [];
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
