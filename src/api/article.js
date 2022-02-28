/*
 * @Author: your name
 * @Date: 2022-02-15 16:29:47
 * @LastEditTime: 2022-02-16 14:07:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\api\article.js
 */
// import request from '@/utils/request'

export function fetchList (query) {
  return {
    data: {
      total: 3,
      items: [
        {
          id: 1,
          imageUri: 'sdsd1',
          author: 'ss2s',
          displayTimeFormart: '2022-02-16'
        },
        {
          id: 2,
          imageUri: 'sdsd',
          author: 'ss3s',
          displayTimeFormart: '2022-02-16'
        },
        {
          id: 3,
          imageUri: 'sdsd',
          author: 'ss2s',
          displayTimeFormart: '2022-02-16'
        }
      ]
    }
  }
}
