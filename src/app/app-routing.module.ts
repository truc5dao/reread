import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BookViewComponent } from './book-view/book-view.component';

const routes: Routes = [
  { path: 'book-view/:bookISBN_n', component: BookViewComponent },
  { path: '', component: HomepageComponent }, // Default route
  { path: '**', redirectTo: '' }, // Redirect unknown routes to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
