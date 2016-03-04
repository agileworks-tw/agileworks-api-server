import mainController from './main';
import AuthController from './auth';
import CouponController from './coupon';

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

export default class Routes {

  constructor (app, passport) {
    var router = new Router();
    this.router = router;
    this.app = app;
    this.authController = new AuthController(passport);
    this.couponController = new CouponController();
    this.passport = passport;

  }

  setupPublicRoute() {
    var app = this.app;
    var publicRoute = new Router()

    publicRoute.get('/rest/hello/', mainController.hello);
    publicRoute.get('/coupon/index/', this.couponController.index);
    publicRoute.post('/rest/coupon/use/', this.couponController.use);


    publicRoute.get('/rest/auth/logout', function(ctx) {
      ctx.logout()
      ctx.redirect('/')
    })

    publicRoute.post('/rest/auth/login', this.authController.login.bind(this.authController));
    publicRoute.get('/auth/signup/coupon/:serial', this.authController.signup);
    publicRoute.get('/rest/auth/status', this.authController.status);


    app.use(publicRoute.middleware())

    // app.use(function(ctx, next) {
    //   if (ctx.isAuthenticated()) {
    //     return next()
    //   } else {
    //     ctx.redirect('/')
    //   }
    // })

    // app.use(route.get('/app', function(ctx) {
    //
    // }))

  }

  setupAppRoute() {
    this.app.use(this.router.middleware())
  }


}
