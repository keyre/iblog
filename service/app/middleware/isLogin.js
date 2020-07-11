module.exports = () => {
  return async function isLogin(ctx, next) {
    try {
      let count = ctx.cookies.get('count')
      let user = ctx.session.user
      console.log('user', user._id)
    } catch (err) {
      console.log('middleware isLogin err', err)
      ctx.body = {
        code: 2,
        data: null,
        msg: '授权失败，请重新登录'
      }
      return
    }

    await next();
  };
};