
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  standalone: false,
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})



export class BookViewComponent implements OnInit {
  isbn_n!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn_n');
      if (isbn) {
        this.isbn_n = isbn;
      }
    });
  }
}
