/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-26 09:39:49
 * @LastEditTime: 2022-01-26 17:12:21
 */

import request from '@/utils/request'

/**
 * 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function forum (params, data = {}) {
  return request({
    url: '/api/ForumInfo.ashx',
    method: 'post',
    params,
    data
  })
}
