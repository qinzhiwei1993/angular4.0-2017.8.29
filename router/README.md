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
    
## 6、辅助路由
    通常情况下，一个组件只有一个插座(router-outlet)，但是辅助路由，允许你一个组件可以拥有许多插座。
    实现一个辅助路由，需要三步：
        a:在html页面中，添加辅助路由， <router-outlet name="aux"></router-outlet>  aux为辅助路由的名字，没有命名的路由为主路由
        b:在路由配置中，配置辅助路由，{path:'chat', component: ChatComponent, outlet: 'aux'}， 跳转到chat组件，显示在aux的插座中，即路由占位符中
        c:添加跳转链接
                    <a [routerLink]="[{outlets: {'aux': 'chat'}}]">开始聊天</a>
                    <a [routerLink]="[{outlets: {'aux': null}}]">结束聊天</a>
        设置跳转到当前辅助路由页面时，同级的主路由显示  primary代表的是主路由
                    <a [routerLink]="[primary: 'home', {outlets: {'aux': 'chat'}}]">开始聊天</a>
                    切记上面的primary 是没有斜线的，直接写路径即可


## 7、路由守卫
     什么情况下使用路由守卫？
        1、判断用户是否拥有权限进入路由  
              CanActivate：处理导航到某路由的情况
        2、判断用户是否可以离开当前路由 ，提醒用户进行保存操作
              CanDeActivate：处理从当前路由离开的情况
        3、Resolve: 再激活路由之前获取数据  ，确保在跳转后可以拿到所有的数据
        
        
     CanActivate  :
            a:声明login.guard.ts类，引用ruoter中的CanActivate接口，实现canActivate方法，当返回值为true时，可以进行路由跳转
            b:在路由配置中，在商品详情路由配置canActivate属性，是一个数组，定义路由守卫的，只有所有的值为true，才能进行路由跳转
            c:在路由配置的providers中，添加LoginGuard的依赖支持
            
     CanDeActivate:
            a:和CanActivate 有少许的区别，在导入CanActivate的时候，需要制定泛型(受保护的组件类型),里面的canDeactivate的方法中，有一个
              参数component:ProductComponent， 这里的component就是保护的组件，可以获取组件的信息，进行判断是否可以离开
              
     Resolve：用法基本相似，看product.resolve.ts       
