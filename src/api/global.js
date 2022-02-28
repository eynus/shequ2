/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-26 09:39:49
 * @LastEditTime: 2022-01-26 16:41:01
 */
//
import request from '@/utils/request'

/**
 * 全局搜索
 * @param params
 * @returns {AxiosPromise}
 */
export function searchInfo (params) {
  return request({
    url: '/api/searchInfo.ashx',
    method: 'get',
    params
  })
}
/**
 * 首页访问
 * @param params
 * @returns {AxiosPromise}
 */
export function visitLog (params) {
  return request({
    url: '/api/visitLog.ashx',
    method: 'get',
    params
  })
}
