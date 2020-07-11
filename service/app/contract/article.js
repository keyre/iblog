'use strict';
module.exports = {

  createOrUpdateArticleRequest: {
    id: { type: 'string', description: '文章id', required: false, },
    tagId: { type: 'string', description: 'tagId', required: true, example: '32858962' },
    title: { type: 'string', description: 'title', required: true, example: '标题' },
    content: { type: 'string', description: '文章内容', required: true, example: 'content' },
    status: { type: 'number', description: '0：草稿  1：发布  2：已删除', required: true, example: 0 },
  }
};
