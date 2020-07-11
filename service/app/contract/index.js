'use strict';
module.exports = {
  baseRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '1', format: /^1[34578]\d{9}$/, },
  },
  basePageRequest: {
    page: { type: 'number', description: '当前页', required: true, example: 0 },
    limit: { type: 'number', description: '条数限制', required: true, example: 10 },
  },
  baseIdRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '1', },
  },
  baseResponse: {
    code: { type: 'integer', description: '0：成功 1：错误，2：登陆过期', required: true, example: 0 },
    data: {
      type: 'object',
      required: true,
      example: {
        id: 1111
      },
      rule: {
        id: { type: 'string', description: 'id 唯一键', required: true, example: '1'},
      }
    },
    msg: { type: 'string', example: '请求成功' },
  },
};
