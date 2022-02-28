/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-02-26 17:06:19
 * @LastEditTime: 2022-02-27 09:36:02
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '社区xx'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
