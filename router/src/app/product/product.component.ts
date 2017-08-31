import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productId: number;
  public productName: string;

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.routeInfo);
    //snapshot  参数快照
    //this.productId = this.routeInfo.snapshot.queryParams['id'];//从查询参数中取，第一种方法
    this.productId = this.routeInfo.snapshot.params['id'];//从参数中去，第二种方法

    //参数订阅
    this.routeInfo.params.subscribe(//订阅传递的参数
      (params: Params) => {
        this.productId = params['id'];
      }
    )

    this.routeInfo.data.subscribe(//这里订阅的是传递的数据
      (data: {product: Product}) => {
          this.productId = data.product.id;
          this.productName = data.product.name;
      }
    )


  }

}

export class Product{
  constructor(public id: number, public name: string){

  }
}
