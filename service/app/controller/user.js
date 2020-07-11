'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller client-用户模块
 */
class UserController extends Controller {
  /**
   * @Summary 用户注册
   * @Description 用户注册接口
   * @Router POST /client/user/register
   * @Request body registerRequest *body
   * @Response 200 baseResponse ok
   */
  async register() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(ctx.rule.registerRequest);

    const result = await ctx.service.user.create();

    if (!result) {
      ctx.body = {
        code: 1,
        data: null,
        msg: '账号已存在！'
      }
    } else {
      ctx.body = {
        code: 0,
        data: null,
        msg: '注册成功！'
      }
    }
  }

  /**
   * @Summary 登陆
   * @Description 登陆接口
   * @Router POST /client/user/login
   * @Request body loginRequest *body
   * @Response 200 baseResponse ok
   */
  async login() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(ctx.rule.loginRequest);

    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.find(username, password);

    if (!user) {
      ctx.body = {
        code: 1,
        data: null,
        msg: '账号/密码错误！'
      }
      return
    }

    let count = ctx.cookies.get('count');
    count = count ? Number(count) : 0;
    ctx.cookies.set('count', ++count);

    // 设置 Session
    ctx.session.user = user;

    ctx.body = {
      code: 0,
      data: user,
      msg: '登陆成功！'
    }
  }

  /**
   * @Summary 退出登陆
   * @Description
   * @Router POST /client/user/logout
   * @Response 200 baseResponse ok
   */
  async logout() {
    const { ctx } = this;

    ctx.cookies.set('count', null);
    ctx.session.user = null

    ctx.body = {
      code: 2,
      data: null,
      msg: ''
    };
  }

  /**
   * @Summary 获取用户信息
   * @Description
   * @Router POST /client/user/getUserInfo
   * @Response 200 baseResponse ok
   */
  async getUserInfo() {
    const { ctx } = this;

    const userId = ctx.session.user._id
    const result = await ctx.service.user.findById(userId);

    ctx.body = {
      code: 0,
      data: result,
      msg: ''
    };
  }
}

module.exports = UserController;
