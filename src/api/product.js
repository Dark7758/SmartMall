import request from '@/utils/request'
export const getSearchList = (obj) => {
  return request.get('/goods/list', {
    params: {
      categoryId: obj.categoryId,
      goodsName: obj.goodsName,
      page: obj.page
    }
  })
}

export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const commentList = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
