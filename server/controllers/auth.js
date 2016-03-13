export default class Auth {

  constructor(passport) {
    this.passport = passport;
  }

  status(ctx){
    let isAuthenticated = services.auth.isAuthenticated(ctx);
    let sessionUser = services.auth.getSessionUser(ctx);

    ctx.body = {isAuthenticated, sessionUser}
  };

  login(ctx, next) {

    let course = ctx.params.course || 'jenkins';

    return this.passport.authenticate('local', function(user, info, status) {
      if (user === false) {

        // ctx.body = { success: false }
        ctx.redirect('http://agileworks.tw/'+course+'?msg=email+%E6%88%96+password+%E9%8C%AF%E8%AA%A4');
      } else {
        // ctx.body = { success: true }
        ctx.login(user)
        ctx.redirect('http://agileworks.tw/'+course+'/dashboard');
      }
    })(ctx, next)

  };


  signup(ctx, next){

    // let {serial} = ctx.params;

    return next().then(() => {
      let course = ctx.params.course || 'jenkins';
      ctx.render('auth/signup.jade', {title: course.charAt(0).toUpperCase() + course.slice(1), course: course});
    });
  };

  async register(ctx, next){

    try {
      let course = ctx.params.course || 'jenkins';

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

      ctx.redirect('/' + course + '/auth/info');

    } catch (e) {
      throw e;
    }

  };

  async info(ctx, next){

    try {

      let user = services.auth.getSessionUser(ctx);
      let course = ctx.params.course || 'jenkins';

      return next().then(() => {
        ctx.render('auth/info.jade', {user, course});
      });

    } catch (e) {
      throw e;
    }

  };


}
