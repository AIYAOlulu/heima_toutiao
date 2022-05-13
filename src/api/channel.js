import request from '@/utils/request'

// 所有频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 更新修改频道
export const editChannels = data => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data
  })
}
