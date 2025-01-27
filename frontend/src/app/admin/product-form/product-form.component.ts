import { Component} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms'; // ✅ Import this





@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
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
    stock: 0,
    category:'',
  };
  productId: string | null = null;
  selectedFile: File | null = null;

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
    const formData = new FormData();
    
    // Append product details
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('stock', this.product.stock.toString());
    formData.append('category', this.product.category);
  
    // Append image if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(() => 
        this.router.navigate(['product-form'])
      );
    } else {
      this.productService.addProduct(formData).subscribe(() => 
        this.router.navigate(['product-form'])
      );
    }
  }
  

}

