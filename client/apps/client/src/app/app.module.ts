import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from '@client/products';
import { UiModule } from '@client/ui';
import { AccordionModule } from 'primeng/accordion';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AccordionModule,
    ProductsModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
