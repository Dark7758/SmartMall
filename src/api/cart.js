import request from '@/utils/request'

// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车信息更新
export const updateCartList = (goodsId, goodsNum) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId: 0
  })
}

// 删除购物车信息
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', { cartIds })
}
