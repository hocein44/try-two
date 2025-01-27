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
  // product = { name: '', price: 0 };
  // productId: string | null = null;

  // constructor(private productService: ApiService, private route: ActivatedRoute, private router: Router) {}

  // ngOnInit(): void {
  //   this.productId = this.route.snapshot.paramMap.get('id');
  //   if (this.productId) {
  //     this.productService.getProductById(this.productId).subscribe(data => this.product = data);
  //   }
  // }

  // saveProduct(): void {
  //   if (this.productId) {
  //     this.productService.updateProduct(this.productId, this.product).subscribe(() => this.router.navigate(['/admin/products']));
  //   } else {
  //     this.productService.addProduct(this.product).subscribe(() => this.router.navigate(['/admin/products']));
  //   }
  // }
  product: Product = {
    _id: '',
    name: '',
    price: 0,
    image: '',
    description: '',
    stock: 0
  };
  productId: string | null = null;

  constructor(private productService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  saveProduct(): void {
    if (this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe(() => 
        this.router.navigate(['product-form'])
      );
    } else {
      this.productService.addProduct(this.product).subscribe(() => 
        this.router.navigate(['product-form'])
      );
    }
  }
}

