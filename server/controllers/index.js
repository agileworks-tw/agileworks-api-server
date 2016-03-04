import mainController from './main';
import AuthController from './auth';

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

export default class Routes {

  constructor (app, passport) {
    var router = new Router();
    this.router = router;
    this.app = app;
    this.authController = new AuthController(passport);
    this.passport = passport;

  }

  setupPublicRoute() {
    var app = this.app;
    var publicRoute = new Router()

    publicRoute.get('/rest/hello/', mainController.hello);
    publicRoute.get('/auth/login/', (ctx, next) => {
      ctx.render('login.jade', {title:'BOOM!'});
    })


    publicRoute.get('/rest/auth/logout', function(ctx) {
      ctx.logout()
      ctx.redirect('/')
    })

    publicRoute.post('/rest/auth/login', this.authController.login.bind(this.authController));
    publicRoute.get('/rest/auth/status', this.authController.status);


    app.use(publicRoute.middleware())

    app.use(function(ctx, next) {
      if (ctx.isAuthenticated()) {
        return next()
      } else {
        ctx.redirect('/')
      }
    })

    // app.use(route.get('/app', function(ctx) {
    //
    // }))

  }

  setupAppRoute() {
    this.app.use(this.router.middleware())
  }


}
