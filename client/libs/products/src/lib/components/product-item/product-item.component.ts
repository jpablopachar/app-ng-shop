import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  @Input() product: Product | undefined;
}
