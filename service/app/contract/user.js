'use strict';
module.exports = {
  registerRequest: {
    username: { type: 'string', description: '账号', required: true, example: 'admin' },
    password: { type: 'string', description: '密码', required: true, example: '123456', format: /^(\w){6,12}$/ },
  },

  loginRequest: {
    username: { type: 'string', description: '账号', required: true, example: 'admin' },
    password: { type: 'string', description: '密码', required: true, example: '123456' },
  },
};
