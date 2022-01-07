import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BannerComponent],
  exports: [BannerComponent],
})
export class UiModule {}
