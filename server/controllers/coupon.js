export default class coupon {

  constructor() {
  }


  index(ctx, next){
    ctx.render('coupon/index.jade', {title:'BOOM!'});
  }

}
