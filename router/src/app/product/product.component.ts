import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private productId: number;

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.routeInfo);
    //snapshot  参数快照
    //this.productId = this.routeInfo.snapshot.queryParams['id'];//从查询参数中取，第一种方法
    this.productId = this.routeInfo.snapshot.params['id'];//从参数中去，第二种方法

    //参数订阅
    this.routeInfo.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
      }
    )


  }

}
