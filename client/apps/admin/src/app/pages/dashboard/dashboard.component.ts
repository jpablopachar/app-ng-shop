import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@client/orders';
import { ProductsService } from '@client/products';
import { UsersService } from '@client/users';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardSubs: Subscription | undefined;
  public statistics: number[];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _productService: ProductsService,
    private readonly _ordersService: OrdersService
  ) {
    this.statistics = [];
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  private getStatistics(): void {
    this.dashboardSubs = combineLatest([
      // this._ordersService.getOrdersCount(),
      // this._ordersService.getTotalSales(),
      this._usersService.getUsersCount(),
      this._productService.getProductsCount()
    ]).subscribe((values: [number, number]): [number, number] => this.statistics = values);
  }

  ngOnDestroy(): void {
    if (this.dashboardSubs) { this.dashboardSubs.unsubscribe(); }
  }
}
