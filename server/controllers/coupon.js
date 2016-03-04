export default class coupon {

  constructor() {
  }


  index(ctx, next){
    ctx.render('coupon/index.jade', {title:'BOOM!'});
  }
  async use(ctx, next){

    try {
      let {serial} = ctx.request.body;
      let coupon = await services.coupon.use({serial})

      if(coupon)
        return ctx.redirect(`/auth/signup/coupon/${serial}`);
      else throw new Error('serial not match');

    } catch (e) {
      console.error(e.message);
      return ctx.render('coupon/index.jade')
    }
  }


}
