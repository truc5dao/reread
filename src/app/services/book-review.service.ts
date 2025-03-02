import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookReview {
  UserID: number;
  Rating: number;
  Comment: string;
  BookInfoID: number; // Link reviews to the BookInfoID
}

@Injectable({
  providedIn: 'root',
})
export class BookReviewService {
  private bookreviewUrl = 'http://localhost:3000/bookreview/'; // Base URL for reviews

  constructor(private http: HttpClient) {}

  // Fetch reviews for a specific book by BookInfoID
  getReviewsByBookInfoID(BookInfoID: string): Observable<BookReview[]> {
    return this.http.get<BookReview[]>(`${this.bookreviewUrl}${BookInfoID}`);
  }
}
