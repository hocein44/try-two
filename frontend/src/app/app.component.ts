import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './interfaces/product';
import { ApiService } from './services/api.service';
import { response } from 'express';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
products:Product[]=[];
constructor(private apiservece:ApiService){
}
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
