import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  startSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container') as HTMLElement;
    const images = slideshowContainer.querySelectorAll('.slideshow img') as NodeListOf<HTMLElement>;

    const changeImage = () => {
      images.forEach(img => img.style.display = 'none');
      const randomIndex = Math.floor(Math.random() * images.length);
      images[randomIndex].style.display = 'block';
      setTimeout(changeImage, 1000);
    };
    changeImage();
  }
}
