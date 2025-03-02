import { Component, AfterViewInit,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {

 
 title = 'my-app';

  constructor() {

    this.updateFavicon('assets/icons/favicon.png');  // Change icon dynamically
  }

  updateFavicon(iconUrl: string) {
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = iconUrl;
    document.head.appendChild(link);
  }

  
}