// 个人信息
const INFO_KEY = 'yb_shopping_info'
export const getItem = () => {
  const defaultItemObj = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : defaultItemObj
}

export const setItem = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeItem = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索历史
const SEARCH_KEY = 'yb_search_key'
export const getHistory = () => {
  const res = localStorage.getItem(SEARCH_KEY)
  return res ? JSON.parse(res) : []
}

export const setHistory = (arr) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
}
