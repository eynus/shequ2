// import Storage from 'good-storage'
// import Config from '@/config/app'
import crypto from 'crypto'
/**
 * 重置对象（会修改原始对象）
 * @param object
 * @param defaultVal
 */
export function resetObject (object, defaultVal = {}) {
  for (let k in object) {
    if (defaultVal.hasOwnProperty(k)) {
      object[k] = defaultVal[k]
    } else {
      if (Array.isArray(object[k])) object[k] = []
      if (typeof object[k] === 'string') object[k] = ''
      if (typeof object[k] === 'number') object[k] = null
      if (typeof object[k] === 'boolean') object[k] = false
    }
  }
}

/**
 * 对象赋值（会修改原始对象）
 * @param object
 * @param valObject
 */
export function fillerLeft (object, valObject = {}) {
  for (let k in object) {
    if (valObject.hasOwnProperty(k)) {
      object[k] = valObject[k]
    }
  }
}

/**
 * 获取用户信息
 * @param key
 * @returns {null|*|undefined|{}}
 */
export function getUserInfo (key = null) {
  let userInfo = ''
  if (key) return userInfo.hasOwnProperty(key) ? userInfo[key] : null
  return userInfo || {}
}

/**
 * 设置用户信息
 * @param user
 * @returns {*}
 */
export function setUserInfo (user) {
  // Storage.set('UserInfo', user)
  return user
}

/**
 * 设置权限
 * @param permissionsArr
 * @returns {*}
 */
export function setPermissions (permissionsArr) {
  // Storage.set(Config.permissionsKey, permissionsArr)
  return permissionsArr
}

/**
 * 获取权限
 * @returns {*|undefined|Array}
 */
// export function getPermissions () {
//   return Storage.get(Config.permissionsKey) || []
// }

/**
 * 判断是否有权限
 * @param permissionsKey
 * @returns {boolean}
 */
// export function hasPermissions (permissionsKey) {
//   let permissionsArr = Storage.get(Config.permissionsKey, [])
//   return permissionsArr.indexOf(permissionsKey) !== -1
// }
/**
 * @getmd5 加密密码使用
 */
export function getmd5 (pwd) {
  var md5 = crypto.createHash('md5')
  md5.update(pwd)
  var password = md5.digest('hex')
  return password
}
/**
 * 获取Token
 * @returns {*|undefined}
 */
export function getToken () {
  return Storage.get(Config.tokenKey)
}

/**
 * 设置Token
 * @param token
 * @returns {*|undefined}
 */
// export function setToken (token) {
//   return Storage.set(Config.tokenKey, token)
// }

/**
 * 移除Token
 * @returns {*}
 */
// export function removeToken () {
//   return Storage.remove(Config.tokenKey)
// }

/**
 * 获取Menu
 * @returns {*}
 */
// export function getMenu () {
//   return Storage.get(Config.currentMenu)
// }

/**
 * 设置Menu
 * @param menu
 * @returns {*|undefined}
 */
// export function setMenu (menu) {
//   return Storage.set(Config.currentMenu, menu)
// }

// 阿拉伯数字转中文数字
export function NoToChinese (num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    alert('Number is wrong!')
    return 'Number is wrong!'
  }
  var AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
  var BB = new Array('', '十', '百', '千', '万', '亿', '点', '')
  var a = ('' + num).replace(/(^0*)/g, '').split('.')
  var k = 0
  var re = ''
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) { re = AA[0] + re }
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
    k++
  }
  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (var h = 0; h < a[1].length; h++) re += AA[a[1].charAt(h)]
  }
  return re
}

// 获取数组中第二个大写字母所在位置
export function getSecondUpper (arr) {
  let reg = /^[A-Z]+$/
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (reg.test(arr[i])) {
      count++
    }
    if (count === 2) {
      return i
    }
  }
}

// 处理onlyoffice的文件类型
export function handleDocType (fileType) {
  let docType = ''
  let fileTypesDoc = [
    'doc',
    'docm',
    'docx',
    'dot',
    'dotm',
    'dotx',
    'epub',
    'fodt',
    'htm',
    'html',
    'mht',
    'odt',
    'ott',
    'pdf',
    'rtf',
    'txt',
    'djvu',
    'xps'
  ]
  let fileTypesCsv = [
    'csv',
    'fods',
    'ods',
    'ots',
    'xls',
    'xlsm',
    'xlsx',
    'xlt',
    'xltm',
    'xltx'
  ]
  let fileTypesPPt = [
    'fodp',
    'odp',
    'otp',
    'pot',
    'potm',
    'potx',
    'pps',
    'ppsm',
    'ppsx',
    'ppt',
    'pptm',
    'pptx'
  ]
  if (fileTypesDoc.includes(fileType)) {
    docType = 'text'
  }
  if (fileTypesCsv.includes(fileType)) {
    docType = 'spreadsheet'
  }
  if (fileTypesPPt.includes(fileType)) {
    docType = 'presentation'
  }
  return docType
}
