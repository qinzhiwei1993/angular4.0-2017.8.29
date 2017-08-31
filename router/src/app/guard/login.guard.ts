import { CanActivate } from '@angular/router';

export class LoginGuard implements CanActivate{

  canActivate(){
    let loggedIn: boolean = Math.random() < 0.5;
    if(!loggedIn){
      console.log("用户未登录");
    }

    return loggedIn;//当返回值为true时，可以通过当前路由守卫，跳转路由
  }
}
