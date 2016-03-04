
export default class Auth {

    constructor (app, passport) {
    }

    isAuthenticated(ctx){
      return ctx.isAuthenticated();
    }

    getSessionUser(ctx){
      return ctx.session.passport.user;
    }

}
