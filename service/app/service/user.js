const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
  getMd5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  };

  async create() {

    const { ctx } = this
    let { username, password } = ctx.request.body
    password = this.getMd5(password);

    const userData = await ctx.model.User.find({
      username,
    }).exec()

    if (userData.length !== 0) {
      return null
    }

    const _id = ctx.helper.getUuid(8, 10)
    return await ctx.model.User.create({
      _id,
      username,
      password
    })
  }

  async find(username, password) {
    const { ctx } = this;
    password = this.getMd5(password);

    return await ctx.model.User.findOne({
      username,
      password,
    }).exec()
  }

  async findById(userId) {
    const { ctx } = this;
    return await ctx.model.User.findOne({
      _id: userId,
    }).exec()
  }
}

module.exports = UserService;