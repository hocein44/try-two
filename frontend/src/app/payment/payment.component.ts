import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-payment',
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() product: any;
  quantity: number = 1;
  paymentInfo = { cardNumber: '', expiry: '', cvv: '' };
  giftCodes: string[] = [];

  constructor(private http: HttpClient) {}

  processPayment() {
    this.http.post('http://localhost:5000/api/process-payment', {
      productId: this.product._id,
      quantity: this.quantity,
      paymentInfo: this.paymentInfo
    }).subscribe((response: any) => {
      this.giftCodes = response.cardCodes;
      alert('Payment Successful! Here are your codes: ' + this.giftCodes.join(', '));
    }, error => {
      alert(error.error.message || 'Payment failed.');
    });
  }
}
