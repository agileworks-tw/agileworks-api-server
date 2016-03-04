import mainController from './main';

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

export default class Routes {

  constructor (app) {
    var router = new Router();
    this.router = router;
    this.app = app;

  }

  setupPublicRoute() {
    var app = this.app;
    var publicRoute = new Router()

    publicRoute.get('/rest/hello/', mainController.hello);

    app.use(publicRoute.middleware())

  }

  setupAppRoute() {
    this.app.use(this.router.middleware())
  }


}
