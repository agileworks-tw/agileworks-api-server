
export default class Auth {

    constructor (app, passport) {
    }

    isAuthenticated(ctx){
      return ctx.isAuthenticated();
    }

    getSessionUser(ctx){
      return ctx.session.passport.user;
    }

    // register(ctx){
    //   try {
    //     let couponFinded = await models.Coupon.find({where: {serial}});
    //     let userCreated = await models.User.create(user);
    //     userCreated.addCoupons(couponFinded);
    //   } catch (e) {
    //
    //     throw e;
    //
    //   }

    // }




}
