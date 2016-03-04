export default class Auth {

  constructor(passport) {
    this.passport = passport;
  }

  status(ctx){
    let isAuthenticated = services.auth.isAuthenticated(ctx);
    let sessionUser = services.auth.getSessionUser(ctx);

    ctx.body = {isAuthenticated, sessionUser}
  };

  login(ctx, next){

    return this.passport.authenticate('local', function(user, info, status) {
      if (user === false) {
        ctx.status = 401
        ctx.body = { success: false }
      } else {
        ctx.body = { success: true }
        return ctx.login(user)
      }
    })(ctx, next)

  };


  signup(ctx, next){

    let {serial} = ctx.params;

    return next().then(()=>{
      ctx.render('auth/signup.jade', {serial});
    });
  };
}
