import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { Code404Component } from "./code404/code404.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: '**', component: Code404Component}//输入不存在组件,需要放在最后面，通配符路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
