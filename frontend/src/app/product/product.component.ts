import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product',
  imports: [NgFor,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
products:Product[]=[];
constructor(private apiservece:ApiService){}
ngOnInit(){
  this.apiservece.getProducts().subscribe({
    next:(response:Product[])=>{
      this.products=response;
    },error:(error:Error)=>{
      console.error('Error fetching products',error);
    }
  });
}
}
