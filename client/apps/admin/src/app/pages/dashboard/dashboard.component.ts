import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@client/orders';
import { ProductsService } from '@client/products';
import { UsersService } from '@client/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _dashboardSubject: Subject<any>;
  public statistics: number[];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _productService: ProductsService,
    private readonly _ordersService: OrdersService
  ) {
    this.statistics = [];
    this._dashboardSubject = new Subject();
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  private getStatistics(): void {
    combineLatest([
      // this._ordersService.getOrdersCount(),
      // this._ordersService.getTotalSales(),
      this._usersService.getUsersCount(),
      this._productService.getProductsCount()
    ]).pipe(takeUntil(this._dashboardSubject)).subscribe((values: [number, number]): [number, number] => this.statistics = values);
  }

  ngOnDestroy(): void {
    this._dashboardSubject.next(null);
    this._dashboardSubject.complete()
  }
}
