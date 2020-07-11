module.exports = {
  /**
   * 获取 uuid
   * @param len 长度
   * @param radix 进制
   * @returns {string}
   */
  getUuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },

  /**
   * 条件分页查询
   * @param model 查询的model
   * @param condition 查询条件
   * @param populate 填充
   * @returns Promise
   */
  async findListByCondition(model, condition, populate) {
    const { ctx } = this
    let { page, limit = 10, ...params } = condition

    if (page === undefined) throw new Error('page is required')

    page = Number(page)
    limit = Number(limit)
    return await ctx.model[model].find(params).limit(limit).skip(limit * page).populate(populate)
  },
};
