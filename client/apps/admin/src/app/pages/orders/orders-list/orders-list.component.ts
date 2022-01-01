import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@client/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../../../enums/order.enum';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  public orders: Order[];
  public orderStatus;

  constructor(
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _ordersService: OrdersService
  ) {
    this.orders = [];
    this.orderStatus = ORDER_STATUS;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this._ordersService.getOrders().subscribe((orders: Order[]): Order[] => this.orders = orders);
  }

  public showOrder(orderId: string): void {
    this._router.navigateByUrl(`orders/${orderId}`);
  }

  public deleteOrder(orderId: string): void {
    this._confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete order',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this._ordersService.deleteOrder(orderId).subscribe({
          next: (): void => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
            this.getOrders();
          },
          error: (): void => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        });
      }
    });
  }
}
