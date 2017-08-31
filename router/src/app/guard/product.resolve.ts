import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Product } from "../product/product.component";

import { Injectable } from "@angular/core";

@Injectable()     //只有注入了这个，才可以将router注入进来

export class ProductResolve implements Resolve<Product>{//这里的Product泛型是需要传递的数据的类型

  constructor(private router: Router){}

  resolve(route: ActivatedRouteSnapshot){

      let productId: number = route.params['id'];//获取跳转传递的参数


      if(productId == 2){//参数传递正确进入
        return new Product(2, "Iphone7")
      }else{
        this.router.navigate(['/home']);
        return undefined;
      }
  }

}
