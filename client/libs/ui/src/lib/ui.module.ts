import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BannerComponent } from './banner/banner.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BannerComponent, GalleryComponent],
  exports: [BannerComponent, GalleryComponent],
})
export class UiModule {}
