import request from '@/utils/request'
export const getHomeList = () => {
  return request.get('/page/detail&pageId=0')
}
