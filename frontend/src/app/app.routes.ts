import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    
    { 
        path: 'dashboard', 
        component: UserDashboardComponent,
        children: [
            { path: '', component: HomeComponent }, // Default: Show Home inside Dashboard
            { path: 'products', component: ProductComponent }, // Products inside Dashboard
            { path: 'cart', component: CartComponent}
        ] 
    },

    { 
        path: 'admin-dashboard', 
        component: AdminDashboardComponent,
        children: [
            { path: '', component: HomeComponent }, // Default page inside admin
            { path: 'products-list', component: ProductListComponent },  
            { path: 'product-form/:id', component: ProductFormComponent },  
            { path: 'product-form', component: ProductFormComponent }
        ]
    }
];