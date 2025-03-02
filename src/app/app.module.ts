import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannersComponent } from './banners/banners.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { HttpClientModule } from '@angular/common/http';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookViewComponent } from './book-view/book-view.component';
import { FormsModule } from '@angular/forms';
import { BookReviewComponent } from './book-review/book-review.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannersComponent,
    FlashSaleComponent,
    BestSellerComponent,
    BookDetailsComponent,
    FooterComponent,
    HomepageComponent,
    BookViewComponent,
    BookReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // ✅ Thêm dòng này để Angular biết cách xử lý HTTP requests
    RouterModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
