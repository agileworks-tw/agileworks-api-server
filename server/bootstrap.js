

export default async (cb) => {


  try {
    let couponData = {
      serial: '1111',
      class: 'jenkins',
      authorizeType: 'normal'
    }
    await models.Coupon.create(couponData);

  } catch (e) {

    console.log("error", e);

  }
}
