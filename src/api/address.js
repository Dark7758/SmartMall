import request from '@/utils/request'

export const getAddressList = () => {
  return request.get('/address/list')
}

// export const addAddress = (name, phone, region, detail) => {
//   return request.post('/address/add', {
//     form: {
//       name,
//       phone,
//       region,
//       detail
//     }
//   })
// }
