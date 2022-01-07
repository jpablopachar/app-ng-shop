import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() images: string[];

  public selectedImageUrl: string;

  constructor() {
    this.images = [];
    this.selectedImageUrl = '';
  }

  public get hasImages(): boolean {
    return this.images.length > 0;
  }

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  public changeSelectedImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  }
}
