/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-26 09:39:49
 * @LastEditTime: 2022-01-26 12:39:14
 */
//
import request from '@/utils/request'

/**
 * 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getList (params) {
  return request({
    url: '/api/contentInfo.ashx',
    method: 'get',
    params
  })
}
/**
 * 详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getDetail (params, data = {}) {
  return request({
    url: '/api/contentInfo.ashx',
    method: 'post',
    params,
    data
  })
}
