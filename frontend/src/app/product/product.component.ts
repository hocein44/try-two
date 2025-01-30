import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Product } from '../interfaces/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [NgFor,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  categorizedProducts: { [key: string]: Product[] } = {}; // Add this line

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.categorizeProducts(); // Call this method after fetching products
      },
      error: (error: Error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  // Add this method
  categorizeProducts() {
    this.categorizedProducts = this.products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }

  // Add this method
  getCategories(): string[] {
    return Object.keys(this.categorizedProducts);
  }
addToCart(product: any) {
  this.cartService.addToCart(product);
}
}
