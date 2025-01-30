// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  currentCartItems = this.cartItems.asObservable();

  addToCart(product: any) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      currentItems.push(product);
    }

    this.cartItems.next(currentItems);
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.getValue().filter((item) => item.id !== productId);
    this.cartItems.next(currentItems);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}