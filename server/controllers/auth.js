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

        // ctx.body = { success: false }
        ctx.redirect('http://agileworks.tw/jenkins/');
      } else {
        // ctx.body = { success: true }
        ctx.login(user)
        ctx.redirect('http://agileworks.tw/jenkins/dashboard');
      }
    })(ctx, next)

  };


  signup(ctx, next){

    // let {serial} = ctx.params;

    return next().then(()=>{
      ctx.render('auth/signup.jade');
    });
  };

  async register(ctx, next){

    try {
      let {body} = ctx.request;
      let {user, coupon} = body;
      let {serial} = coupon;
      let couponFinded = await models.Coupon.find({where: {serial}});
      let userCreated = await models.User.create(user);
      await userCreated.addCoupons(couponFinded);

      let loginUser =  await models.User.findOne({
        where: {id: userCreated.id},
        include: models.Coupon
      });

      await ctx.login(loginUser.toJSON());

      ctx.redirect('/auth/info')

    } catch (e) {
      throw e;
    }

  };

  async info(ctx, next){

    try {

      let user = services.auth.getSessionUser(ctx);
      return next().then(()=>{
        ctx.render('auth/info.jade', {user});
      });


    } catch (e) {
      throw e;
    }

  };


}
