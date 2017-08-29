## 1、 ng new router --router   自动生成带路由模块的angular项目
## 2、 路有的5个常用对象: 
        routes: 配置路由的
        routerLinker: html中设置跳转链接的
        router: js中设置跳转的
        router-outlet: 插座，显示路由内容位置占位符
        ActivatedRoute: 当前激活的路由
## 3、三种传递查询参数的方式
  (1) 在查询参数中传递数据  /product?name=Name&pwd=Pwd
      <a [routerLink]="['/product']" [queryParams]="{id: 1}">商品详情页</a>
      this.productId = this.routeInfo.snapshot.queryParams['id'];//从查询参数中取，第一种方法
      
  (2) 在路由路径中传递数据 { path: 'product/:id }  
      <a [routerLink]="['/product', 2]">商品详情页</a>
      this.productId = this.routeInfo.snapshot.params['id'];//从路由路径参数中取，第二种方法
      
  (3) 在路由配置中传递数据 {path: 'product', component: ProductComponent, data: [{isProd: true}]}
     拿到传递数据的方式：ActivatedRouter.data[0][isProd]
     
     参数快照：this.routeInfo.snapshot.params['id']   
     参数订阅：this.routeInfo.params.subscribe(     id值变化时，可以随时订阅到变化的值
          (params: Params) => { this.productId = params['id'] }
     )
     
## 4、重定向路由
    {path:'', redirectTo: '/home', pathMatch: 'full'},//重定向路由
    
    
## 5、子路由
    {path: 'product/:id', component: ProductComponent, children:[//子路由
        {path: '', component: ProductDescComponent},
        {path: 'seller/:id', component: SellerInfoComponent}
      ]},
      
    <a [routerLink]="['./']">商品描述</a>   ./表示找到 当前下的 子路由
    <a [routerLink]="['./seller', 99]">销售员信息</a>  
