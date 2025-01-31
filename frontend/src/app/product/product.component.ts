import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Product } from '../interfaces/product';
import { CheckoutService } from '../services/checkout.service';
import { environment } from '../../environments/environment';
import { loadStripe } from '@stripe/stripe-js'; // Import the loadStripe function
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  
  stripe: any; 
  products: Product[] = [];
  categorizedProducts: { [key: string]: Product[] } = {};
  groupedProducts: { [key: string]: { product: Product, count: number } } = {}; // Updated to count occurrences

  constructor(private apiService: ApiService,private checkoutService: CheckoutService,private http: HttpClient) {}

  ngOnInit() {
    loadStripe(environment.stripePublicKey).then((stripe) => {
      this.stripe = stripe;
    });
    this.apiService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.categorizeProducts();
        this.groupProducts(); // Updated function
      },
      error: (error: Error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  categorizeProducts() {
    this.categorizedProducts = this.products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }

  groupProducts() {
    this.groupedProducts = this.products.reduce((acc, product) => {
      const key = `${product.name}-${product.price}-${product.category}`; // Unique key for grouping

      if (!acc[key]) {
        acc[key] = { product, count: 0 };
      }
      acc[key].count++; // Count occurrences instead of summing stock
      return acc;
    }, {} as { [key: string]: { product: Product, count: number } });
  }

  getCategories(): string[] {
    return Object.keys(this.categorizedProducts);
  }

  getGroupedProductKeys(category: string): string[] {
    return Object.keys(this.groupedProducts).filter(
      key => this.groupedProducts[key].product.category === category
    );
  }
  onCheckout(product: any) {
    // Prepare the item data to send to the backend
    const items = [
      {
        name: product.name,
        price: product.price * 100,  // Stripe expects price in cents
        image: `http://localhost:5000${product.image}`,
        quantity: 1,  // You can adjust this to reflect the quantity
      },
    ];

    // Send the request to create a checkout session
    this.http
      .post<{ id: string }>(`${environment.apiUrl}/api/create-checkout-session`, { items })
      .subscribe({
        next: (response) => {
          // Redirect to Stripe Checkout using the session ID
          this.stripe.redirectToCheckout({ sessionId: response.id });
        },
        error: (error) => {
          console.error('Error starting checkout', error);
        },
      });
  }
}
