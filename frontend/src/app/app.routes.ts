import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'products', component: ProductComponent},
    {path:'home', component: HomeComponent,},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: UserDashboardComponent }, // Default to user dashboard
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'product-form/:id', component: ProductFormComponent },  // To edit product
    { path: 'product-form', component: ProductFormComponent },  // To add product
];
