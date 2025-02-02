import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-payment-modal',
  imports: [NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent {
  @Output() paymentSuccessEvent = new EventEmitter<void>(); // Event emitter

  paymentForm: FormGroup;
  giftCardCode: string = '';  // For single card code
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
    });
  }

  processPayment() {
    if (this.paymentForm.invalid) return;

    const paymentData = {
      productId: this.data.product._id,  // Product ID
      paymentInfo: {
        cardNumber: this.paymentForm.value.cardNumber,
        expiry: this.paymentForm.value.expiry,
        cvv: this.paymentForm.value.cvv,
      },
      userId: this.data.userId  // Pass userId to the backend
    };

    // Call the backend API to process payment
    this.apiService.processPayment(paymentData).subscribe({
      next: (response: any) => {
        this.paymentSuccess = true;
        this.giftCardCode = response.cardCode;  // Get single card code
          // Emit event to notify parent component to remove the product
          this.paymentSuccessEvent.emit(); // Notify parent component
      },
      error: (error) => {
        alert('Payment failed: ' + error.error.message);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
