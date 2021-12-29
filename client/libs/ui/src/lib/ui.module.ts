import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class UiModule {}
