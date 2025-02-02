import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/product';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, CommonModule, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categorizedProducts: { [key: string]: Product[] } = {};
  groupedProducts: { [key: string]: { product: Product, count: number } } = {};

  constructor(private apiService: ApiService, private dialog: MatDialog,private authService: AuthService, private router: Router) {}
  handleBuyNow(product: any): void {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login page if not authenticated
      this.router.navigate(['/dashboard/login']);
    } else {
      // Proceed to open the payment modal if authenticated
      this.openPaymentModal(product);
    }
  }
  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.apiService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.categorizeProducts();
        this.groupProducts();
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
      const key = `${product.name}-${product.price}-${product.category}`;

      if (!acc[key]) {
        acc[key] = { product, count: 0 };
      }
      acc[key].count++;
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

  openPaymentModal(product: Product) {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '700px',
      data: { product, quantity: 1 }
    });

    // Subscribe to the payment success event and reload the products
    dialogRef.componentInstance.paymentSuccessEvent.subscribe(() => {
      this.removeProductFromList(product);  // Remove the product from the list
    });
  }

  removeProductFromList(product: Product) {
    // Filter out the purchased product from the list
    this.products = this.products.filter(p => p._id !== product._id);
    this.categorizeProducts();  // Re-categorize products after removing
    this.groupProducts();       // Re-group products after removing
  }
}
