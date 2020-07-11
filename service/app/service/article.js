const Service = require('egg').Service;

class ArticleService extends Service {
  async createOrUpdate() {
    const { ctx } = this
    const { id, ...params } = ctx.request.body

    if (!id) {
      return this.create(params)
    } else {
      return this.update(id, params)
    }
  }

  async create(params) {
    const { ctx } = this
    const _id = ctx.helper.getUuid(8, 10)
    params.user = params.userId
    params.tag = params.tagId
    return await ctx.model.Article.create({
      _id,
      ...params,
    })
  }

  async update(id, params) {
    const { ctx } = this

    const article = await this.findById(id)
    if (!article) {
      throw new Error('错误的id')
    }
    
    return await ctx.model.Article.findOneAndUpdate(
      { _id: id },
      {
        ...params,
        updateTime: Date.now
      }
    ).populate('tag')
      .populate('user')
  }

  async findList() {
    const { ctx } = this;
    return ctx.helper.findListByCondition('Article', {
      ...ctx.request.query,
      // status：2 文章已删除
      $nor: [{ status: 2 }]
    }, 'tag user')
  }

  async like() {
    const { ctx } = this;
    const { id } = ctx.request.body
    return await this.update(id, { $inc: { like: 1 }})
  }

  async findById(id) {
    const { ctx } = this;
    return await ctx.model.Article.findOne({
      _id: id,
    }).populate('tag')
      .populate('user')
      .exec()
  }


}

module.exports = ArticleService;