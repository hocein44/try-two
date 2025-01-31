import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule,NgIf],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product: Product = {
    _id: '',
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    code: ''
  };
  productId: string | null = null;
  selectedFile: File | null = null;
  isSaving: boolean = false; // To show loading state
  saveSuccess: boolean = false; // To show success message

  constructor(private productService: ApiService, private route: ActivatedRoute, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  saveProduct(): void {
    this.isSaving = true; // Show loading spinner
    this.saveSuccess = false; // Reset success message

    const formData = new FormData();

    // Append product details
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);
    formData.append('code', this.product.code);

    // Append image if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          this.isSaving = false;
          this.saveSuccess = true; // Show success message
          setTimeout(() => this.router.navigate(['/admin-dashboard/products-list']), 2000); // Redirect after 2 seconds
        },
        error: () => {
          this.isSaving = false; // Hide loading spinner on error
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.isSaving = false;
          this.saveSuccess = true; // Show success message
          setTimeout(() => this.router.navigate(['/admin-dashboard/products-list']), 2000); // Redirect after 2 seconds
        },
        error: () => {
          this.isSaving = false; // Hide loading spinner on error
        }
      });
    }
  }
}