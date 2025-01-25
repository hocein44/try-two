import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
  }
  
}
