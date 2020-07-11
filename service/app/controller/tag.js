'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller client-文章标签模块
 */
class TagController extends Controller {
  /**
   * @Summary 创建/更新标签
   * @Description 有id则为更新
   * @Router POST /client/tag/createOrUpdate
   * @Request body createOrUpdateTagRequest *body
   * @Response 200 baseResponse ok
   */
  async createOrUpdate() {
    const { ctx } = this;
    // 校验参数
    // ctx.validate(ctx.rule.registerRequest);

    const result = await ctx.service.tag.createOrUpdate();
    console.log('result', result)

    if (!result) {
      ctx.body = {
        code: 1,
        data: null,
        msg: '已经存在同名标签！'
      }
    } else {
      ctx.body = {
        code: 0,
        data: result,
        msg: ''
      }
    }
  }

  /**
   * @Summary 标签列表
   * @Description 标签列表
   * @Router GET /client/tag/findList
   * @Response 200 baseResponse ok
   */
  async findList() {
    const { ctx } = this;

    const data = await ctx.service.tag.findList();

    ctx.body = {
      code: 0,
      data: data,
      msg: ''
    }
  }
}

module.exports = TagController;
