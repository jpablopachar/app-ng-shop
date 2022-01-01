import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order, OrdersService } from '@client/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../../../enums/order.enum';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  public order: Order | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public orderStatus: any[];
  public selectedStatus: number;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _orderService: OrdersService,
    private readonly _messageService: MessageService
  ) {
    this.orderStatus = [];
    this.selectedStatus = 0;
  }

  ngOnInit(): void {
    this.mapOrderStatus();
    this.getOrder();
  }

  private getOrder(): void {
    this._route.params.subscribe((params: Params): void => {
      if (params['id']) {
        const orderId = params['id'];

        this._orderService.getOrder(orderId).subscribe((order: Order): void => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  private mapOrderStatus(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.orderStatus = Object.keys(ORDER_STATUS).map(
      (key: string): { id: string; name: any } => ({
        id: key,
        name: ORDER_STATUS[key].label,
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onStatusChange(event: any): void {
    const status = event.value;

    if (this.order) {
      this._orderService.updateOrder({ status }, this.order.id).subscribe({
        next: (): void => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!',
          });
        },
        error: (): void => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        },
      });
    }
  }
}
