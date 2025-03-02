import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvailableCondition {
  BookISBN_n?: string;
  BookCond: string;
  BookPrice?: number;
  BookSales?: number;
  CurrentQty?: number;
  BookImg1?: string;
  BookImg2?: string;
  BookImg3?: string;
}

export interface Book {
  _id?: string;
  BookISBN_n?: string; // Identifies the chosen condition
  BookTitle?: string;
  BookPrice?: number;
  BookSales?: number;
  BookImg1?: string;
  BookImg2?: string;
  BookImg3?: string;
  BookCond?: string;
  PlacedQty?: number;
  CurrentQty?: number;
  ExpectedQty?: number;
  ReturnedQty?: number;
  BookInfoID?: string;
  BookAut?: string;  // Author
  BookPub?: string;  // Publisher
  BookDesc?: string; // Description
  BookGenre?: string;
  BookLang?: string;
  BookCateID?: string;

  // `availableConditions` is an optional array of `AvailableCondition` objects
  availableConditions?: AvailableCondition[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookstocksUrl = 'http://localhost:3000/bookstocks';
  private bookdetailsUrl = 'http://localhost:3000/book';

  constructor(private http: HttpClient) {}

  /** 🔥 Get books sorted by sales for Flash Sale */
  getFlashSaleBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookstocksUrl}?flash_sale=true`);
  }

  /** 🏆 Get Best Sellers (PlacedQty > 2, sorted descending) */
  getBestSellers(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookstocksUrl}?best_seller=true`);
  }

  /** 📚 Get books by category (e.g., "Fiction") */
  getBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookstocksUrl}?category=${encodeURIComponent(category)}`);
  }

  /** 🏷️ Get all books */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookstocksUrl);
  }

  /** Get a specific book by its ISBN, including available conditions */
  getBookByCondition(bookISBN: string): Observable<Book> {
    console.log('Fetching book with ISBN:', bookISBN); // Debugging
    return this.http.get<Book>(`${this.bookdetailsUrl}/${bookISBN}`);
  }
}
