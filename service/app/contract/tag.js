'use strict';
module.exports = {
  createOrUpdateTagRequest: {
    id: { type: 'string', description: '标签id', },
    name: { type: 'string', description: '标签名', required: true, example: 'HTML' },
  }
};
