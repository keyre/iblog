const Service = require('egg').Service;

class TagService extends Service {
  async createOrUpdate() {
    const { ctx } = this
    const { id, name } = ctx.request.body

    const data = await this.findByName(name)
    // 判断是否有同名
    if (data) {
      return null
    }
    
    if (!id) {
      return this.create(name)
    } else {
      return this.update(id, name)
    }
  }

  async create(name) {
    const { ctx } = this
    const _id = ctx.helper.getUuid(8, 10)
    return await ctx.model.Tag.create({
      _id,
      name,
    })
  }

  async update(id, name) {
    const { ctx } = this

    const tag = await this.findById(id)
    if (!tag) {
      throw new Error('错误的id')
    }

    return await ctx.model.Tag.update(
      { _id: id },
      {
        name,
        updateTime: Date.now
      }
    )
  }

  async findList() {
    const { ctx } = this;
    return await ctx.model.Tag.find().exec()
  }

  async findById(id) {
    const { ctx } = this;
    return await ctx.model.Tag.findOne({
      _id: id,
    }).exec()
  }

  async findByName(name) {
    const { ctx } = this;
    return await ctx.model.Tag.findOne({
      name,
    }).exec()
  }
  
  
}

module.exports = TagService;