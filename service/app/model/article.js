module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    _id: String,
    // userId: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: String, ref: 'User', required: true, },
    tag: { type: String, ref: 'Tag', required: true, },
    title: { type: String, required: true,  },
    description: { type: String  },
    content: { type: String, required: true,  },
    // 0：草稿  1：发布  2：已删除
    status: { type: Number, default: 0, },
    // 阅读数
    read: { type: Number, default: 0 },
    // 点赞数
    like: { type: Number, default: 0 },
    createTime: { type: String, default: Date.now, },
    updateTime: { type: String, default: Date.now, },
  });

  return mongoose.model('Article', ArticleSchema);
}
