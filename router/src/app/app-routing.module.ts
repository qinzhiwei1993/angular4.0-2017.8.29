import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { Code404Component } from "./code404/code404.component";
import { ProductDescComponent } from "./product-desc/product-desc.component";
import { SellerInfoComponent } from "./seller-info/seller-info.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginGuard } from "./guard/login.guard";
import { UnsavedGuard } from "./guard/unsaved.guard";
import { ProductResolve } from "./guard/product.resolve";

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},//重定向路由，打开首页的时候，默认导航到home页面
  {path:'chat', component: ChatComponent, outlet: 'aux'},
  {path: 'home', component: HomeComponent},//不要写 / 斜线，谨记，当前都是在跟视图下
  {path: 'product/:id', component: ProductComponent, children:[
    {path: '', component: ProductDescComponent},
    {path: 'seller/:id', component: SellerInfoComponent}
  ], canActivate: [LoginGuard],
     canDeactivate: [UnsavedGuard],
     resolve:{
       product: ProductResolve//product 传递的数据的名称,通过ProductResolve这个resolves守卫路由
     }},
  {path: '**', component: Code404Component}//输入不存在组件时跳转的路径, 需要放在最后面，通配符路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    LoginGuard,
    UnsavedGuard,
    ProductResolve
  ]
})
export class AppRoutingModule { }
