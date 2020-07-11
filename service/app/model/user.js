module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    _id: String,
    username: { type: String, required: true, },
    password: { type: String, required: true, },
    avatarUrl: { type: String, default: '' },
    createTime: { type: String, default: Date.now, },
    updateTime: { type: String, default: Date.now, },
  });

  return mongoose.model('User', UserSchema);
}

// {app_root}/app/controller/user.js
// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.User.find({});
// }