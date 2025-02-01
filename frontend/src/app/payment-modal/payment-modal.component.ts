import { Component,Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import this!

import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-payment-modal',
  imports: [NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  paymentForm: FormGroup;
  giftCardCodes: string[] = [];
  paymentSuccess = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiry: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(data.stock)]]
    });
  }

  processPayment() {
    if (this.paymentForm.invalid) return;

    const paymentData = {
      productId: this.data.product._id,
      quantity: this.paymentForm.value.quantity,
      paymentInfo: {
        cardNumber: this.paymentForm.value.cardNumber,
        expiry: this.paymentForm.value.expiry,
        cvv: this.paymentForm.value.cvv
      }
    };

    this.apiService.processPayment(paymentData).subscribe({
      next: (response: any) => {
        this.paymentSuccess = true;
        this.giftCardCodes = response.cardCodes;
      },
      error: (error) => {
        alert("Payment failed: " + error.error.message);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
