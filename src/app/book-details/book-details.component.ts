import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book, AvailableCondition } from '../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: false,
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  mainImage: string = 'assets/default-book.png';
  selectedCondition: AvailableCondition | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookISBN_n = this.route.snapshot.paramMap.get('bookISBN_n');
    if (!bookISBN_n) {
      this.isLoading = false;
      this.errorMessage = "Invalid book ISBN.";
      return;
    }

    this.bookService.getBookByCondition(bookISBN_n).subscribe({
      next: (data: Book) => {
        this.book = data;
        this.mainImage = data.BookImg1 ? `https://ik.imagekit.io/reRead2025/6T/${data.BookImg1}` : 'assets/default-book.png';

        if (data.availableConditions?.length) {
          // Set the first available condition as the default
          this.selectedCondition = data.availableConditions[0];
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching book details:", error);
        this.errorMessage = "Failed to load book details. Please try again later.";
        this.isLoading = false;
      }
    });
  }

  get availableConditions(): AvailableCondition[] {
    return this.book?.availableConditions || [];
  }

  get bookImages(): string[] {
    if (this.selectedCondition) {
      // When a condition is selected, return the images for that condition
      return [
        this.selectedCondition.BookImg1 ? `https://ik.imagekit.io/reRead2025/6T/${this.selectedCondition.BookImg1}` : '',
        this.selectedCondition.BookImg2 ? `https://ik.imagekit.io/reRead2025/6T/${this.selectedCondition.BookImg2}` : '',
        this.selectedCondition.BookImg3 ? `https://ik.imagekit.io/reRead2025/6T/${this.selectedCondition.BookImg3}` : ''
      ].filter((img): img is string => !!img); // Filters out any empty strings
    }
  
    // If no condition is selected, return images from the main book data
    return this.book
      ? [
          this.book.BookImg1 ? `https://ik.imagekit.io/reRead2025/6T/${this.book.BookImg1}` : '',
          this.book.BookImg2 ? `https://ik.imagekit.io/reRead2025/6T/${this.book.BookImg2}` : '',
          this.book.BookImg3 ? `https://ik.imagekit.io/reRead2025/6T/${this.book.BookImg3}` : ''
        ].filter((img): img is string => !!img) // Filters out any empty strings
      : [];
  }
  
  
  setMainImage(image?: string): void {
    this.mainImage = image ? `https://ik.imagekit.io/reRead2025/6T/${image}` : 'assets/default-book.png';
  }

  increaseQuantity(): void {
    if (this.selectedCondition?.CurrentQty && this.quantity < this.selectedCondition.CurrentQty) {
      this.quantity += 1;
    }
    
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  selectCondition(condition: AvailableCondition): void {
    this.selectedCondition = condition;
    this.updateBookDetails(condition);
  }

  updateBookDetails(condition: AvailableCondition): void {
    // Update the main image and other details when a new condition is selected
    this.mainImage = condition.BookImg1 ? `https://ik.imagekit.io/reRead2025/6T/${condition.BookImg1}` : 'assets/default-book.png';
    // You can add logic to update price, sales, and quantity if needed.
  }
}
