import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.currentCartItems.subscribe((items) => (this.cartItems = items));
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    // Proceed to payment
  }
}