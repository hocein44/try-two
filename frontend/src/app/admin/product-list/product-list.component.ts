import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/product';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, NgFor,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p._id !== id);
      });
    }
  }
}
