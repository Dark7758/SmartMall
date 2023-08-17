import { deleteCart, getCartList, updateCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    setChecked (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    setAllChecked (state, bool) {
      state.cartList.forEach(
        // eslint-disable-next-line no-return-assign
        item => item.isChecked = bool)
    },
    setGoodsTotal (state, obj) {
      const { goodsId, goodsNum } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车列表
    async getCartList (context) {
      const { data: { list } } = await getCartList()
      console.log(list)
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
    },
    // 更新购物车信息
    async updateCart (context, obj) {
      const { goodsId, goodsNum } = obj
      // console.log(obj)
      await updateCartList(goodsId, goodsNum)
      // console.log(cartTotal)
      context.commit('setGoodsTotal', { goodsNum, goodsId })
    },
    async deleteCart (context) {
      const carts = context.getters.checkedGoodsList.map(item => item.id)
      // console.log(carts)
      await deleteCart(carts)
      // console.log(res)
      Toast('删除成功')
      await context.dispatch('getCartList')
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((acc, current) => acc + current.goods_num, 0)
    },
    // 选中的商品列表
    checkedGoodsList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数
    checkedGoodsTotal (state, getters) {
      return getters.checkedGoodsList.reduce((acc, current) => acc + current.goods_num, 0)
    },
    checkedGoodsPrice (state, getters) {
      return getters.checkedGoodsList.reduce((acc, current) => acc + current.goods_num * parseFloat(current.goods.goods_price_min), 0).toFixed(2)
    },
    // 全选
    isCheckedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
