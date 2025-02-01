import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },


    { 
        path: 'dashboard', 
        component: UserDashboardComponent,
        children: [
            { path: '', component: HomeComponent }, // Default: Show Home inside Dashboard
            { path: 'products', component: ProductComponent }, // Products inside Dashboard
            { path: 'signup', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'payment', component: PaymentComponent },

        ] 
    },

    { 
        path: 'admin-dashboard', 
        component: AdminDashboardComponent,
        children: [
            { path: '', redirectTo:'user',pathMatch: 'full' }, // Default page inside admin
            { path: 'products-list', component: ProductListComponent },  
            { path: 'product-form/:id', component: ProductFormComponent },  
            { path: 'product-form', component: ProductFormComponent },
            { path: 'user', component: UserManagementComponent },
        ]
    }
];