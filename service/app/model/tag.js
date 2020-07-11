module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    _id: String,
    name: { type: String  },
    createTime: { type: String, default: Date.now, },
    updateTime: { type: String, default: Date.now, },
  });

  return mongoose.model('Tag', TagSchema);
}