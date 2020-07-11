'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller client-文章模块
 */
class ArticleController extends Controller {
  /**
   * @Summary 创建/更新文章
   * @Description 有id则为更新
   * @Router POST /client/article/createOrUpdate
   * @Request body createOrUpdateArticleRequest *body
   * @Response 200 baseResponse ok
   */
  async createOrUpdate() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(ctx.rule.createOrUpdateArticleRequest);

    ctx.request.body.userId = ctx.session.user._id

    const result = await ctx.service.article.createOrUpdate();
    console.log('result', result)

    if (!result) {
      throw new Error()
    } else {
      ctx.body = {
        code: 0,
        data: result,
        msg: ''
      }
    }
  }

  /**
   * @Summary 文章列表
   * @Description 文章列表
   * @Router GET /client/article/findList
   * @Request query number page eg:0 当前页
   * @Request query number limit eg:10 条数限制
   * @Response 200 baseResponse ok
   */
  async findList() {
    const { ctx } = this;

    const data = await ctx.service.article.findList();

    ctx.body = {
      code: 0,
      data: data,
      msg: ''
    }
  }

  /**
   * @Summary 文章详情
   * @Description 文章详情
   * @Router GET /client/article/findById
   * @Request query string id eg:0 文章ID
   * @Response 200 baseResponse ok
   */
  async findById() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    await ctx.service.article.update(id, { $inc: { read: 1 }})
    const data = await ctx.service.article.findById(id);

    ctx.body = {
      code: 0,
      data: data,
      msg: ''
    }
  }

  /**
   * @Summary 点赞文章
   * @Description 点赞文章
   * @Router POST /client/article/like
   * @Request body baseIdRequest *body
   * @Response 200 baseResponse ok
   */
  async like() {
    const { ctx } = this;

    const data = await ctx.service.article.like();

    ctx.body = {
      code: 0,
      data: data,
      msg: ''
    }
  }

  /**
   * @Summary 删除文章
   * @Description 删除文章
   * @Router POST /client/article/delete
   * @Request body baseIdRequest *body
   * @Response 200 baseResponse ok
   */
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const data = await ctx.service.article.update(id, { status: 2 });

    ctx.body = {
      code: 0,
      data: data,
      msg: ''
    }
  }
}

module.exports = ArticleController;
