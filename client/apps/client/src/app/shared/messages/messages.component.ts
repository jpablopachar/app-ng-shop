import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@client/orders';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit, OnDestroy {
  private _messagesSubs: Subscription | undefined;

  constructor(
    private readonly _cartService: CartService,
    private readonly _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._messagesSubs = this._cartService.cart$.subscribe((): void =>
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart updated!',
      })
    );
  }

  ngOnDestroy(): void {
    if (this._messagesSubs) {
      this._messagesSubs.unsubscribe();
    }
  }
}
