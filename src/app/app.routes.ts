import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AllPageCardComponent } from './component/all-page-card/all-page-card.component';
import { ErrorComponent } from './component/error/error.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { DeleteProductComponent } from './component/delete-product/delete-product.component';
import { ProductsComponent } from './component/products/products.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { ShoppingComponent } from './component/shopping/shopping.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { adminGuard } from './guard/admin.guard';
import { ContactusComponent } from './component/contactus/contactus.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { ProductDetialsComponent} from './component/product-detials/product-detials.component';
import { logInGuard } from './guard/log-in.guard';
import { SearchResultComponent } from './component/search-result/search-result.component';

export const routes: Routes = [
    {path:"",redirectTo: "/home", pathMatch: "full"},
    {path:"home", component:HomeComponent},
    {path:"card", component:AllPageCardComponent, canActivate:[logInGuard]},

    {path:"shopping", component:ShoppingComponent},
    {path:"Product/:id", component:ProductDetialsComponent},
    { path: 'search', component: SearchResultComponent },
    {path:"addproduct", component:AddProductComponent},
    {path:"updateproduct/:id",component:UpdateProductComponent},
    {path:"deleteproduct", component:DeleteProductComponent},
    {path:"product", component:ProductsComponent,canActivate: [adminGuard]},
    {path:"Category", component:AddCategoryComponent},
    {path:"signup",component:SignUpComponent},
    {path:'login', component:LogInComponent},
    {path:'about-us',component:ContactusComponent},
    {path:'contact-us', component:AboutUsComponent},
    {path:"**", component:ErrorComponent}
    
];
