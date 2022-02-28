/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-26 09:39:49
 * @LastEditTime: 2022-02-27 23:36:11
 */
//
import request from '@/utils/request'

/**
 * 列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getActivityList (params, data = {}) {
  return request({
    url: '/api/activityInfo.ashx',
    method: 'post',
    params,
    data
  })
}
/**
 * 详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getDetail (params, data = {}) {
  return request({
    url: '/api/activityInfo.ashx',
    method: 'post',
    params,
    data
  })
}
