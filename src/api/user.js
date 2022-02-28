/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-25 20:10:34
 * @LastEditTime: 2022-02-27 09:06:36
 */
import request from '@/utils/request'

/**
 * 注册
 * @param params
 * @returns {AxiosPromise}
 */
export function login (data) {
  return request({
    url: '/api/userinfo.ashx?action=login',
    method: 'post',
    data
  })
}
/**
 * 重置密码
 * @param params
 * @returns {AxiosPromise}
 */
export function EditPasswordByInfo (data) {
  return request({
    url: '/api/userinfo.ashx?action=EditPasswordByInfo',
    method: 'post',
    data
  })
}
/**
 * 登录
 * @param params
 * @returns {AxiosPromise}
 */
export function register (data) {
  return request({
    url: '/api/userinfo.ashx?action=Add',
    method: 'post',
    data
  })
}
/**
 * 修改个人信息
 * @param params
 * @returns {AxiosPromise}
 */
export function EditUserInfo (data) {
  return request({
    url: '/api/userinfo.ashx?action=Edit',
    method: 'post',
    data
    // {id:1,realName:"张三",email:"903739691@qq.com",phone:"17625321943",photo:{id:18,filebh:"17c72d2ab6064825870471c0dd2e82f4",fileType:"Image",origionName:"point_blue.png",filePath:"/upload/photo/17c72d2ab6064825870471c0dd2e82f4202201252216521652.png",extention:".PNG",posttime:"0001-01-01T00:00:00",isDel:0}}
  })
}
/**
 * 头像
 * @param params
 * @returns {AxiosPromise}
 */
export function uploadPhoto (data) {
  return request({
    url: '/api/UploadInfo.ashx?action=uploadPhoto',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 消息
 * @param params
 * @returns {AxiosPromise}
 */
export function noticeInfo (params, data = {}) {
  return request({
    url: '/api/noticeinfo.ashx',
    method: 'post',
    params,
    data
  })
}
